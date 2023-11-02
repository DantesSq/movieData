import axios from "axios";
import { ExcelData, tmdbMovieDetails, tmdbSeriesDetails } from "../types/types";

const getMetadataFromTMDB = async (movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void) => {
    const {tmdb_id, genre, country, production_year, director,cast, duration, type, spi_code} = movie
    if (!tmdb_id) {
      setUpdatedFile((prev: ExcelData[]) => [
        ...prev,
        { ...movie, 
          production_year: ' ',
          country: ' ',
          duration: ' ',
          genre: ' ',
          Synopsis: ' ',
        Status: 'no tmdb'},
      ]);
      return;
    }
    try {
      if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/tv/${tmdb_id}?language=en-US`, // series
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFmOTE4ZjQ4N2MyMzA0NmFlZDA4MTY2ZWY0NzM1YyIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKU5OAq2cydIlf7YVvrzdpozq6OQRj7Ex9vj-lUiCYM",
          },
        };

        const response = await axios(options);

        
      // SERIES DATA 
      const data: tmdbSeriesDetails = response.data;
      const title = data.original_name
      const Synopsis = data.overview
      const duration = data.episode_run_time[0]
      const tmdbGenres = data.genres.map((item) => item.name).join(", ");
      const tmdbCountries = data.production_countries
      .map((item) => item.name)
        .join(", ");
        const tmdbYear = Number(data.first_air_date.slice(0, 4));
        const original_language = data.original_language
setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
          production_year: production_year || tmdbYear,
          country: country || tmdbCountries,
          genre: genre || tmdbGenres,
          duration: duration,
          Synopsis: Synopsis || '',
        },
      ]);
      } else {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${tmdb_id}?language=en-US`, //movie
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFmOTE4ZjQ4N2MyMzA0NmFlZDA4MTY2ZWY0NzM1YyIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKU5OAq2cydIlf7YVvrzdpozq6OQRj7Ex9vj-lUiCYM",
          },
        };

        const response = await axios(options);
      // MOVIES DATA 
      const data: tmdbMovieDetails = response.data;
      
      const title = data.original_title
      const Synopsis = data.overview
      const tmdbGenres = data.genres.map((item) => item.name).join(", ");
      const tmdbCountries = data.production_countries
      .map((item) => item.name)
        .join(", ");
        const tmdbDuration = data.runtime;
        const tmdbYear = Number(data.release_date.slice(0, 4));
        const original_language = data.original_language

      setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
          production_year: production_year || tmdbYear,
          country: country || tmdbCountries,
          duration: duration || tmdbDuration,
          genre: genre || tmdbGenres,
          Synopsis: Synopsis || '', 
        },
      ]);
      }


    } catch (error) {
      setUpdatedFile((prev: any) => [
        ...prev,
        { ...movie, 
          // production_year: '',
        // country: '',
        // duration: '',
        // genre: '',
        // Synopsis: '',
      Status: 'Error when getting TMDB Data' },
      ]);
    }
  };

export  const throttleRequestMetadata = async (excelData: ExcelData[], setUpdatedFile: (arg: any)=>void) => {
    let index = 0;
    const checkMetaData = async () => {
      if (index >= excelData.length){
        return;
      }
      console.log(`process... ${index + 1}/${excelData.length}`);
      const item = excelData[index];
      await getMetadataFromTMDB(item, setUpdatedFile);
      index++;
      await checkMetaData();
    };

    await checkMetaData();
  };