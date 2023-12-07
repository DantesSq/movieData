import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchTranslationsById } from "../store/features/fileThunks";
import { setIsProcessing, updateMovieById } from "../store/features/filesSlice";
import { ExcelData } from "../types/types";

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

    await Promise.all(
      currentFile.data.map(async (movie) => {
        try {
          const row = await dispatch(fetchTranslationsById({ movie, options }));
          dispatch(updateMovieById(row.payload as ExcelData));
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
    <button
      onClick={handleGetTranslationsClick}
      className={`btn ${!options.length && "btn-locked"}  btn-menu h12`}
    >
      Get Translations
    </button>
  );
};

export default TranslationsButton;
