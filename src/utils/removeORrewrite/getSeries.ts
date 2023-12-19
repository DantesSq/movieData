import axios from "axios";
import { ExcelData } from "../../types/types";

const getSeriesRequest = async (
  movie: any,
  setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[]) => void
) => {
  const { tmdb_id } = movie;

  if (!tmdb_id) {
    setUpdatedFile((prev: any) => [...prev, { ...movie }]);
    return;
  }

  try {
    // const response = await axios(
    //   `https://imdb-api.projects.thetuhin.com/search?query=${title}`
    // );

    // console.log(response);
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${tmdb_id}/external_ids`, // series
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yjg1ODRjNDAxZjJlMjk2N2Q5ZDYxOTAwZjliNzY4NSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kQb7XrVN7dVgI4s6DpD4Yww5yHjU6qkEPEW6HRMVbg4",
      },
    };
    // const options = {
    //   method: "GET",
    //   url: `https://api.themoviedb.org/3/search/movie?query=${title}`, // series
    //   headers: {
    //     accept: "application/json",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yjg1ODRjNDAxZjJlMjk2N2Q5ZDYxOTAwZjliNzY4NSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kQb7XrVN7dVgI4s6DpD4Yww5yHjU6qkEPEW6HRMVbg4",
    //   },
    // };
    const response = await axios(options);
    console.log(response);
    const result = response.data;
    // // debugger
    if (!result) {
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

    let bool = false;
    // for (let id = 0; id < results.length; id++) {
    //   if (bool) return;
    //   const result = results[id];
    //   console.log(result);
    //   // if (result.type.toLowerCase().includes("tvseries")) {
    //   //   setUpdatedFile((prev: any) => [
    //   //     ...prev,
    //   //     {
    //   //       ...movie,
    //   //       imdb: `https://www.imdb.com/title/${result.id}`,
    //   //       imdb_title: result.title,
    //   //       overview: result.overview,
    //   //     },
    //   //   ]);
    //   //   bool = true;
    //   //   return;
    //   // }
    // }

    // const result = results[0]

    setUpdatedFile((prev: any) => [
      ...prev,
      {
        ...movie,
        imdb_id: `${result.imdb_id}`,
        // imdb_title: results[0].title,
        // overview: results[0].overview,
      },
    ]);
    bool = true;
    return;

    // setUpdatedFile((prev: any) => [
    //   ...prev,
    //   {
    //     ...movie,
    //     tmdb_id: `${results[0].id}`,
    //     imdb_title: results[0].title,
    //     overview: results[0].overview,
    //   },
    // ]);
    // bool = true;
    // return;

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

export const throttleRequestSeries = async (
  excelData: ExcelData[],
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
