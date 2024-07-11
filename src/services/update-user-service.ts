import { userModel } from "../models/UserModels";

import { UserNotFoundError } from "../utils/errors/user-not-found-error";

interface UpdateUserProps {
    name: string;
    gender: string;
    avatar: string;
    bio: string;
    userId: string;
}

/*
    [] name
    [] gender
    [] avatar

    obs: O que não passar, vai continuar sendo o atual
*/

/*
[x] Pegar usuário pelo ID
    [x] Se não existir, retornar erro de não existe
[x] Pegar name, gender e avatar
*/

export class UpdateUserService {
    async updateUser({ name, gender, avatar, bio, userId }: UpdateUserProps) {
        const user = await userModel.findByUserId(Number(userId));

        if (!user) {
            throw new UserNotFoundError("User not found.");
        }

        try {
            await userModel.UpdateUser({
                name: name ?? user.name,
                gender: gender ?? user.gender,
                avatar: avatar ?? user.avatar,
                bio: bio ?? user.bio,
                userId,
            });
        } catch (error) {
            throw new Error("Error updating data.");
        }
    }
}
