import { Request, Response } from "express";
import { listMyPostsService } from "../../services/posts/list-my-posts-service";
import { PostNotFoundError } from "../../utils/errors/post-not-exists-error";

export async function listMyPostsController(req: Request, res: Response) {
    const { userId } = req;

    if (!userId) {
        return res.status(400).json({ message: "User not found!" });
    }

    try {
        const posts = await listMyPostsService(userId);

        return res.status(200).json({ posts });
    } catch (error) {
        if (error instanceof PostNotFoundError) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({
            message: "Não foi possível listar os seus posts, tente novamente.",
        });
    }
}
