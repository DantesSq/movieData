import axios from "axios";
import { ExcelData } from "../types/types";

const getSeriesRequest = async (
    movie: any, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void
) => {
  const series_title: string = movie['Season English Title'];

  if (!series_title) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ...movie, Status: "problem with Title" },
    ]);
    return;
  }

  try {
    const response = await axios(`https://imdb-api.xeronles.workers.dev/search?query=${series_title}`);
    const results = response.data.results
    // debugger
    if (!results.length) {
        setUpdatedFile((prev: any) => [
            ...prev,
            {
              ...movie,
              imdb: 'no results',
              imdb_title: ''
            },
          ]);
          return
    }

    let bool = false
    for (let id = 0; id<results.length; id++) {
        if (bool) return
        const result = results[id]

        if (result.type === 'tvSeries') {
            setUpdatedFile((prev: any) => [
                ...prev,
                {
                  ...movie,
                  imdb: `https://www.imdb.com/title/${result.id}`,
                  imdb_title: result.title
                },
              ]
              );
              bool = true
              return
        }
    }

    if (!bool) {
        setUpdatedFile((prev: any) => [
            ...prev,
            {
              ...movie,
              imdb: `no results (movies)`,
              imdb_title: ''
            },
          ]
          );
          return
    }

  } catch (error) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ...movie, Status: "Error when sending request",
      imdb_title: '' }
    ]);
  }
  return movie;
};

export const throttleRequestSeries = async (excelData: ExcelData[], setUpdatedFile: any) => {
  let index = 0;
  const getSeries = async () => {
    if (index >= excelData.length) {
      return
    }

    console.log(`proces.. [${index+1}/${excelData.length}]`)
    const movie = excelData[index];
    await getSeriesRequest(movie, setUpdatedFile);

    index++;
    await getSeries();
  };

  await getSeries();
};
