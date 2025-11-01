import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  cancelSub,
  createSubscription,
  deleteSub,
  getAllSub,
  getSubDetails,
  getUserSubscriptions,
  updateSub,
} from "../controllers/subscribtion.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSub);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.get("/:id", authorize, getSubDetails);

subscriptionRouter.put("/:id", authorize, updateSub);

subscriptionRouter.delete("/:id", authorize, deleteSub);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", authorize, cancelSub);

export default subscriptionRouter;
