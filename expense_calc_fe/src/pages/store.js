import { atom } from "jotai";

export const BudgetAtom = atom(0);
export const BudgetLeftAtom = atom(0);
export const TotalExpenseAtom = atom(0);
export const ShowExpenseAtom = atom([]);
export const DailyExpenseAtom = atom({ expenseTitle: "", amount: "" });
export const MonthlyBudgetInputAtom = atom("");
export const Test = atom([]);
export const TodayExpense = atom(0);
export const PieData = atom([]);
export const DataLoading = atom(true);
