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
  requestFunction: (
    excelData: ExcelData[],
    setUpdatedFile: any
  ) => Promise<void>;
}

const RequestButton: React.FC<RequestButtonProps> = ({
  text,
  requestFunction,
  classes,
}) => {
  const { currentFile, isProcessing } = useAppSelector((state) => state.files);
  const tmdb_requested = currentFile?.tmdb_requested;

  React.useEffect(() => {
    console.log(isProcessing, "isProcessing");
  }, [isProcessing]);

  const dispatch = useAppDispatch();

  const [updatedFileData, setUpdatedFileData] = React.useState<ExcelData[]>([]);
  const [requestedTmdb, setRequestedTmdb] = React.useState(false);

  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    console.log(start, "start", tmdb_requested);
    if (start && tmdb_requested) {
      console.log("inside throttleFunction", currentFile);

      const throttleRequest = async () => {
        await requestFunction(currentFile.data, setUpdatedFileData);
        setStart(false);
        dispatch(setIsProcessing(false));
      };

      throttleRequest();
    }
  }, [start, tmdb_requested]);

  React.useEffect(() => {
    console.log("update current file", updatedFileData);
    if (!isProcessing && updatedFileData.length && currentFile && !start) {
      console.log("dispatch update current file", isProcessing);
      dispatch(
        updateFile({
          file: { ...currentFile, data: updatedFileData },
        })
      );
      setUpdatedFileData([]);
    }
  }, [isProcessing, updatedFileData, start]);

  console.log(start);

  React.useEffect(() => {
    if (
      requestedTmdb &&
      updatedFileData.length &&
      currentFile &&
      !tmdb_requested
    ) {
      console.log("dispatch tmdb");
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
      console.log("after await tmdb");
      setRequestedTmdb(true);
    }
    console.log("here setStart");
  };

  return (
    <>
      <button
        className={`btn ${classes}`}
        onClick={async () => {
          // start processing here
          dispatch(setIsProcessing(true));
          await checkTmdb();
          console.log("setStart1");
          setStart(true);
          console.log("setStart");
        }}
      >
        {text}
      </button>
    </>
  );
};

export default RequestButton;
