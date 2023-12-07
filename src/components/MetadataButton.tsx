import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchMetadataById } from "../store/features/fileThunks";
import { setIsProcessing, updateMovieById } from "../store/features/filesSlice";
import { ExcelData } from "../types/types";

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

    await Promise.all(
      currentFile.data.map(async (movie) => {
        try {
          const row = await dispatch(
            fetchMetadataById({ movie, metadataOptions: options })
          );
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
      onClick={handleGetMetadataClick}
      className={`btn ${!options.length && "btn-locked"}  btn-menu h12`}
    >
      Get Metadata
    </button>
  );
};

export default MetadataButton;
