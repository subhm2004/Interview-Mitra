import mongoose from "mongoose";

const creditsTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["add", "deduct"],
    required: true,
  },
  amount: { type: Number, required: true },
  reason: String,
  balanceAfter: Number,
}, { timestamps: true });

const CreditsTransaction = mongoose.model("CreditsTransaction", creditsTransactionSchema);
export default CreditsTransaction;
