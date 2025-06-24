import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, Object } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  monthlyBudget: { type: String, default: "0" },
});

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; // months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const newDate = year + "/" + month + "/" + day;

const ExpenseSchema = new Schema({
  expenseTitle: { type: String, required: true },
  amount: { type: Number, require: true },
  user: { type: Schema.ObjectId, required: true },
  note: { type: String },
  date: { type: String, default: newDate },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
const Expense = mongoose.model("Expense", ExpenseSchema);

export { User, Expense };
