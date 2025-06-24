import { useAtom } from "jotai";
import { useEffect } from "react";
import axios from "axios";
import { BE_URL } from "../config.js";
import {
  BudgetAtom,
  BudgetLeftAtom,
  TotalExpenseAtom,
  ShowExpenseAtom,
  DailyExpenseAtom,
  MonthlyBudgetInputAtom,
  Test,
  TodayExpense,
} from "./store.js";
import { useNavigate } from "react-router-dom";

export const Expense = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useAtom(BudgetAtom);
  const [budgetLeft, setBudgetLeft] = useAtom(BudgetLeftAtom);
  const [totalExpense, setTotalExpense] = useAtom(TotalExpenseAtom);
  const [todayExpense, setTodayExpense] = useAtom(TodayExpense);
  const [showExpense, setShowExpense] = useAtom(ShowExpenseAtom);
  const [test, setTest] = useAtom(Test);
  const [dailyExpense, setDailyExpense] = useAtom(DailyExpenseAtom);
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useAtom(
    MonthlyBudgetInputAtom
  );

  const fetchExpenses = async () => {
    try {
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1; // months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();

      const newDate1 = year + "/" + month + "/" + day;

      const res = await axios.get(`${BE_URL}/api/expense/me`, {
        withCredentials: true,
      });
      console.log("Fetched:", res.data.sortedData);
      setTest(res.data.sortedData.filter((d) => d.date === newDate1));
      setShowExpense(res.data.sortedData || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [budgetRes, expensesRes] = await Promise.all([
          axios.get(`${BE_URL}/api/auth/me`, { withCredentials: true }),
          axios.get(`${BE_URL}/api/expense/me`, { withCredentials: true }),
        ]);

        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();

        const newDate = year + "/" + month + "/" + day;

        const fetchedBudget = budgetRes.data.userInfo.monthlyBudget || 0;
        const expenses = expensesRes.data.sortedData || [];

        const test = expenses.filter((d) => d.date === newDate);

        setTest(test);
        console.log("today's expense", test);

        const total = expenses.reduce((sum, e) => sum + parseInt(e.Amount), 0);
        const today = test.reduce((sum, e) => sum + parseInt(e.Amount), 0);
        const left = fetchedBudget - total;

        setBudget(fetchedBudget);
        setTotalExpense(total);
        setTodayExpense(today);
        setBudgetLeft(left);
        setShowExpense(expenses);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    fetchInitialData();
  }, []);

  const handleAddBudget = async () => {
    const amount = parseInt(monthlyBudgetInput) + parseInt(budget);
    if (!amount || amount <= 0) return;

    try {
      const res = await axios.post(
        `${BE_URL}/api/auth/me`,
        { amount },
        { withCredentials: true }
      );

      console.log(res);

      const updatedBudget = amount;
      setBudget(updatedBudget);
      setBudgetLeft(budgetLeft + parseInt(monthlyBudgetInput));
      setMonthlyBudgetInput("");
    } catch (err) {
      console.error("Failed to update budget", err);
    }
  };

  const handleAddExpense = async () => {
    const amount = parseInt(dailyExpense.amount);
    if (!dailyExpense.expenseTitle || isNaN(amount) || amount <= 0) return;

    try {
      await axios.post(`${BE_URL}/api/expense`, dailyExpense, {
        withCredentials: true,
      });

      const updatedExpenses = [...showExpense, dailyExpense];
      setShowExpense(updatedExpenses);
      setTotalExpense(totalExpense + amount);
      setTodayExpense(todayExpense + amount);
      setBudgetLeft(budgetLeft - amount);
      setDailyExpense({ expenseTitle: "", amount: "" });
    } catch (err) {
      console.error("Add expense error", err);
    }
    await fetchExpenses();
  };

  return (
    <div className="min-h-screen bg-sky-200 p-4 sm:p-6 lg:p-10">
      <button
        className="rounded px-5 pl-3 py-2 mb-1 cursor-pointer border border-indigo-700 text-indigo-700 font-bold"
        onClick={() => navigate("/")}
      >
        {"<--"} BACK
      </button>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-300 rounded-lg p-4 text-center">
            <h3 className="text-blue-700 font-medium text-sm sm:text-base">
              Total Budget
            </h3>
            <p className="text-blue-700 text-xl sm:text-2xl font-bold">
              ₹{budget}
            </p>
          </div>
          <div className="bg-blue-300 rounded-lg p-4 text-center">
            <h3 className="text-blue-700 font-medium text-sm sm:text-base">
              Today's Expense
            </h3>
            <p className="text-blue-700 text-xl sm:text-2xl font-bold">
              ₹{todayExpense}
            </p>
          </div>
          <div className="bg-blue-300 rounded-lg p-4 text-center">
            <h3 className="text-blue-700 font-medium text-sm sm:text-base">
              Total Expense
            </h3>
            <p className="text-blue-700 text-xl sm:text-2xl font-bold">
              ₹{totalExpense}
            </p>
          </div>
          <div className="bg-blue-300 rounded-lg p-4 text-center">
            <h3 className="text-blue-700 font-medium text-sm sm:text-base">
              Budget Left
            </h3>
            <p className="text-blue-700 text-xl sm:text-2xl font-bold">
              ₹{budgetLeft}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-xl p-5 shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-start py-2">
              Update Budget
            </h2>
            <hr className="mb-4" />
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 text-lg font-medium mb-2">
                  Add Budget:
                </label>
                <input
                  type="text"
                  name="budget"
                  value={monthlyBudgetInput}
                  onChange={(e) => setMonthlyBudgetInput(e.target.value)}
                  className="w-full bg-white text-lg sm:text-xl rounded-md px-3 py-2 outline-none ring ring-gray-400/50 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleAddBudget}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
              >
                Add Budget
              </button>
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl p-5 shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-start py-2">
              Add Expense
            </h2>
            <hr className="mb-4" />
            <div className="space-y-4">
              <div>
                <label className="block text-gray-800 text-lg font-medium mb-2">
                  Expense Title:
                </label>
                <input
                  type="text"
                  name="expenseTitle"
                  value={dailyExpense.expenseTitle}
                  onChange={(e) =>
                    setDailyExpense((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="w-full bg-white text-lg sm:text-xl rounded-md px-3 py-2 outline-none ring ring-gray-400/50 focus:ring-blue-500"
                  placeholder="Enter expense title"
                />
              </div>
              <div>
                <label className="block text-gray-800 text-lg font-medium mb-2">
                  Amount:
                </label>
                <input
                  type="text"
                  name="amount"
                  value={dailyExpense.amount}
                  onChange={(e) =>
                    setDailyExpense((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="w-full bg-white text-lg sm:text-xl rounded-md px-3 py-2 outline-none ring ring-gray-400/50 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
                onClick={handleAddExpense}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Today's Expense History
          </h2>
          <hr className="mb-6" />
          {test.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No expenses recorded for today</p>
            </div>
          ) : (
            <>
              <div className="hidden sm:block">
                <div className="grid grid-cols-3 gap-4 text-xl font-bold mb-4 pb-2 border-b">
                  <div>Expense Name</div>
                  <div>Amount</div>
                  <div>Note</div>
                </div>
                <div className="space-y-3">
                  {test.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 text-lg py-2 border-b border-gray-200"
                    >
                      <div className="font-medium">
                        {index + 1}. {item.ExpenseName}
                      </div>
                      <div className="text-green-600 font-semibold">
                        ₹{item.Amount}
                      </div>
                      <div className="text-gray-500 italic">---</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sm:hidden space-y-4">
                {test.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {index + 1}. {item.ExpenseName}
                      </h3>
                      <span className="text-green-600 font-bold text-lg">
                        ₹{item.Amount}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">Note: ---</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
