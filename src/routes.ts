import { Router } from "express";

export const routes = Router();

import { upload } from "./utils/multer/multer-config";

import { isAuthenticate } from "./middlewares/isAuthenticate";
import { CreateNewUserController } from "./controllers/create-new-user-controller";
import { AuthenticateUser } from "./controllers/authenticate-controller";
import { UpdateUserController } from "./controllers/update-user-controller";
import { GetProfileController } from "./controllers/get-profile-controller";

import { UploadFileController } from "./controllers/upload-file-controller";

import { CreateNewPostController } from "./controllers/create-new-post-controller";
import { DeletePostController } from "./controllers/delete-post-controller";

routes.post("/user", new CreateNewUserController().create);
routes.post("/login", new AuthenticateUser().authenticate);

routes.get("/profile", isAuthenticate, new GetProfileController().getProfile);
routes.patch("/user", isAuthenticate, new UpdateUserController().update);
routes.post(
    "/upload",
    upload.single("image"),
    new UploadFileController().upload
);

routes.post("/post", isAuthenticate, new CreateNewPostController().create);
routes.delete("/post/:id", isAuthenticate, new DeletePostController().delete);
