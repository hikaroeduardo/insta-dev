import { prisma } from "../../utils/prisma-client";

import { postModel } from "../../models/PostModels";

import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";
import { Unauthorized } from "../../utils/errors/unauthorized-error";

interface UpdatePostProps {
    id: string;
    userId: string;
    image: string;
    description: string;
}

export class UpdatePostService {
    async update({ id, userId, image, description }: UpdatePostProps) {
        const postId = Number(id);

        const numberUserId = Number(userId);

        const post = await postModel.findByPostId(Number(postId));

        if (!post) {
            throw new PostNotFoundError("Post not found.");
        }

        if (post.author_id !== numberUserId) {
            throw new Unauthorized("User unauthorized.");
        }

        const postUpdated = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                image: image ?? post.image,
                description: description ?? post.description,
            },
            select: {
                image: image ? true : false,
                description: description ? true : false,
            },
        });

        return postUpdated;
    }
}
