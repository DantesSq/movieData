import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  fetchTmdbId,
  fetchTranslationsById,
} from "../store/features/fileThunks";
import {
  requestTmdb,
  setIsProcessing,
  updateMovieById,
} from "../store/features/filesSlice";
import { ExcelData } from "../types/types";
import { timeout } from "../utils/timeoutPromise";

interface TranslationsButtonProps {
  options: string[];
}

const TranslationsButton: React.FC<TranslationsButtonProps> = (props) => {
  const { options } = props;
  const dispatch = useAppDispatch();
  const { currentFile } = useAppSelector((state) => state.files);

  const handleGetTranslationsClick = async () => {
    if (!currentFile?.data.length) return;
    dispatch(setIsProcessing(true));

    for (let index = 0; index < currentFile.data.length; index++) {
      let movie = currentFile.data[index];

      try {
        if (!currentFile.tmdb_requested) {
          const tmdbRow = await dispatch(fetchTmdbId(movie));
          movie = tmdbRow.payload as ExcelData;

          if (index + 1 === currentFile.data.length)
            dispatch(requestTmdb(currentFile.index));
        }
        const row = await dispatch(
          fetchTranslationsById({
            movie: movie,
            options,
          })
        );
        dispatch(updateMovieById(row.payload as ExcelData));
      } catch (error) {
        console.error(error);
      }
    }

    // await Promise.all(
    //   currentFile.data.map(async (movie) => {
    //     try {
    //       const tmdbRowPromise = dispatch(fetchTmdbId(movie));
    //       const tmdbRow: any = await Promise.race([
    //         tmdbRowPromise,
    //         timeout(10),
    //       ]);

    //       const rowPromise = dispatch(
    //         fetchTranslationsById({
    //           movie: tmdbRow.payload as ExcelData,
    //           options,
    //         })
    //       );

    //       const row: any = await Promise.race([rowPromise, timeout(15)]);

    // dispatch(updateMovieById(row.payload as ExcelData));
    //       return row;
    //     } catch (error) {
    //       console.error(error);
    //       return movie;
    //     }
    //   })
    // );

    dispatch(setIsProcessing(false));
  };

  return (
    <button
      onClick={handleGetTranslationsClick}
      className={`btn ${!options.length && "btn-locked"}  btn-menu h12`}
    >
      Get Translations
    </button>
  );
};

export default TranslationsButton;
