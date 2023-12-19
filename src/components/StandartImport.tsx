import React from "react";
import { useAppSelector } from "../store/store";
import { Series, divideIntoSeries } from "../utils/SI/divideIntoSeries";
import { writeImportFileSeries } from "../utils/SI/writeImportFileSeries";
import { writeImportFileMovies } from "../utils/SI/writeImportFileMovies";

const StandartImport = () => {
  const { currentFile } = useAppSelector((state) => state.files);
  const [importDataSeries, setImportDataSeries] = React.useState<Series[]>([]);

  React.useEffect(() => {
    if (currentFile) {
      const data = currentFile.data;

      const importDataSeries = divideIntoSeries(data);

      console.log("HERE", importDataSeries);
      setImportDataSeries(importDataSeries);
    }
  }, []);

  if (!currentFile?.data) return <></>;
  return (
    <button
      className="btn w-full"
      onClick={() => {
        writeImportFileSeries(importDataSeries);
        writeImportFileMovies(currentFile?.data);
      }}
    >
      Get Standart Import
    </button>
  );
};

export default StandartImport;
