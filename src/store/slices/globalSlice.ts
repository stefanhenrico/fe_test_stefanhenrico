import { createSlice } from "@reduxjs/toolkit";

const updateLocalStorage = (state: any) => {
  localStorage.setItem("global", JSON.stringify(state));
};

const initialState = localStorage.getItem("global")
  ? JSON.parse(localStorage.getItem("global") as string)
  : {
      showDetails: false,
      incorrectAttempts: 0,
    };

const userSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobal: (state, action) => {
      const { showDetails, incorrectAttempts } = action.payload;

      state.showDetails = showDetails;
      state.incorrectAttempts = incorrectAttempts;

      updateLocalStorage({
        showDetails,
        incorrectAttempts,
      });
    },
  },
});

export const { setGlobal } = userSlice.actions;

export default userSlice.reducer;
