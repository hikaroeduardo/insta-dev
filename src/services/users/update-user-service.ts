import { userModel } from "../../models/UserModels";

import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

interface UpdateUserProps {
    name: string;
    gender: string;
    avatar: string;
    bio: string;
    userId: string;
}

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
