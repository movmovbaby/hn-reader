import routes from "../routes";
import { Id, Item } from "../types/index";

const fetchTop100ItemsId = async (): Promise<Id[]> => {
  const response = await fetch(routes.topStoriesPath());
  const ids = await response.json();
  // if (response.ok) {
  return ids.slice(0, 100);
  // } else {
  //   return Promise.reject(
  //     new Error("Failed to load top 100 strories ids", response.statusText)
  //   );
  // }
};

export const fetchItem = async (id: Id): Promise<Item> => {
  const response = await fetch(routes.storyPath(id));
  const story: Item = await response.json();
  // if (!response.ok) {
  //   throw new Error("Network response was not OK");
  // } else {
  return story;
  // }
};

const fetchItems = async (ids: Id[]): Promise<Item[]> => {
  // try {
  const stories = await Promise.all(ids.map(fetchItem));
  return stories;
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return Promise.reject(new Error("Failed to load top 100 strories", error));
  //   } else {
  //     return Promise.reject(new Error())
  //   }
  // }
};

export const fetchTop100Items = async (): Promise<Item[]> => {
  // try {
  const ids = await fetchTop100ItemsId();
  const stories = await fetchItems(ids);
  return stories;
  // } catch (error) {
  //   return Promise.reject(new Error("Failed to load top 100 strories", error));
  // }
};

export const fetchComments = async (kids: Id[]): Promise<Item[]> => {
  // try {
  const comments = fetchItems(kids);
  return comments;
  // } catch (error) {
  //   return Promise.reject(new Error("Failed to load top comments", error));
  // }
};
