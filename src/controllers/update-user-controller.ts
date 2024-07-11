import { Request, Response } from "express";

import { UpdateUserService } from "../services/update-user-service";
import { UserNotFoundError } from "../utils/errors/user-not-found-error";

export class UpdateUserController {
    async update(req: Request, res: Response) {
        const { userId } = req;
        const { name, gender, avatar } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User not found!" });
        }

        try {
            const updateUserService = new UpdateUserService();

            await updateUserService.updateUser({
                name,
                gender,
                avatar,
                userId,
            });

            return res
                .status(200)
                .json({ message: "Data updated successfully." });
        } catch (error: any) {
            if (error instanceof UserNotFoundError) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(503).json({ message: error.message });
        }
    }
}
