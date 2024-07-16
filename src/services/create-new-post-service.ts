import { postModel } from "../models/PostModels";

import { DataIsMandatoryError } from "../utils/errors/data-is-mandatory-error";

interface CreateNewPostProps {
    userId: string;
    image: string;
    description: string;
}

export class CreateNewPostService {
    async createNewPost({ userId, image, description }: CreateNewPostProps) {
        if (!image) {
            throw new DataIsMandatoryError("Imagem é obrigatória.");
        }

        const newPost = await postModel.createPost({
            author_id: Number(userId),
            description,
            image,
        });

        return newPost;
    }
}
