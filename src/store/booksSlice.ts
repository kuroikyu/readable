import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "FATAL ERROR: VITE_API_BASE_URL environment variable is not set!",
  );
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  pages: string[];
}

interface BooksState {
  books: Book[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  loading: true,
  error: null,
};

function isBook(maybe: any): maybe is Book {
  return (
    maybe &&
    typeof maybe === "object" &&
    "id" in maybe &&
    "title" in maybe &&
    "author" in maybe &&
    "description" in maybe &&
    "cover" in maybe &&
    "pages" in maybe
  );
}

function areBooks(maybe: any): maybe is Book[] {
  return (
    maybe &&
    typeof maybe === "object" &&
    Array.isArray(maybe) &&
    maybe.every(isBook)
  );
}

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);

      if (!response.ok) {
        return rejectWithValue("Server error");
      }

      const books = await response.json();

      if (!Array.isArray(books) || books.length === 0) {
        return rejectWithValue("Could not retrieve books from the database.");
      }

      if (!areBooks(books)) {
        return rejectWithValue(
          "The database contains invalid books. Please contact the administrator.",
        );
      }

      const processedBooks = books.map((book) => ({
        ...book,
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

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
      (state, action: PayloadAction<{ books: Book[] }>) => {
        state.loading = false;
        state.error = null;
        state.books = action.payload.books;
      },
    );
  },
});

export const { clearError } = bookSlice.actions;
export default bookSlice.reducer;
