import React from "react";
import RequestButton from "./RequestButton";
import { throttleRequestMetadata } from "../utils/getMetadataTmdb";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCheckedMetadata } from "../store/features/requestOptionsSlice";

const Metadata = ({
  setOpenMetadata,
}: {
  setOpenMetadata: (arg: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const { main_data, secondary_data } = useAppSelector(
    (state) => state.options
  );

  const [options, setOptions] = React.useState([""]);

  React.useEffect(() => {
    if (!main_data && !secondary_data) return;

    const main_data_checked = main_data
      .filter((item) => item.checked)
      .map((item) => item.key);

    const secondary_data_checked = secondary_data
      .filter((item) => item.checked)
      .map((item) => item.key);

    const options = [...main_data_checked, ...secondary_data_checked];

    setOptions(options);
  }, [main_data, secondary_data]);

  return (
    <div className="absolute w-[100vw] h-[100vh] bg-black/70 top-0 left-0 z-[1000] flex items-center justify-center text-[18px] ">
      <div className=" bg-white p-[30px] flex flex-col items-center rounded-xl space-y-[40px] w-[600px]">
        <div className="space-y-[25px]">
          <h1 className="">Select metadata fields</h1>
          <div className="flex space-x-[20px] justify-between">
            {main_data.map((item) => (
              <div className="flex items-center space-x-[10px]" key={item.name}>
                <input
                  className="w-[20px] h-[20px]"
                  onChange={(e) => {
                    dispatch(
                      setCheckedMetadata({
                        name: item.name,
                        checked: e.target.checked,
                      })
                    );
                  }}
                  type="checkbox"
                  id={item.name}
                  value={item.name}
                  defaultChecked
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-[20px]">
            {secondary_data.map((item) => (
              <div className="flex items-center space-x-[10px]" key={item.name}>
                <input
                  className="w-[20px] h-[20px]"
                  onChange={(e) => {
                    dispatch(
                      setCheckedMetadata({
                        name: item.name,
                        checked: e.target.checked,
                      })
                    );
                  }}
                  type="checkbox"
                  id={item.name}
                  value={item.name}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-x-[10px] flex">
          <button
            className="btn btn-cancel btn-menu h12"
            onClick={() => setOpenMetadata(false)}
          >
            Cancel
          </button>
          <div onClick={() => setOpenMetadata(false)}>
            <RequestButton
              text="Get Metadata"
              requestWithOptions={throttleRequestMetadata}
              classes={`btn ${!options.length && "btn-locked"}  btn-menu`}
              disabled={!options.length}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
