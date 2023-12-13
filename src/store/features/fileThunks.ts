import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ExcelData,
  Person,
  Translation,
  tmdbMovieDetails,
  tmdbSeriesDetails,
} from "../../types/types";
import axios from "axios";
import { getEuropean, getIndependent } from "../../utils/getAttributes";

export {};

export const fetchDirectorById = createAsyncThunk(
  "files/fetchDirectorById",
  async (movie: ExcelData, { getState }) => {
    const { spi_code, type, tmdb_id, title } = movie;

    let urlType;
    if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {
      urlType = "tv";
    } else urlType = "movie";

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${urlType}/${tmdb_id}/credits?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
      },
    };

    try {
      const response = await axios(options);
      const data: { crew: Person[]; cast: Person[]; id: number } =
        response.data;

      const directors = data.crew.filter((item) => item.job === "Director");
      const cast = data.cast.filter((item, id) => id < 3);

      const cast_names = cast.map((item) => item.name).join(", ");
      const directors_names = directors.map((item) => item.name).join(", ");

      return { ...movie, director: directors_names, cast: cast_names };
    } catch (error) {
      return movie;
    }
  }
);

export const fetchMetadataById = createAsyncThunk(
  "files/fetchMetadataById",
  async (
    requestData: { movie: ExcelData; metadataOptions: string[] },
    { getState }
  ) => {
    const { movie, metadataOptions } = requestData;
    const {
      tmdb_id,
      genre,
      country,
      production_year,
      director,
      cast,
      duration,
      type,
      spi_code,
      Synopsis,
      title,
      original_title,
      original_language,
      production_companies,
      // attributes,
    } = movie;

    const excelData: any = {
      ["production_year"]: production_year || "",
      ["country"]: country || "",
      ["genre"]: genre || "",
      ["duration"]: duration || "",
      ["synopsis"]: Synopsis || "",
      ["original_title"]: original_title || "",
      ["original_language"]: original_language || "",
      ["production_companies"]: production_companies || "",
      ["attributes"]: "",
    }; // metadata from movie

    // Create empty object with metadata keys
    const emptyOptionsObj: any = {};
    for (const key of metadataOptions) {
      emptyOptionsObj[key] = "";
    }

    // Check if movie already has all metadata OR metadata options/tmdb/imdb were not provided
    if (
      metadataOptions.every((option) => !!excelData[option]) ||
      !metadataOptions ||
      !tmdb_id
    ) {
      return { ...movie, ...emptyOptionsObj };
    }

    // Setting type & url (tv/movie)
    const movieType =
      type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)
        ? "tv"
        : "movie";
    const url = `https://api.themoviedb.org/3/${movieType}/${tmdb_id}?language=en-US`;

    try {
      // Declaring variables for data from tmdb
      let tmdb_production_year,
        tmdb_countries,
        tmdb_genres,
        tmdb_duration,
        tmdb_synopsis,
        tmdb_original_title,
        tmdb_original_language,
        tmdb_production_companies,
        tmdb_countries_iso;
      // Making request
      const options = {
        method: "GET",
        url,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
        },
      };

      const response = await axios(options);

      if (type?.toLowerCase() === "series" || spi_code?.startsWith("SPY")) {
        const data: tmdbSeriesDetails = response.data;
        if (!title) movie.title = data.name;
        tmdb_original_title = data.original_name;
        tmdb_synopsis = data.overview;
        tmdb_duration = data.episode_run_time[0];
        tmdb_genres = data.genres.map((item) => item.name).join(", ");
        tmdb_countries = data.production_countries
          .map((item) => item.iso_3166_1)
          .join(", ");

        tmdb_countries_iso = data.production_countries
          .map((item) => item.iso_3166_1)
          .join(",");
        tmdb_production_companies = data.production_companies
          .map((item) => item.name)
          .join(", ");
        tmdb_production_year = Number(data.first_air_date.slice(0, 4));
        tmdb_original_language = data.original_language;
      } else {
        const data: tmdbMovieDetails = response.data;

        if (!title) movie.title = data.title;
        tmdb_original_title = data.original_title;
        tmdb_synopsis = data.overview;
        tmdb_genres = data.genres.map((item) => item.name).join(", ");
        tmdb_countries = data.production_countries
          .map((item) => item.name)
          .join(", ");
        tmdb_countries_iso = data.production_countries
          .map((item) => item.iso_3166_1)
          .join(", ");
        tmdb_production_companies = data.production_companies
          .map((item) => item.name)
          .join(", ");
        tmdb_duration = data.runtime;
        tmdb_production_year = Number(data.release_date.slice(0, 4));
        tmdb_original_language = data.original_language;
      }

      const eu = getEuropean(tmdb_countries);
      const independent = getIndependent(tmdb_production_companies);

      const attributes = eu
        ? independent
          ? eu + ", " + independent
          : eu
        : independent;

      const keys: any = {
        ["production_year"]: production_year || tmdb_production_year || "",
        ["country"]: country || tmdb_countries || "",
        ["genre"]: genre?.toLowerCase() || tmdb_genres?.toLowerCase() || "",
        ["duration"]: duration || tmdb_duration || "",
        ["synopsis"]: Synopsis || tmdb_synopsis || "",
        ["original_title"]: tmdb_original_title || "",
        ["original_language"]: original_language || "",
        ["production_companies"]: tmdb_production_companies || "",
        ["attributes"]: attributes,
      };

      // Getting only metadata that was requested in options
      const result: { [key: string]: string } = {};
      if (metadataOptions) {
        for (const option of metadataOptions) {
          if (keys.hasOwnProperty(option)) {
            result[option] = keys[option];
          }
        }
      }

      // console.log(movie, result);
      return { ...movie, ...result };
    } catch (error) {
      return { ...movie, ...emptyOptionsObj };
    }
  }
);

export const fetchTranslationsById = createAsyncThunk(
  "files/fetchTranslationsById",
  async (
    requestData: { movie: ExcelData; options: string[] },
    { getState }
  ) => {
    const { movie, options: translationsOptions } = requestData;
    const { tmdb_id, spi_code, type } = movie;

    // Getting empty objects with keys
    const emptyTitleKeys = translationsOptions.map((item) => {
      return { [`Title ${item}`]: " " };
    });
    const emptySynopsisKeys = translationsOptions.map((item) => {
      return { [`Synopsis ${item}`]: " " };
    });
    const spreadEmptyTitle = Object.assign({}, ...emptyTitleKeys);
    const spreadEmptySynopsis = Object.assign({}, ...emptySynopsisKeys);

    // Return with empty objects (to maintain columns keys in Excel)
    if (!tmdb_id) {
      return { ...movie, ...spreadEmptyTitle, ...spreadEmptySynopsis };
    }

    // Get movie type & url
    const movieType =
      type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)
        ? "tv"
        : "movie";

    const url = `https://api.themoviedb.org/3/${movieType}/${tmdb_id}/translations`;

    try {
      const options = {
        method: "GET",
        url,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
        },
      };

      const response = await axios(options);
      const translations: Translation[] = response.data.translations;
      const filteredTranslations = translations.filter((translation) =>
        translationsOptions.includes(translation.iso_3166_1)
      );
      const titleKeys = translationsOptions.map((item) => {
        const translation = filteredTranslations.find(
          (translation) => translation.iso_3166_1 === item
        );
        const key = `Title ${item}`;
        const value = translation
          ? translation?.data?.name || translation?.data?.title || ""
          : "";
        const result = { [key]: value };
        return result;
      });
      const synopsisKeys = translationsOptions.map((item) => {
        return {
          [`Synopsis ${item}`]:
            filteredTranslations.find(
              (translation) => translation.iso_3166_1 === item
            )?.data?.overview || "",
        };
      });
      const spreadTitleKeys = Object.assign({}, ...titleKeys);
      const spreadSynopsisKeys = Object.assign({}, ...synopsisKeys);

      return { ...movie, ...spreadTitleKeys, ...spreadSynopsisKeys };
    } catch (error) {
      return { ...movie, ...emptyTitleKeys, ...emptySynopsisKeys };
    }
  }
);

export const fetchTmdbId = createAsyncThunk(
  "files/fetchTmdbId",
  async (movie: ExcelData, { getState }) => {
    const { imdb_id, tmdb_id, type, spi_code } = movie;

    const corrImdb = imdb_id
      ?.toString()
      .slice(imdb_id?.toString().indexOf("/tt") + 1);
    const ttId =
      corrImdb?.indexOf("/") === -1
        ? corrImdb
        : corrImdb?.slice(0, corrImdb?.indexOf("/"));

    if (tmdb_id || !imdb_id || !ttId) {
      return movie;
    }

    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/find/${ttId}?external_source=imdb_id`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
        },
      };

      const response = await axios(options);
      let id: string | null;
      if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {
        id = response.data.tv_results[0].id;
      } else {
        id = response.data.movie_results[0].id;
      }
      return { ...movie, tmdb_id: id };
    } catch (error) {
      return { ...movie, tmdb_id: "" };
    }
  }
);
