import { UserMoldel } from "../models/UserModels";

import { UserAlreadyExistsError } from "../utils/errors/user-already-exists";
import { DataIsMandatoryError } from "../utils/errors/data-is-mandatory-errors";

interface CreateNewUserProps {
    name: string;
    email: string;
    userName: string;
    password: string;
}

export class UserServices {
    async createNewUser({
        name,
        email,
        userName,
        password,
    }: CreateNewUserProps) {
        if (!name || !email || !userName || !password) {
            throw new DataIsMandatoryError("Todos os dados são obrigatórios.");
        }

        const userMoldel = new UserMoldel();

        const userAlreadyExists = await userMoldel.findByEmail(email);

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError(
                "Este e-mail ja está cadastrado em nosso sistema."
            );
        }

        const newUser = await userMoldel.createUser({
            name,
            email,
            userName,
            password,
        });

        return newUser;
    }
}
