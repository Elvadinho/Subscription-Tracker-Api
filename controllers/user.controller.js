import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    // Only allow user to get their own details
    if (req.user._id.toString() !== req.params.id) {
      const error = new Error(
        "You are not authorized to view this user's details"
      );
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    // A user can only delete his own account, not someone else account
    if (req.user._id.toString() !== req.params.id) {
      const error = new Error(
        "You are not authorized to delete another user account !!!"
      );
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "The user account was deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
