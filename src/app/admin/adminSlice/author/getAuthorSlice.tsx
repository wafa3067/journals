import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Author } from "./addAuthorSlice";

export interface GetAuthor {
  id: number;
  descriptions?: string;
}

export const GetAuthors = createAsyncThunk(
  "home/author/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://generous-love-production-3a3d.up.railway.app/home/author/get",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save about data",
        );
      }

      const data = await res.json();
      console.log("Fetched team data:", data); // Debug log
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving about data");
    }
  },
);

interface GetAuthorState {
  getAuthors: GetAuthor[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetAuthorState = {
  getAuthors: [],
  loading: false,
  error: null,
  success: false,
};

const getAuthorSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GetAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.getAuthors = action.payload;
        state.success = true;
      })
      .addCase(GetAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getAuthorSlice.reducer;
