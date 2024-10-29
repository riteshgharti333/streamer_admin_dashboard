import "./featured.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { subDays } from "date-fns";

import { isWithinInterval } from "date-fns";

const Featured = ({ isLoading }) => {
  const dispatch = useDispatch();

  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [currentWeekRevenue, setCurrentWeekRevenue] = useState(0);
  const [currentHalfMonthRevenue, setCurrentHalfMonthRevenue] = useState(0);

  const [calWeek, setCalWeek] = useState(0);
  const [calHalftMonth, setCalHalfMonth] = useState(0);

  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const res = await dispatch(getAllSubscriptionAsync()).unwrap();
        const prices = res.subscriptionData || [];

        // Calculating growth of current month

        // Get today's date as end of the current "month"
        const endOfCurrentMonth = new Date();
        const endOfCurrentweek = new Date();
        const endOfCurrentHalfMonth = new Date();

        // Start of the current "month" (28 days before today)
        const startOfCurrentMonth = subDays(endOfCurrentMonth, 28);
        const startOfCurrentWeek = subDays(endOfCurrentweek, 7);
        const startOfCurrentHalfMonth = subDays(endOfCurrentHalfMonth, 15);

        // Start of the last "month" (56 days before today)
        const startOfLastMonth = subDays(endOfCurrentMonth, 56); // July 24, 2024
        const startOfLastWeek = subDays(endOfCurrentweek, 14);
        const startOfLastHalfMonth = subDays(endOfCurrentHalfMonth, 30);

        // End of the last "month" (1 day before start of current month)
        const endOfLastMonth = subDays(startOfCurrentMonth, 1); // August 20, 2024
        const endOfLastWeek = subDays(startOfCurrentWeek, 1);
        const endOfLastHalfMonth = subDays(startOfCurrentHalfMonth, 1);

        // Filter subscriptions for the current "month" (last 28 days)
        const currentMonthSubscriptions = prices.filter((subscription) => {
          const subscriptionDate = new Date(subscription.startDate);
          return isWithinInterval(subscriptionDate, {
            start: startOfCurrentMonth,
            end: endOfCurrentMonth,
          });
        });

        const currentWeekSubscriptions = prices.filter((subscription) => {
          const subscriptionDate = new Date(subscription.startDate);
          return isWithinInterval(subscriptionDate, {
            start: startOfCurrentWeek,
            end: endOfCurrentweek,
          });
        });

        const currentHalfMonthSubscriptions = prices.filter((subscription) => {
          const subscriptionDate = new Date(subscription.startDate);
          return isWithinInterval(subscriptionDate, {
            start: startOfCurrentHalfMonth,
            end: endOfCurrentHalfMonth,
          });
        });

        // Filter subscriptions for the last "month" (days between 56 and 28 days ago)
        const lastMonthSubscriptions = prices.filter((subscription) => {
          const subscriptionDate = new Date(subscription.startDate);
          return isWithinInterval(subscriptionDate, {
            start: startOfLastMonth,
            end: endOfLastMonth,
          });
        });

        const lastWeekSubscriptions = prices.filter((subscription) => {
          const subscriptionDate = new Date(subscription.startDate);
          return isWithinInterval(subscriptionDate, {
            start: startOfLastWeek,
            end: endOfLastWeek,
          });
        });

        const lastHalfMonthSubscriptions = prices.filter((subscription) => {
          const subscriptionDate = new Date(subscription.startDate);
          return isWithinInterval(subscriptionDate, {
            start: startOfLastHalfMonth,
            end: endOfLastHalfMonth,
          });
        });

        /////////////////////////////////

        // Calculate total revenue for current "month"
        const currentMonthTotal = currentMonthSubscriptions.reduce(
          (acc, subscription) => {
            const price = parseFloat(subscription.price);
            return !isNaN(price) ? acc + price : acc;
          },
          0,
        );

        const currentWeekTotal = currentWeekSubscriptions.reduce(
          (acc, subscription) => {
            const price = parseFloat(subscription.price);
            return !isNaN(price) ? acc + price : acc;
          },
          0,
        );

        const currentHalfMonthTotal = currentHalfMonthSubscriptions.reduce(
          (acc, subscription) => {
            const price = parseFloat(subscription.price);
            return !isNaN(price) ? acc + price : acc;
          },
          0,
        );

        ///////////////////////////////

        // Calculate total revenue for last "month"
        const lastMonthTotal = lastMonthSubscriptions.reduce(
          (acc, subscription) => {
            const price = parseFloat(subscription.price);
            return !isNaN(price) ? acc + price : acc;
          },
          0,
        );

        const lastWeekTotal = lastWeekSubscriptions.reduce(
          (acc, subscription) => {
            const price = parseFloat(subscription.price);
            return !isNaN(price) ? acc + price : acc;
          },
          0,
        );

        const lastHalfMonthTotal = lastHalfMonthSubscriptions.reduce(
          (acc, subscription) => {
            const price = parseFloat(subscription.price);
            return !isNaN(price) ? acc + price : acc;
          },
          0,
        );

        ////////////////////////////

        // Calculate percentage growth
        const percentageGrowth =
          lastMonthTotal > 0
            ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
            : 0;

        setGrowth(percentageGrowth.toFixed(2));

        setCurrentMonthRevenue(currentMonthTotal);
        // setLastMonthRevenue(lastMonthTotal);

        setCurrentHalfMonthRevenue(currentHalfMonthTotal);
        setCurrentWeekRevenue(currentWeekTotal);

        const calHalftMonth = currentHalfMonthTotal > lastHalfMonthTotal;
        const calWeek = currentWeekTotal > lastWeekTotal;

        setCalWeek(calWeek);
        setCalHalfMonth(calHalftMonth);

        // Calculating total revenue of last month
        // const total = prices.reduce((acc, subscription) => {
        //   const price = parseFloat(subscription.price);
        //   if (!isNaN(price)) {
        //     return acc + price;
        //   } else {
        //     console.error("Invalid price:", subscription.price);
        //     return acc;
        //   }
        // }, 0);
        // setTotalAmount(total);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, [dispatch]);

  return (
    <div className="featured">
      <div className="top">
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          <span className="title">Total Revenue</span>
        )}
      </div>
      <div className="bottom">
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          <p className="growth">Last 28 Days Growth</p>
        )}

        {isLoading ? (
          <Skeleton circle={true} width={100} height={100} />
        ) : (
          <div className="featuredChart">
            <CircularProgressbar
              value={growth}
              text={`${growth}%`}
              strokeWidth={5}
              styles={buildStyles({
                textSize: "16px",
                textColor: `${growth < 0 ? "red" : "blue"}`,
              })}
            />
          </div>
        )}
        {isLoading ? (
          <Skeleton width={100} />
        ) : (
          <p className="title">Last 28 Day Total Revenue </p>
        )}

        {isLoading ? (
          <>
            <Skeleton width={100} />
            <Skeleton width={100} />
          </>
        ) : (
          <>
            <p className="amount">₹ {currentMonthRevenue}</p>
            <p className="desc">
              Previous last week total revenue and last month
            </p>
          </>
        )}

        <div className="summary">
          {isLoading ? (
            <>
              <Skeleton width={100} />
              <Skeleton width={100} />
            </>
          ) : (
            <>
              <div className="item">
                <div className="itemTitle">Last Week</div>

                {calWeek ? (
                  <div className="itemResult positive">
                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    <div className="resultAmount">₹{currentWeekRevenue}</div>
                  </div>
                ) : (
                  <div className="itemResult negative">
                    <KeyboardArrowDownIcon fontSize="small" />
                    <div className="resultAmount">₹{currentWeekRevenue}</div>
                  </div>
                )}
              </div>
              <div className="item">
                <div className="itemTitle">Last 15 day</div>
                {calHalftMonth ? (
                  <div className="itemResult positive">
                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                    <div className="resultAmount">
                      ₹{currentHalfMonthRevenue}
                    </div>
                  </div>
                ) : (
                  <div className="itemResult negative">
                    <KeyboardArrowDownIcon fontSize="small" />
                    <div className="resultAmount">
                      ₹{currentHalfMonthRevenue}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Featured;
