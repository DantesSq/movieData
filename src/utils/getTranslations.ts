import axios from "axios";
import { ExcelData, Translation } from "../types/types";

const getTranslatedTitle = async (movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void) => {
    const {tmdb_id, spi_code, type, Synopsis} = movie
    if (!tmdb_id) {
      setUpdatedFile((prev: ExcelData[]) => [
        ...prev,
        { ...movie,
        Status: 'no tmdb'},
      ]);
      return;
    }
    let urlType
    if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {urlType = `tv`} else {urlType='movie'}
    console.log(urlType, spi_code, type)
    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${urlType}/${tmdb_id}/translations`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFmOTE4ZjQ4N2MyMzA0NmFlZDA4MTY2ZWY0NzM1YyIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKU5OAq2cydIlf7YVvrzdpozq6OQRj7Ex9vj-lUiCYM",
        },
      };

      const response = await axios(options);
      const translations: Translation[]  = response.data.translations;
      
      const translatedTitle = translations.filter((item:Translation)=>item.iso_3166_1==="NL")[0]
      const title = translations.filter((item:Translation)=>item.iso_3166_1==="US")[0]
      const newSynopsis = (title.data && title.data.overview) ? title.data.overview : ''
      const translated_synopsis = (translatedTitle.data && translatedTitle.data.overview) ? translatedTitle.data.overview : ''
      const title_translated = (translatedTitle.data && (type?.toLowerCase() === 'series' ? translatedTitle.data.name : translatedTitle.data.title)) ? (type?.toLowerCase() === 'series' ? translatedTitle.data.name : translatedTitle.data.title) : ""

      setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie, Synopsis: Synopsis || newSynopsis, title_translated: title_translated, Synopsis_translated: translated_synopsis,
        },
      ]);
    } catch (error) {
      setUpdatedFile((prev: any) => [
        ...prev,
        { ...movie,
      Status: 'Error when getting TMDB Data', translated_title: ""},
      ]);
    }
  };

export  const throttleRequestTitles = async (excelData: ExcelData[], setDownloadData: (arg: any)=>void) => {
    let index = 0;
    const checkTranslatedTitles = async () => {
      if (index >= excelData.length){
        return;
      }
      console.log(`process... ${index + 1}/${excelData.length}`);
      const item = excelData[index];
      index++;
      await getTranslatedTitle(item, setDownloadData);
      await checkTranslatedTitles();
    };

    await checkTranslatedTitles();
  };