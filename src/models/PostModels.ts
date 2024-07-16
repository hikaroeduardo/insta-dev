import { prisma } from "../utils/prisma-client";

interface createUserProps {
    author_id: number;
    image: string;
    description: string;
}

class PostModel {
    async createPost({ author_id, image, description }: createUserProps) {
        const newPost = await prisma.post.create({
            data: {
                image,
                author_id,
                description,
            },
            select: {
                image: true,
                description: true,
            },
        });

        return newPost;
    }
}

export const postModel = new PostModel();
