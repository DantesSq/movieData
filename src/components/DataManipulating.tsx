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

const DataManipulating = () => {
  const { currentFile, isProcessing, files } = useAppSelector(
    (state) => state.files
  );
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
        <PersonsButton />

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

        {/* To implement next */}
        {/* <RequestButton
          text="Get Series Episodes Data"
          requestFunction={throttleRequestSeriesDirector}
          setCurrentIndex={setCurrentIndex}
          classes="w-full "
        /> */}

        {/* <PlannerButton /> */}

        {/* Switch to CC */}
        <div className="relative w-[280px]">
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
        </div>
      </div>

      <div className={isProcessing ? "" : "hidden"}>
        <Processing />
      </div>
    </>
  );
};

export default DataManipulating;
