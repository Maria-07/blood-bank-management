import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import counterReducer from "./slices/counterSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
