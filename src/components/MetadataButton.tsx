import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchMetadataById, fetchTmdbId } from "../store/features/fileThunks";
import {
  requestTmdb,
  setIsProcessing,
  updateMovieById,
} from "../store/features/filesSlice";
import { ExcelData } from "../types/types";
import { timeout } from "../utils/timeoutPromise";

interface MetadataButtonProps {
  options: string[];
}

const MetadataButton: React.FC<MetadataButtonProps> = (props) => {
  const { options } = props;
  const dispatch = useAppDispatch();
  const { currentFile } = useAppSelector((state) => state.files);

  const handleGetMetadataClick = async () => {
    if (!currentFile?.data.length) return;

    dispatch(setIsProcessing(true));

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    for (let index = 0; index < currentFile.data.length; index++) {
      const movie = currentFile.data[index];

      try {
        const tmdbRow = await dispatch(fetchTmdbId(movie));
        const row = await dispatch(
          fetchMetadataById({
            movie: tmdbRow.payload as ExcelData,
            options,
          })
        );

        dispatch(updateMovieById(row.payload as ExcelData));
      } catch (error) {
        console.error(error);
      }
    }

    if (!currentFile.tmdb_requested) dispatch(requestTmdb(currentFile.index));

    dispatch(setIsProcessing(false));
  };

  return (
    <button
      onClick={handleGetMetadataClick}
      className={`btn ${!options.length && "btn-locked"}  btn-menu h12`}
    >
      Get Metadata
    </button>
  );
};

export default MetadataButton;
