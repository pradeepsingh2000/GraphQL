import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    description: {
      type: String,
    },
    paymentType: {
      enum: ["cash", "card", "online"],
      type: String,
    },
    category: {
      enum: ["saving" , "expense" , "investment"],
      type: String
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

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
