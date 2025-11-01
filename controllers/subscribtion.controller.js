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
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
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
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

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

export const cancelSub = async (req, res, next) => {
  const updates = {
    status: "cancelled",
  };
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSub = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllSub = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({});

    if (!subscriptions) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
