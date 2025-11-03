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

export const updateUser = async (req, res, next) => {
  try {
    if (!req.body.name && !req.body.email && !req.body.password) {
      const error = new Error("Nothing to modify");
      error.statusCode = 400;
      throw error;
    }

    // A user can only modify their own account info
    if (req.user._id.toString() !== req.params.id) {
      const error = new Error(
        "You are not authorized to update this user account"
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

    // Only allow specific fields to be updated
    const updates = {};

    // Handle name update
    if (req.body.name !== undefined) {
      if (typeof req.body.name !== "string" || req.body.name.length < 2) {
        const error = new Error("Name must be at least 2 characters long");
        error.statusCode = 400;
        throw error;
      }
      updates.name = req.body.name;
    }

    // Handle email update
    if (req.body.email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
      }
      // Check if email is already taken by another user
      const existingUser = await User.findOne({
        email: req.body.email,
        _id: { $ne: user._id }, // exclude current user
      });
      if (existingUser) {
        const error = new Error("Email is already in use");
        error.statusCode = 409;
        throw error;
      }
      updates.email = req.body.email;
    }

    // Handle password update
    if (req.body.password !== undefined) {
      if (
        typeof req.body.password !== "string" ||
        req.body.password.length < 6
      ) {
        const error = new Error("Password must be at least 6 characters long");
        error.statusCode = 400;
        throw error;
      }
      const bcrypt = await import("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    // Update the user with validated fields
    Object.assign(user, updates);
    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "User account updated successfully",
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

// How to use the updateUser controller in the client-side:

// // Update name only
// fetch('/api/v1/users/:id', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_TOKEN'
//   },
//   body: JSON.stringify({
//     name: 'New Name'
//   })
// });

// // Update email
// fetch('/api/v1/users/:id', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_TOKEN'
//   },
//   body: JSON.stringify({
//     email: 'newemail@example.com'
//   })
// });

// // Update password
// fetch('/api/v1/users/:id', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_TOKEN'
//   },
//   body: JSON.stringify({
//     password: 'newPassword123'
//   })
// });
