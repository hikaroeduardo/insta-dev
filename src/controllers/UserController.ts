import { Request, Response } from "express";
import { prisma } from "../utils/prisma-client";

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, userName, password } = req.body;

        if (!name || !email || !userName || !password) {
            return res
                .status(400)
                .json({ messageError: "Todos os dados são obrigatórios." });
        }

        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            return res.status(422).json({
                message: "Este e-mail ja está cadastrado em nosso sistema.",
            });
        }

        const createdNewUser = await prisma.users.create({
            data: {
                name,
                user_name: userName,
                email,
                password_hash: password,
            },
        });

        res.status(201).json(createdNewUser);
    }
}
