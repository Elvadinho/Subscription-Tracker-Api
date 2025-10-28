import { Router } from "express";

const userRouter = Router();

// GET /users/:id -> Get user by id, it's a dynamic parameter

userRouter.get("/", (req, res) => res.send({ title: "GET all Users " }));

userRouter.get("/:id", (req, res) => res.send({ title: "GET user details " }));

userRouter.post("/", (req, res) => res.send({ title: "CREATE a user " }));

userRouter.put("/:id", (req, res) => res.send({ title: "Update a user " }));

userRouter.delete("/:id", (req, res) => res.send({ title: "Delete a user " }));

export default userRouter;
