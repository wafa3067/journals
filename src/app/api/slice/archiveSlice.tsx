import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ------------------ HELPERS ------------------ */
const normalizeDate = (dateStr: string) =>
  new Date(dateStr).toISOString().split("T")[0];

/* ------------------ THUNK ------------------ */
export const fetchArchiveArticles = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("archive/fetchByUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:8080/api/get");

    console.log("Fetched archive articles:", response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

/* ------------------ SLICE ------------------ */
const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchiveArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.map((article: any) => ({
          ...article,
          createdAt: normalizeDate(article.createdAt), // ✅ YYYY-MM-DD
        }));
      })
      .addCase(fetchArchiveArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load articles";
      });
  },
});

export default archiveSlice.reducer;
