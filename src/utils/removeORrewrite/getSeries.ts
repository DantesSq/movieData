import axios from "axios";
import { ExcelData } from "../../types/types";

const getSeriesRequest = async (
  movie: any,
  setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[]) => void
) => {
  const { title } = movie;

  if (!title) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ...movie, Status: "problem with Title" },
    ]);
    return;
  }

  try {
    const response = await axios(
      `https://imdb-api.projects.thetuhin.com/search?query=${title}`
    );
    // const options = {
    //   method: "GET",
    //   url: `https://api.themoviedb.org/3/search/movie?query=${title}`, // series
    //   headers: {
    //     accept: "application/json",
    //     Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
    // },
    // };
    // const response = await axios(options);
    const results = response.data.results;
    // debugger
    if (!results.length) {
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
    for (let id = 0; id < results.length; id++) {
      if (bool) return;
      const result = results[id];

      if (result.type.toLowerCase() === "tvseries") {
        setUpdatedFile((prev: any) => [
          ...prev,
          {
            ...movie,
            imdb: `https://www.imdb.com/title/${result.id}`,
            imdb_title: result.title,
            overview: result.overview,
          },
        ]);
        bool = true;
        return;
      }
    }

    // const result = results[0]
    // setUpdatedFile((prev: any) => [
    //   ...prev,
    //   {
    //     ...movie,
    //     tmdb_id: `${result.id}`,
    //     imdb_title: result.title,
    //     overview: result.overview,
    //   },
    // ]
    // );
    // bool = true
    // return

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
