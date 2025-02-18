import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} from "./authSlice";
import { usersApi } from "../../../utils/apiRoutes";

// API call for signup
function* handleSignup(action) {
  try {
    const response = yield call(
      axios.get,
      `${usersApi}?email=${action.payload.email}`
    );
    const existingUser = response?.data[0];
    console.log(existingUser, "userrrr");

    if (existingUser) {
      alert("user already exist");
    } else {
      const { navigate } = action.payload;
      const users = yield axios.get(usersApi);

      const usersData = users.data;
      const newUserId =
        usersData.length > 0 ? Math.max(...usersData.map((e) => e.id)) + 1 : 1;
      console.log(newUserId, "userdata");
      const newUser = { id: JSON.stringify(newUserId), ...action.payload };
      const response = yield call(axios.post, usersApi, newUser);
      console.log(response.data, "hello");

      yield put(signupSuccess(newUser));
      navigate("/");
    }
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

// API call for login
function* handleLogin(action) {
  try {
    const response = yield call(
      axios.get,
      `${usersApi}?email=${action.payload.email}`
    );
    const user = response?.data[0];
    // console.log(user.password,"dsjvjbsskjd")

    if (user && user.password === action.payload.password) {
      const { navigate } = action.payload;
      yield put(loginSuccess(user));
      alert("sign up successful");
      navigate("/home");
    } else {
      yield put(loginFailure("Invalid email or password"));
      alert("user does not exist");
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Watcher Saga
function* authSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;
