import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "./slices/heroes/heroesSlice";
import typesReducer from "./slices/types/typesSlice";

export default configureStore({
  reducer: { heroesReducer, typesReducer },
});
