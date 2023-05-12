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

export const fetchItemsForPage = async (
  pageNumber: number
): Promise<Item[]> => {
  const response = await fetch(routes.topStoriesPath());
  const [start, end] = getIndexesForPage(pageNumber);
  const ids = (await response.json()).slice(start, end);
  const stories = await fetchItems(ids);
  return stories;
};
