import axios from "axios";
import { ExcelData, Person } from "../../types/types";
import { Program } from "../../types/cc_types";

const getProgramRequest = async (
  movie: ExcelData,
  setUpdatedFile: (updateFunction: (prev: ExcelData[]) => ExcelData[]) => void
) => {
  const { spi_code, title } = movie;
  if (!spi_code) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ["SPI Code"]: spi_code, Status: "no spi" },
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
    const isMovie = spi_code.toLowerCase().startsWith("spi") ? true : false;
    // const url = spi_code.toLowerCase().startsWith('spi') ? "https://spi-api.createctrl.cloud/api/CreateCtrl/Program/Find" : "https://spi-api.createctrl.cloud/api/CreateCtrl/Series/Find"
    const url = "https://spi-api.createctrl.cloud/api/CreateCtrl/Program/Find";

    const response = await axios.post(url, spi_code, { headers });
    const data: Program = response.data[0];

    const {
      Title,
      OriginalNumber,
      OriginalTitle,
      Number,
      Genres,
      ProductionYearFrom,
      ProductionCountries,
      Duration,
      PersonsFirms,
      Channels,
      Seasons,
      ProgramVersions,
      OriginalLanguage,
    } = data;

    if (Seasons) {
    }

    const genres = Genres.map((item) => item.Name).join(", ");
    const country = ProductionCountries.map((item) => item.Name).join(", ");
    const director = PersonsFirms.filter((item) => item.Type === "Director")
      .map((item) => item.Name)
      .join(", ");
    const cast = PersonsFirms.filter((item) => item.Type === "Cast")
      .map((item) => item.Name)
      .join(", ");
    const channels = Channels.map((item) => item.Name).join(", ");
    // console.log(data);
    // if (spi_code.toLowerCase() !== OriginalNumber.toLowerCase() && spi_code.toLowerCase() !== Number.toLowerCase() ) {
    //   const ProgramVersionsSPI = ProgramVersions.map(item=>item.Number.toLowerCase())
    // //   if (!ProgramVersionsSPI.includes(spi_code.toLowerCase())) {
    // //   setUpdatedFile((prev: any) => [
    // //     ...prev,
    // //     {
    // //       ['SPI Code']: spi_code,
    // //       Status: 'Not Found'
    // //     },
    // //   ]);
    // //   return
    // // }
    // }

    setUpdatedFile((prev: any) => [
      ...prev,
      {
        ["SPI Code"]: spi_code,
        title: Title || OriginalTitle,
        genre: genres || "",
        production_year: ProductionYearFrom || "",
        country: country || "",
        director: director || "",
        cast: cast || "",
        channels,
        duration: Duration,
        ["EU/NonEU"]:
          data.Attributes[1].Value === "True"
            ? "EU"
            : data.Attributes[3].Value === "True"
            ? "NonEU"
            : "",
        ["Dependent"]:
          data.Attributes[0].Value === "True"
            ? "Dependent"
            : data.Attributes[2].Value === "True"
            ? "Independent"
            : "",
        ["Program Number"]: data.Number || "",
        OriginalLanguage,
      },
    ]);
  } catch (error) {
    setUpdatedFile((prev: any) => [
      ...prev,
      { ["SPI Code"]: spi_code, Status: "Not found" },
    ]);
  }
  return movie;
};

export const throttleProgramData = async (
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
