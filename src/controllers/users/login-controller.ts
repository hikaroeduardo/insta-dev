import { Request, Response } from "express";

import { loginService } from "../../services/users/login-service";

import { InvalidCredencials } from "../../utils/errors/user-not-exists-error";
import { DataIsMandatoryError } from "../../utils/errors/data-is-mandatory-error";

export async function loginController(req: Request, res: Response) {
    const { userName, password } = req.body;

    try {
        const token = await loginService({
            userName,
            password,
        });

        res.status(200).json({ token });
    } catch (error: any) {
        if (error instanceof DataIsMandatoryError) {
            return res.status(400).json({ messageError: error.message });
        }

        if (error instanceof InvalidCredencials) {
            return res.status(404).json({ messageError: error.message });
        }
    }
}
