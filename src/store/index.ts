import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./booksSlice";
import bookStatsReducer from "./bookStatsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    bookStats: bookStatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
