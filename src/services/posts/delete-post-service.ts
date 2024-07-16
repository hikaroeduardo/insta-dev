import { postModel } from "../../models/PostModels";
import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";
import { Unauthorized } from "../../utils/errors/unauthorized-error";
import { prisma } from "../../utils/prisma-client";

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
