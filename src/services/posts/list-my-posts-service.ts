import { prisma } from "../../utils/prisma-client";

import { postModel } from "../../models/PostModels";

import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";
import { Unauthorized } from "../../utils/errors/unauthorized-error";

export class ListMyPostsService {
    async list(userId: string) {
        const numberUserId = Number(userId);

        const posts = await postModel.findPostByAuthorId(numberUserId);

        if (!posts) {
            throw new PostNotFoundError("Posts not found.");
        }

        return posts;
    }
}
