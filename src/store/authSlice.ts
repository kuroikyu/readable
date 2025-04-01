import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  error: string | null;
}

function isUser(maybe: any): maybe is User {
  return (
    maybe &&
    typeof maybe === "object" &&
    "id" in maybe &&
    "email" in maybe &&
    "password" in maybe
  );
}

function areUsers(maybe: any[]): maybe is User[] {
  return maybe.every((el) => isUser(el));
}

function getUserFromStorage(): User | null {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      return null;
    }
  }
  return null;
}

const initialState: AuthState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!getUserFromStorage(),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      if (!Array.isArray(users) || users.length === 0) {
        return rejectWithValue("Could not retrieve users from the database.");
      }
      if (!areUsers(users)) {
        return rejectWithValue(
          "The database contains invalid users. Please contact the administrator.",
        );
      }

      const user = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!user) {
        return rejectWithValue("Invalid credentials.");
      }

      // Don't try this at home
      const token = `not-a-jwt-token-${user.id}-${Date.now()}`;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { user, token };
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
    );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
