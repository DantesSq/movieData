import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { parsePath, useNavigate } from "react-router-dom";
import { resetFiles } from "../store/features/filesSlice";

const MainCreateCtrl = () => {
  const { currentFile, files } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentFile) navigate("/");
  }, [currentFile]);

  if (!currentFile) return <>No Current File</>;
  return (
    <div className="w-full flex justify-center my-[25px]">
      {currentFile ? (
        <div className="w-[500px]">
          <div className="flex justify-between">
            <h1 className="text-lg">Current File</h1>
            <h2
              onClick={() => dispatch(resetFiles())}
              className="text-[15px] text-purple-800 underline hover:cursor-pointer hover:text-purple-700 active:text-purple-600"
            >
              Upload new file
            </h2>
          </div>
          <select className="w-full h-12 rounded-xs bg-gray-200 text-center mb-[50px]">
            <option value={currentFile?.index}>{currentFile.name}</option>
            {files.map((file) => {
              if (file.index !== currentFile.index) {
                return <option value={file?.index}>{file.name}</option>;
              }
            })}
          </select>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainCreateCtrl;
