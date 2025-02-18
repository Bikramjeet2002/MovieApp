import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: null,
    status: "idle",
    error: null,
  },
  reducers: {
    fetchMovieRequest: (state) => {
      state.status = "loading";
    },
    fetchMovieSuccess: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);
      state.movies = action.payload;
      // console.log(action.payload, "PAYLOAD");
    },
    fetchMovieError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteMovieRequest: (state) => {
      state.status = "loading";
    },
    deleteMovieSuccess: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);
      alert("deleted");

      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      // console.log(action.payload, "DELETE");
    },
    deleteMovieError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addMovieRequest: (state) => {
      state.status = "loading";
    },
    addMovieSuccess: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);
      state.movies.push(action.payload);
      // console.log(action.payload, "PAYLOAD");
    },
    addMovieError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    editMovieRequest: (state) => {
      state.status = "loading";
    },
    editMovieSuccess: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);
      // state.movies=action.payload
      state.movies = state.movies.map((movie) => {
        if (movie.id === action.payload.id) {
          return { ...movie, ...action.payload };
        }
        return movie;
      });
      // state.movies.push(action.payload);
      // console.log(action.payload, "PAYLOAD");
    },
    editMovieError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }
  },
});

export const {
  fetchMovieError,
  fetchMovieRequest,
  fetchMovieSuccess,
  deleteMovieSuccess,
  deleteMovieRequest,
  deleteMovieError,
  addMovieError,
  addMovieSuccess,
  addMovieRequest,
  editMovieError,
  editMovieRequest,
  editMovieSuccess
} = movieSlice.actions;

export default movieSlice.reducer;
