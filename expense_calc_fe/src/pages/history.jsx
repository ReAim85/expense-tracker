import { atom, useAtom } from "jotai";
import { PieData } from "./store.js";
import { useNavigate } from "react-router-dom";

const openDropdownAtom = atom({});
const groupByDate = (expenses) => {
  return Object.groupBy(expenses, (item) => item.date);
};

export const History = () => {
  const navigate = useNavigate();
  const [expenses] = useAtom(PieData);
  const [openDropdowns, setOpenDropdowns] = useAtom(openDropdownAtom);

  const groupedExpenses = groupByDate(expenses);

  const toggleDropdown = (date) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div className="">
      <button
        className="rounded px-5 pl-3 py-2 m-5 cursor-pointer border border-indigo-700 text-indigo-700 font-bold"
        onClick={() => navigate("/")}
      >
        {"<--"} BACK
      </button>
      <div className="p-4 max-w-md mx-auto h-screen">
        <h2 className="text-xl font-bold text-center mb-4">Expense History</h2>
        {Object.entries(groupedExpenses).map(([date, items]) => (
          <div key={date} className="mb-4 border rounded shadow">
            <button
              onClick={() => toggleDropdown(date)}
              className="w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 font-semibold"
            >
              {openDropdowns[date] ? "▼" : "▶"} {date}
            </button>

            {openDropdowns[date] && (
              <ul className="bg-white px-4 py-2 space-y-2">
                {items.map((expense, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    • {expense.ExpenseName}: ₹{expense.Amount}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
