import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import typesAPI from "./typesAPI"

export const fetchTypes = createAsyncThunk(
  'users/fetchTypes',
  async (_, __) => {
    const response = await typesAPI.fetchTypes()
    return response.data
  }
)

export const typesSlice = createSlice({
    name: 'types',
    initialState: {
        types: [],
        loading: false,
    },
    reducers: {
    },
    extraReducers: {
        [fetchTypes.pending]: (state, _) => ({...state, loading: true}),
        [fetchTypes.fulfilled]: (_, action) => ({types: action.payload, loading: false}),
        [fetchTypes.rejected]: (state, _) => ({...state, loading: false}),
  }
})

export default typesSlice.reducer