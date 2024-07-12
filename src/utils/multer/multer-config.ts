import multer from "multer";
import { v4 } from "uuid";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const name = `${v4()} - ${file.originalname}`;

        cb(null, name);
    },
});

export const upload = multer({ storage: storage });
