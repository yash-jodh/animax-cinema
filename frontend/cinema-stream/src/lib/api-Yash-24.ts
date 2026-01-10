// src/lib/api.ts
const BASE_URL = 'https://api.jikan.moe/v4';

export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  releaseDate: string;
  synopsis: string;
  genre: string;
  url: string;
}

// Add this export so HeroSection.tsx can find it
export const featuredMovie: Movie = {
  id: 52299,
  title: "Solo Leveling",
  poster: "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABTcKY__erb2ov7my94vVknPFZQYh51kA3s0FDVN8ESvGRQhQ_FwdLS5M9XN4__aX6sNjbG1PnRBdnwxtswTwddRK_wk2aHiBtwPB.jpg?r=509",
  backdrop: "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABTcKY__erb2ov7my94vVknPFZQYh51kA3s0FDVN8ESvGRQhQ_FwdLS5M9XN4__aX6sNjbG1PnRBdnwxtswTwddRK_wk2aHiBtwPB.jpg?r=509",
  rating: 8.7,
  releaseDate: "2024",
  synopsis: "Ten years ago, 'the Gate' appeared and connected the real world with the realm of magic and monsters...",
  genre: "Action, Fantasy",
  url: "https://myanimelist.net/anime/52299/Ore_dake_Level_Up_na_Ken"
};

export const fetchMovies = async (category: string): Promise<Movie[]> => {
  let endpoint = `${BASE_URL}/top/anime`;
  if (category === 'action') endpoint = `${BASE_URL}/anime?genres=1`;
  if (category === 'topRated') endpoint = `${BASE_URL}/anime?order_by=score&sort=desc`;

  const response = await fetch(endpoint);
  const json = await response.json();

  return json.data.map((item: any) => ({
    id: item.mal_id,
    title: item.title,
    poster: item.images.jpg.large_image_url,
    backdrop: item.images.jpg.large_image_url,
    rating: item.score || 0,
    releaseDate: item.aired?.prop?.from?.year?.toString() || 'N/A',
    synopsis: item.synopsis || 'No description available.',
    genre: item.genres?.map((g: any) => g.name).join(', ') || 'Anime',
    url: item.url
  }));
};