import axios from "axios";
import { ExcelData, Person } from "../types/types";

const getPersonsRequest = async (
    movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void
) => {
  const { tmdb_id, type, spi_code } = movie;

  if (!tmdb_id) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ...movie, Status: "problem with tmdbId", director: '', cast: ''},
    ]);
    return;
  }

let urlType
if (type?.toLowerCase() === `series` || spi_code?.startsWith(`SPY`)) {
  urlType='tv'
} else urlType='movie'
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${urlType}/${tmdb_id}/credits?language=en-US`,
    headers: {
      accept: "application/json",
      Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNWViMTUyY2MwMWIxZGQ3MTFhMDdiZTUwMGRkYmQzNSIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDD3x2S6wsmVMzYIK46Dicgr-naRFIh1eWEOaTQhJ3M",
          },
  };

  try {

    const response = await axios(options);
    const data: {crew: Person[], cast: Person[], id: number} = response.data

    const directors = data.crew.filter(
      (item) => item.job === "Director"
    );
    const cast = data.cast.filter((item, id) => id < 3);
   
    const cast_names = cast.map((item) => item.name).join(", ")
    const directors_names = directors.map((item) => item.name).join(", ")

    setUpdatedFile((prev: any) => [
      ...prev,
      {
        ...movie,
        Status: "Done with TMDB",
        director: directors_names,
        cast: cast_names
      },
    ]);
  } catch (error) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ...movie, Status: "Error when sending request", director: ' ',
      cast: ' '},
    ]);
  }
  return movie;
};

export const throttleRequestPersons = async (excelData: ExcelData[], setUpdatedFile: any) => {
  let index = 0;
  const getPersonsRecursion = async () => {
    if (index >= excelData.length) {
      return
    }
    console.log(`processing... [${index+1}/${excelData.length}]`)
    const movie = excelData[index];
    await getPersonsRequest(movie, setUpdatedFile);

    index++;
    await getPersonsRecursion();
  };

  await getPersonsRecursion();
};
