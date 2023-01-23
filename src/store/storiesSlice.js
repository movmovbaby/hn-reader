import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const storiesAdapter = createEntityAdapter();

const storiesSlice = createSlice({
  name: 'stories',
  initialState: storiesAdapter.getInitialState(),
  reducers: {
    addStory: storiesAdapter.addOne,
    updateStory: storiesAdapter.updateOne,
    addStories: storiesAdapter.addMany,
  }
})

export const { actions } = storiesSlice;
export const selectors = storiesAdapter.getSelectors((state) => state.stories);
export default storiesSlice.reducer;
