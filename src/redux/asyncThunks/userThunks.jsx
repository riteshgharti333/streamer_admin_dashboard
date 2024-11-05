import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteSingleUser,
  getSingleUser,
  getUsers,
  updateSingleUser,
} from "../api/userAPI";

//GET ALL USER
export const getAsyncUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to fetch users");
    }
  },
);

//GET SINGLE USER
export const getAsyncSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSingleUser(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to fetch user");
    }
  },
);

//DELETE USER
export const deleteAsyncSingleUser = createAsyncThunk(
  "users/deleteSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await deleteSingleUser(id);
      return { id, message: data.message };
    } catch (error) {
      // Return backend error message if available, or a default message
      return rejectWithValue(error.response.data || "Failed to delete user.");
    }
  },
);

//UPDATE SINGLE USER
export const updateAsyncSingleUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedUser }, { rejectWithValue }) => {
    try {
      const response = await updateSingleUser(id, updatedUser);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to fetch user");
    }
  },
);
