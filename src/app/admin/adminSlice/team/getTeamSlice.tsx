import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Team } from "./addTeamSlice";

export interface GetTeam {
  id: number;
  title: string;
  assignOrder: number;
  team: Team[];
}

export const GetTeamThunk = createAsyncThunk(
  "home/about",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/category/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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

interface GetTeamState {
  getTeam: GetTeam[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetTeamState = {
  getTeam: [],
  loading: false,
  error: null,
  success: false,
};

const getTeamSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTeamThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GetTeamThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getTeam = action.payload;
        state.success = true;
      })
      .addCase(GetTeamThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getTeamSlice.reducer;
