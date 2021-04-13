import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import heroesAPI from "./heroesAPI";

export const fetchHeroes = createAsyncThunk(
  "users/fetchHeroes",
  async (numberToFetch, thunkAPI) => {
    const skip = thunkAPI.getState().heroesReducer.heroes.length;
    const response = await heroesAPI.fetchHeroes(numberToFetch, skip);
    return response.data;
  }
);

export const addHero = createAsyncThunk("users/addHero", async (hero, __) => {
  const response = await heroesAPI.addHero(hero);
  return response.data;
});

export const removeHero = createAsyncThunk(
  "users/removeHero",
  async (id, _) => {
    const response = await heroesAPI.removeHero(id);
    return response.data;
  }
);

export const heroesSlice = createSlice({
  name: "heroes",
  initialState: {
    heroes: [],
    total: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchHeroes.pending]: (state, _) => ({ ...state, loading: true }),
    [fetchHeroes.fulfilled]: (state, action) => ({
      ...state,
      heroes: [...state.heroes, ...action.payload.data],
      total: action.payload.total_count,
      loading: false,
    }),
    [fetchHeroes.rejected]: (state, _) => ({ ...state, loading: false }),
    [addHero.fulfilled]: (state, action) => ({
      ...state,
      heroes: [...state.heroes, action.payload],
    }),
    [removeHero.fulfilled]: (state, action) => ({
      ...state,
      heroes: state.heroes.filter((h) => h.id !== action.payload.id),
    }),
  },
});

export default heroesSlice.reducer;
