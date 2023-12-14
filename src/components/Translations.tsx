import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCheckedLanguage } from "../store/features/requestOptionsSlice";
import TranslationsButton from "./TranslationsButton";
import RequestButtonNew from "./RequestButtonNew";
import { fetchTranslationsById } from "../store/features/fileThunks";

const Translations = ({
  setOpenTranslations,
}: {
  setOpenTranslations: (arg: boolean) => void;
}) => {
  const { languages } = useAppSelector((state) => state.options);
  const dispatch = useAppDispatch();

  const [options, setOptions] = React.useState([""]);
  React.useEffect(() => {
    if (!languages) return;
    const allLanguages = languages.flatMap((languageGroup) => languageGroup);
    const checkedLanguageISOs = allLanguages
      .filter((language) => language.checked === true)
      .map((language) => language.iso_3166_1);

    setOptions(checkedLanguageISOs);
  }, [languages]);

  return (
    <div
      id="ddd"
      className="absolute w-[100vw] h-[100vh] bg-black/70 top-0 left-0 z-[1000] flex items-center justify-center text-[18px] "
    >
      <div className=" bg-white p-[30px] flex flex-col items-center rounded-xl space-y-[40px] w-[600px]">
        {/* <div className="TITLE/SYNOPSIS flex space-x-[25px]">
        <div className="flex items-center space-x-[10px]">
          <input
            className="w-[20px] h-[20px]"
            type="checkbox"
            defaultChecked
            id="title"
            value="title"
          />
          <label htmlFor="title">Translate Title</label>
        </div>
        <div className="flex items-center space-x-[10px]">
          <input
            className="w-[20px] h-[20px]"
            type="checkbox"
            defaultChecked
            id="synopsis"
            value="synopsis"
          />
          <label htmlFor="synopsis">Translate Synopsis</label>
        </div>
      </div> */}
        <div className="LANGUAGES space-y-[25px]">
          <h1>Select Languages</h1>
          {languages.map((languages, index) => {
            return (
              <div className="flex space-x-[25px]" key={index}>
                {languages.map((language) => {
                  return (
                    <div
                      className="flex items-center space-x-[10px]"
                      key={language.iso_3166_1}
                    >
                      <input
                        className="w-[20px] h-[20px]"
                        onChange={(e) => {
                          dispatch(
                            setCheckedLanguage({
                              checked: e.target.checked,
                              iso_3166_1: language.iso_3166_1,
                            })
                          );
                        }}
                        type="checkbox"
                        id={language.iso_3166_1}
                        value={language.iso_639_1}
                      />
                      <label htmlFor={language.iso_3166_1}>
                        {language.english_name}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="space-x-[10px] flex">
          <button
            className="btn btn-cancel btn-menu h12"
            onClick={() => setOpenTranslations(false)}
          >
            Cancel
          </button>
          <div onClick={() => setOpenTranslations(false)}>
            {/* <TranslationsButton options={options} /> */}
            <RequestButtonNew
              options={options}
              requestFunction={fetchTranslationsById}
              btnText="Get Translations"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translations;
