import axios from "axios";
import { ExcelData } from "../types/types";

const getTMDB = async (movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void)=>{
    const {imdb_id, tmdb_id, type, spi_code} = movie
    
    const corrImdb = imdb_id?.slice(imdb_id?.indexOf('/tt')+1)
    const ttId = corrImdb?.indexOf('/')===-1 ? corrImdb : corrImdb?.slice(0, corrImdb?.indexOf('/'))

    if (tmdb_id || !imdb_id || !ttId) {
        setUpdatedFile((prev: ExcelData[])=>[...prev, movie])
        return
    }

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/find/${ttId}?external_source=imdb_id`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFmOTE4ZjQ4N2MyMzA0NmFlZDA4MTY2ZWY0NzM1YyIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKU5OAq2cydIlf7YVvrzdpozq6OQRj7Ex9vj-lUiCYM'
  }
      };

      try {
        const response = await axios(options);
        console.log(response, ttId)
        let id: string | null
        if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)){
          id = response.data.tv_results[0].id
        } else {
          id = response.data.movie_results[0].id
        }

        setUpdatedFile((prev: ExcelData[]) => [...prev, {...movie, tmdb_id: `${id}`}]);
      } catch (error) {
        setUpdatedFile((prev: ExcelData[])=>[...prev, {...movie, Status: 'Error when searching TMDB'}])
      }
  }

export const throttleRequestTMDB = async (excelData: ExcelData[], setUpdatedFile: any) => {
    let index = 0;
    console.log('tmdb')
    const sendRequest = async () => {
        if (index < excelData.length) {
          console.log(index, excelData.length)
        const item = excelData[index];
        await getTMDB(item, setUpdatedFile);
            index++;
            await sendRequest()  
      } else {
      }
    };
    await sendRequest();
  };