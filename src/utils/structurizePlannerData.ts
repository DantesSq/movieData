export const structurizePlannerData = (data: any, titleS: string) => {
  let i = 0;
  const dates = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mainEPGArr = [];
  let currentDate;
  let currentDay;
  let prevTime = "00:00";
  const days30 = ["4", "6", "9", "11"];
  const days31 = ["1", "3", "5", "7", "8", "10", "12"];
  const days28 = ["2"];

  let GenreId = 3;
  let SeasonId = 7;
  let MediaFilenameId = 8;
  let ProgrammeTitleId = 9;
  let EpisodeTitleId = 10;
  let SPIId = 11;

  for (i; i < data.length; ) {
    const row: any = Object.values(data[i]);
    if (dates.some((v) => row[0].includes(v))) {
      const date = row[0].split(" ");
      currentDay = date[0];
      currentDate = date[1];
      const keys = Object.values(data[i + 1]);
      GenreId = keys.indexOf("Genre");
      SeasonId = keys.indexOf("Season");
      MediaFilenameId = keys.indexOf("Media Filename");
      ProgrammeTitleId = keys.indexOf("Programme Title");
      EpisodeTitleId = keys.indexOf("Episode Title");
      SPIId = keys.indexOf(["SPI Code"]);
      i += 2;
      continue;
    }
    const time = row[0];
    const title = row[1];
    const genre = row[GenreId];
    const season = row[SeasonId];
    const MediaFilename = row[MediaFilenameId];
    const ProgrammeTitle = row[ProgrammeTitleId];
    const EpisodeTitle = row[EpisodeTitleId];
    let SPI;
    if (time.slice(0, 2) < prevTime.slice(0, 2)) {
      const newDate: string[] = currentDate.split("/");
      if (
        (newDate[0] === "30" && days30.some((v) => newDate[1].includes(v))) ||
        newDate[0] === "31"
      ) {
        newDate[0] = "01";
        if (newDate[1] === "12") {
          newDate[1] = "01";
          newDate[2] = String(Number(newDate[2]) + 1);
        } else {
          newDate[1] =
            String(Number(newDate[1]) + 1).length === 2
              ? String(Number(newDate[1]) + 1)
              : "0" + String(Number(newDate[1]) + 1);
        }
      } else if (newDate[0] === "28" && newDate[1] === "2") {
        newDate[0] = "01";
        newDate[1] =
          String(Number(newDate[1]) + 1).length === 2
            ? String(Number(newDate[1]) + 1)
            : "0" + String(Number(newDate[1]) + 1);
      } else {
        newDate[0] =
          String(Number(newDate[0]) + 1).length === 2
            ? String(Number(newDate[0]) + 1)
            : "0" + String(Number(newDate[0]) + 1);
      }

      currentDate = newDate.join("/");
    }
    const date = currentDate;
    prevTime = time;
    if (row[10] !== undefined) {
      if (row[10].includes("SPY") || row[10].includes("SPI")) {
        SPI = row[10];
      }
    }
    if (row[11] !== undefined) {
      if (row[11].includes("SPY") || row[11].includes("SPI")) {
        SPI = row[11];
      }
    }
    const EPG = {
      date,
      time,
      title,
      genre,
      season,
      MediaFilename,
      ProgrammeTitle,
      EpisodeTitle,
      SPI,
    };
    mainEPGArr.push(EPG);
    if (i === data.length - 1) {
      return mainEPGArr;
    }
    i++;
  }
};
