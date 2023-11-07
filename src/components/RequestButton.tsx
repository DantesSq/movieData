import React from "react";
import { ExcelData } from "../types/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { throttleRequestTMDB } from "../utils/getTmdb";
import {
  requestTmdb,
  setIsProcessing,
  updateFile,
} from "../store/features/filesSlice";

interface RequestButtonProps {
  classes?: string;
  text: string;
  requestFunction?: (
    excelData: ExcelData[],
    setUpdatedFile: any
  ) => Promise<void>;
  requestWithOptions?: (
    excelData: ExcelData[],
    setUpdatedFile: any,
    options: string[] | undefined
  ) => Promise<void>;
  disabled?: boolean;
  options?: string[];
}

const RequestButton: React.FC<RequestButtonProps> = ({
  text,
  requestFunction,
  classes,
  disabled,
  requestWithOptions,
  options,
}) => {
  const { currentFile, isProcessing } = useAppSelector((state) => state.files);
  const tmdb_requested = currentFile?.tmdb_requested;

  const dispatch = useAppDispatch();

  const [updatedFileData, setUpdatedFileData] = React.useState<ExcelData[]>([]);
  const [requestedTmdb, setRequestedTmdb] = React.useState(false);

  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    if (start && tmdb_requested) {
      const throttleRequest = async () => {
        if (requestFunction) {
          await requestFunction(currentFile.data, setUpdatedFileData);
        } else if (requestWithOptions) {
          await requestWithOptions(
            currentFile.data,
            setUpdatedFileData,
            options
          );
        }

        setStart(false);
        dispatch(setIsProcessing(false));
      };

      throttleRequest();
    }
  }, [start, tmdb_requested]);

  React.useEffect(() => {
    if (!isProcessing && updatedFileData.length && currentFile && !start) {
      dispatch(
        updateFile({
          file: { ...currentFile, data: updatedFileData },
        })
      );
      setUpdatedFileData([]);
    }
  }, [isProcessing, updatedFileData, start]);

  React.useEffect(() => {
    if (
      requestedTmdb &&
      updatedFileData.length &&
      currentFile &&
      !tmdb_requested
    ) {
      dispatch(
        updateFile({
          file: { ...currentFile, data: updatedFileData, tmdb_requested: true },
        })
      );
      setUpdatedFileData([]);
    }
  }, [requestedTmdb, updatedFileData, tmdb_requested]);

  const checkTmdb = async () => {
    if (!tmdb_requested && currentFile) {
      await throttleRequestTMDB(currentFile.data, setUpdatedFileData);

      setRequestedTmdb(true);
    }
  };

  return (
    <>
      <button
        className={`btn ${classes}`}
        onClick={async () => {
          dispatch(setIsProcessing(true));
          await checkTmdb();
          setStart(true);
        }}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default RequestButton;
