import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "@/lib/client";
import { BookStats } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "FATAL ERROR: VITE_API_BASE_URL environment variable is not set!",
  );
}

interface BookStatsState {
  bookStats: BookStats[];
  loading: boolean;
  error: string | null;
}

const initialState: BookStatsState = {
  bookStats: [],
  loading: true,
  error: null,
};

export const fetchBookStatsByUser = createAsyncThunk(
  "bookStats/fetchBookStatsByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const bookStats = await client.get<BookStats[]>("/book_stats", {
        user_id: userId,
      });

      return { bookStats };
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      if (typeof err === "string") {
        return rejectWithValue(err);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  },
);

export const updateBookStats = createAsyncThunk(
  "bookStats/updateBookStats",
  async ({
    userId,
    bookId,
    pageNumber,
    timeSpentInMs,
  }: {
    userId: string;
    bookId: string;
    pageNumber: number;
    timeSpentInMs: number;
  }) => {
    const existingStats = await client.get<BookStats[]>("/book_stats", {
      user_id: userId,
      book_id: bookId,
    });

    if (existingStats.length > 0) {
      const bookStats = existingStats.find((stat) => {
        return (
          stat.book_id.toString() === bookId.toString() &&
          stat.user_id.toString() === userId.toString()
        );
      });
      const previousTimeSpent =
        bookStats?.page_time[pageNumber.toString()] || 0;

      const updatedStat = await client.patch<Partial<BookStats>, BookStats>(
        `/book_stats/${existingStats[0].id}`,
        {
          page_time: {
            ...(bookStats?.page_time || {}),
            [pageNumber.toString()]: timeSpentInMs + previousTimeSpent,
          },
        },
      );
      return { bookStats: updatedStat };
    } else {
      const newStat = await client.post<Omit<BookStats, "id">, BookStats>(
        "/book_stats",
        {
          book_id: bookId.toString(),
          user_id: userId.toString(),
          page_time: {
            [pageNumber.toString()]: timeSpentInMs,
          },
        },
      );

      return { bookStats: newStat };
    }
  },
);

const bookStatsSlice = createSlice({
  name: "bookStats",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchBookStatsByUser
    builder.addCase(fetchBookStatsByUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBookStatsByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      fetchBookStatsByUser.fulfilled,
      (state, action: PayloadAction<{ bookStats: BookStats[] }>) => {
        state.loading = false;
        state.error = null;
        state.bookStats = action.payload.bookStats;
      },
    );

    // newUpdateStats
    builder.addCase(updateBookStats.fulfilled, (state, action) => {
      const newBookStats = state.bookStats.filter(
        (bookStats) =>
          !(
            bookStats.book_id.toString() ===
              action.payload.bookStats.book_id.toString() &&
            bookStats.user_id.toString() ===
              action.payload.bookStats.user_id.toString()
          ),
      );
      newBookStats.push(action.payload.bookStats);
      state.bookStats = newBookStats;
    });
  },
});

export const { clearError } = bookStatsSlice.actions;
export default bookStatsSlice.reducer;
