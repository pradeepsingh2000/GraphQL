import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    description: {
      type: String,
    },
    paymentType: {
      enum: ["CASH", "CARD", "ONLINE"],
      type: String,
    },
    category: {
      type: String,
      enum: ["saving" | "expense"| "investment"]
    },
    location: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
