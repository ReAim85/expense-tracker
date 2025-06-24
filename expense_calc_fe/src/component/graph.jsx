import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { useAtom } from "jotai";
import { PieData } from "../pages/store.js";
import transformData from "./transform.js";

function Graph() {
  const [pieData] = useAtom(PieData);
  const data = transformData(pieData);
  return (
    <>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id="fadeBlue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2196F3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2196F3" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        width={1500}
        height={500}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryAxis
          fixLabelOverlap
          tickFormat={(t) => `${t.getDate()}/${t.getMonth() + 1}`}
        />
        <VictoryAxis dependentAxis />
        <VictoryArea
          data={data}
          interpolation={"monotoneX"}
          labels={({ datum }) => `₹${datum.y}`}
          labelComponent={<VictoryTooltip />}
          style={{
            data: { fill: "url(#fadeBlue)", stroke: "#2b6cb0", strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    </>
  );
}

export default Graph;
