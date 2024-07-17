import { Request, Response } from "express";

import { createNewUserService } from "../../services/users/create-new-user-service";

import { UserAlreadyExistsError } from "../../utils/errors/user-already-exists-error";
import { DataIsMandatoryError } from "../../utils/errors/data-is-mandatory-error";

export async function createNewUserController(req: Request, res: Response) {
    const { name, email, userName, password } = req.body;

    try {
        await createNewUserService({
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
