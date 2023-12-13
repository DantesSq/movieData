import { ExcelData } from "../../types/types";
import * as XLSX from "xlsx";

export const writeImportFileMovies = (data: ExcelData[]) => {
  let Program: any = [];
  let ProgramVersion: any = [];

  data.forEach((movie) => {
    if (
      movie.type?.toLowerCase() === "movie" ||
      movie.spi_code?.startsWith("SPU")
    ) {
      const ProgramItem = {
        ["Program Number"]: "",
        Title: movie.title,
        ["Program Type"]: "Movie",
        ["Production Format"]: "A",
        ["Year of Production (from)"]: movie.production_year,
        ["Year of Production (until)"]: movie.production_year,
        ["Series Number"]: "",
        ["Episode"]: "",
        ["Episode Number"]: "",
        ["Language"]: "ENG",
        ["Genre"]: movie.genre?.split(", ")[0] || "",
        ["Type"]: movie.genre?.split(", ")[0] ? "MG" : "",
        ["Genre 2"]: movie.genre?.split(", ")[1] || "",
        ["Type 2"]: movie.genre?.split(", ")[1] ? "MG" : "",
        ["Genre 3"]: movie.genre?.split(", ")[2] || "",
        ["Type 3"]: movie.genre?.split(", ")[2] ? "MG" : "",
        ["Channel 1"]: movie.Channels?.split(", ")[0] || "",
        ["Channel 2"]: movie.Channels?.split(", ")[1] || "",
        ["Production Country"]: movie.country?.split(", ")[0] || "",
        ["Production Country 2"]: movie.country?.split(", ")[1] || "",
        ["Production Country 3"]: movie.country?.split(", ")[2] || "",
        ["Production Country 4"]: movie.country?.split(", ")[3] || "",
      };

      const ProgramVersionItem = {
        ["Program Number"]: "",
        ["Program Version Number"]: movie.spi_code,
        Title: movie.title,
        ["Language"]: "ENG",
        ["Type of Title"]: "Org",
        ["Title Flag T"]: "",
        ["Title Flag OT"]: "",
        ["Title 2"]: "",
        ["Language 2"]: "",
        ["Type of title 2"]: "",
        ["Title 3"]: "",
        ["Language 3"]: "",
        ["Type of title 3"]: "",
        ["Image"]: "",
        ["Sound"]: "",
        ["Parental Rating"]: "",
        ["Duration"]: movie.duration,
        ["Comment"]: "",
        ["Version Type"]: "ORG",
      };
      Program.push(ProgramItem);
      ProgramVersion.push(ProgramVersionItem);
    }
  });

  if (!Program.length || !ProgramVersion.length) return;

  const workbook = XLSX.utils.book_new();
  const dataArrayProgram = Program.map((obj: any) => Object.values(obj));
  const dataArrayProgramVersion = ProgramVersion.map((obj: any) =>
    Object.values(obj)
  );
  // Create a worksheet from the array of arrays
  if (Program[0]) {
    const wsProgram = XLSX.utils.aoa_to_sheet([
      Object.keys(Program[0]),
      ...dataArrayProgram,
    ]);
    XLSX.utils.book_append_sheet(workbook, wsProgram, "Program");
  }
  if (ProgramVersion[0]) {
    const wsProgramVersion = XLSX.utils.aoa_to_sheet([
      Object.keys(ProgramVersion[0]),
      ...dataArrayProgramVersion,
    ]);
    XLSX.utils.book_append_sheet(workbook, wsProgramVersion, "ProgramVersion");
  }
  XLSX.writeFile(workbook, "CC Movies Import.xlsx");
};
