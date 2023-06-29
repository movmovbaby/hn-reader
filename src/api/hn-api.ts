import { Id, Item } from "../types/index";
import routes from "../routes";
import { getIndexesForPage } from "../utils";

export const fetchItem = async (id: Id): Promise<Item> => {
  const response = await fetch(routes.storyPath(id));
  const story: Item = await response.json();
  return story;
};

export const fetchItems = async (ids: Id[]): Promise<Item[]> => {
  const stories = await Promise.all(ids.map(fetchItem));
  return stories;
};

export const fetchIds = async (): Promise<Id[]> => {
  const response = await fetch(routes.topStoriesPath());
  const ids = await response.json();
  return ids.slice(0, 100);
};

export const fetchItemsForPage = async (
  pageNumber: number
): Promise<Item[]> => {
  const response = await fetch(routes.topStoriesPath());
  const [start, end] = getIndexesForPage(pageNumber);
  const ids = await response.json();
  const idsToStore = ids.slice(0, end);
  const stories = await fetchItems(idsToStore);
  return stories;
};
