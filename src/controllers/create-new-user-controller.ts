import { Request, Response } from "express";

import { CreateNewUserService } from "../services/create-new-user-service";

import { UserAlreadyExistsError } from "../utils/errors/user-already-exists";
import { DataIsMandatoryError } from "../utils/errors/data-is-mandatory-errors";

export class CreateNewUserController {
    async create(req: Request, res: Response) {
        const { name, email, userName, password } = req.body;

        try {
            const userService = new CreateNewUserService();

            const newUser = await userService.createNewUser({
                name,
                email,
                userName,
                password,
            });

            return res.status(201).send();
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
