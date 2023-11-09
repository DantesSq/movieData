import React from "react";
import { throttleRequestMetadata } from "../utils/getMetadataTmdb";
import { throttleRequestPersons } from "../utils/getPersons";
import { useAppSelector } from "../store/store";
import { throttleRequestSeriesDirector } from "../utils/getSeriesDirectors";
import { writeFile } from "../utils/writeFile";
import RequestButton from "./RequestButton";
import Translations from "./Translations";
import Metadata from "./Metadata";

const DataManipulating = () => {
  const { currentFile, isProcessing } = useAppSelector((state) => state.files);
  const [openTranslations, setOpenTranslations] = React.useState(false);
  const [openMetadata, setOpenMetadata] = React.useState(false);
  const [cat, setCat] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!currentFile) return <></>;

  return (
    <div className="w-[500px] text-black">
      <div
        className={
          isProcessing
            ? "hidden"
            : "space-y-[50px] text-[16px] flex flex-col items-center"
        }
      >
        <div className="relative w-[280px]">
          <svg
            className="absolute w-[45px] h-[45px] z-50 fill-black top-[50%] translate-y-[-50%] left-[10px] "
            viewBox="0 -12.5 64 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <title>Persons</title> <desc>Created with Sketch.</desc>
              <defs> </defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Persons"
                  transform="translate(1.000000, 2.000000)"
                  stroke="#ffffff"
                  strokeWidth="2"
                >
                  <path
                    d="M19,30 L0,30 C0,22.5 6.8,22.1 8.9,21.1 C10.2,20.5 12,19.4 12,18.4 C12,17.9 11.8,17.5 11.6,17.4 C9.1,16.1 8.6,11.6 8.4,11.6 C7.6,11.6 7,9.6 7,8.2 C7,7.1 7.3,7.1 7.9,6.8 L7.9,6.6 C7.9,3 10.4,-0.1 14,-0.1 C17.7,-0.1 20.1,3.1 20.1,6.7 L20.1,6.9 C20.7,7.2 20.9,7.4 20.9,8.5 C20.9,9.9 20.4,11.8 19.6,11.8 C19.4,11.8 18.9,16 16.5,17.4 C16.3,17.5 16.1,17.7 16.1,18.2 C16.1,19.3 18,20.4 19.3,21 C20.6,21.6 25.1,22.2 27.1,25.9"
                    id="Shape"
                  ></path>
                  <path
                    d="M34.7,26.2 C36.6,22.3 41.2,21.8 42.8,21.1 C44.1,20.5 45.9,19.4 45.9,18.4 C45.9,17.9 45.7,17.5 45.5,17.4 C43,16.1 42.6,11.6 42.4,11.6 C41.6,11.6 41,9.6 41,8.2 C41,7.1 41.3,7.1 41.9,6.8 L41.9,6.6 C41.9,3 44.2,-0.1 47.9,-0.1 C51.6,-0.1 54.2,3.1 54.2,6.7 L54.2,6.9 C54.8,7.2 55,7.4 55,8.5 C55,9.9 54.5,11.8 53.7,11.8 C53.5,11.8 52.9,16 50.5,17.4 C50.3,17.5 50.1,17.7 50.1,18.2 C50.1,19.3 52,20.4 53.3,21 C54.9,21.8 62,22.5 62,29.9 L42.3,29.9"
                    id="Shape"
                  ></path>
                  <path
                    d="M25.8,27.1 C27.1,26.5 28.9,25.4 28.9,24.4 C28.9,23.9 28.7,23.5 28.5,23.4 C26,22.1 25.6,17.6 25.4,17.6 C24.6,17.6 24,15.6 24,14.2 C24,13.1 24.3,13.1 24.9,12.8 L24.9,12.7 C24.9,9.1 27.2,6 30.9,6 C34.6,6 37.2,9.2 37.2,12.8 L37.2,13 C37.8,13.3 38,13.5 38,14.6 C38,16 37.5,17.9 36.7,17.9 C36.5,17.9 35.9,22.1 33.5,23.5 C33.3,23.6 33.1,23.8 33.1,24.3 C33.1,25.4 35,26.5 36.3,27.1 C37.9,27.9 45,28.6 45,36 L16.9,36 C16.9,28.5 23.8,28.1 25.8,27.1 L25.8,27.1 Z"
                    id="Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <RequestButton
            text="Get Directors & Cast"
            requestFunction={throttleRequestPersons}
            setCurrentIndex={setCurrentIndex}
            classes="w-full "
          />
        </div>
        <div className="space-y-[25px] items-center flex flex-col w-full">
          <div className="w-[280px] relative">
            <svg
              className="absolute w-[34px] h-[34px] z-50 top-[50%] translate-y-[-50%] left-[10px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6Z"
                  fill="#ffffff"
                  fill-opacity="0.15"
                />
                <path
                  d="M9.48 12C9.48 13.3255 8.40548 14.4 7.08 14.4C5.75451 14.4 4.68 13.3255 4.68 12C4.68 10.6745 5.75451 9.6 7.08 9.6C8.40548 9.6 9.48 10.6745 9.48 12Z"
                  fill="#ffffff"
                  fill-opacity="0.15"
                />
                <path
                  d="M17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  fill="#ffffff"
                  fill-opacity="0.15"
                />
                <path
                  d="M18.48 18.5368H21M4.68 12L3 12.044M4.68 12C4.68 13.3255 5.75451 14.4 7.08 14.4C8.40548 14.4 9.48 13.3255 9.48 12C9.48 10.6745 8.40548 9.6 7.08 9.6C5.75451 9.6 4.68 10.6745 4.68 12ZM10.169 12.0441H21M12.801 5.55124L3 5.55124M21 5.55124H18.48M3 18.5368H12.801M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6ZM17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <button
              className="btn w-full h12 text-start pl-[70px]"
              onClick={() => {
                setOpenMetadata((prev) => !prev);
              }}
            >
              MetaData Menu
            </button>
          </div>
          <div
            className={
              openMetadata
                ? `space-y-[25px] items-center flex flex-col w-full`
                : "hidden"
            }
          >
            <Metadata
              setOpenMetadata={setOpenMetadata}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </div>
        <div className="space-y-[25px] items-center flex flex-col w-full">
          <div className="w-[280px] relative">
            <svg
              className="absolute w-[34px] h-[34px] z-50 top-[50%] translate-y-[-50%] left-[10px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6Z"
                  fill="#ffffff"
                  fill-opacity="0.15"
                />
                <path
                  d="M9.48 12C9.48 13.3255 8.40548 14.4 7.08 14.4C5.75451 14.4 4.68 13.3255 4.68 12C4.68 10.6745 5.75451 9.6 7.08 9.6C8.40548 9.6 9.48 10.6745 9.48 12Z"
                  fill="#ffffff"
                  fill-opacity="0.15"
                />
                <path
                  d="M17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  fill="#ffffff"
                  fill-opacity="0.15"
                />
                <path
                  d="M18.48 18.5368H21M4.68 12L3 12.044M4.68 12C4.68 13.3255 5.75451 14.4 7.08 14.4C8.40548 14.4 9.48 13.3255 9.48 12C9.48 10.6745 8.40548 9.6 7.08 9.6C5.75451 9.6 4.68 10.6745 4.68 12ZM10.169 12.0441H21M12.801 5.55124L3 5.55124M21 5.55124H18.48M3 18.5368H12.801M17.88 18.6C17.88 19.9255 16.8055 21 15.48 21C14.1545 21 13.08 19.9255 13.08 18.6C13.08 17.2745 14.1545 16.2 15.48 16.2C16.8055 16.2 17.88 17.2745 17.88 18.6ZM17.88 5.4C17.88 6.72548 16.8055 7.8 15.48 7.8C14.1545 7.8 13.08 6.72548 13.08 5.4C13.08 4.07452 14.1545 3 15.48 3C16.8055 3 17.88 4.07452 17.88 5.4Z"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
            <button
              className="btn w-full h12 text-start pl-[70px]"
              onClick={() => setOpenTranslations((prev) => !prev)}
            >
              Translations Menu
            </button>
          </div>
          <div
            className={
              openTranslations
                ? `space-y-[25px] items-center flex flex-col w-full`
                : "hidden"
            }
          >
            <Translations
              setOpenTranslations={setOpenTranslations}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </div>
        {/* <div className="w-[280px]">
          <RequestButton
            text="Series Metadata for Each Episode"
            requestFunction={throttleRequestSeriesDirector}
            classes={"w-full"}
          />
        </div> */}
        {/* <div className="w-full">
          <button
            className="btn w-full"
            onClick={() => {
              setCat((prev) => !prev);
            }}
          >
            Special For Monia
          </button>
        </div> */}
        <div className="">
          <div className="w-[280px] relative">
            <svg
              className="absolute w-[30px] h-[30px] z-50 top-[50%] translate-y-[-50%] left-[50px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"
                  fill="#ffffff"
                />{" "}
              </g>
            </svg>
            <button
              className="btn h12 w-full"
              onClick={() => {
                writeFile(currentFile);
              }}
            >
              Download File
            </button>
          </div>
        </div>

        {/* <div>
          <button className="btn w-full" onClick={() => getLicenseDate("")}>
            Get License Date
          </button>
        </div> */}
      </div>

      <div className={isProcessing ? "" : "hidden"}>
        <img
          className="w-[500px] h-[500px]"
          src="https://media.tenor.com/dkx6V7ntmHMAAAAC/working-cat.gif"
          // src="https://media.tenor.com/NvnO0AuuzvkAAAAC/dancing-cats.gif"
          // src="https://media4.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47s96k6evjuw3o2segnf27o7twfqdo4zn6uhc8e9wv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="processing data..."
        />
        <h1>Processing data...</h1>
        <h1>{Math.ceil((currentIndex / currentFile.data.length) * 100)}%</h1>
      </div>

      <div className={cat ? "" : "hidden"}>
        <img
          className="w-[500px] h-[500px]"
          src="https://media4.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47s96k6evjuw3o2segnf27o7twfqdo4zn6uhc8e9wv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="processing data..."
        />
        <h1>Meow meow meow...</h1>
      </div>
    </div>
  );
};

export default DataManipulating;
