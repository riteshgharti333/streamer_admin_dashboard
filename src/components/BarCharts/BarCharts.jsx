import "./BarCharts.scss";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { months } from "../../datatablesource";

export default function BarCharts({ title }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      setIsLoading(true);
      try {
        const { subscriptionData } = await dispatch(
          getAllSubscriptionAsync()
        ).unwrap();
        setSubscriptionData(subscriptionData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchSubscriptionData();
  }, [dispatch]);

  const data = useMemo(() => {
    if (!subscriptionData.length) return [];

    const monthlyTotals = {};
    
    months.forEach((month) => {
      monthlyTotals[month] = {
        "Movies Subscription": 0,
        "Series Subscription": 0,
        "Movies + Series Subscription": 0,
      };
    });

    subscriptionData.forEach((subscription) => {
      const month = format(new Date(subscription.startDate), "MMMM");
      const planType = subscription.plan;
      const price = subscription.price;

      if (monthlyTotals[month]) {
        monthlyTotals[month][planType] += price;
      }
    });

    return months.map((month) => ({
      date: month,
      ...monthlyTotals[month],
    }));
  }, [subscriptionData]);

  return (
    <div className="barCharts">
      <p>{isLoading ? <Skeleton width={400} height={20} /> : title}</p>
      {error && <p className="error">{error}</p>}

      {isLoading ? (
        <Skeleton height={300} />
      ) : (
        <ResponsiveContainer width="100%" aspect={3 / 1}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Movies Subscription" fill="red" />
            <Bar dataKey="Series Subscription" fill="yellow" />
            <Bar dataKey="Movies + Series Subscription" fill="green" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
