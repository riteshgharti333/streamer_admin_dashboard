import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSingleList,
  deleteSingleList,
  getLists,
  getQueryLists,
  getSingleList,
  updateSingleList,
} from "../api/listAPI";

//GET ALL LISTS
export const getAsyncLists = createAsyncThunk(
  "lists/getLists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLists();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to fetch lists");
    }
  },
);

//GET QUERY LITS
export const getAsyncQueryLists = createAsyncThunk(
  "lists/getQueryLists",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getQueryLists(query);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to fetch query lists",
      );
    }
  },
);

//GET SINGLE LIST
export const getAsyncSingleList = createAsyncThunk(
  "lists/getSingleList",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSingleList(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to fetch single list",
      );
    }
  },
);

//DELETE LISTS
export const deleteAsyncSingleList = createAsyncThunk(
  "lists/deleteSingleList",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSingleList(id);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to delete list");
    }
  },
);

//UPDATE LIST
export const updateAsyncSingleList = createAsyncThunk(
  "movies/updateSingleList",
  async ({ id, updateList }, { rejectWithValue }) => {
    try {
      const response = await updateSingleList(id, updateList);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to update list");
    }
  },
);

// CREATING SINGLE LIST
export const createAsyncSingleList = createAsyncThunk(
  "movies/createSingleList",
  async (list, { rejectWithValue }) => {
    try {
      const { title, genre, type, content } = list;
      const newList = {
        title,
        genre,
        type,
        content,
      };
      const response = await createSingleList(newList);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to create movie");
    }
  },
);
