// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  tokenValid: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  tokenValid: null,
  loading: false,
  error: null,
};

// Async thunk to check token
export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const res = await axios.get(
        `http://localhost:8080/api/validate-token?token=${token}`
      );

      if (!res.data.valid) {
        return rejectWithValue("Token expired");
      }

      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Token check failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.tokenValid = false;
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkToken.fulfilled, (state) => {
        state.loading = false;
        state.tokenValid = true;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.loading = false;
        state.tokenValid = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
