import { createSlice } from "@reduxjs/toolkit";
import {
  createAsyncSingleList,
  deleteAsyncSingleList,
  getAsyncLists,
  getAsyncQueryLists,
  getAsyncSingleList,
  updateAsyncSingleList,
} from "../asyncThunks/listThunks";

const initialState = {
  lists: [],
  status: "idle",
  error: null,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  Get All Lists
    builder
      .addCase(getAsyncLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncLists.fulfilled, (state, action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  Get Query Lists
    builder
      .addCase(getAsyncQueryLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncQueryLists.fulfilled, (state, action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncQueryLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  Get Single List
    builder
      .addCase(getAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSingleList.fulfilled, (state, action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncSingleList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  delete single List
    builder
      .addCase(deleteAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAsyncSingleList.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedListId = action.payload;

        if (Array.isArray(state.lists.lists)) {
          state.lists.lists = state.lists.lists.filter(
            (list) => list._id !== deletedListId,
          );
        }
      })
      .addCase(deleteAsyncSingleList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // update single list
    builder
      .addCase(updateAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateAsyncSingleList.fulfilled, (state, action) => {
        state.status = "idle";
        const updateList = action.payload.updatedList;

        if (Array.isArray(state.lists.lists)) {
          const index = state.lists.lists.findIndex(
            (list) => list._id === updateList._id,
          );
          state.lists.lists[index] = updateList;
        }
      })

      .addCase(updateAsyncSingleList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Create Single List
    builder
      .addCase(createAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAsyncSingleList.fulfilled, (state, action) => {
        state.status = "idle";
        if (Array.isArray(state.movies)) {
          state.lists.push(action.payload);
        }
      })
      .addCase(createAsyncSingleList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default listSlice.reducer;
