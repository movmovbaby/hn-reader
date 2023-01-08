import routes from '../routes.js';

export const fetchStory = async (id) => {
  try {
    const response = await fetch(routes.storyPath(id));
    const story = await response.json();
    return story;
  } catch (error) {
    console.log('Fetch story error', error);
  }
};

export const fetchTop100StoriesId = async () => {
  try {
    const response = await fetch(routes.topStoriesPath());
    const ids = await response.json();
    return ids.slice(0, 100);
  } catch (error) {
    console.log('Fetch Top 100 ids error', error)
  }
};
