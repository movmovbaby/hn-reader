import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './storiesSlice.js';

const store = configureStore({
  reducer: {
    stories: storiesReducer,
  }
});

export default store;
