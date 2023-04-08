import { Id } from "./types/index";

const baseUrl = "https://hacker-news.firebaseio.com/v0/";

const routes = {
  storyPath: (id: Id): string => `${baseUrl}item/${id}.json`,
  topStoriesPath: (): string => `${baseUrl}topstories.json`,
};

export default routes;
