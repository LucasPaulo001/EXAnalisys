import mongoose, { Schema } from "mongoose";


const ExpenseSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    value: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    paymentMethod: {
        type: String
    }

}, { timestamps: true });

export default mongoose.model("Expense", ExpenseSchema);