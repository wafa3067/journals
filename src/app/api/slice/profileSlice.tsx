import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Language {
  id?: number;
  languageName: string;
}

export interface User {
  id: number;
  givenName: string;
  publicName: string | null;
  signature: string | null;
  phone: string | null;
  maillingAddress: string | null;
  role: string;
  familyName: string;
  affiliation: string;
  country: string;
  email: string;
  username: string;
  password: string;
  privacyAgree: boolean;
  enableNotification: boolean;
  review: boolean;
  profile: string;
  bio: string;
  homeurl: string;
  orcid_id: string;
  emailVerified: boolean;
  languagesList: Language[];
}

const initialState: {
  user: User | null;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Async thunk to get user by email with token
export const fetchUserByEmail = createAsyncThunk(
  "user/fetchByEmail",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get token from state or localStorage
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const response = await axios.get(
        `http://localhost:8080/api/find?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in header
          },
        }
      );

      return response.data["user"] as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ Update a single field locally
    updateField: (
      state,
      action: PayloadAction<{ field: keyof User; value: any }>
    ) => {
      if (state.user) {
        const { field, value } = action.payload;
        (state.user[field] as any) = value;
      }
    },

    // ✅ Clear user (on logout)
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateField, clearUser } = userSlice.actions;
export default userSlice.reducer;
