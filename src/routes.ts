import { Router } from "express";

export const routes = Router();

routes.get("/hello-word", (req, res) => {
    return res.json({ message: "first route" });
});
