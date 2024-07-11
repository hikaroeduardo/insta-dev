import { prisma } from "../utils/prisma-client";

interface createUserProps {
    name: string;
    userName: string;
    email: string;
    password_hash: string;
}

interface UpdateUserProps {
    name: string;
    gender: string;
    avatar: string;
    bio: string;
    userId: string;
}

class UserModel {
    async findByEmail(email: string) {
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async findByUserName(userName: string) {
        const user = await prisma.users.findUnique({
            where: {
                user_name: userName,
            },
        });

        return user;
    }

    async findByUserId(userId: number) {
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        return user;
    }

    async createUser({
        name,
        userName,
        email,
        password_hash,
    }: createUserProps) {
        const createdNewUser = await prisma.users.create({
            data: {
                name,
                user_name: userName,
                email,
                password_hash,
            },
        });

        return createdNewUser;
    }

    async UpdateUser({ name, gender, avatar, bio, userId }: UpdateUserProps) {
        await prisma.users.update({
            where: {
                id: Number(userId),
            },
            data: {
                name,
                gender,
                avatar,
                bio,
            },
        });
    }
}

export const userModel = new UserModel();
