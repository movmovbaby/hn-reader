import routes from '../routes.js';

const fetchTop100ItemsId = async () => {
  const response = await fetch(routes.topStoriesPath());
  const ids = await response.json();
  if (response.ok) {
    return ids.slice(0, 100);
  } else {
    return Promise.reject(new Error("Failed to load top 100 strories ids"));
  }
};

export const fetchItem = async (id) => {
  const response = await fetch(routes.storyPath(id));
  const story = await response.json();
  if (response.ok) {
    return story;
  } else {
    return Promise.reject(new Error("Failed to load story from HN"));
  }
};

const fetchItems = async (ids) => {
  try {
    const stories = await Promise.all(ids.map(fetchItem));
    return stories;
  } catch (error) {
    return Promise.reject(new Error("Failed to load top 100 strories", error));
  }
};

export const fetchTop100Items = async () => {
  try {
    const ids = await fetchTop100ItemsId();
    const stories = await fetchItems(ids);
    return stories;
  } catch (error) {
    return Promise.reject(new Error("Failed to load top 100 strories", error));
  }
};

export const fetchComments = async (kids) => {
  try {
    const comments = fetchItems(kids);
    return comments;
  } catch (error) {
    return Promise.reject(new Error("Failed to load top comments", error));
  }
};
