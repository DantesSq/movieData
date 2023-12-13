import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addSeriesData,
  setIsProcessing,
  setSeriesData,
} from "../store/features/filesSlice";
import { fetchSeriesData, fetchTmdbId } from "../store/features/fileThunks";
import { ExcelData } from "../types/types";

const SeriesButton = () => {
  const dispatch = useAppDispatch();
  const { currentFile } = useAppSelector((state) => state.files);

  const handleGetTranslationsClick = async () => {
    if (!currentFile?.data.length) return;
    dispatch(setIsProcessing(true));
    await Promise.all(
      currentFile.data.map(async (movie) => {
        try {
          const tmdbRow = await dispatch(fetchTmdbId(movie));
          const row = await dispatch(
            fetchSeriesData(tmdbRow.payload as ExcelData)
          );

          dispatch(addSeriesData(row.payload as ExcelData[]));
          return row;
        } catch (error) {
          console.error(error);
          return movie;
        }
      })
    );

    dispatch(setSeriesData());
    dispatch(setIsProcessing(false));
  };

  return (
    <div className="w-full relative">
      <svg
        className="absolute w-[32px] h-[32px] z-50 top-[50%] translate-y-[-50%] left-[15px]"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        stroke="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <defs> </defs>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Icon-Set"
              transform="translate(-360.000000, -515.000000)"
              fill="#ffffff"
            >
              <path
                d="M390,543 C390,544.104 389.104,545 388,545 L364,545 C362.896,545 362,544.104 362,543 L362,527 C362,525.896 362.896,525 364,525 L388,525 C389.104,525 390,525.896 390,527 L390,543 L390,543 Z M388,523 L378.746,523 L387.518,516.965 C387.981,516.646 388.113,515.988 387.813,515.496 C387.514,515.004 386.895,514.863 386.431,515.182 C386.431,515.182 376.821,521.817 376.009,522.307 L365.569,515.182 C365.106,514.863 364.486,515.004 364.187,515.496 C363.887,515.988 364.019,516.646 364.482,516.965 L373.254,523 L364,523 C361.791,523 360,524.791 360,527 L360,543 C360,545.209 361.791,547 364,547 L388,547 C390.209,547 392,545.209 392,543 L392,527 C392,524.791 390.209,523 388,523 L388,523 Z M387,538 L383,538 C382.447,538 382,538.447 382,539 C382,539.553 382.447,540 383,540 L387,540 C387.553,540 388,539.553 388,539 C388,538.447 387.553,538 387,538 L387,538 Z M378,540 C378,540.553 377.553,541 377,541 L367,541 C366.447,541 366,540.553 366,540 L366,530 C366,529.448 366.447,529 367,529 L377,529 C377.553,529 378,529.448 378,530 L378,540 L378,540 Z M378,527 L366,527 C364.896,527 364,527.896 364,529 L364,541 C364,542.104 364.896,543 366,543 L378,543 C379.104,543 380,542.104 380,541 L380,529 C380,527.896 379.104,527 378,527 L378,527 Z M387,541 L383,541 C382.447,541 382,541.447 382,542 C382,542.553 382.447,543 383,543 L387,543 C387.553,543 388,542.553 388,542 C388,541.447 387.553,541 387,541 L387,541 Z M384,529 L386,529 L386,531 L384,531 L384,529 Z M385,527 C383.343,527 382,528.343 382,530 C382,531.657 383.343,533 385,533 C386.657,533 388,531.657 388,530 C388,528.343 386.657,527 385,527 L385,527 Z"
                id="tv-television"
              ></path>
            </g>
          </g>
        </g>
      </svg>
      <button
        onClick={handleGetTranslationsClick}
        className="btn h12 w-full pl-[10px] "
      >
        Series Data
      </button>
    </div>
  );
};

export default SeriesButton;
