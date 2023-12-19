import React from "react";
import { ExcelData } from "../types/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  requestTmdb,
  setIsProcessing,
  updateMovieById,
} from "../store/features/filesSlice";
import { fetchTmdbId } from "../store/features/fileThunks";

interface RequestButtonNewProps {
  requestFunction: (params: any) => any;
  options?: string[];
  btnText: string;
}

const RequestButtonNew: React.FC<RequestButtonNewProps> = ({
  requestFunction,
  options,
  btnText,
}) => {
  const { currentFile } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  const handleGetTranslationsClick = async () => {
    if (!currentFile?.data.length) return;
    dispatch(setIsProcessing(true));

    for (let index = 0; index < currentFile.data.length; index++) {
      // debugger;
      let movie = currentFile.data[index];
      try {
        if (!currentFile.tmdb_requested) {
          const tmdbRow = await dispatch(fetchTmdbId(movie));
          movie = tmdbRow.payload as ExcelData;
        }
        // console.log(options ? "YES" : "NO");
        let row = await dispatch(
          requestFunction(options ? { movie, options } : movie)
        );
        options
          ? (row = await dispatch(requestFunction({ movie, options })))
          : (row = await dispatch(requestFunction(movie)));

        // console.log(row.payload, " here");

        dispatch(updateMovieById(row.payload as ExcelData));
      } catch (error) {
        // console.error(error);
      }
    }

    if (!currentFile.tmdb_requested) dispatch(requestTmdb(currentFile.index));

    dispatch(setIsProcessing(false));
  };

  return (
    <button
      onClick={handleGetTranslationsClick}
      className={`btn ${options && !options.length && "btn-locked"}  ${
        options && "btn-menu"
      } h12 w-full`}
    >
      {btnText}
    </button>
  );
};

export default RequestButtonNew;
