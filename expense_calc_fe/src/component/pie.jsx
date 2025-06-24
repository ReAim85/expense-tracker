import axios from "axios";
import { useEffect } from "react";
import { VictoryPie } from "victory";
import { BE_URL } from "../config";
import { PieData, DataLoading } from "../pages/store.js";
import { useAtom } from "jotai";

const Pie = () => {
  const [data, setData] = useAtom(PieData);
  const [loading, setLoading] = useAtom(DataLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/expense/me`, {
          withCredentials: true,
        });
        setData(res.data.sortedData || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const top4Data =
    Array.isArray(data) && data.length
      ? [...data].sort((a, b) => b.Amount - a.Amount).slice(0, 4)
      : [];
  setLoading(false);

  const colors = ["#3B82F6", "#02336b", "#60A5FA", "#93C5FD"];

  const PieData2 = top4Data.map((item) => ({
    x: item.ExpenseName,
    y: item.Amount,
  }));

  if (!PieData2.length) {
    return (
      <div className="text-center text-gray-700 text-3xl font-bold">
        No data to display
      </div>
    );
  }

  return (
    <div className="items-center">
      <div className="text-center text-gray-700 text-3xl font-bold">
        Top 4 Expenses
      </div>
      <div className="flex">
        <div className="w-100">
          <VictoryPie
            data={PieData2}
            colorScale={colors}
            innerRadius={80}
            padAngle={3}
            labels={() => null}
            width={300}
            height={200}
          />
        </div>

        <div className="ml-6 space-y-4">
          {PieData2.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: colors[index] }}
              ></div>
              <div className="mt-2">
                <div className="text-lg font-bold text-gray-700">{item.x}</div>
                <div className="text-sm text-gray-500">
                  ₹{item.y.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pie;
