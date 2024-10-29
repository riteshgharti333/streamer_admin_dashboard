import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

// GET ALL SUBSCRIPTION
export const getAllSubscriptions = () => {
  return axios.get(`${baseUrl}/subscriptions`, {
    withCredentials: true,
  });
};

// DELETE SUBSCRIPTION
export const deleteSubscription = (subscriptionId) => {
  return axios.delete(`${baseUrl}/subscriptions/${subscriptionId}`, {
    withCredentials: true,
  });
};

// GET SUBSCRIPTION
export const getSubscription = (subscriptionId) => {
  return axios.get(`${baseUrl}/subscriptions/${subscriptionId}`, {
    withCredentials: true,
  });
};
