import React from "react";
import { ExcelData } from "../types/types";
import { throttleRequestTMDB } from "../utils/getTmdb";
import * as XLSX from "xlsx";
import { throttleRequestMetadata } from "../utils/getMetadataTmdb";
import { throttleRequestPersons } from "../utils/getPersons";
import { throttleRequestSeries } from "../utils/getSeries";
import { useAppDispatch, useAppSelector } from "../store/store";
import { throttleRequestTitles } from "../utils/getTranslations";
import { throttleRequestSeriesDirector } from "../utils/getSeriesDirectors";
import { setIsProcessing, updateFile } from "../store/features/filesSlice";
import { writeFile } from "../utils/writeFile";
import RequestButton from "./RequestButton";
import { getLicenseDate } from "../utils/getLicenseDate";

const DataManipulating = () => {
  const { currentFile, isProcessing } = useAppSelector((state) => state.files);

  const dispatch = useAppDispatch();

  const [updatedFileData, setUpdatedFileData] = React.useState<ExcelData[]>([]);
  const [openTranslations, setOpenTranslations] = React.useState(false);

  if (!currentFile) return <></>;

  return (
    <>
      <div className={isProcessing ? "hidden" : "space-y-[50px]"}>
        <div className="space-x-[25px]">
          <RequestButton
            text="Get Directors & Cast"
            requestFunction={throttleRequestPersons}
            classes="w-[250px]"
          />
          <RequestButton
            text="Get Metadata"
            requestFunction={throttleRequestMetadata}
            classes="w-[250px]"
          />
        </div>
        <div className="space-y-[25px] items-center flex flex-col">
          <button
            className="btn w-full"
            onClick={() => setOpenTranslations((prev) => !prev)}
          >
            Get Translations
          </button>
          {openTranslations ? (
            <RequestButton
              text="Get Translations"
              requestFunction={throttleRequestTitles}
              classes="w-full btn-locked"
            />
          ) : (
            <></>
          )}
        </div>
        {/* <div className="w-full">
          <RequestButton
            text="Search Series"
            requestFunction={throttleRequestSeries}
            classes="w-[250px]"
          />
        </div> */}
        <div className="w-full">
          <RequestButton
            text="Series Metadata for Each Episode"
            requestFunction={throttleRequestSeriesDirector}
            classes={"w-full"}
          />
        </div>
        <div className="w-full">
          <button
            className="btn w-full"
            onClick={() => {
              writeFile(currentFile);
            }}
          >
            Download File
          </button>
        </div>

        {/* <div>
          <button className="btn w-full" onClick={() => getLicenseDate("")}>
            Get License Date
          </button>
        </div> */}
      </div>

      <div className={isProcessing ? "" : "hidden"}>
        <img
          className="w-[500px] h-[500px]"
          src="https://media4.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47s96k6evjuw3o2segnf27o7twfqdo4zn6uhc8e9wv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="processing data..."
        />
        <h1>Processing data...</h1>
      </div>
    </>
  );
};

export default DataManipulating;
