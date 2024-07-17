import { Request, Response } from "express";

import { getProfileService } from "../../services/users/get-profile-service";

import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

export async function getProfileController(req: Request, res: Response) {
    const { userId } = req;

    if (!userId) {
        return res.status(400).json({ message: "User not found!" });
    }

    try {
        const user = await getProfileService(Number(userId));

        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return res.status(400).json({ message: error.message });
        }
    }

    res.status(200).json("Ok");
}
