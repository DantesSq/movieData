import React from "react";
import { structurizePlannerData } from "../utils/structurizePlannerData";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateFile } from "../store/features/filesSlice";

const PlannerButton = () => {
  const dispatch = useAppDispatch();
  const { currentFile, files, ramowkaFile } = useAppSelector(
    (state) => state.files
  );

  const checkAllFiles = () => {
    let i = 0;
    const data = [];
    for (i; i < files.length; i++) {
      const currentFile = files[i];
      if (currentFile.name === "ramowka.xlsx") continue;
      // const { name, index, tmdb_requested } = currentFile;
      const sturctData: any = structurizePlannerData(
        currentFile.data,
        currentFile.name
      );
      data.push(...sturctData);

      if (i === files.length - 1) {
        dispatch(
          updateFile({
            file: {
              name: "ramowka.xlsx",
              index: Math.random(),
              tmdb_requested: true,
              data: data,
            },
          })
        );
      }
    }
  };

  return (
    <div className="w-full">
      <button
        className="btn h12 w-full"
        onClick={async () => {
          checkAllFiles();
        }}
      >
        Button
      </button>{" "}
    </div>
  );
};

export default PlannerButton;
