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
          {/* <svg
            className="absolute w-[30px] h-[30px] z-50 fill-white top-[50%] translate-y-[-50%] left-[20px]"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 72 72"
            enable-background="new 0 0 72 72"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              
              <g>
                
                <path d="M16.86,27.69c6.848,0,12.418-5.569,12.418-12.416c0-6.847-5.57-12.417-12.418-12.417c-6.846,0-12.416,5.57-12.416,12.417 C4.444,22.121,10.013,27.69,16.86,27.69z M16.86,6.857c4.642,0,8.418,3.776,8.418,8.417s-3.776,8.416-8.418,8.416 c-4.641,0-8.416-3.775-8.416-8.416C8.444,10.632,12.219,6.857,16.86,6.857z" />
                <path d="M12.355,15.275l-0.005-0.267c-0.004-0.114-0.004-0.114,0.021-0.245c0.103-0.542-0.252-1.067-0.794-1.171 c-0.539-0.1-1.067,0.252-1.171,0.794c-0.063,0.327-0.063,0.478-0.056,0.688l0.004,0.2c0,0.553,0.447,1,1,1 C11.906,16.274,12.354,15.827,12.355,15.275z" />
                <path d="M12.283,13.211c0.322,0,0.639-0.155,0.832-0.444c0.839-1.252,2.239-2,3.745-2c0.553,0,1-0.447,1-1c0-0.553-0.447-1-1-1 c-2.174,0-4.195,1.079-5.407,2.887c-0.307,0.459-0.185,1.08,0.274,1.388C11.898,13.156,12.092,13.211,12.283,13.211z" />
                <path d="M44.859,27.69c6.849,0,12.418-5.569,12.418-12.416c0-6.847-5.569-12.417-12.418-12.417c-6.846,0-12.416,5.57-12.416,12.417 C32.444,22.121,38.014,27.69,44.859,27.69z M44.859,6.857c4.643,0,8.418,3.776,8.418,8.417s-3.775,8.416-8.418,8.416 c-4.641,0-8.416-3.775-8.416-8.416C36.444,10.632,40.219,6.857,44.859,6.857z" />
                <path d="M40.283,13.211c0.322,0,0.639-0.155,0.832-0.444c0.839-1.252,2.238-2,3.744-2c0.554,0,1-0.447,1-1c0-0.553-0.446-1-1-1 c-2.174,0-4.194,1.079-5.406,2.887c-0.307,0.459-0.186,1.08,0.273,1.388C39.898,13.156,40.092,13.211,40.283,13.211z" />
                <path d="M68.854,32.122c-0.655-0.67-1.472-1.029-2.467-1.029c-0.809,0-1.681,0.217-2.74,0.729 c-3.144,1.682-7.642,4.045-10.582,5.577l0.049-0.75c0.004-0.049,0.006-0.196,0.006-0.246c0-3.891-3.11-7.26-6.932-7.26H9.05 c-3.758,0-7.051,3.696-7.051,7.589V62.87c0,3.745,3.164,6.272,7.051,6.272h37.138c3.856,0,6.879-2.747,6.928-6.519 c-0.001,0.004-0.001,0.009-0.002,0.002l-0.104-1.664c2.657,1.332,6.785,3.472,10.613,5.488c0.109,0.058,0.209,0.108,0.328,0.146 c1.041,0.32,1.87,0.54,2.669,0.545c1.425-0.011,2.29-0.708,2.71-1.289c0.498-0.687,0.67-1.576,0.67-2.779V36.166V36.06 C70,35.263,70.102,33.388,68.854,32.122z M66.119,63.029c-0.279-0.066-0.577-0.159-0.785-0.223 c-13.452-7.082-13.92-7.094-14.514-7.094c-0.551,0-1.078,0.202-1.457,0.604c-0.377,0.4-0.572,0.889-0.539,1.439l0.295,4.836 c-0.029,1.549-1.307,2.551-2.932,2.551H9.05c-1.698,0-3.051-0.72-3.051-2.272V36.732c0-1.694,1.489-3.589,3.051-3.589v-0.001 h37.138c1.569,0,2.897,1.568,2.931,3.197l-0.293,4.319c-0.039,0.553,0.153,1.1,0.53,1.506c0.379,0.406,0.91,0.637,1.465,0.637 c0.652,0,0.826-0.002,14.637-7.389c0.273-0.132,0.48-0.208,0.63-0.252c0.024,0.179,0.04,0.442,0.034,0.835L66.119,63.029z" />
                <path d="M53.115,62.624c0.001-0.01,0.002-0.036,0.003-0.061C53.118,62.584,53.115,62.604,53.115,62.624z" />
                <path d="M66.65,67.143c-0.01,0-0.02-0.002-0.03-0.002s-0.021,0.002-0.031,0.002C66.588,67.143,66.65,67.143,66.65,67.143z" />
                <path d="M53.118,62.563c0-0.008,0.001-0.016,0.001-0.023C53.119,62.525,53.119,62.542,53.118,62.563z" />
                <path d="M20.118,35.142h-8.494c-2.007,0-3.625,2.475-3.625,4.325v5.082c0,0.553,0.447,1,1,1c0.553,0,1-0.447,1-1.001v-5.082 c0-0.931,0.894-2.323,1.625-2.323h8.494c0.553,0,1-0.447,1-1S20.671,35.142,20.118,35.142z" />
                <path d="M25.118,35.143h-1c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1h1c0.553,0,1-0.447,1-1 C26.118,35.59,25.671,35.143,25.118,35.143z" />
              </g>
            </g>
          </svg> */}
          <svg
            className="absolute w-[45px] h-[45px] z-50 fill-black top-[50%] translate-y-[-50%] left-[10px] "
            viewBox="0 -12.5 64 64"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <title>Persons</title> <desc>Created with Sketch.</desc>
              <defs> </defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Persons"
                  transform="translate(1.000000, 2.000000)"
                  stroke="#ffffff"
                  stroke-width="2"
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
            classes="w-full "
          />
        </div>
        {/* className="absolute w-[30px] h-[30px] z-50 fill-white top-[50%] translate-y-[-50%] left-[20px]" */}
        <div className="space-y-[25px] items-center flex flex-col w-full">
          <div className="w-[280px] relative">
            <svg
              className="absolute w-[34px] h-[34px] z-50 top-[50%] translate-y-[-50%] left-[10px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
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
            <Metadata setOpenMetadata={setOpenMetadata} />
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
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke-linecap="round"
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
            <Translations setOpenTranslations={setOpenTranslations} />
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
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
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
          src="https://media4.giphy.com/media/ule4vhcY1xEKQ/giphy.gif?cid=ecf05e47s96k6evjuw3o2segnf27o7twfqdo4zn6uhc8e9wv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="processing data..."
        />
        <h1>Processing data...</h1>
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
