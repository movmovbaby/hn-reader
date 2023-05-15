// import {
//   createAsyncThunk,
//   createSlice,
//   createEntityAdapter,
// } from "@reduxjs/toolkit";
// import { fetchItemsForPage, fetchItem, fetchIds } from "../api/hn-api";
// import { Id, Item } from "../types/index";
// import { RootState } from "./index";

// export const getIds = createAsyncThunk(
//   "ids/getIds",
//   async (): Promise<Id[]> => {
//     const ids: Id[] = await fetchIds();
//     return ids;
//   }
// );

// const storiesAdapter = createEntityAdapter<Item>();

// const storiesSlice = createSlice({
//   name: "ids",
//   initialState: storiesAdapter.getInitialState({
//     loadingStatus: "idle",
//     error: null,
//   }),
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getIds.fulfilled, (state, action) => {
//         state.loadingStatus = "idle";
//         storiesAdapter.setAll(state, action.payload);
//       });
//   },
// });

// export const { actions } = storiesSlice;
// export const selectors = storiesAdapter.getSelectors(
//   (state: RootState) => state.stories
// );
// export default storiesSlice.reducer;
