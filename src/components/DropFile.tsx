import React from "react";
import { arrayToFileList } from "../utils/arrayToFileList";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addRawFiles, setRawFiles } from "../store/features/filesSlice";

const DropFile = () => {
  const dispatch = useAppDispatch();
  const { rawFiles } = useAppSelector((state) => state.files);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    getInputFile();
  };
  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dropFiles: any = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const name = e.dataTransfer.files[i].name;
      if (
        name.endsWith(".txt") ||
        name.endsWith(".xlsx") ||
        name.endsWith(".xlsm") ||
        name.endsWith(".xls")
      ) {
        dropFiles.push(e.dataTransfer.files[i]);
      }
    }
    if (inputRef && inputRef.current) {
      inputRef.current.files = arrayToFileList(dropFiles);
      getInputFile();
    }
  };

  const getInputFile = () => {
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files[0]
    ) {
      const files = inputRef.current.files;
      if (rawFiles) {
        dispatch(addRawFiles(files));
      } else dispatch(setRawFiles(files));
    }
  };

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }
  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }
  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  return (
    <form
      className="w-[600px] h-64"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col relative items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg ${
          dragActive ? "bg-gray-100" : "bg-[#f8f8ff]"
        } hover:bg-gray-100 `}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-[80px] h-[80px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 19V12M12 12L9.75 14.3333M12 12L14.25 14.3333M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                stroke="#6941C6"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <p className="mb-2 text-sm text-black">
            <span className="font-semibold">Drag and drop files</span>
          </p>
          <p className="text-xs text-gray-500">
            Supported formates: TXT, XLSX, XLS or XLSM
          </p>
        </div>

        <input
          ref={inputRef}
          id="dropzone-file"
          type="file"
          multiple
          className="absolute w-full h-full top-0 left-0 z-50 opacity-0 cursor-pointer"
          accept=".xlsx,.xls,.txt,.xlsm"
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default DropFile;
