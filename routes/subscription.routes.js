import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  cancelSub,
  createSubscription,
  deleteSub,
  getSubDetails,
  getUserSubscriptions,
} from "../controllers/subscribtion.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all Subscriptions " })
);

subscriptionRouter.get("/:id", authorize, getSubDetails);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update Subscription " })
);

subscriptionRouter.delete("/:id", authorize, deleteSub);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", authorize, cancelSub);

// subscriptionRouter.put("/upcoming-renewals", (req, res) =>
//   res.send({ title: "Get upcoming renewals " })
// );

export default subscriptionRouter;
