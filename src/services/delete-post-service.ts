import { postModel } from "../models/PostModels";
import { PostNotFoundError } from "../utils/errors/post-not-exists-error";
import { Unauthorized } from "../utils/errors/unauthorized-error";
import { prisma } from "../utils/prisma-client";

/*
    [x] Somente autenticado
    [x] Passar id do post na rota
    [x] Pegar id da rota e utilizar para o delete
    [x] Verificar se post existe
        [x] Se não existir, retornar erro
    x] Verificar se o author_id do post é igual o do userId passado
        [x] Se não for, retornar erro de não autorizad
    [] Deletar post
*/

export class DeletePostService {
    async delete(id: string, userId: string) {
        const postId = Number(id);

        const numberUserId = Number(userId);

        const post = await postModel.findByPostId(Number(postId));

        if (!post) {
            throw new PostNotFoundError("Post not found.");
        }

        if (post.author_id !== numberUserId) {
            throw new Unauthorized("User unauthorized.");
        }

        const postDeleted = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return postDeleted;
    }
}
