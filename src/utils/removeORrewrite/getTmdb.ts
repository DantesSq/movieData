import axios from "axios";
import { ExcelData } from "../../types/types";

const getTMDB = async (
  movie: ExcelData,
  setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[]) => void
) => {
  const { imdb_id, tmdb_id, type, spi_code } = movie;

  const corrImdb = imdb_id
    ?.toString()
    .slice(imdb_id?.toString().indexOf("/tt") + 1);
  const ttId =
    corrImdb?.indexOf("/") === -1
      ? corrImdb
      : corrImdb?.slice(0, corrImdb?.indexOf("/"));

  if (tmdb_id || !imdb_id || !ttId) {
    setUpdatedFile((prev: ExcelData[]) => [...prev, movie]);
    return;
  }

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/find/${ttId}?external_source=imdb_id`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
    },
  };

  try {
    const response = await axios(options);
    let id: string | null;
    if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {
      id = response.data.tv_results[0].id;
    } else {
      id = response.data.movie_results[0].id;
    }

    setUpdatedFile((prev: ExcelData[]) => [...prev, { ...movie, tmdb_id: id }]);
  } catch (error) {
    setUpdatedFile((prev: ExcelData[]) => [
      ...prev,
      { ...movie, Status: "Error when searching TMDB" },
    ]);
  }
};

export const throttleRequestTMDB = async (
  excelData: ExcelData[],
  setUpdatedFile: any,
  setCurrentIndex: any
) => {
  let index = 0;
  setCurrentIndex(1);
  const sendRequest = async () => {
    if (index < excelData.length) {
      const item = excelData[index];
      await getTMDB(item, setUpdatedFile);
      index++;
      await sendRequest();
    } else {
    }
  };
  await sendRequest();
};
