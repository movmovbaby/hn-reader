import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchTop100Items, fetchItem } from "../api/hn-api";
import { Id, Item } from "../types/index";
import { RootState } from "./index";

export const getStories = createAsyncThunk(
  "stories/getStories",
  async (): Promise<Item[]> => {
    const stories = await fetchTop100Items();
    return stories as Item[];
  }
);

export const getStoryById = createAsyncThunk(
  "stories/getStoryById",
  async (id: Id): Promise<Item> => {
    const story = await fetchItem(id);
    return story as Item;
  }
);

const storiesAdapter = createEntityAdapter();

const storiesSlice = createSlice({
  name: "stories",
  initialState: storiesAdapter.getInitialState({
    loadingStatus: "idle",
    error: null,
  }),
  reducers: {
    addStory: storiesAdapter.addOne,
    updateStory: storiesAdapter.updateOne,
    addStories: storiesAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        storiesAdapter.setAll(state, action.payload);
      })
      .addCase(getStoryById.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(getStoryById.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        storiesAdapter.addOne(state, action.payload);
      });
  },
});

export const { actions } = storiesSlice;
export const selectors = storiesAdapter.getSelectors(
  (state: RootState) => state.stories
);
export default storiesSlice.reducer;
