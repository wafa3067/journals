// src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Identity {
  givenName?: string;
  familyName?: string;
  publicName?: string;
}

export interface UserState {
  user: Identity | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

// ✅ Async thunk to update identity
export const updateIdentity = createAsyncThunk<
  string, // response type (String message)
  { updatedUser: Partial<Identity> }, // payload type
  { rejectValue: string }
>("user/updateIdentity", async ({ updatedUser }, { rejectWithValue }) => {
  try {
    // get token (optional)
    const token = await localStorage.getItem("token");
    const email = await localStorage.getItem("email");

    const response = await axios.post(
      `http://localhost:8080/api/update/identity?email=${email}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to update user identity");
    }

    return response.data as string; // "User identity updated successfully!"
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to update user identity"
    );
  }
});

const updateidentitySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUpdateIdentity(state, action: PayloadAction<Identity>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateIdentity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateIdentity.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // success message from backend
      })
      .addCase(updateIdentity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setUpdateIdentity } = updateidentitySlice.actions;
export default updateidentitySlice.reducer;
