import { createSlice } from "@reduxjs/toolkit";

export interface token {
  token: string;
  user: string;
}
const initialState: token = {
  token: "",
  user: "",
};

const getTokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { getToken, getUser, removeToken } = getTokenSlice.actions;
export default getTokenSlice.reducer;
