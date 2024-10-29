import { createSlice } from "@reduxjs/toolkit";
import {
  createAsyncSingleMovie,
  deleteAsyncSigleMovie,
  getAsyncMovies,
  getAsyncSigleMovie,
  getQueryAsyncMovies,
  updateAsyncSingleMovie,
} from "../asyncThunks/movieThunks";

const initialState = {
  movies: [],
  series: [],
  singleMovie: null,
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  Get All Movies
    builder
      .addCase(getAsyncMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(getAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Get Query Movies
    builder
      .addCase(getQueryAsyncMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQueryAsyncMovies.fulfilled, (state, action) => {
        const { query, data } = action.payload;
        state.status = "succeeded";
        if (query === "movies") {
          state.movies = data;
        } else if (query === "series") {
          state.series = data;
        }
      })
      .addCase(getQueryAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Get Single Movie
    builder
      .addCase(getAsyncSigleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSigleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        state.singleMovie = action.payload;
      })
      .addCase(getAsyncSigleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Delete Single Movie
    builder
      .addCase(deleteAsyncSigleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(deleteAsyncSigleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedMovieId = action.payload;
        console.log("Deleted movie ID:", deletedMovieId);

        if (Array.isArray(state.movies.movies)) {
          state.movies.movies = state.movies.movies.filter(
            (movie) => movie._id !== deletedMovieId,
          );
        }

        if (state.singleMovie && state.singleMovie._id === deletedMovieId) {
          state.singleMovie = null;
        }
      })

      .addCase(deleteAsyncSigleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Create Single Movie
    builder
      .addCase(createAsyncSingleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createAsyncSingleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        if (Array.isArray(state.movies)) {
          state.movies.push(action.payload);
        }
      })
      .addCase(createAsyncSingleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Update Single Movie
    builder
      .addCase(updateAsyncSingleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateAsyncSingleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedMovie = action.payload.updateMovie;

        if (Array.isArray(state.movies.movies)) {
          const index = state.movies.movies.findIndex(
            (movie) => movie._id === updatedMovie._id,
          );
          state.movies.movies[index] = updatedMovie;
        }
      })

      .addCase(updateAsyncSingleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
