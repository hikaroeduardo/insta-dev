import { Request, Response } from "express";

import { updateUserService } from "../../services/users/update-user-service";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

export async function updateUserController(req: Request, res: Response) {
    const { userId } = req;
    const { name, gender, avatar, bio } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User not found!" });
    }

    try {
        await updateUserService({
            name,
            gender,
            avatar,
            bio,
            userId,
        });

        return res.status(200).json({ message: "Data updated successfully." });
    } catch (error: any) {
        if (error instanceof UserNotFoundError) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(503).json({ message: error.message });
    }
}
