import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const { sign } = jwt;

import { UserMoldel } from "../models/UserModels";

import { DataIsMandatoryError } from "../utils/errors/data-is-mandatory-error";
import { InvalidCredencials } from "../utils/errors/user-not-exists-error";

interface AuthenticateServiceProps {
    userName: string;
    password: string;
}

export class AuthenticateService {
    async authenticateUser({ userName, password }: AuthenticateServiceProps) {
        if (!userName || !password) {
            throw new DataIsMandatoryError("Todos os dados são obrigatórios.");
        }

        const userMoldel = new UserMoldel();

        const user = await userMoldel.findByUserName(userName);

        if (!user) {
            throw new InvalidCredencials("Credenciais incorretas.");
        }

        const isThePasswordCorrect = await compare(
            password,
            user.password_hash
        );

        if (!isThePasswordCorrect) {
            throw new InvalidCredencials("Credenciais incorretas.");
        }

        const token = sign(
            { userName: user.user_name, email: user.email },
            process.env.SECRET_KEY as string,
            { expiresIn: '1d', subject: user.id.toString() }
        );

        return token;
    }
}
