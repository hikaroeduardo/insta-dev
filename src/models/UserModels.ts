import { prisma } from "../utils/prisma-client";

interface createUserProps {
    name: string;
    userName: string;
    email: string;
    password_hash: string;
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
}

export const userModel = new UserModel()