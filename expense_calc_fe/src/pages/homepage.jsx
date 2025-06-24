import { useCookie } from "../assets/context";
import { Navbar } from "../component/navbar.jsx";
import Graph from "../component/graph.jsx";
import Pie from "../component/pie.jsx";
import { PieData } from "./store.js";
import { useAtom } from "jotai";
import YouSavedNothing from "../assets/images/YouSavedNothing.png";

export const Home = () => {
  const { user } = useCookie();
  const [data] = useAtom(PieData);

  function toSmallDate(date) {
    const [year, month, day] = date.split("/").map(Number);
    const tarik = new Date(year, month - 1, day);
    const formattedDate = tarik.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
    });
    return formattedDate;
  }

  const RecentData = data.slice(-4);

  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <Navbar user={user} />
      </div>
      <div className="w-full md:w-[calc(100vw-200px)] flex flex-col bg-blue-50 md:ml-8 rounded-4xl p-4 md:p-9 pt-1 mt-3 md:mr-5 mb-3 shadow-md space-y-2">
        <div className="flex flex-col md:flex-row justify-between mt-5 ml-0 md:ml-5 gap-4">
          <div className="text-2xl md:text-3xl font-bold">Dashboard</div>
          <div className="text-xl md:text-2xl font-bold text-gray-700">
            Hi {user}
          </div>
          <div className="w-full md:w-auto">
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9">
            <Graph />
          </div>
          <div className="shadow-md rounded-xl bg-white lg:col-span-3 lg:col-start-10">
            <div className="text-center font-bold text-xl md:text-2xl text-gray-700 p-4 md:pt-5">
              Money Saving Tips
            </div>
          </div>
          <div className="lg:col-span-4">
            <Pie />
          </div>
          <div className="flex shadow-md bg-white rounded-xl lg:col-span-4 lg:col-start-5">
            <div className="w-full m-auto p-4">
              <img
                src={YouSavedNothing}
                alt="YouSavedNothing"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="shadow-md bg-white rounded-xl lg:col-span-4 lg:col-start-9">
            <div className="text-center font-bold text-xl md:text-2xl text-gray-700 p-4 md:pt-5">
              Recent Expense
            </div>
            <div className="text-base md:text-xl font-semibold m-4 md:m-10 md:mt-5">
              {RecentData.map((item, index) => (
                <div key={index}>
                  <span>
                    • {toSmallDate(item.date)} - ₹{item.Amount} for{" "}
                    {item.ExpenseName}
                  </span>
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
