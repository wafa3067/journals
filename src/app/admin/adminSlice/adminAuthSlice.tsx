export interface Admin {
  id: number;

  name: string;
  email: string;
}

export interface AdminAuthState {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Login {
  token: string;
  admin: string;
  error: String;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
}

// 🟢 Admin Login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/login/login",
        null,
        {
          params: {
            username: credentials.username, // 👈 send as username
            password: credentials.password,
          },
        }
      );
      console.log("error is", res.data);
      if (res.status != 200) {
        console.log("error", res.status);
      }

      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.response?.data || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// 🟢 Admin Registration
export const adminRegister = createAsyncThunk(
  "admin/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/login/register",
        null,
        {
          params: {
            username: data.username, // 👈 send as username
            password: data.password,
          },
        }
      );
      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed";
      return rejectWithValue(message);
    }
  }
);

const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

const initialState: AdminAuthState = {
  admin: null,
  token: tokenFromStorage,
  loading: false,
  error: null,
  success: false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action: PayloadAction) => {
        state.loading = false;
        if (action.payload["error"] === "Invalid username or password ❌") {
          state.error = action.payload["error"];
        }
        state.admin = action.payload["admin"];
        state.token = action.payload["token"];
        localStorage.setItem("adminToken", action.payload["token"]);
      })
      .addCase(adminLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🔹 Register
      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminRegister.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminRegister.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
