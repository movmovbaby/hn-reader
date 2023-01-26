import { /* createAsyncThunk, */ createSlice, createEntityAdapter } from '@reduxjs/toolkit';
//import { fetchStories, fetchTop100StoriesId } from '../api/hn-api.js';

// export const getStories = createAsyncThunk(
//   'stories/getStories',
//   async () => {
//     console.log('thunk getStories');
//     const ids = await fetchTop100StoriesId();
//     const stories = await fetchStories(ids);
//     return stories;
//   }
// );

const storiesAdapter = createEntityAdapter();

const storiesSlice = createSlice({
  name: 'stories',
  initialState: storiesAdapter.getInitialState(),/* { loadingStatus: 'idle', error: null } */
  reducers: {
    addStory: storiesAdapter.addOne,
    updateStory: storiesAdapter.updateOne,
    addStories: storiesAdapter.setAll,
  }
  /* ,
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        console.log(action);
        state.loadingStatus = 'idle';
        storiesAdapter.setAll(state, action.payload.stories);
      })
  } */
})

export const { actions } = storiesSlice;
export const selectors = storiesAdapter.getSelectors((state) => state.stories);
export default storiesSlice.reducer;
