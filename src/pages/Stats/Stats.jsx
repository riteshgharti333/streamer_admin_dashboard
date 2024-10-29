import { useEffect, useState } from "react";
import BarCharts from "../../components/BarCharts/BarCharts";
import Chart from "../../components/chart/Chart";
import "./Stats.scss";
import { useDispatch } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";

const Stats = () => {
  const dispatch = useDispatch();

  const [subData, setSubData] = useState({
    moviesData: "",
    seriesData: "",
    MSData: "",
    totalData: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      setIsLoading(true);

      try {
        const { subscriptionData } = await dispatch(
          getAllSubscriptionAsync(),
        ).unwrap();

        //movies
        const moviesData = subscriptionData.filter((item) => {
          return item.priceId === "price_1Pt0FASGN61YzC6ZVsLPr87B";
        });

        //series
        const seriesData = subscriptionData.filter((item) => {
          return item.priceId === "price_1Pt0D9SGN61YzC6Za7Por7Fy";
        });

        //movies + series
        const MSData = subscriptionData.filter((item) => {
          return item.priceId === "price_1Pt0G5SGN61YzC6ZzRoweliJ";
        });

        setSubData({
          moviesData: moviesData,
          seriesData: seriesData,
          MSData: MSData,
          totalData: subscriptionData,
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    };
    fetchSubscriptionData();
  }, [dispatch]);

  return (
    <div className="stats">
      <div className="top">
        <div className="left">
          <Chart
            title="Movies (Revenue)"
            aspect={2 / 1}
            dataArray={subData.moviesData}
            isLoading={isLoading}
            sHeight={200}
          />
        </div>

        <div className="right">
          <Chart
            title="Series (Revenue)"
            aspect={2 / 1}
            dataArray={subData.seriesData}
            isLoading={isLoading}
            sHeight={200}
          />
        </div>

        <div className="right">
          <Chart
            title="Movies +  Series (Revenue)"
            aspect={2 / 1}
            dataArray={subData.MSData}
            isLoading={isLoading}
            sHeight={200}
          />
        </div>
      </div>

      <div className="center">
        <Chart
          title="All Subscriptions (Revenue)"
          aspect={3 / 1}
          dataArray={subData.totalData}
          isLoading={isLoading}
          sHeight={300}
        />
      </div>

      <div className="bottom">
        <BarCharts title="Subscriptions Revenue" />
      </div>
    </div>
  );
};

export default Stats;
