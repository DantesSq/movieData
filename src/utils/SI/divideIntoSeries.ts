import { ExcelData } from "../../types/types";

export type Series = {
  series_spi?: string | null;
  title?: string | null;
  Seasons?: Episodes[][];
  duration: number | null;
  year_from: string | null | number;
  year_until: string | null | number;

  genre: string | null;
  number_of_episodes: number;
  country: string | null;

  Channels: string;
};

type Episodes = {
  episode_title: string | null;
  episode_spi: string | null;
  duration: string | null;
  episode_number: number;
  year: string | null | number;
};

export const divideIntoSeries = (data: ExcelData[]) => {
  let currentSeriesTitle;
  let seriesArr: Series[] = [];
  let currentSeries: Series | undefined = undefined;
  let episodesArr: Episodes[] = [];
  let currentSeason: string | undefined = "01";

  for (const index in data) {
    const episode = data[index];
    console.log(episode);
    if (
      !episode.spi_code?.startsWith("SPY") &&
      episode.type?.toLowerCase() !== "series"
    ) {
      console.log("You messed up here");
      continue;
    }

    let episodeSeason = episode.spi_code?.slice(10, 12);
    if (episodeSeason === "00") episodeSeason = "01";

    if (!currentSeriesTitle || !currentSeries) {
      currentSeriesTitle = episode.series_title;
      currentSeries = {
        title: episode.series_title,
        series_spi: episode.spi_code?.slice(0, 9),
        duration: episode.series_duration,
        year_from: episode.production_year,
        year_until: episode.production_year,
        genre: episode.genre,
        number_of_episodes: 0,
        country: episode.country,
        Seasons: [],
        Channels: episode.Channels || "",
      };

      episodesArr = [];
      episodesArr.push({
        episode_title: episode.episode_title || ``,
        episode_spi: episode.spi_code,
        duration: episode.duration,
        episode_number: Number(index) + 1,
        year: episode.production_year,
      });
      currentSeries.number_of_episodes += 1;
      currentSeason = episodeSeason;
      currentSeries.year_until = episode.production_year;
    } else if (
      currentSeason != episodeSeason &&
      currentSeriesTitle === episode.series_title
    ) {
      currentSeries.Seasons?.push(episodesArr);
      episodesArr = [];
      currentSeason = episodeSeason;
      episodesArr.push({
        episode_title: episode.episode_title || ``,
        episode_spi: episode.spi_code,
        duration: episode.duration,
        episode_number: Number(index) + 1,
        year: episode.production_year,
      });
      currentSeries.number_of_episodes += 1;
    } else if (currentSeriesTitle !== episode.series_title) {
      currentSeries.Seasons?.push(episodesArr);
      seriesArr.push(currentSeries);

      currentSeriesTitle = episode.series_title;
      currentSeries = {
        title: episode.series_title,
        series_spi: episode.spi_code?.slice(0, 9),
        duration: episode.series_duration,
        year_from: episode.production_year,
        year_until: episode.production_year,
        genre: episode.genre,
        number_of_episodes: 0,
        country: episode.country,
        Seasons: [],
        Channels: episode.Channels || "",
      };
      episodesArr = [];

      episodesArr.push({
        episode_title: episode.episode_title || ``,
        episode_spi: episode.spi_code,
        duration: episode.duration,
        episode_number: Number(index) + 1,
        year: episode.production_year,
      });
      currentSeries.number_of_episodes += 1;
    } else {
      episodesArr.push({
        episode_title: episode.episode_title || ``,
        episode_spi: episode.spi_code,
        duration: episode.duration,
        episode_number: Number(index) + 1,
        year: episode.production_year,
      });
      currentSeries.number_of_episodes += 1;
    }

    if (Number(index) + 1 === data.length) {
      currentSeries.Seasons?.push(episodesArr);
      seriesArr.push(currentSeries);
    }
  }

  return seriesArr;
};
