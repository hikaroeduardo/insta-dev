import { hash } from "bcrypt";

import { userModel } from "../../models/UserModels";

import { UserAlreadyExistsError } from "../../utils/errors/user-already-exists-error";
import { DataIsMandatoryError } from "../../utils/errors/data-is-mandatory-error";

interface CreateNewUserProps {
    name: string;
    email: string;
    userName: string;
    password: string;
}

export class CreateNewUserService {
    async createNewUser({
        name,
        email,
        userName,
        password,
    }: CreateNewUserProps) {
        if (!name || !email || !userName || !password) {
            throw new DataIsMandatoryError("Todos os dados são obrigatórios.");
        }

        const userAlreadyExists = await userModel.findByEmail(email);

        if (userAlreadyExists) {
            throw new UserAlreadyExistsError(
                "Este e-mail ja está cadastrado em nosso sistema."
            );
        }

        const password_hash = await hash(password, 6);

        const newUser = await userModel.createUser({
            name,
            email,
            userName,
            password_hash,
        });

        return newUser;
    }
}
