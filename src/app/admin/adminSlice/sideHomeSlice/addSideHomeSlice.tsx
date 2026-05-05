import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface sideHome {
  title: string;
  descriptions?: string;
}

export const createSideHomeSlice = createAsyncThunk(
  "home/about",
  async (aboutData: sideHome, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/home/side/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: aboutData.title,
          descriptions: aboutData.descriptions,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save about data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving about data");
    }
  },
);

export const editSideData = createAsyncThunk(
  "home/side",
  async (sideData: sideHome & { id: number }, { rejectWithValue }) => {
    try {
      //console.log("sideData in thunk is", sideData);
      const res = await fetch(
        `http://localhost:8080/home/side/update?id=${sideData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: sideData.title,
            desc: sideData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to save side data");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving side data");
    }
  },
);

export const deleteSideData = createAsyncThunk(
  "home/side/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8080/home/side/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to save side data");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving side data");
    }
  },
);

interface SideHomeState {
  about: sideHome | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SideHomeState = {
  about: null,
  loading: false,
  error: null,
  success: false,
};

const addSideHomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSideHomeSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSideHomeSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
        state.success = true;
      })
      .addCase(createSideHomeSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default addSideHomeSlice.reducer;
