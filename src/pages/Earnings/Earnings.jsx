import { useEffect, useState } from "react";
import CountUp from "react-countup";
import RevenuePieChart from "../../components/RevenuePieChart/RevenuePieChart";
import "./Earnings.scss";
import EarningWidget from "../../components/EarningWidget/EarningWidget";
import { useDispatch } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { isWithinInterval, startOfMonth, subDays, subMonths } from "date-fns";
import { getAsyncUsers } from "../../redux/asyncThunks/userThunks";
import Skeleton from "react-loading-skeleton";

const Earnings = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [revenueData, setRevenueData] = useState({
    totalPrice: "",
    total_3_Months_Price: "",
    total_6_Months_Price: "",
    moviesTotalPrice: "",
    seriesTotalPrice: "",
    MSTotalPrice: "",
    totalMovesSubs: "",
    totalSeriesSubs: "",
    totalMSSubs: "",
    revenuePerUser: "",
    totalUsers: "",
  });

  // Reusable function to calculate total revenue for a given time range
  const calculateRevenue = (startDate, endDate, prices) => {
    const filteredSubscriptions = prices.filter((subscription) => {
      const subscriptionDate = new Date(subscription.startDate);
      return isWithinInterval(subscriptionDate, {
        start: startDate,
        end: endDate,
      });
    });

    const total = filteredSubscriptions.reduce((acc, subscription) => {
      const price = parseFloat(subscription.price);
      return !isNaN(price) ? acc + price : acc;
    }, 0);

    return total;
  };

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      setIsLoading(true);
      try {
        const res = await dispatch(getAllSubscriptionAsync()).unwrap();

        const { users } = await dispatch(getAsyncUsers()).unwrap();

        const totalUsers = users.length;

        const prices = res.subscriptionData || [];

        //movies
        const moviesData = prices.filter((item) => {
          return item.priceId === import.meta.env.VITE_MOVIE_KEY;
        });

        const totalMoviesPrice = moviesData.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalMoviesData = moviesData.length;

        //series
        const seriesData = prices.filter((item) => {
          return item.priceId === import.meta.env.VITE_SERIES_KEY;
        });

        const totalSeriesPrice = seriesData.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalSeriesData = seriesData.length;

        //movies + series
        const MSData = prices.filter((item) => {
          return item.priceId === import.meta.env.VITE_MOVIE_SERIES_KEY;
        });

        const totalMSPrice = MSData.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalMSData = MSData.length;

        //Last 3 month
        const currentDate = new Date();

        const startOfCurrentMonth = startOfMonth(currentDate);
        const endOfPreviousMonth = subDays(startOfCurrentMonth, 1);
        const startOfLastThreeMonths = startOfMonth(subMonths(currentDate, 3)); // First day of the month three months ago

        const endOfCurrentPeriod = endOfPreviousMonth; // Last day of the previous month
        const startOfCurrentPeriod = startOfLastThreeMonths; // First day of three months ago

        const last_3_months_Revenue = calculateRevenue(
          startOfCurrentPeriod,
          endOfCurrentPeriod,
          prices,
        );

        //Last 6 month

        const startOfCurrent_6Months = startOfMonth(currentDate);
        const endOfPrevious_6Months = subDays(startOfCurrent_6Months, 1);
        const startOfLast_6Months = startOfMonth(subMonths(currentDate, 6)); // First day of the month three months ago

        const endOfCurrent_6Period = endOfPrevious_6Months; // Last day of the previous month
        const startOfCurrent_6Period = startOfLast_6Months; // First day of three months ago

        const last_6_months_Revenue = calculateRevenue(
          startOfCurrent_6Period,
          endOfCurrent_6Period,
          prices,
        );

        // set_Total_6_Months_Price(last_6_months_Revenue);

        const totalPrice = prices.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalRevenuePerUser = Math.round(totalPrice / totalUsers);

        // Construct pie chart data
        // const pieChartData = [
        //   { name: "Movies Subscriptions", value: totalMoviesPrice },
        //   { name: "Series Subscriptions", value: totalSeriesPrice },
        //   { name: "Movies + Series Subscriptions", value: totalMSPrice },
        // ];

        setRevenueData({
          totalPrice,
          total_3_Months_Price: last_3_months_Revenue,
          total_6_Months_Price: last_6_months_Revenue,
          moviesTotalPrice: totalMoviesPrice,
          seriesTotalPrice: totalSeriesPrice,
          MSTotalPrice: totalMSPrice,
          totalMovesSubs: totalMoviesData,
          totalSeriesSubs: totalSeriesData,
          totalMSSubs: totalMSData,
          revenuePerUser: totalRevenuePerUser,
          totalUsers: totalUsers,
          pieChartData,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchSubscriptionData();
  }, [dispatch]);

  const pieChartData = [
    { name: "Movies Subcriptions", value: revenueData.moviesTotalPrice },
    { name: "Series Subcriptions", value: revenueData.seriesTotalPrice },
    { name: "Movies + Series Subcriptions", value: revenueData.MSTotalPrice },
  ];

  return (
    <div className="earnings">
      <div className="earningsBottom">
        <div className="top">
          {isLoading ? (
            <div className="topLeft">
              <Skeleton width={200} />
              <Skeleton width={150} height={50} />

              <div className="leftBottomInfo" style={{ display: "flex" }}>
                <div className="items">
                  <Skeleton width={200} />
                  <Skeleton width={200} />
                </div>

                <div className="leftBottomInfo">
                  <div className="items">
                    <Skeleton width={200} />
                    <Skeleton width={200} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="topLeft">
                <div className="topLeftInfo">
                  <div className="items">
                    <p>Total Revenue</p>
                    <span>
                      <CountUp
                        start={0}
                        end={revenueData.totalPrice}
                        duration={2.5}
                        separator=","
                        decimals={2}
                        prefix="₹"
                        formattingFn={(value) =>
                          new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          }).format(value)
                        }
                      />
                    </span>
                  </div>
                </div>

                <div className="leftBottomInfo">
                  <div className="items">
                    <p>Last 3 Months Revenue</p>
                    <span>
                      <CountUp
                        start={0}
                        end={revenueData.total_3_Months_Price}
                        duration={2.5}
                        separator=","
                        decimals={2}
                        prefix="₹"
                        formattingFn={(value) =>
                          new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          }).format(value)
                        }
                      />
                    </span>
                  </div>

                  <div className="items">
                    <p>Last 6 Months Revenue</p>
                    <span>
                      <CountUp
                        start={0}
                        end={revenueData.total_6_Months_Price}
                        duration={2.5}
                        separator=","
                        decimals={2}
                        prefix="₹"
                        formattingFn={(value) =>
                          new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          }).format(value)
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="topRight">
            <div className="pieChart">
              <RevenuePieChart data={pieChartData} isLoading={isLoading} />
            </div>
          </div>
        </div>

        <div className="center">
          <div className="widgets">
            <div className="widgetsInfo">
              <EarningWidget
                title="Revenue/User"
                price={revenueData.revenuePerUser}
                smTitle="Total Users"
                totalNo={revenueData.totalUsers}
                desc="See All Users"
                link="users"
                isLoading={isLoading}
              />
              <EarningWidget
                title="Movies Subcriptions"
                price={revenueData.moviesTotalPrice}
                smTitle="Total Movies Subcriptions"
                totalNo={revenueData.totalMovesSubs}
                desc="See All Movies"
                link="movies"
                isLoading={isLoading}
              />
              <EarningWidget
                title="Series Subcriptions"
                price={revenueData.seriesTotalPrice}
                smTitle="Total Series Subcriptions"
                totalNo={revenueData.totalSeriesSubs}
                desc="See All Series"
                link="series"
                isLoading={isLoading}
              />
              <EarningWidget
                title="Movies + Series Subcriptions"
                price={revenueData.MSTotalPrice}
                smTitle="Total Movies + Series Subcriptions"
                totalNo={revenueData.totalMSSubs}
                unique={true}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
