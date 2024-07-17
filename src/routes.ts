import { Router } from "express";

export const routes = Router();

import { upload } from "./utils/multer/multer-config";

import { isAuthenticate } from "./middlewares/isAuthenticate";

import { createNewUserController } from "./controllers/users/create-new-user-controller";
import { loginController } from "./controllers/users/login-controller";
import { updateUserController } from "./controllers/users/update-user-controller";
import { getProfileController } from "./controllers/users/get-profile-controller";
import { uploadFileController } from "./controllers/users/upload-file-controller";

import { createNewPostController } from "./controllers/posts/create-new-post-controller";
import { deletePostController } from "./controllers/posts/delete-post-controller";
import { updatePostController } from "./controllers/posts/update-post-controller";
import { addLikePostController } from "./controllers/posts/add-like-post-controller";
import { listMyPostsController } from "./controllers/posts/list-my-posts-controller";

routes.post("/user", createNewUserController);
routes.post("/login", loginController);

routes.get("/profile", isAuthenticate, getProfileController);
routes.patch("/user", isAuthenticate, updateUserController);
routes.post("/upload", upload.single("image"), uploadFileController);

routes.post("/post", isAuthenticate, createNewPostController);
routes.delete("/post/:id", isAuthenticate, deletePostController);
routes.patch("/post/:id", isAuthenticate, updatePostController);
routes.post("/add-like/:id", isAuthenticate, addLikePostController);
routes.get("/posts/me", isAuthenticate, listMyPostsController);
