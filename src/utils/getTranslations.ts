import axios from "axios";
import { ExcelData, Translation } from "../types/types";

const getTranslatedTitle = async (movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void, languages: string[]) => {
    const {tmdb_id, spi_code, type, Synopsis} = movie

    const emptyTitleKeys = languages.map(item=>{return {[`Title ${item}`]: ' '}})
    const emptySynopsisKeys = languages.map(item=>{return {[`Synopsis ${item}`]: ' '}})
    const spreadEmptyTitle = Object.assign({}, ...emptyTitleKeys)
    const spreadEmptySynopsis = Object.assign({}, ...emptySynopsisKeys)
    if (!tmdb_id) {
      setUpdatedFile((prev: any) => [
        ...prev,
        { ...movie,
        Status: 'no tmdb',
        ...spreadEmptyTitle,
        ...spreadEmptySynopsis
      },
      ]);
      return;
    }
    let urlType
    if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {urlType = `tv`} else {urlType='movie'}

    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${urlType}/${tmdb_id}/translations`,
        headers: {
          accept: "application/json",
          Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
      }, 
      };

      const response = await axios(options);
      const translations: Translation[]  = response.data.translations;
      
      const filteredTranslations = translations.filter(translation =>
        languages.includes(translation.iso_3166_1)
    );
        const titleKeys = languages.map(item=>{
          const translation = filteredTranslations.find(translation => translation.iso_3166_1 === item);
        const key = `Title ${item}`;
        const value = translation ? translation?.data?.name || translation?.data?.title || '' : '';
        const result = {[key]: value};
         return result
        })
        const synopsisKeys = languages.map(item=>{
          return {[`Synopsis ${item}`]: filteredTranslations.find(translation => translation.iso_3166_1 === item)?.data?.overview || ''}
        })
        const spreadTitleKeys = Object.assign({}, ...titleKeys)
        const spreadSynopsisKeys = Object.assign({}, ...synopsisKeys)

      setUpdatedFile((prev) => [
        ...prev,
        {
          ...movie, ...spreadTitleKeys, ...spreadSynopsisKeys
        },
      ]);
    } catch (error) {
      setUpdatedFile((prev: any) => [
        ...prev,
        { ...movie,
      Status: 'Error when getting TMDB Data', ...spreadEmptyTitle,
      ...spreadEmptySynopsis},
      ]);
    }
  };

export  const throttleRequestTranslation = async (excelData: ExcelData[], setDownloadData: (arg: any)=>void, languages: string[] | undefined, setCurrentIndex: any) => {
    let index = 0;
    if (!languages) return
    const checkTranslatedTitles = async () => {
      if (index >= excelData.length){
        setCurrentIndex(0)
        return;
      }
      setCurrentIndex(index+1)
      console.log(`process... ${index + 1}/${excelData.length}`);
      const item = excelData[index];
      index++;
      await getTranslatedTitle(item, setDownloadData, languages);
      await checkTranslatedTitles();
    };

    await checkTranslatedTitles();
  };