import { atom, useAtom } from "jotai";
import { useRef } from "react";

const Budget = atom("");
const MoreBudget = atom(false);
const DailyExpense = atom({
  expepnseTitle: "",
  amount: "",
});

export const Expense = () => {
  const monthlyBudgetRef = useRef();
  const totalExpenseRef = useRef();
  const budgetLeftRef = useRef();
  const [monthlyBudget, setMonthlyBudget] = useAtom(Budget);
  const [moreBudget, setMoreBudget] = useAtom(MoreBudget);
  const [dailyExpense, setDailyExpense] = useAtom(DailyExpense);

  const MonthlyBudgetBtnHandler = () => {
    if (moreBudget) {
      monthlyBudgetRef.current += parseInt(monthlyBudget);
      budgetLeftRef.current += parseInt(monthlyBudget);
      setMonthlyBudget("");
      return monthlyBudgetRef.current;
    }
    monthlyBudgetRef.current = parseInt(monthlyBudget);
    budgetLeftRef.current = parseInt(monthlyBudget);
    setMoreBudget(true);
    setMonthlyBudget("");
  };

  console.log("before btn handle daily expense", dailyExpense);

  const AddExpenseBtnHandler = () => {
    if (!totalExpenseRef.current == "") {
      budgetLeftRef.current -= dailyExpense.amount;
      totalExpenseRef.current += parseInt(dailyExpense.amount);
      setDailyExpense({
        expepnseTitle: "",
        amount: "",
      });
      return totalExpenseRef.current;
    }

    totalExpenseRef.current = parseInt(dailyExpense.amount);
    budgetLeftRef.current -= totalExpenseRef.current;
    setDailyExpense({
      expepnseTitle: "",
      amount: "",
    });
  };
  console.log("after btn handle daily expense", dailyExpense);

  return (
    <div className="bg-sky-200 grid grid-cols-4 grid-rows-20 h-screen p-10 gap-5">
      <div className="bg-gray-100 rounded-xl overflow-auto row-start-2 col-span-1 row-end-8 p-5 shadow-md">
        <div className="text-2xl font-bold text-start py-2">
          {!moreBudget ? "Add Monthly Budget" : "Add More Budget"}
        </div>
        <hr />
        <p className="text-gray-800 text-lg font-medium py-2">Budget:</p>
        <input
          type="text"
          name="budget"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
          className="bg-white text-2xl container mx-auto rounded-md px-2 py-1 mb-2 outline-none ring ring-gray-400/50"
          required
        />
        <br />
        <button
          className="bg-blue-500 container mx-auto mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1"
          onClick={MonthlyBudgetBtnHandler}
          disabled={monthlyBudget.length === 0}
        >
          Add Budget
        </button>
      </div>
      <div className="rounded-xl col-start-2 col-span-3 row-start-1 row-span-2 row-end-21 bg-gray-100 shadow-xl py-8 px-10">
        <div className="grid grid-cols-8 text-center">
          <span className="text-blue-700 col-start-1 col-end-3  text-xl font-medium bg-blue-300 py-3 px-2 rounded">
            Total Budget: {monthlyBudgetRef.current}
          </span>
          <span className="text-blue-700 text-xl col-start-4 col-end-6 font-medium bg-blue-300 py-3 px-2 rounded">
            Total expense: {totalExpenseRef.current}
          </span>
          <span className="text-blue-700 text-xl col-start-7 col-end-9 font-medium bg-blue-300 py-3 px-2 rounded">
            Budget Left: {budgetLeftRef.current}
          </span>
        </div>
        <br />
        <hr />
        <div className="text-3xl pt-3.5">Expense History:</div>
        <br />
        <hr />
      </div>
      <div className="col-span-1 row-start-8 row-end-16 bg-gray-100 rounded-xl shadow-md p-5 overflow-auto">
        <div className="text-2xl font-bold text-start py-2">Add Expense</div>
        <hr />
        <p className="text-gray-800 text-lg font-medium py-2">Expense Title:</p>
        <input
          type="text"
          name="expepnseTitle"
          value={dailyExpense.expepnseTitle}
          onChange={(e) =>
            setDailyExpense((prevVal) => ({
              ...prevVal,
              [e.target.name]: e.target.value,
            }))
          }
          className="bg-white text-2xl container mx-auto rounded-md px-2 py-1 mb-2 outline-none ring ring-gray-400/50"
        />
        <br />
        <p className="text-gray-800 text-lg font-medium py-2">Amount:</p>
        <input
          type="text"
          name="amount"
          value={dailyExpense.amount}
          onChange={(e) =>
            setDailyExpense((prevVal) => ({
              ...prevVal,
              [e.target.name]: e.target.value,
            }))
          }
          className="bg-white text-2xl container mx-auto rounded-md px-2 py-1 mb-2 outline-none ring ring-gray-400/50"
        />
        <br />
        <button
          className="bg-blue-500 container mx-auto mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1"
          onClick={AddExpenseBtnHandler}
        >
          Add Budget
        </button>
      </div>
    </div>
  );
};
