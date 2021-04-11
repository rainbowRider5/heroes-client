import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "./slices/heroesSlice";

export default configureStore({
  reducer: { heroesReducer },
});
