import { Request, Response } from "express";

export class UploadFileController {
    async upload(req: Request, res: Response) {
        try {
            const { file } = req;

            if (!file) {
                return res.status(400).json({ message: "No file uploaded." });
            }

            return res
                .status(200)
                .json({ message: "File upload successfully." });
        } catch (error) {
            return res.status(500).json({ message: "Error uploading file." });
        }
    }
}
