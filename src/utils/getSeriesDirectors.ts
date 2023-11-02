import axios from "axios";
import { ExcelData, Season } from "../types/types";

const getSeasonsDirectorsRequest = async (
    movie: ExcelData, setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[])=>void
) => {
  const { tmdb_id, type, spi_code } = movie;

  if (!tmdb_id) {
    setUpdatedFile((prev: any) => [
        ...prev,
        {
          ...movie,
          Season: "",
          SeasonTitle: "",
          SeasonSynopsis: "",
          Episode: "",
          EpisodeTitle: "",
          EpisodeSynopsis: "",
          director: "",
        },
      ]);
    console.log("problem with tmdbId");
    return;
  }

  if (type?.toLowerCase() === 'movie' || spi_code?.startsWith('SPI')) {
    setUpdatedFile(prev=>[...prev, movie])
    return
}

let id = 1
let seasonExists = true

for (id; seasonExists; id++) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${tmdb_id}/season/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTFmOTE4ZjQ4N2MyMzA0NmFlZDA4MTY2ZWY0NzM1YyIsInN1YiI6IjY1MTE3NTEwZTFmYWVkMDEwMGU5ZDQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aKU5OAq2cydIlf7YVvrzdpozq6OQRj7Ex9vj-lUiCYM",
      },
    };

    try {
        const response = await axios(options)
        const data: Season = response.data
        console.log(id, data)
        if (data.episodes) 
        data.episodes.forEach((episode, id)=>{
          console.log(episode)
            const directors = episode.crew.filter(person=>person.job==='Director')
            const directors_names = directors.map((director) => director.name).join(", ")
            const year =  episode.air_date.slice(0, 4)
            const duration = episode.runtime?.toString()
            setUpdatedFile((prev) => [
                ...prev,
                {
                  ...movie,
                  production_year: year,
                  duration: duration,
                  Season: data.season_number,
                  SeasonTitle: data.name,
                  SeasonSynopsis: data.overview,
                  Episode: id+1,
                  EpisodeTitle: episode.name,
                  EpisodeSynopsis: episode.overview,
                  director: directors_names,
                  Status: "Done with TMDB",
                },
              ]);
        })        
    } catch (error) {
     seasonExists = false
     return
  }}

};

export const throttleRequestSeriesDirector = async (excelData: ExcelData[], setUpdatedFile: any) => {
  let index = 0;
  const getSeasonsDirectorsRecursion = async () => {
    if (index >= excelData.length) {
      return
    }

    console.log(`processing... [${index+1}/${excelData.length}]`)

    const movie = excelData[index];
    await getSeasonsDirectorsRequest(movie, setUpdatedFile);

    index++;
    await getSeasonsDirectorsRecursion();
  };

  await getSeasonsDirectorsRecursion();
};
