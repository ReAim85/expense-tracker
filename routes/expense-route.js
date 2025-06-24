import express from "express";
import { Expense } from "../databse/db.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.use(express.json());

router.post("/expense", protect, async (req, res) => {
  try {
    console.log(req.user);
    const { expenseTitle, amount, note } = req.body;

    console.log(req.body);

    await Expense.create({
      expenseTitle,
      amount,
      user: req.user,
      note,
    });

    res.status(200).json({
      message: "Expense Created Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "server side issue", err });
  }
});

router.get("/expense/me", protect, async (req, res) => {
  try {
    console.log(req.user);
    const data = await Expense.find({ user: req.user });
    const sortedData = data.map((d) => {
      return {
        ExpenseName: d.expenseTitle,
        Amount: d.amount,
        note: d.note,
        date: d.date,
      };
    });
    res.status(200).json({
      message: "here's your data",
      sortedData,
    });
  } catch (err) {
    res.json({
      message: "server side issue",
      err,
    });
  }
});

export default router;
