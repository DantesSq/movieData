import * as XLSX from "xlsx";
import { Series } from "./divideIntoSeries";
import React from "react";

export const writeImportFileSeries = (importData: Series[]) => {
  let Program: any = [];
  let ProgramVersion: any = [];
  const SerieSheet = importData.map((series) => {
    return {
      ["Series Number"]: series.series_spi,
      ["Title"]: series.title,
      ["Language"]: "ENG",
      ["Type of Title"]: "",
      ["Original Title"]: "",
      ["Original Language"]: "",
      ["Type of Title for Original Title (Abbreviation)"]: "",
      ["Series Type (Abbreviation)"]: "",
      ["Number of Episodes"]: series.number_of_episodes,
      ["Duration"]: series.duration,
      ["Year of Production (from)"]: series.year_from,
      ["Year of Production (until)"]: series.year_until,
      ["Comment"]: "",
      ["Genre"]: series.genre?.split(", ")[0] || "",
      ["Type"]: series.genre?.split(", ")[0] ? "MG" : "",
      ["Genre 2"]: series.genre?.split(", ")[1] || "",
      ["Type 2"]: series.genre?.split(", ")[1] ? "MG" : "",
      ["Genre 3"]: series.genre?.split(", ")[2] || "",
      ["Type 3"]: series.genre?.split(", ")[2] ? "MG" : "",
      ["Channel 1"]: series.Channels?.split(", ")[0] || "",
      ["Channel 2"]: series.Channels?.split(", ")[1] || "",
      ["Production Country"]: series.country?.split(", ")[0] || "",
      ["Production Country 2"]: series.country?.split(", ")[1] || "",
      ["Production Country 3"]: series.country?.split(", ")[2] || "",
      ["Production Country 4"]: series.country?.split(", ")[3] || "",
    };
  });

  const ProgramSheet = importData.map((series) => {
    return series.Seasons?.map((season) => {
      return season.map((episode, index) => {
        let episodeSeason = episode.episode_spi?.slice(10, 12);
        if (episodeSeason === "00") episodeSeason = "01";
        const item = {
          ["Program Number"]: "",
          Title:
            episode.episode_title ||
            `${series.title} S${episodeSeason}E${
              (index + 1).toString().length < 2 ? `0${index + 1}` : index + 1
            }`,
          ["Program Type"]: "Series",
          ["Production Format"]: "A",
          ["Year of Production (from)"]: episode.year,
          ["Year of Production (until)"]: episode.year,
          ["Series Number"]: series.series_spi,
          ["Episode"]: episode.episode_spi?.slice(10),
          ["Episode Number"]: episode.episode_number,
          ["Language"]: "ENG",
          ["Genre"]: series.genre?.split(", ")[0] || "",
          ["Type"]: series.genre?.split(", ")[0] ? "MG" : "",
          ["Genre 2"]: series.genre?.split(", ")[1] || "",
          ["Type 2"]: series.genre?.split(", ")[1] ? "MG" : "",
          ["Genre 3"]: series.genre?.split(", ")[2] || "",
          ["Type 3"]: series.genre?.split(", ")[2] ? "MG" : "",
          ["Channel 1"]: series.Channels?.split(", ")[0] || "",
          ["Channel 2"]: series.Channels?.split(", ")[1] || "",
          ["Production Country"]: series.country?.split(", ")[0] || "",
          ["Production Country 2"]: series.country?.split(", ")[1] || "",
          ["Production Country 3"]: series.country?.split(", ")[2] || "",
          ["Production Country 4"]: series.country?.split(", ")[3] || "",
        };
        Program.push(item);
      });
    });
  });

  const ProgramVersionSheet = importData.map((series) => {
    return series.Seasons?.map((season) => {
      return season.map((episode, index) => {
        let episodeSeason = episode.episode_spi?.slice(10, 12);
        const item = {
          ["Program Number"]: "",
          ["Program Version Number"]: episode.episode_spi,
          Title:
            episode.episode_title ||
            `${series.title} S${episodeSeason}E${
              (index + 1).toString().length < 2 ? `0${index + 1}` : index + 1
            }`,
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
          ["Duration"]: episode.duration,
          ["Comment"]: "",
          ["Version Type"]: "ORG",
        };
        ProgramVersion.push(item);
      });
    });
  });

  // const writeFileSerie = { name: 'CC Series Import.xlsx', data: SerieSheet };
  const workbook = XLSX.utils.book_new();
  const dataArraySerie = SerieSheet.map((obj: any) => Object.values(obj));
  const dataArrayProgram = Program.map((obj: any) => Object.values(obj));
  const dataArrayProgramVersion = ProgramVersion.map((obj: any) =>
    Object.values(obj)
  );
  // Create a worksheet from the array of arrays
  if (!dataArraySerie.length) return;
  const wsSerie = XLSX.utils.aoa_to_sheet([
    Object.keys(SerieSheet[0]),
    ...dataArraySerie,
  ]);
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

  XLSX.utils.book_append_sheet(workbook, wsSerie, "Serie");
  XLSX.writeFile(workbook, "CC Series Import.xlsx");
};
