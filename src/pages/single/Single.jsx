import "./single.scss";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SubscriptionsColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAsyncSingleUser,
  deleteAsyncSingleUser,
  updateAsyncSingleUser,
} from "../../redux/asyncThunks/userThunks";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chart from "../../components/chart/Chart";

const Single = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [roleAdmin, setRoleAdmin] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getAsyncSingleUser(path)).unwrap();
        console.log(response);
        const userDetails = response.userDetails;

        setData(userDetails?.getUser);

        const usersSubscriptions = userDetails?.subscription;

        setTransactions(usersSubscriptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, path]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAsyncSingleUser(path)).unwrap();
      navigate(-1);
      toast.success("User Deleted!");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to handle updating the admin role
  // Function to handle updating the admin role
  const handleAdminUpdate = async (newRole) => {
    try {
      const updatedUser = { role: newRole }; // Use newRole directly

      await dispatch(updateAsyncSingleUser({ id: path, updatedUser })).unwrap();
      setData((prevData) => ({
        ...prevData,
        role: newRole, // Update the role in the state
      }));
      toast.success(
        `User has been ${
          newRole === "admin" ? "granted" : "removed from"
        } admin role.`
      );
      setRoleAdmin(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const AdminRole = () => {
    return (
      <div className="admin">
        <div className="adminInfo">
          <p>
            Do you want to{" "}
            {data.role === "admin" ? "remove from " : "assign the"} Admin role?
          </p>
          <div className="adminButton">
            <button className="primary-btn" onClick={() => setRoleAdmin(false)}>
              No
            </button>
            <button
              className="primary-btn"
              onClick={() =>
                handleAdminUpdate(data.role === "admin" ? "user" : "admin")
              }
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <div className="cellAction">
            <Link to={`/subscriptions/${_id}`}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="single">
      {roleAdmin && <AdminRole />}
      <div className="top">
        <div className="left">
          <div className="leftTop">
            {isLoading ? (
              <>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </>
            ) : (
              <>
                <h1 className="leftTitle">Information</h1>
                <button
                  className="editButton primary-btn"
                  onClick={handleDelete}
                >
                  Delete User
                </button>
              </>
            )}
          </div>
          <div className="item">
            <div className="details">
              {isLoading ? (
                <>
                  <Skeleton height={40} width={200} count={4} />
                </>
              ) : (
                <>
                  <h1 className="itemTitle">{data.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email :</span>
                    <span className="itemValue">{data.email}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Role :</span>
                    <span className="itemValue">{data.role}</span>
                    {data.role === "user" ? (
                      <p
                        onClick={() => setRoleAdmin(true)}
                        className="adminRole"
                      >
                        Assign Admin Role
                      </p>
                    ) : (
                      <p
                        onClick={() => setRoleAdmin(true)}
                        className="adminRole assign"
                      >
                        Remove From Admin Role
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          {/* <UserChart aspect={3 / 1} title="User Spending" userId={data._id}   isLoading={isLoading}  /> */}
          <Chart
            aspect={3 / 1}
            title="User Spending"
            userId={data._id}
            dataArray={transactions}
            isLoading={isLoading}
            sHeight={200}
          />
        </div>
      </div>
      <div className="bottom">
        <h1 className="title">
          {isLoading ? <Skeleton height={30} /> : "Last Transactions"}
        </h1>

        {isLoading ? (
          <Skeleton count={9} height={50} />
        ) : (
          <DataGrid
            className="datagrid"
            rows={transactions}
            columns={SubscriptionsColumns.concat(actionColumn)}
            pageSize={9}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[9]}
          />
        )}
      </div>
    </div>
  );
};

export default Single;
