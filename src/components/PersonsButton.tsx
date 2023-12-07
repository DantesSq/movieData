import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchDirectorById } from "../store/features/fileThunks";
import {
  setIsProcessing,
  updatePersonsById,
} from "../store/features/filesSlice";
import { ExcelData } from "../types/types";

const PersonsButton = () => {
  const dispatch = useAppDispatch();
  const { currentFile } = useAppSelector((state) => state.files);

  const handleGetPersonsClick = async () => {
    if (!currentFile?.data.length) return;

    dispatch(setIsProcessing(true));

    await Promise.all(
      currentFile.data.map(async (movie) => {
        try {
          const row = await dispatch(fetchDirectorById(movie));
          dispatch(updatePersonsById(row.payload as ExcelData));
          return row;
        } catch (error) {
          console.error(error);
          return movie;
        }
      })
    );

    dispatch(setIsProcessing(false));
  };

  return (
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
      <button onClick={handleGetPersonsClick} className="w-full btn h12">
        Get Directors & Castt
      </button>
    </div>
  );
};

export default PersonsButton;
