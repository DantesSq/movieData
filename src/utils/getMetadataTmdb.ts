import axios from "axios";
import { ExcelData, tmdbMovieDetails, tmdbSeriesDetails } from "../types/types";
const getMetadataFromTMDB = async (movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void, metadataOptions: string[] | undefined) => {
    const {tmdb_id, genre, country, production_year, director,cast, duration, type, spi_code, Synopsis} = movie
    if (!metadataOptions) return
    const emptyOptionsObj: any = {}
    for (const key of metadataOptions) {
      emptyOptionsObj[key] = '';
    }
    if (!tmdb_id) {
      setUpdatedFile((prev: ExcelData[]) => [
        ...prev,
        { ...movie, ...emptyOptionsObj,
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
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
        },
        };
        const response = await axios(options);
        
      // SERIES DATA 
      const data: tmdbSeriesDetails = response.data;
      const title = data.original_name
      const tmdbSynopsis = data.overview
      const tmdbDuration = data.episode_run_time[0]
      const tmdbGenres = data.genres.map((item) => item.name).join(", ");
      const tmdbCountries = data.production_countries
      .map((item) => item.name)
      .join(", ");
      const tmdbCompanies = data.production_companies
      .map((item) => item.name)
      .join(", ");
      const tmdbYear = Number(data.first_air_date.slice(0, 4));
      const original_language = data.original_language

      const keys: any = {
        ['production_year']: production_year || tmdbYear || '',
        ['country']: country || tmdbCountries || '',
        ['genre']: genre || tmdbGenres || '',
        ['duration']: duration || tmdbDuration || '',
        ['synopsis']: Synopsis || tmdbSynopsis || '',
        ['original_title']: title || '',
        ['original_language']: original_language || '',
        ['production_companies']: tmdbCompanies || '',
        ['eu']: ''
    }

    const result: { [key: string]: string } = {};
  if (metadataOptions) {
  for (const option of metadataOptions) {
  if (keys.hasOwnProperty(option)) {
    result[option] = keys[option];
  }}}

      setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
         ...result
        },
      ]);
      } else {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${tmdb_id}?language=en-US`, //movie
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
          },
        };

        const response = await axios(options);
      // MOVIES DATA 
      const data: tmdbMovieDetails = response.data;
      
      const title = data.original_title
      const tmdbSynopsis = data.overview
      const tmdbGenres = data.genres.map((item) => item.name).join(", ");
      const tmdbCountries = data.production_countries
      .map((item) => item.name)
        .join(", ");
        const tmdbCompanies = data.production_companies
      .map((item) => item.name)
      .join(", ");
        const tmdbDuration = data.runtime;
        const tmdbYear = Number(data.release_date.slice(0, 4));
        const original_language = data.original_language
        const keys: any = {
          ['production_year']: production_year || tmdbYear || '',
          ['country']: country || tmdbCountries || '',
          ['genre']: genre || tmdbGenres || '',
          ['duration']: duration || tmdbDuration || '',
          ['synopsis']: Synopsis || tmdbSynopsis || '',
          ['original_title']: title || '',
          ['original_language']: original_language || '',
          ['production_companies']: tmdbCompanies || '',
          ['eu']: ''
      }
      const result: { [key: string]: string } = {};
    if (metadataOptions) {
    for (const option of metadataOptions) {
    if (keys.hasOwnProperty(option)) {
      result[option] = keys[option];
    }}}

      setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
          ...result
        },
      ]);
      }
    } catch (error) {
      setUpdatedFile((prev: any) => [
        ...prev,
        { ...movie, 
          ...emptyOptionsObj,
      Status: 'Error when getting TMDB Data' },
      ]);
    }
  };

export  const throttleRequestMetadata = async (excelData: ExcelData[], setUpdatedFile: (arg: any)=>void, options: string[] | undefined, setCurrentIndex: any) => {
    let index = 0;
    const checkMetaData = async () => {
      if (index >= excelData.length){
        setCurrentIndex(0)
        return;
      }
      setCurrentIndex(index+1)
      console.log(`process... ${index + 1}/${excelData.length}`);
      const item = excelData[index];
      await getMetadataFromTMDB(item, setUpdatedFile, options);
      index++;
      await checkMetaData();
    };

    await checkMetaData();
  };