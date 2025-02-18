import { all } from "redux-saga/effects";
import movieSaga from "./features/movie/movieSaga";
import authSaga from "./features/auth/authSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    movieSaga()
  ]);
}
