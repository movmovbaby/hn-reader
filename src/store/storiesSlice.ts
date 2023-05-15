import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchItemsForPage, fetchItem, fetchIds } from "../api/hn-api";
import { Id, Item } from "../types/index";
import { RootState } from "./index";

export const getStories = createAsyncThunk<Item[], number>(
  "stories/getStories",
  async (pageNumber: number): Promise<Item[]> => {
    const stories: Item[] = await fetchItemsForPage(pageNumber);
    return stories;
  }
);

export const getStoryById = createAsyncThunk<Item, Id>(
  "stories/getStoryById",
  async (id: Id): Promise<Item> => {
    const story: Item | string = await fetchItem(id);
    return story;
  }
);

export const getIds = createAsyncThunk(
  "stories/getIds",
  async (): Promise<Id[]> => {
    const ids: Id[] = await fetchIds();
    return ids;
  }
);

const storiesAdapter = createEntityAdapter<Item>();

const storiesSlice = createSlice({
  name: "stories",
  initialState: storiesAdapter.getInitialState({
    loadingStatus: "idle",
    error: null,
  }),
  reducers: {
    addStory: storiesAdapter.addOne,
    updateStory: storiesAdapter.updateOne,
    addStories: storiesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        storiesAdapter.addMany(state, action.payload);
      })
      .addCase(getStoryById.pending, (state) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(getStoryById.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        storiesAdapter.addOne(state, action.payload);
      });
    // .addCase(getIds.fulfilled, (state, action) => {
    //   state.loadingStatus = "idle";
    //   storiesAdapter.setAll(state, action.payload);
    // });
  },
});

export const { actions } = storiesSlice;
export const selectors = storiesAdapter.getSelectors(
  (state: RootState) => state.stories
);
export default storiesSlice.reducer;
