import { Request, Response } from "express";
import { updatePostService } from "../../services/posts/update-post-service";
import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";
import { Unauthorized } from "../../utils/errors/unauthorized-error";

export async function updatePostController(req: Request, res: Response) {
    const { userId } = req;

    const { id } = req.params;

    const { image, description } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User not found!" });
    }

    try {
        const postUpdated = await updatePostService({
            id,
            userId,
            image,
            description,
        });

        return res.status(200).json({ postUpdated });
    } catch (error) {
        if (error instanceof PostNotFoundError) {
            return res.status(404).json({ message: error.message });
        }

        if (error instanceof Unauthorized) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({
            message: "Não foi possível atualizar o post, tente novamente.",
        });
    }
}
