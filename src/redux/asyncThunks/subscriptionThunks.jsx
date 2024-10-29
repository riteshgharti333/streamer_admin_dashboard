import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteSubscription,
  getAllSubscriptions,
  getSubscription,
} from "../api/subscriptionAPI";

// GET ALL SUBSCRIPTIONS
export const getAllSubscriptionAsync = createAsyncThunk(
  "subscription/getAllSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSubscriptions();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to get all subscriptions",
      );
    }
  },
);

// DELETE SUBSCRIPTION
export const deleteSubscriptionAsync = createAsyncThunk(
  "subscription/deleteSubscription",
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const response = await deleteSubscription(subscriptionId);
      console.log(response);
      return { data: response.data, subscriptionId };
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to delete subscription",
      );
    }
  },
);

// GET SUBSCRIPTION
export const getSubscriptionAsync = createAsyncThunk(
  "subscription/getSubscription",
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const response = await getSubscription(subscriptionId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to delete subscription",
      );
    }
  },
);
