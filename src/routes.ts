import { Router } from "express";

export const routes = Router();

import { CreateNewUserController } from "./controllers/create-new-user-controller";

routes.post("/user", new CreateNewUserController().create);
