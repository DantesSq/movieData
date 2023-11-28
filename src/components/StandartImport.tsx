import React from "react";
import { useAppSelector } from "../store/store";
import { Series, divideIntoSeries } from "../utils/divideIntoSeries";
import { writeImportFile } from "../utils/SI/writeImportFile";

const StandartImport = () => {
  const { currentFile } = useAppSelector((state) => state.files);
  const [importData, setImportData] = React.useState<Series[]>([]);
  React.useEffect(() => {
    if (currentFile) {
      const series = 1;
      const data = currentFile.data;

      const importData = divideIntoSeries(data);
      setImportData(importData);
    }
  }, []);
  return (
    <button
      className="btn w-full"
      onClick={() => {
        writeImportFile(importData);
      }}
    >
      Get Standart Import
    </button>
  );
};

export default StandartImport;
