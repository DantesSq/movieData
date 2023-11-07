import React from "react";
import { throttleRequestMetadata } from "../utils/getMetadataTmdb";
import { throttleRequestPersons } from "../utils/getPersons";
import { useAppSelector } from "../store/store";
import { throttleRequestSeriesDirector } from "../utils/getSeriesDirectors";
import { writeFile } from "../utils/writeFile";
import RequestButton from "./RequestButton";
import Translations from "./Translations";
import Metadata from "./Metadata";

const DataManipulating = () => {
  const { currentFile, isProcessing } = useAppSelector((state) => state.files);
  const [openTranslations, setOpenTranslations] = React.useState(false);
  const [openMetadata, setOpenMetadata] = React.useState(false);
  const [cat, setCat] = React.useState(false);
  if (!currentFile) return <></>;

  return (
    <div className="w-[500px]">
      <div className={isProcessing ? "hidden" : "space-y-[50px]"}>
        <div className="space-x-[25px]">
          <RequestButton
            text="Get Directors & Cast"
            requestFunction={throttleRequestPersons}
            classes="w-full"
          />
        </div>

        <div className="space-y-[25px] items-center flex flex-col w-full">
          <button
            className="btn w-full"
            onClick={() => {
              setOpenMetadata((prev) => !prev);
            }}
          >
            MetaData
          </button>
          <div
            className={
              openMetadata
                ? `space-y-[25px] items-center flex flex-col w-full`
                : "hidden"
            }
          >
            <Metadata />
          </div>
        </div>
        <div className="space-y-[25px] items-center flex flex-col">
          <button
            className="btn w-full"
            onClick={() => setOpenTranslations((prev) => !prev)}
          >
            Translations
          </button>
          <div
            className={
              openTranslations
                ? `space-y-[25px] items-center flex flex-col w-full`
                : "hidden"
            }
          >
            <Translations />
          </div>
        </div>
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
              setCat((prev) => !prev);
            }}
          >
            Special For Monia
          </button>
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

      <div className={cat ? "" : "hidden"}>
        <img
          className="w-[500px] h-[500px]"
          src="https://media4.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47s96k6evjuw3o2segnf27o7twfqdo4zn6uhc8e9wv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="processing data..."
        />
        <h1>Meow meow meow...</h1>
      </div>
    </div>
  );
};

export default DataManipulating;
