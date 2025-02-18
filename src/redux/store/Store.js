import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../rootSaga";
import rootReducer from "../rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const sagaMiddleware = createSagaMiddleware();


const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor= persistStore(store)
