import { Router } from "express";

export const routes = Router();

import { UserController } from "./controllers/UserController";

routes.post("/user", new UserController().create);
