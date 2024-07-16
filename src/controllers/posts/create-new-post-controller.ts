import { Request, Response } from "express";

import { CreateNewPostService } from "../../services/posts/create-new-post-service";

import { DataIsMandatoryError } from "../../utils/errors/data-is-mandatory-error";

export class CreateNewPostController {
    async create(req: Request, res: Response) {
        const { userId } = req;
        const { image, description } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User not found!" });
        }

        try {
            const createNewPostService = new CreateNewPostService();

            const newPost = await createNewPostService.createNewPost({
                userId,
                image,
                description,
            });

            return res.status(201).json({ newPost });
        } catch (error) {
            if (error instanceof DataIsMandatoryError) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({
                message:
                    "Não foi possível criar um novo post, tente novamente.",
            });
        }
    }
}
