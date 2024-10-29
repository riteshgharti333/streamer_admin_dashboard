import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSingleMovie,
  deleteSingleMovie,
  getMovies,
  getQueryMovies,
  getSingleMovie,
  updateSingleMovie,
} from "../api/movieAPI";

//GET ALL MOVIES
export const getAsyncMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMovies();
      return res.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.response.data || "Failed to fetch movies");
    }
  },
);

//GET QUERY MOVIES
export const getQueryAsyncMovies = createAsyncThunk(
  "movies/getQueryMovies",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getQueryMovies(query);
      return { query, data: res.data };
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(
        error.response.data || "Failed to fetch query movies",
      );
    }
  },
);

//GET SINLGE MOVIE
export const getAsyncSigleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleMovie(id);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.response.data || "Failed to fetch movie");
    }
  },
);

//DELETE MOVIE
export const deleteAsyncSigleMovie = createAsyncThunk(
  "movies/deleteSingleMovie",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSingleMovie(id);
      return id;
    } catch (error) {
      console.error("Failed to delete movies:", error);
      return rejectWithValue(error.response.data || "Failed delete movie");
    }
  },
);

// CREATING SINGLE MOVIE
export const createAsyncSingleMovie = createAsyncThunk(
  "movies/createSingleMovie",
  async (movie, { rejectWithValue }) => {
    try {
      const {
        title,
        desc,
        year,
        duration,
        age,
        genre,
        isSeries,
        stars,
        featureImg,
        featureSmImg,
        smImg,
        video,
      } = movie;

      // Prepare the new movie object
      const newMovie = {
        title,
        desc,
        year,
        duration,
        age,
        genre,
        isSeries,
        stars,
        featureImg,
        featureSmImg,
        smImg,
        video,
      };
      const response = await createSingleMovie(newMovie);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to create movie");
    }
  },
);

//UPDATE MOVIE
export const updateAsyncSingleMovie = createAsyncThunk(
  "movies/updateSingleMovie",
  async ({ id, updateMovie }, { rejectWithValue }) => {
    try {
      const response = await updateSingleMovie(id, updateMovie);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to update movie");
    }
  },
);
