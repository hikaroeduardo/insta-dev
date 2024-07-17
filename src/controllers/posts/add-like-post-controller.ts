import { Request, Response } from "express";

import { addLikePostService } from "../../services/posts/add-like-post-service";

import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";

export async function addLikePostController(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const number_likes = await addLikePostService(id);

        return res.status(201).json(number_likes);
    } catch (error) {
        if (error instanceof PostNotFoundError) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({
            message:
                "Não foi possível adicionar o like no post, tente novamente.",
        });
    }
}
