const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

const routes = {
  storyPath: (id) => `${baseUrl}item/${id}.json`,
  topStoriesPath: () => `${baseUrl}topstories.json`,
}

export default routes;
