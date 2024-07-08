import { Router } from "express";

export const routes = Router();

import { CreateNewUserController } from "./controllers/create-new-user-controller";
import { AuthenticateUser } from "./controllers/authenticate-controller";

routes.post("/user", new CreateNewUserController().create);
routes.post("/login", new AuthenticateUser().authenticate);
