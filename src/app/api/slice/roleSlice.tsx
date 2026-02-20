import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Role {
  name: string;
}

interface UserState {
  roles: Role[];
  review: string;
  message: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  roles: [],
  review: "",
  message: null,
  loading: false,
  error: null,
};

// 🔹 Async Thunk to update role list
export const updateRole = createAsyncThunk(
  "user/updateRole",
  async ({ review, roles }: { review: string; roles: Role[] }, thunkAPI) => {
    try {
      // get token (optional)
      const token = await localStorage.getItem("token");
      const email = await localStorage.getItem("email");
      const response = await axios.post(
        `http://localhost:8080/api/update/role?email=${email}`,
        { review: review, role: roles },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: string | any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update role",
      );
    }
  },
);

const roleSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRoles } = roleSlice.actions;
export default roleSlice.reducer;
