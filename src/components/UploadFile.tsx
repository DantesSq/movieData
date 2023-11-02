import React from "react";
import UploadedFile from "./UploadedFile";
import DropFile from "./DropFile";
import { useAppSelector } from "../store/store";
interface UploadFileProps {
  handleFileSubmit: (args: any) => any;
}

const UploadFile: React.FC<UploadFileProps> = ({ handleFileSubmit }) => {
  const { rawFiles } = useAppSelector((state) => state.files);
  return (
    <div className="w-[900px] bg-white py-[30px] px-[150px] round-xl">
      <h1 className="mb-[30px] text-center">Upload Files</h1>
      <DropFile />
      {rawFiles.length ? (
        <div className="mt-[50px]">
          <h2>Uploaded files</h2>
          <div className=" space-y-[15px]">
            {rawFiles.map((item) => {
              return (
                <UploadedFile
                  key={item.index}
                  name={item.file.name}
                  index={item.index}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      <button
        onClick={handleFileSubmit}
        className={`btn mt-[30px] w-full ${!rawFiles.length && "btn-locked"}`}
      >
        Upload Files
      </button>
    </div>
  );
};

export default UploadFile;
