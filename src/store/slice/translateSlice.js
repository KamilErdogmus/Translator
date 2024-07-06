import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";
const initialState = {
  isLoading: false,
  isError: false,
  answer: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.answer = "";
    });
    builder.addCase(translateText.rejected, (state, action) => {
      state.isError = action.error.message;
      state.isLoading = true;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isError = null;
      state.isLoading = false;
      state.answer = action.payload.translatedText;
    });
  },
});

export default translateSlice.reducer;
