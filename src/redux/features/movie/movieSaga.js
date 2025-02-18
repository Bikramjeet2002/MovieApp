import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { moviesApi } from "../../../utils/apiRoutes";
import {
  addMovieError,
  addMovieRequest,
  addMovieSuccess,
  deleteMovieError,
  deleteMovieRequest,
  deleteMovieSuccess,
  editMovieRequest,
  editMovieSuccess,
  fetchMovieError,
  fetchMovieRequest,
  fetchMovieSuccess,
} from "./movieSlice";

function* fetchMovie(action) {
  try {
    const response = yield axios.get(moviesApi);
    const fetchedMovies = response.data;

    yield put(fetchMovieSuccess(fetchedMovies, action.payload));
  } catch (error) {
    yield put(fetchMovieError(error.message));
  }
}

// function* deleteMovie(action){
//  try {
//   console.log(typeof(action.payload),"iddddd")
//   const response= yield call(axios.delete,`${moviesApi}?id=${action.payload}`)
//   const deletedMovie= response.data
//   console.log(deletedMovie)
//  //  yield put(deleteMovieSuccess(deletedMovie)),
//   alert ('movie Deleted')

//  } catch (error) {
//   yield put(deleteMovieError(error.message))

//  }
// }
function* deleteMovie(action) {
  try {
    const response = yield call(axios.delete, `${moviesApi}/${action.payload}`);
    const deletedMovie = response.data;

    console.log("Deleted movie:", deletedMovie);

    yield put(deleteMovieSuccess(deletedMovie)); // Dispatch success action
  } catch (error) {
    console.error("Delete request failed:", error.message);
    yield put(deleteMovieError(error.message)); // Send only error message
  }
}

function* addMovie(action) {
  try {
    const get = yield axios.get(moviesApi);
    const getMoviesData = get.data;
    const nextId = JSON.stringify(
      Math.max(...getMoviesData.map((movie) => movie.id)) + 1
    );
    // const addData = { ...action.payload, id: nextId };
    const addMovie = axios.post(moviesApi, { ...action.payload, id: nextId });
    yield put(addMovieSuccess(addMovie));

    console.log(nextId, "getdata");
  } catch (error) {
    yield put(addMovieError(error.message)); // Send only error message
  }
}

function* editMovie(action) {
  try {
    const response = yield axios.put(
      `${moviesApi}/${action.payload.id}`,
      action.payload
    );
    yield put(editMovieSuccess(response.data));

    console.log(response.data);
  } catch (error) {}
}

function* movieSaga() {
  yield takeLatest(fetchMovieRequest.type, fetchMovie);
  yield takeLatest(deleteMovieRequest.type, deleteMovie);
  yield takeLatest(addMovieRequest.type, addMovie);
  yield takeLatest(editMovieRequest.type, editMovie);
}

export default movieSaga;
