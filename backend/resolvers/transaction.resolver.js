import Transaction from "../Models/transaction.model.js";
import mongoose from "mongoose";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorise");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        console.log("Error in get User all Transaction", err);
        throw new Error("Error getting transaction");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const data = await Transaction.findById(transactionId);
        return data;
      } catch (err) {
        console.log("Error to get transation", err);
        throw new Error("Error getting transaction");
      }
    },
    dashbord: async (_,__,context) => {
      try {
        const userId = await context.getUser()._id
       let user=  new  mongoose.Types.ObjectId(userId);
        const data = await Transaction.aggregate([
          {
            $match: {
                userId: user,
            },
          },
          {
            $group: {
              _id: "$category",

              totalAmount: { $sum: "$amount" },
            },
          },
          {
            $project: {
              category: "$_id",
              totalAmount: 1,
              _id: 0,
            },
          },
        ]);
        return data

      } catch (error) {
        console.log(error)
        throw new Error("Error getting dashbord");
      }
    },
  },
  Mutation: {
    // createTransaction : async (parent,args,context)

    createTransaction: async (_, { input }, context) => {
      try {
        const createTrasaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await createTrasaction.save();
        return createTrasaction;
      } catch (err) {
        console.log("Error in Create transaction", err);
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updateTransaction;
      } catch (err) {
        console.log("Error in Update transaction", err);
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const data = await Transaction.findByIdAndDelete(transactionId);
        return data;
      } catch (err) {
        console.log("Error in delete transaction", err);
      }
    },
  },
};
export default transactionResolver;
