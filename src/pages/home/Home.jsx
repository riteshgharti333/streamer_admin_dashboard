import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { TransactionsColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { getAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import { getAsyncUsers } from "../../redux/asyncThunks/userThunks";

const Home = () => {
  const dispatch = useDispatch();

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [totalData, setTotalData] = useState({
    totalSubs: "",
    totalMovies: "",
    totalSeries: "",
    totalUsers: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { subscriptionData } = await dispatch(
          getAllSubscriptionAsync(),
        ).unwrap();
        const { movies } = await dispatch(getAsyncMovies()).unwrap();
        const { users } = await dispatch(getAsyncUsers()).unwrap();

        const moviesData = movies.filter((movie) => !movie.isSeries);
        const seriesData = movies.filter((movie) => movie.isSeries);

        setSubscriptionData(subscriptionData);

        setTotalData({
          totalSubs: subscriptionData.length,
          totalMovies: moviesData.length,
          totalSeries: seriesData.length,
          totalUsers: users.length,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="widgets">
        <Widget
          type="users"
          totalNo={totalData.totalUsers}
          isLoading={isLoading}
        />
        <Widget
          type="movies"
          totalNo={totalData.totalMovies}
          isLoading={isLoading}
        />
        <Widget
          type="series"
          totalNo={totalData.totalSeries}
          isLoading={isLoading}
        />
        <Widget
          type="subscriptions"
          totalNo={totalData.totalSubs}
          isLoading={isLoading}
        />
      </div>
      <div className="charts">
        <Featured isLoading={isLoading} />
        <Chart
          title="All Months (Revenue)"
          aspect={2 / 1}
          dataArray={subscriptionData}
          isLoading={isLoading}
          sHeight={330}
        />
      </div>
      <div className="listContainer">
        <Table
          transactionsColumns={TransactionsColumns}
          listTitle="Latest Transactions"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
