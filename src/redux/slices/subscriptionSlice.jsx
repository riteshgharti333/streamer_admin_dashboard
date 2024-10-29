import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSubscriptionAsync,
  getAllSubscriptionAsync,
  getSubscriptionAsync,
} from "../asyncThunks/subscriptionThunks";

const initialState = {
  customer: null,
  subscription: {
    subscriptionData: [], // Initialize as an empty array
  },
  sessionUrl: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Subscriptions
    builder
      .addCase(getAllSubscriptionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription.subscriptionData = action.payload.subscriptionData; // Update subscriptionData
      })
      .addCase(getAllSubscriptionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Single Subscription
    builder
      .addCase(getSubscriptionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload.subscription; // Update the subscription object
      })
      .addCase(getSubscriptionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle Delete Subscription
    builder
      .addCase(deleteSubscriptionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscriptionAsync.fulfilled, (state, action) => {
        state.loading = false;

        const { subscriptionId } = action.payload;

        if (Array.isArray(state.subscription.subscriptionData)) {
          state.subscription.subscriptionData =
            state.subscription.subscriptionData.filter(
              (sub) => sub.subscriptionId !== subscriptionId,
            );
        }
      })
      .addCase(deleteSubscriptionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
