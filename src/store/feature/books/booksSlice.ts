import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "@/lib/client";
import { AuthToken } from "@/lib/apiClient";
import {
  areBooksWithPages,
  BookOverview,
  BookWithPages,
  isBookWithPages,
} from "@/store/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "FATAL ERROR: VITE_API_BASE_URL environment variable is not set!",
  );
}

export interface BooksState {
  books: BookOverview[] | null;
  activeBook: BookWithPages | null;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  activeBook: null,
  loading: true,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const books = await client.get("/books");

      if (!Array.isArray(books) || books.length === 0) {
        return rejectWithValue("Could not retrieve books from the database.");
      }

      if (!areBooksWithPages(books)) {
        return rejectWithValue(
          "The database contains invalid books. Please contact the administrator.",
        );
      }

      // NOTE: this is so we can drop `pages` and return it only when we fetch a single book
      const processedBooks: BookOverview[] = books.map((book) => ({
        id: book.id,
        author: book.author,
        blurb: book.blurb,
        title: book.title,
        noOfPages: book.pages.length,
        cover: `${API_BASE_URL}${book.cover}`,
      }));

      return { books: processedBooks };
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

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (
    { bookId, authToken }: { bookId: string; authToken: AuthToken },
    { rejectWithValue },
  ) => {
    try {
      client.setAuthToken(authToken);

      const book = await client.get(`/books/${bookId}`);

      if (!isBookWithPages(book)) {
        return rejectWithValue(
          "This book is invalid. Please contact the administrator.",
        );
      }

      return { book };
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

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchBooks
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      fetchBooks.fulfilled,
      (state, action: PayloadAction<{ books: BookOverview[] }>) => {
        state.loading = false;
        state.error = null;
        state.books = action.payload.books;
      },
    );

    // fetchBookById
    builder.addCase(fetchBookById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      fetchBookById.fulfilled,
      (state, action: PayloadAction<{ book: BookWithPages }>) => {
        state.loading = false;
        state.error = null;
        state.activeBook = action.payload.book;
      },
    );
  },
});

export const { clearError } = bookSlice.actions;
export default bookSlice.reducer;
