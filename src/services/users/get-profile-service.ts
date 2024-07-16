import { userModel } from "../../models/UserModels";
import { UserNotFoundError } from "../../utils/errors/user-not-found-error";

export class GetProfileService {
    async getUserProfile(userId: number) {
        const user = await userModel.findByUserId(userId);

        if (!user) {
            throw new UserNotFoundError("User not found.");
        }

        return {
            name: user.name,
            user_name: user.user_name,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio,
            gender: user.gender,
        };
    }
}
