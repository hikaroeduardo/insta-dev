import { Router } from "express";

export const routes = Router();

import { CreateNewUserController } from "./controllers/create-new-user-controller";
import { AuthenticateUser } from "./controllers/authenticate-controller";
import { UpdateUserController } from "./controllers/update-user-controller";

import { isAuthenticate } from "./middlewares/isAuthenticate";

routes.post("/user", new CreateNewUserController().create);
routes.post("/login", new AuthenticateUser().authenticate);

routes.patch("/user", isAuthenticate, new UpdateUserController().update);
