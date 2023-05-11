import { Id, Item } from "../types/index";
import routes from "../routes";
import { NEWS_LIMIT } from "../constants";

export const fetchItem = async (id: Id): Promise<Item> => {
  const response = await fetch(routes.storyPath(id));
  const story: Item = await response.json();
  return story;
};

export const fetchItems = async (ids: Id[]): Promise<Item[]> => {
  const stories = await Promise.all(ids.map(fetchItem));
  return stories;
};

export const fetchTop100Items = async (): Promise<Item[]> => {
  const response = await fetch(routes.topStoriesPath());
  const ids = (await response.json()).slice(0, NEWS_LIMIT);
  const stories = await fetchItems(ids);
  return stories;
};
