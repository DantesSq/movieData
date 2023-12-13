import axios from "axios";
import { ExcelData, Person } from "../../types/types";
import { Program } from "../../types/cc_types";
import { error } from "console";

const getProgramRequest = async (
  movie: ExcelData,
  setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[]) => void
) => {
  const { title } = movie;
  if (!title) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ["title"]: title, Status: "no spi" },
    ]);
    return;
  }

  try {
    const IdentifyToken = "622869a6e8354c1e9c25404feb8464af";
    const headers = {
      Accept: "text/plain",
      IdentifyToken,
      "Content-Type": "application/json-patch+json",
    };
    //   const isMovie = spi_code.toLowerCase().startsWith('spi') ? true : false
    // const url = spi_code.toLowerCase().startsWith('spi') ? "https://spi-api.createctrl.cloud/api/CreateCtrl/Program/Find" : "https://spi-api.createctrl.cloud/api/CreateCtrl/Series/Find"
    // const url = "https://spi-api.createctrl.cloud/api/CreateCtrl/Program/Find"

    // const response = await axios.post(url, title, { headers });
    // const data: Program = response.data[0]

    // const {Title, OriginalNumber, OriginalTitle, Number, Genres, ProductionYearFrom, ProductionCountries, Duration, PersonsFirms, Channels, Seasons, ProgramVersions} = data
    // if (Seasons) {}

    // const genres = Genres.map(item=>item.Name).join(', ')
    //   const country = ProductionCountries.map(item=>item.Name).join(', ')
    //   const director = PersonsFirms.filter(item=>item.Type==='Director').map(item=>item.Name).join(', ')
    //   const cast = PersonsFirms.filter(item=>item.Type==='Cast').map(item=>item.Name).join(', ')
    //   const channels = Channels.map(item=>item.Name).join(', ')

    // setUpdatedFile((prev: any) => [
    //   ...prev,
    //   {
    //       title: title, CCtitle: Title, ['SPI Code']: OriginalNumber, ['Number']: Number
    //   }

    // ]);
    // SERIES

    const url = "https://spi-api.createctrl.cloud/api/CreateCtrl/Series/Find";
    const response = await axios.post(url, title, { headers });
    const series = response.data[0];
    if (!series) {
      setUpdatedFile((prev: any) => [
        ...prev,
        { ["title"]: title, Status: "Not found" },
      ]);
      return;
    }
    setUpdatedFile((prev: any) => [
      ...prev,
      { title: title, CCtitle: series.Title, ["SPI Code"]: series.Number },
    ]);
  } catch (error) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ["title"]: title, Status: "Not found" },
    ]);
  }
  return movie;
};

export const throttleFindByTitle = async (
  excelData: ExcelData[],
  setUpdatedFile: any,
  setCurrentIndex: any
) => {
  let index = 0;
  const getProgramRecursion = async () => {
    if (index >= excelData.length) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(index + 1);
    const movie = excelData[index];
    await getProgramRequest(movie, setUpdatedFile);

    index++;
    await getProgramRecursion();
  };

  await getProgramRecursion();
};
