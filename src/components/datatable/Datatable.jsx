import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  deleteAsyncSigleMovie,
  getQueryAsyncMovies,
} from "../../redux/asyncThunks/movieThunks.jsx";
import {
  deleteAsyncSingleUser,
  getAsyncUsers,
} from "../../redux/asyncThunks/userThunks.jsx";
import {
  deleteAsyncSingleList,
  getAsyncLists,
} from "../../redux/asyncThunks/listThunks.jsx";
import { toast } from "react-toastify";

import {
  deleteSubscriptionAsync,
  getAllSubscriptionAsync,
} from "../../redux/asyncThunks/subscriptionThunks.jsx";

const Datatable = ({ title, listColumns, movieType }) => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const movies = useSelector((state) => state.movies.movies);

  const series = useSelector((state) => state.movies.series);

  const users = useSelector((state) => state.users.users);

  const lists = useSelector((state) => state.lists.lists);

  const subscriptions = useSelector((state) => state.subscription);

  // Fetching the data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (movieType === "movies") {
          await dispatch(getQueryAsyncMovies(movieType)).unwrap();
        } else if (movieType === "users") {
          await dispatch(getAsyncUsers()).unwrap();
        } else if (movieType === "series") {
          await dispatch(getQueryAsyncMovies(movieType)).unwrap();
        } else if (movieType === "lists") {
          await dispatch(getAsyncLists(movieType)).unwrap();
        } else if (movieType === "subscriptions") {
          await dispatch(getAllSubscriptionAsync()).unwrap();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, movieType]);

  // deleting from datatable
  const handleDelete = async (id) => {
    try {
      let response;

      if (movieType === "movies") {
        response = await dispatch(deleteAsyncSigleMovie(id)).unwrap();
      } else if (movieType === "users") {
        response = await dispatch(deleteAsyncSingleUser(id)).unwrap();
      } else if (movieType === "series") {
        response = await dispatch(deleteAsyncSigleMovie(id)).unwrap();
      } else if (movieType === "lists") {
        response = await dispatch(deleteAsyncSingleList(id)).unwrap();
      } else if (movieType === "subscriptions") {
        response = await dispatch(deleteSubscriptionAsync(id)).unwrap();
      }
      toast.success("Item Deleted");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const { _id } = params.row;
        const { subscriptionId } = params.row;
        return (
          <div className="cellAction">
            <Link
              to={`/${movieType}/${_id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            {path == "/subscriptions" ? (
              <div
                className="deleteButton"
                onClick={() => handleDelete(subscriptionId)}
              >
                Delete
              </div>
            ) : (
              <div className="deleteButton" onClick={() => handleDelete(_id)}>
                Delete
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Determine which rows to use based on `movieType`
  let rows;
  if (movieType === "movies") {
    rows = movies.movies;
  } else if (movieType === "series") {
    rows = series.movies;
  } else if (movieType === "users") {
    rows = users.users;
  } else if (movieType === "lists") {
    rows = lists.lists;
  } else if (movieType === "subscriptions") {
    rows = subscriptions?.subscription?.subscriptionData;
  } else {
    rows = [];
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {loading ? <Skeleton height={20} width={200} /> : <p>{title}</p>}

        {loading ? (
          <Skeleton height={20} width={200} />
        ) : (
          path !== "/users" &&
          path !== "/subscriptions" && (
            <Link to={`/${movieType}/new`} className="link">
              Add New <span className="newType">{movieType}</span>
            </Link>
          )
        )}
      </div>

      {loading ? (
        <Skeleton count={9} height={40} />
      ) : (
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={listColumns.concat(actionColumn)}
          pageSize={9}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Datatable;
