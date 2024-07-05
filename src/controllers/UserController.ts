import { Request, Response } from "express";

import { UserServices } from "../services/UserServices";

import { UserAlreadyExistsError } from "../utils/errors/user-already-exists";
import { DataIsMandatoryError } from "../utils/errors/data-is-mandatory-errors";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, userName, password } = req.body;

        try {
            const userService = new UserServices();

            const newUser = await userService.createNewUser({
                name,
                email,
                userName,
                password,
            });

            return res.status(201).json(newUser);
        } catch (error: any) {
            if (error instanceof UserAlreadyExistsError) {
                return res.status(422).json({ message: error.message });
            }

            if (error instanceof DataIsMandatoryError) {
                return res.status(400).json({ message: error.message });
            }
        }
    }
}
