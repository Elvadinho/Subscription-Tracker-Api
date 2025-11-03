import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  deleteUserById,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET /users/:id -> Get user by id, it's a dynamic parameter

userRouter.get("/", getAllUsers); // Admin

userRouter.get("/:id", authorize, getUserById);

userRouter.put("/:id", (req, res) => res.send({ title: "Update a user " }));

userRouter.delete("/:id", authorize, deleteUserById);

export default userRouter;
