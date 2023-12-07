import axios from "axios";
import { ExcelData } from "../../types/types";

const getSeriesRequest = async (
  movie: any,
  setUpdatedFile: (updateFunction: (prev: any[]) => any[]) => void
) => {
  const { Director } = movie;

  try {
    // const response = await axios(`https://imdb-api.xeronles.workers.dev/search?query=${title}`);
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/person?query=${Director}`, // series
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
      },
    };
    const response = await axios(options);
    const director = response.data.results[0];
    if (!director) {
      setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
          tmdb_id: "no results",
          imdb_title: "",
        },
      ]);
      return;
    }
    const { id } = director;
    const ExternalIdOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/person/${id}/external_ids`, // series
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
      },
    };

    const externalIdResponse = await axios(ExternalIdOptions);
    const externalImdb = externalIdResponse.data.imdb_id;
    let bool = true;
    // for (let id = 0; id<results.length; id++) {
    //     if (bool) return
    //     const result = results[id]
    //     if (result.type === 'movie') {
    //         setUpdatedFile((prev: any) => [
    //             ...prev,
    //             {
    //               ...movie,
    //               imdb: `https://www.imdb.com/title/${result.id}`,
    //               imdb_title: result.title,
    //               overview: result.overview,
    //             },
    //           ]
    //           );
    //           bool = true
    //           return
    //     }
    // }

    setUpdatedFile((prev: any) => [
      ...prev,
      {
        ...movie,
        tmdb_id: director.id,
        tmdb_name: director.name,
        tmdb_original_name: director.original_name,
        imdb_id: externalImdb,
      },
    ]);
    bool = true;
    return;

    if (!bool) {
      setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
          imdb: `no results (movies)`,
          imdb_title: "",
        },
      ]);
      return;
    }
  } catch (error) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ...movie, Status: "Error when sending request", imdb_title: "" },
    ]);
    console.error(error);
  }
  return movie;
};

export const throttleRequestDirector = async (
  excelData: any,
  setUpdatedFile: any,
  setCurrentIndex: any
) => {
  let index = 0;
  const getSeries = async () => {
    if (index >= excelData.length) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(index + 1);
    const movie = excelData[index];
    await getSeriesRequest(movie, setUpdatedFile);

    index++;
    await getSeries();
  };

  await getSeries();
};
