import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: [2, "Subscription name must be at least 2 characters long"],
      maxLength: [100, "Subscription name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "FCFA"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly", "weekly", "daily"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: ["entertainment", "education", "productivity", "other", "sport"],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "paused", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true;

          // Document validation (save): `this` is the document and startDate should be available
          if (this && this.startDate) {
            return new Date(value) > new Date(this.startDate);
          }

          // Query/update validation (when using runValidators: true with context: 'query')
          // `this` may be the query object; attempt to read startDate from the update payload
          if (this && typeof this.getUpdate === "function") {
            const upd = this.getUpdate() || {};
            const start = upd.startDate || (upd.$set && upd.$set.startDate);
            if (!start) return true;
            return new Date(value) > new Date(start);
          }

          // Fallback allow if we cannot determine startDate
          return true;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
