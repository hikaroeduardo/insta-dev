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

    async findByPostId(id: number) {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        return post;
    }

    async findPostByAuthorId(userId: number) {
        const posts = await prisma.post.findMany({
            where: {
                author_id: userId
            },
            select: {
                id: true,
                image: true,
                description: true,
                number_likes: true
            }
        });

        return posts;
    }
}

export const postModel = new PostModel();
