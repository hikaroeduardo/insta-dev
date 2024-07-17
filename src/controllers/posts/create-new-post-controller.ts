import { Request, Response } from "express";

import { createNewPostService } from "../../services/posts/create-new-post-service";

import { DataIsMandatoryError } from "../../utils/errors/data-is-mandatory-error";

export async function createNewPostController(req: Request, res: Response) {
    const { userId } = req;
    const { image, description } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User not found!" });
    }

    try {
        const newPost = await createNewPostService({
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
            message: "Não foi possível criar um novo post, tente novamente.",
        });
    }
}
