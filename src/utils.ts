import { NEWS_PER_PAGE } from "./constants";

export const dateFormat = (time: number): string => {
  const hh = new Date(time * 1000).toLocaleTimeString("ru-RU").slice(0, -3);
  const dd = new Date(time * 1000).toLocaleDateString("ru-RU");
  return `${hh} ${dd}`;
};

export const getIndexesForPage = (pageNumber: number): [number, number] => {
  const start = (pageNumber - 1) * NEWS_PER_PAGE;
  const end =
    pageNumber * NEWS_PER_PAGE > 100 ? 100 : pageNumber * NEWS_PER_PAGE;

  return [start, end];
};
