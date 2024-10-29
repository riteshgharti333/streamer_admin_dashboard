import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns"; // You are using this library
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const monthsOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = ({ aspect, title, dataArray = [], isLoading, sHeight }) => {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const array = dataArray;

        const monthMap = new Map();

        // Ensure dataArray is an array before proceeding
        if (Array.isArray(array)) {
          dataArray.forEach((subscription) => {
            const date = new Date(subscription.startDate);
            const monthName = format(date, "MMMM"); // Get full month name (e.g., 'January')

            // If the month is not already in the map, initialize it
            if (!monthMap.has(monthName)) {
              monthMap.set(monthName, { Total: 0, Subscriptions: 0 });
            }

            // Get current month data from the map
            const monthData = monthMap.get(monthName);

            // Increment the total price and subscription count
            const price = parseFloat(subscription.price) || 0;
            monthData.Total += price;
            monthData.Subscriptions += 1; // Count each subscription

            // Update the map with the new data
            monthMap.set(monthName, monthData);
          });

          // Convert the map to an array suitable for recharts
          let formattedData = Array.from(monthMap, ([name, values]) => ({
            name,
            ...values,
          }));

          // Ensure all months are present in the data
          monthsOrder.forEach((month) => {
            if (!formattedData.some((data) => data.name === month)) {
              formattedData.push({ name: month, Total: 0, Subscriptions: 0 });
            }
          });

          // Sort the data by the month order
          formattedData.sort((a, b) => {
            return monthsOrder.indexOf(a.name) - monthsOrder.indexOf(b.name);
          });

          // Update the state with the formatted data
          setChartData(formattedData);
        } else {
          console.error("dataArray is not an array:", dataArray);
        }
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, [dispatch, dataArray]);

  return (
    <div className="chart">
      {isLoading ? (
        <Skeleton width={200} />
      ) : (
        <span className="title">{title}</span>
      )}

      {isLoading ? (
        <Skeleton height={sHeight} />
      ) : (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={chartData} // Use the dynamically fetched data here
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="subscriptions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Force displaying all months */}
            <XAxis
              dataKey="name"
              stroke="gray"
              interval={0}
              tick={{ angle: -45, textAnchor: "end" }}
              // Ensures all months are displayed
              height={70}
            />

            <YAxis />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />

            {/* Area for Total Subscription Price */}
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />

            {/* Area for Subscriptions Count */}
            <Area
              type="monotone"
              dataKey="Subscriptions"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#subscriptions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
