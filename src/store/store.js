import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slice/languageSlice";
import translateReducer from "./slice/translateSlice";

export default configureStore({
  reducer: { languageReducer, translateReducer },
});
