import axios from 'axios';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const newsService = {
  fetchPremierLeagueNews: async (): Promise<NewsArticle[]> => {
    const url = "https://newsapi.org/v2/everything";
    const params = {
      q: "Premier League 2024/25",
      sortBy: "publishedAt",
      language: "en",
      pageSize: 20,
      apiKey: "4a0db780c0f24af3a24635b94386cc42",
    };

    try {
      const response = await axios.get(url, { params });
      if (response.data.status === "ok") {
        return response.data.articles as NewsArticle[];
      } else {
        console.error("News API returned non-ok status:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  }
};
