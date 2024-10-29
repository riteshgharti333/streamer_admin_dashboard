import Skeleton from "react-loading-skeleton";
import "./RevenuePieChart.scss";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RevenuePieChart = ({ data, isLoading }) => {
  return (
    <div className="revenuePieChartContainer">
      <div className="pieInfo">
        {isLoading ? (
          <>
            <Skeleton width={100} />
            <div className="plans">
              <Skeleton width={200} />
              <Skeleton width={200} />
              <Skeleton width={200} />
            </div>
          </>
        ) : (
          <>
            <p> Revenue Pie Chart</p>
            <div className="plans">
              {data?.map((d) => (
                <p key={d}>
                  <span className="dot"></span>
                  {d.name}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="pieChart">
        {isLoading ? (
          <Skeleton circle={true} width={150} height={150} />
        ) : (
          <ResponsiveContainer width="100%" aspect={1 / 0.7}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenuePieChart;
