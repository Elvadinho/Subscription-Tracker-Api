import { Router } from "express";
import { getUserById, getAllUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET /users/:id -> Get user by id, it's a dynamic parameter

userRouter.get("/", getAllUsers); // Admin

userRouter.get("/:id", authorize, getUserById);

userRouter.post("/", (req, res) => res.send({ title: "CREATE a user " }));

userRouter.put("/:id", (req, res) => res.send({ title: "Update a user " }));

userRouter.delete("/:id", (req, res) => res.send({ title: "Delete a user " }));

export default userRouter;
