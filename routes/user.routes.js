import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUser,
  promoteUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// GET /users/:id -> Get user by id, it's a dynamic parameter

userRouter.get("/", authorize, getAllUsers); // Admin

userRouter.get("/:id", authorize, getUserById);

userRouter.put("/:id", authorize, updateUser);

userRouter.post("/:id/promote", authorize, promoteUser);

userRouter.delete("/:id", authorize, deleteUserById);

export default userRouter;
