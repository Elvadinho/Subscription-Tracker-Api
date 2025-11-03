import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Allow owner or admin to view a user's subscriptions
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      const error = new Error(
        "You are not authorized to view these subscriptions"
      );
      error.status = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const deleteSub = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    // Allow owner or admin to delete a subscription
    if (
      subscription.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      const error = new Error(
        "You are not authorized to delete this subscription"
      );
      error.status = 403;
      throw error;
    }

    await subscription.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const getSubDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    // A user can not see someone else subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You are not authorized to view this subscription"
      );
      error.status = 403;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSub = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You are not authorized to update this subscription"
      );
      error.status = 403;
      throw error;
    }

    const updates = { ...req.body };
    // Prevent changing ownership via update
    if (updates.user) delete updates.user;

    Object.assign(subscription, updates);
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllSub = async (req, res, next) => {
  try {
    // Only admins can list all subscriptions
    if (!req.user || !req.user.isAdmin) {
      const error = new Error(
        "You are not authorized to view all subscriptions"
      );
      error.status = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({});
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
