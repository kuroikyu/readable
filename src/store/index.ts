import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import booksReducer from "./feature/books/booksSlice";
import bookStatsReducer from "./feature/books/bookStatsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    bookStats: bookStatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
