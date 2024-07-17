import { Router } from "express";

export const routes = Router();

import { upload } from "./utils/multer/multer-config";

import { isAuthenticate } from "./middlewares/isAuthenticate";

import { CreateNewUserController } from "./controllers/users/create-new-user-controller";
import { AuthenticateUser } from "./controllers/users/authenticate-controller";
import { UpdateUserController } from "./controllers/users/update-user-controller";
import { GetProfileController } from "./controllers/users/get-profile-controller";
import { UploadFileController } from "./controllers/users/upload-file-controller";

import { CreateNewPostController } from "./controllers/posts/create-new-post-controller";
import { DeletePostController } from "./controllers/posts/delete-post-controller";
import { UpdatePostController } from "./controllers/posts/update-post-controller";
import { AddLikePostController } from "./controllers/posts/add-like-post-controller";
import { ListMyPostsController } from "./controllers/posts/list-my-posts-controller";

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
routes.patch("/post/:id", isAuthenticate, new UpdatePostController().update);
routes.post("/add-like/:id", isAuthenticate, new AddLikePostController().add);
routes.get("/posts/me", isAuthenticate, new ListMyPostsController().list);
