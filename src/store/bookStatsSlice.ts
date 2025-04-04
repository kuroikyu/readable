import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookStats } from "./types";
import { RootState } from ".";

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
      const response = await fetch(
        `${API_BASE_URL}/book_stats?user_id=${userId}`,
      );

      if (!response.ok) {
        return rejectWithValue("Book stats not found");
      }

      // TODO: add type guards
      const bookStats = (await response.json()) as BookStats[];

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
  async (
    {
      userId,
      bookId,
      pageNumber,
      timeSpentInMs,
    }: {
      userId: string;
      bookId: string;
      pageNumber: number;
      timeSpentInMs: number;
    },
    { rejectWithValue, getState },
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/book_stats?user_id=${userId}&book_id=${bookId}`,
    );

    if (!response.ok) {
      return rejectWithValue("Failed to fetch book stats from the server");
    }

    const existingStats = await response.json();

    if (
      existingStats &&
      Array.isArray(existingStats) &&
      existingStats.length > 0
    ) {
      const currentData = getState() as RootState;
      // FIXME: userId is number?
      const bookStats = currentData.bookStats.bookStats.find((stat) => {
        return (
          stat.book_id.toString() === bookId.toString() &&
          stat.user_id.toString() === userId.toString()
        );
      });
      const previousTimeSpent =
        bookStats?.page_time[pageNumber.toString()] || 0;

      const patchResponse = await fetch(
        `${API_BASE_URL}/book_stats/${existingStats[0].id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page_time: {
              ...(bookStats?.page_time || {}),
              [pageNumber.toString()]: timeSpentInMs + previousTimeSpent,
            },
          }),
        },
      );

      if (!patchResponse.ok) {
        return rejectWithValue("Failed to update stats");
      }

      const updatedStat = (await patchResponse.json()) as BookStats;
      return { bookStats: updatedStat };
    } else {
      const createResponse = await fetch(`${API_BASE_URL}/book_stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: bookId.toString(),
          user_id: userId.toString(),
          page_time: {
            [pageNumber.toString()]: timeSpentInMs,
          },
        }),
      });

      if (!createResponse.ok) {
        return rejectWithValue("Failed to update reading statisticts");
      }

      const newStat = (await createResponse.json()) as BookStats;
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
