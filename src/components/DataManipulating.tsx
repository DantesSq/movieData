import React from "react";
import { useAppSelector } from "../store/store";
import { throttleRequestSeriesDirector } from "../utils/removeORrewrite/getSeriesDirectors";
import RequestButton from "./RequestButton";
import Translations from "./Translations";
import Metadata from "./Metadata";
import { useNavigate } from "react-router-dom";
import { throttleRequestSeries } from "../utils/removeORrewrite/getSeries";
import { throttleRequestDirector } from "../utils/removeORrewrite/getDirectorsId";
import PlannerButton from "./PlannerButton";
import PersonsButton from "./PersonsButton";
import Processing from "./Processing";
import { getIndependent } from "../utils/getAttributes";
import SeriesButton from "./SeriesButton";
import RequestButtonNew from "./RequestButtonNew";
import { fetchDirectorById } from "../store/features/fileThunks";

const checkGetIndependentFunction = [
  "Deutsch Filmproduktion, Dko Inc, Canal+ Polska", // Dependent
  "Kino Tv, Discover", // Dependent
  "fox 2000 pictures, polska films, dko inc", // Empty
  "fox 2000 pictures, polska entertainment, discovery channel", // Dependent
  "kino Tv Warszawa, Dko inc", // Dependent
  "Omelo Production Studio, canal+ austria", // Dependent
  "orf, Omelo Production Studio", // Dependent
  "dko inc, filsd corp, llc stanti", // Empty
  "fox 2000 pictures, warsaw filminstitut, zespół filmowy Grupa Kol", // Independent
  "Braun Entertainment Group", // Independent
];

const DataManipulating = () => {
  const { currentFile, isProcessing, files } = useAppSelector(
    (state) => state.files
  );

  // checkGetIndependentFunction.forEach((item) =>
  //   console.log(item, " --> ", getIndependent(item))
  // );
  // console.log(currentFile?.data);

  const [openTranslations, setOpenTranslations] = React.useState(false);
  const [openMetadata, setOpenMetadata] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const navigate = useNavigate();
  if (!currentFile) return <></>;
  return (
    <>
      <div
        className={
          isProcessing
            ? "hidden"
            : "space-y-[50px] text-[16px] flex flex-col items-center"
        }
      >
        {/* Persons */}
        {/* <PersonsButton /> */}
        <div className="relative w-[280px]">
          <svg
            className="absolute w-[45px] h-[45px] z-50 fill-black top-[50%] translate-y-[-50%] left-[10px] "
            viewBox="0 -12.5 64 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <title>Persons</title> <desc>Created with Sketch.</desc>
              <defs> </defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Persons"
                  transform="translate(1.000000, 2.000000)"
                  stroke="#ffffff"
                  strokeWidth="2"
                >
                  <path
                    d="M19,30 L0,30 C0,22.5 6.8,22.1 8.9,21.1 C10.2,20.5 12,19.4 12,18.4 C12,17.9 11.8,17.5 11.6,17.4 C9.1,16.1 8.6,11.6 8.4,11.6 C7.6,11.6 7,9.6 7,8.2 C7,7.1 7.3,7.1 7.9,6.8 L7.9,6.6 C7.9,3 10.4,-0.1 14,-0.1 C17.7,-0.1 20.1,3.1 20.1,6.7 L20.1,6.9 C20.7,7.2 20.9,7.4 20.9,8.5 C20.9,9.9 20.4,11.8 19.6,11.8 C19.4,11.8 18.9,16 16.5,17.4 C16.3,17.5 16.1,17.7 16.1,18.2 C16.1,19.3 18,20.4 19.3,21 C20.6,21.6 25.1,22.2 27.1,25.9"
                    id="Shape"
                  ></path>
                  <path
                    d="M34.7,26.2 C36.6,22.3 41.2,21.8 42.8,21.1 C44.1,20.5 45.9,19.4 45.9,18.4 C45.9,17.9 45.7,17.5 45.5,17.4 C43,16.1 42.6,11.6 42.4,11.6 C41.6,11.6 41,9.6 41,8.2 C41,7.1 41.3,7.1 41.9,6.8 L41.9,6.6 C41.9,3 44.2,-0.1 47.9,-0.1 C51.6,-0.1 54.2,3.1 54.2,6.7 L54.2,6.9 C54.8,7.2 55,7.4 55,8.5 C55,9.9 54.5,11.8 53.7,11.8 C53.5,11.8 52.9,16 50.5,17.4 C50.3,17.5 50.1,17.7 50.1,18.2 C50.1,19.3 52,20.4 53.3,21 C54.9,21.8 62,22.5 62,29.9 L42.3,29.9"
                    id="Shape"
                  ></path>
                  <path
                    d="M25.8,27.1 C27.1,26.5 28.9,25.4 28.9,24.4 C28.9,23.9 28.7,23.5 28.5,23.4 C26,22.1 25.6,17.6 25.4,17.6 C24.6,17.6 24,15.6 24,14.2 C24,13.1 24.3,13.1 24.9,12.8 L24.9,12.7 C24.9,9.1 27.2,6 30.9,6 C34.6,6 37.2,9.2 37.2,12.8 L37.2,13 C37.8,13.3 38,13.5 38,14.6 C38,16 37.5,17.9 36.7,17.9 C36.5,17.9 35.9,22.1 33.5,23.5 C33.3,23.6 33.1,23.8 33.1,24.3 C33.1,25.4 35,26.5 36.3,27.1 C37.9,27.9 45,28.6 45,36 L16.9,36 C16.9,28.5 23.8,28.1 25.8,27.1 L25.8,27.1 Z"
                    id="Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <RequestButtonNew
            btnText="Get Directors & Cast"
            requestFunction={fetchDirectorById}
          />
        </div>

        {/* Metadata */}
        <div className="space-y-[25px] items-center flex flex-col w-full">
          <div className="w-[280px] relative">
            <svg
              className="absolute w-[34px] h-[34px] z-50 top-[50%] translate-y-[-50%] left-[10px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6Z"
                  fill="#ffffff"
                  fillOpacity="0.15"
                />
                <path
                  d="M9.48 12C9.48 13.3255 8.40548 14.4 7.08 14.4C5.75451 14.4 4.68 13.3255 4.68 12C4.68 10.6745 5.75451 9.6 7.08 9.6C8.40548 9.6 9.48 10.6745 9.48 12Z"
                  fill="#ffffff"
                  fillOpacity="0.15"
                />
                <path
                  d="M17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  fill="#ffffff"
                  fillOpacity="0.15"
                />
                <path
                  d="M18.48 18.5368H21M4.68 12L3 12.044M4.68 12C4.68 13.3255 5.75451 14.4 7.08 14.4C8.40548 14.4 9.48 13.3255 9.48 12C9.48 10.6745 8.40548 9.6 7.08 9.6C5.75451 9.6 4.68 10.6745 4.68 12ZM10.169 12.0441H21M12.801 5.55124L3 5.55124M21 5.55124H18.48M3 18.5368H12.801M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6ZM17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <button
              className="btn w-full h12 text-start pl-[70px]"
              onClick={() => {
                setOpenMetadata((prev) => !prev);
              }}
            >
              MetaData Menu
            </button>
          </div>
          <div
            className={
              openMetadata
                ? `space-y-[25px] items-center flex flex-col w-full`
                : "hidden"
            }
          >
            <Metadata setOpenMetadata={setOpenMetadata} />
          </div>
        </div>
        {/* Translations */}
        <div className="space-y-[25px] items-center flex flex-col w-full">
          <div className="w-[280px] relative">
            <svg
              className="absolute w-[34px] h-[34px] z-50 top-[50%] translate-y-[-50%] left-[10px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6Z"
                  fill="#ffffff"
                  fillOpacity="0.15"
                />
                <path
                  d="M9.48 12C9.48 13.3255 8.40548 14.4 7.08 14.4C5.75451 14.4 4.68 13.3255 4.68 12C4.68 10.6745 5.75451 9.6 7.08 9.6C8.40548 9.6 9.48 10.6745 9.48 12Z"
                  fill="#ffffff"
                  fillOpacity="0.15"
                />
                <path
                  d="M17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  fill="#ffffff"
                  fillOpacity="0.15"
                />
                <path
                  d="M18.48 18.5368H21M4.68 12L3 12.044M4.68 12C4.68 13.3255 5.75451 14.4 7.08 14.4C8.40548 14.4 9.48 13.3255 9.48 12C9.48 10.6745 8.40548 9.6 7.08 9.6C5.75451 9.6 4.68 10.6745 4.68 12ZM10.169 12.0441H21M12.801 5.55124L3 5.55124M21 5.55124H18.48M3 18.5368H12.801M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6ZM17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <button
              className="btn w-full h12 text-start pl-[70px]"
              onClick={() => setOpenTranslations((prev) => !prev)}
            >
              Translations Menu
            </button>
          </div>
          <div
            className={
              openTranslations
                ? `space-y-[25px] items-center flex flex-col w-full`
                : "hidden"
            }
          >
            <Translations setOpenTranslations={setOpenTranslations} />
          </div>
        </div>

        {/* <div>
          <RequestButton
            text="ALALALALA"
            setCurrentIndex={setCurrentIndex}
            requestFunction={throttleRequestSeries}
          />
        </div> */}
        {/* Series Data */}
        {/* <RequestButton
          text="Get Series Episodes Data"
          requestFunction={throttleRequestSeriesDirector}
          setCurrentIndex={setCurrentIndex}
          classes="w-full "
        /> */}
        <SeriesButton />
        {/* <RequestButton
          text="GET IMDB"
          requestFunction={throttleRequestSeries}
          setCurrentIndex={setCurrentIndex}
          classes="w-full "
        /> */}
        {/* <PlannerButton /> */}
        {/* Switch to CC */}
        {/* <div className="relative w-[280px]">
          <svg
            className="absolute w-[30px] h-[30px] z-50 fill-black top-[50%] translate-y-[-50%] left-[10px] "
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7153 1.71609C18.3241 1.32351 18.3241 0.687013 18.7153 0.294434C19.1066 -0.0981448 19.7409 -0.0981448 20.1321 0.294434L22.4038 2.57397L22.417 2.58733C23.1935 3.37241 23.1917 4.64056 22.4116 5.42342L20.1371 7.70575C19.7461 8.09808 19.1122 8.09808 18.7213 7.70575C18.3303 7.31342 18.3303 6.67733 18.7213 6.285L20.0018 5L4.99998 5C4.4477 5 3.99998 5.44772 3.99998 6V13C3.99998 13.5523 3.55227 14 2.99998 14C2.4477 14 1.99998 13.5523 1.99998 13V6C1.99998 4.34315 3.34313 3 4.99998 3H19.9948L18.7153 1.71609Z"
              fill="#ffffff"
            />
            <path
              d="M22 11C22 10.4477 21.5523 10 21 10C20.4477 10 20 10.4477 20 11V18C20 18.5523 19.5523 19 19 19L4.00264 19L5.28213 17.7161C5.67335 17.3235 5.67335 16.687 5.28212 16.2944C4.8909 15.9019 4.2566 15.9019 3.86537 16.2944L1.59369 18.574L1.58051 18.5873C0.803938 19.3724 0.805727 20.6406 1.58588 21.4234L3.86035 23.7058C4.25133 24.0981 4.88523 24.0981 5.2762 23.7058C5.66718 23.3134 5.66718 22.6773 5.2762 22.285L3.99563 21L19 21C20.6568 21 22 19.6569 22 18L22 11Z"
              fill="#ffffff"
            />
          </svg>
          <button
            disabled
            className="btn w-full h12 btn-locked"
            onClick={() => navigate("/createctrl")}
          >
            Switch to CC
          </button>
        </div> */}
      </div>

      <div className={isProcessing ? "" : "hidden"}>
        <Processing />
      </div>
    </>
  );
};

export default DataManipulating;
