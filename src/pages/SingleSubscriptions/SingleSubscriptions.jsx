import "./SingleSubscriptions.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubscriptionAsync,
  getSubscriptionAsync,
} from "../../redux/asyncThunks/subscriptionThunks";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";

const SingleSubscriptions = () => {
  const [subscriptionData, setSubscriptionData] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[2];

  const subscription = useSelector((state) => state.subscription.subscription);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSubscriptionAsync(path));
  }, [dispatch, path]);

  useEffect(() => {
    setIsLoading(true);
    if (subscription) {
      setSubscriptionData(subscription);
    }
    setIsLoading(false);
  }, [subscription]);

  const {
    userId,
    name,
    email,
    customerId,
    subscriptionId,
    plan,
    startDate,
    endDate,
    price,
    status,
  } = subscriptionData || {};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid date" : format(date, "dd MMM. yyyy");
  };

  const deleteSubs = async (id) => {
    try {
      const resultAction = await dispatch(deleteSubscriptionAsync(id)).unwrap();
      const { data } = resultAction;

      if (data.success) {
        toast.success(data.message);
        navigate(-1);
      } else {
        toast.error("Failed to delete subscription");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="singleSubscriptions">
      <div className="subDeleteBtn">
        <button
          className="primary-btn"
          onClick={() => deleteSubs(subscriptionId)}
        >
          Delete Subscription
        </button>
      </div>
      <div className="singleSubscriptionsWrapper">
        <h1>Subscription Information</h1>

        {isLoading ? (
          <Skeleton width={400} count={10} height={30} />
        ) : (
          <div className="subInfo">
            <div className="subSmInfo">
              <p>UserId:</p>
              <span>{userId}</span>
            </div>
            <div className="subSmInfo">
              <p>Customer Name:</p>
              <span>{name}</span>
            </div>

            <div className="subSmInfo">
              <p>Customer Email:</p>
              <span>{email}</span>
            </div>

            <div className="subSmInfo">
              <p>Customer Email:</p>
              <span>{email}</span>
            </div>

            <div className="subSmInfo">
              <p>Customer ID:</p>
              <span>{customerId}</span>
            </div>

            <div className="subSmInfo">
              <p>Subscription ID:</p>
              <span>{subscriptionId}</span>
            </div>
            <div className="subSmInfo">
              <p>Plan Name:</p>
              <span>{plan}</span>
            </div>
            <div className="subSmInfo">
              <p>Start Date:</p>
              <span>{formatDate(startDate)}</span>
            </div>
            <div className="subSmInfo">
              <p>Expire Date:</p>
              <span>{formatDate(endDate)}</span>
            </div>
            <div className="subSmInfo">
              <p>Price:</p>
              <span>{price} /-</span>
            </div>
            <div className="subSmInfo">
              <p>Status:</p>
              <span>{status}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSubscriptions;
