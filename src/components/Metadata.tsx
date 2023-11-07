import React from "react";
import RequestButton from "./RequestButton";
import { throttleRequestMetadata } from "../utils/getMetadataTmdb";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCheckedMetadata } from "../store/features/requestOptionsSlice";

const Metadata = () => {
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
    console.log(options);
  }, [main_data, secondary_data]);

  console.log(!options.length);

  return (
    <>
      <div className="space-y-[25px]">
        <h1></h1>
        <div className="flex justify-between">
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
        <div className="flex justify-between flex-wrap gap-3">
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
      <RequestButton
        text="Get Metadata"
        requestWithOptions={throttleRequestMetadata}
        classes={`btn w-full ${!options.length && "btn-locked"}`}
        disabled={!options.length}
        options={options}
      />
    </>
  );
};

export default Metadata;
