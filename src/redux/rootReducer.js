import { combineReducers } from "@reduxjs/toolkit";
import  movieSlice  from "./features/movie/movieSlice";
import  authSlice  from "./features/auth/authSlice";




const rootReducer = combineReducers({
    auth:authSlice,
    movie:movieSlice
    
})


export default rootReducer