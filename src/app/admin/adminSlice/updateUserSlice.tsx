// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define User type
export interface User {
  id: number;
  name: string;
  status: string;
}

// Define initial state type
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  message: null,
};

// Async thunk for updating user status
export const updateUserStatus = createAsyncThunk<
  { id: number; status: string; message: string },
  { id: number; status: string },
  { rejectValue: { error: string } }
>("user/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `http://journalsbackend-env.eba-ebzkqbct.ap-northeast-1.elasticbeanstalk.com/admin/users/status/${id}`,
      null,
      {
        params: { status },
      },
    );
    console.log("Update response:", response.data);
    return { id, status, message: response.data.message };
  } catch (err: unknown) {
    let message = "Login failed";

    if (axios.isAxiosError(err) && err.response) {
      message = String(err.response.data.error);
    }
    return rejectWithValue({
      error: message || "Failed to update status",
    });
  }
});

// Async thunk for deleting user
export const deleteUser = createAsyncThunk<
  { id: number; message: string },
  number,
  { rejectValue: { error: string } }
>("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `http://journalsbackend-env.eba-ebzkqbct.ap-northeast-1.elasticbeanstalk.com/users/delete/${id}`,
    );
    return { id, message: response.data.message };
  } catch (err: unknown) {
    let message = "Login failed";

    if (axios.isAxiosError(err) && err.response) {
      message = String(err.response.data.error);
    }
    return rejectWithValue({
      error: message || "Failed to delete user",
    });
  }
});

const UpdateUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status, message } = action.payload;
        state.users = state.users.map((user) =>
          user.id === id ? { ...user, status } : user,
        );
        state.message = message;
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Unknown error";
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id, message } = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
        state.message = message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Unknown error";
      });
  },
});

export const { setUsers } = UpdateUserSlice.actions;
export default UpdateUserSlice.reducer;
