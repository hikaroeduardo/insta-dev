import { prisma } from "../../utils/prisma-client";

import { postModel } from "../../models/PostModels";

import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";

export async function addLikePostService(id: string) {
    const postId = Number(id);

    const post = await postModel.findByPostId(Number(postId));

    if (!post) {
        throw new PostNotFoundError("Post not found.");
    }

    const addLikePost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            number_likes: post.number_likes + 1,
        },
        select: { number_likes: true },
    });

    return addLikePost;
}
