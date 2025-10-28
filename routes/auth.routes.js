import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", (req, res) => res.send({ title: "Sign up " }));
authRouter.post("/login", (req, res) => res.send({ title: "Log in " }));

export default authRouter;
