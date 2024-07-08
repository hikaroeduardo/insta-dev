import { Request, Response } from "express";
import { AuthenticateService } from "../services/authenticate-service";

import { InvalidCredencials } from "../utils/errors/user-not-exists-error";
import { DataIsMandatoryError } from "../utils/errors/data-is-mandatory-error";

export class AuthenticateUser {
    async authenticate(req: Request, res: Response) {
        const { userName, password } = req.body;

        try {
            const authenticateService = new AuthenticateService();

            const token = await authenticateService.authenticateUser({
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
}
