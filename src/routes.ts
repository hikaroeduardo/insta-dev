import { Router } from "express";

export const routes = Router();

import { CreateNewUserController } from "./controllers/create-new-user-controller";
import { AuthenticateUser } from "./controllers/authenticate-controller";
import { UpdateUserController } from "./controllers/update-user-controller";

import { isAuthenticate } from "./middlewares/isAuthenticate";
import { GetProfileController } from "./controllers/get-profile-controller";
import { UploadFileController } from "./controllers/upload-file-controller";

import { upload } from "./utils/multer/multer-config";

routes.post("/user", new CreateNewUserController().create);
routes.post("/login", new AuthenticateUser().authenticate);

routes.get("/profile", isAuthenticate, new GetProfileController().getProfile);
routes.patch("/user", isAuthenticate, new UpdateUserController().update);
routes.post(
    "/upload",
    upload.single("image"),
    new UploadFileController().upload
);
