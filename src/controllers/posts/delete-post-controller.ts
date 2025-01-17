import { Request, Response } from "express";

import { deletePostService } from "../../services/posts/delete-post-service";

import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";
import { Unauthorized } from "../../utils/errors/unauthorized-error";

export async function deletePostController(req: Request, res: Response) {
    const { userId } = req;

    const { id } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User not found!" });
    }

    try {
        const postDeleted = await deletePostService(id, userId);

        return res.json({
            message: `Post de ID ${postDeleted.id} deletado com sucesso!`,
        });
    } catch (error) {
        if (error instanceof PostNotFoundError) {
            return res.status(404).json({ message: error.message });
        }

        if (error instanceof Unauthorized) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(500).json({
            message: "Não foi possível deletar o post, tente novamente.",
        });
    }
}
