import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchStories, fetchTop100StoriesId, fetchStory } from '../api/hn-api.js';

export const getStories = createAsyncThunk(
  'stories/getStories',
  async () => {
    const ids = await fetchTop100StoriesId();
    const stories = await fetchStories(ids);
    return stories;
  },
);

export const getStoryById = createAsyncThunk(
  'stories/getStoryById',
  async (id) => {
    const story = await fetchStory(id);
    return story;
  },
)

const storiesAdapter = createEntityAdapter();

const storiesSlice = createSlice({
  name: 'stories',
  initialState: storiesAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {
    addStory: storiesAdapter.addOne,
    updateStory: storiesAdapter.updateOne,
    addStories: storiesAdapter.setAll,
  }
  ,
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        storiesAdapter.setAll(state, action.payload);
      })
      .addCase(getStoryById.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getStoryById.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        storiesAdapter.addOne(state, action.payload);
      })
  },
})

export const { actions } = storiesSlice;
export const selectors = storiesAdapter.getSelectors((state) => state.stories);
export default storiesSlice.reducer;
