import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import RequestButton from "./RequestButton";
import { throttleRequestTranslation } from "../utils/getTranslations";
import { setChecked } from "../store/features/languagesSlice";

const Translations = () => {
  const { languages } = useAppSelector((state) => state.languages);
  const currentFile = useAppSelector((state) => state.files.currentFile);

  const dispatch = useAppDispatch();

  const [languageChecked, setLanguageChecked] = React.useState(false);
  const [languagesIso, setLanguagesIso] = React.useState([""]);
  React.useEffect(() => {
    if (!languages) return;
    const hasCheckedLanguage = languages.some((languageGroup) => {
      return languageGroup.some((language) => language.checked === true);
    });
    hasCheckedLanguage ? setLanguageChecked(true) : setLanguageChecked(false);
    const allLanguages = languages.flatMap((languageGroup) => languageGroup);

    const checkedLanguageISOs = allLanguages
      .filter((language) => language.checked === true)
      .map((language) => language.iso_3166_1);
    setLanguagesIso(checkedLanguageISOs);
  }, [languages]);

  return (
    <>
      <div className="TITLE/SYNOPSIS flex space-x-[25px]">
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
      </div>
      <div className="LANGUAGES space-y-[25px]">
        <h1>Languages</h1>
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
                          setChecked({
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
      <RequestButton
        text="Get Translations"
        requestTranslation={throttleRequestTranslation}
        classes={`btn w-full ${!languageChecked && "btn-locked"}`}
        disabled={!languageChecked}
        languages={languagesIso}
      />
    </>
  );
};

export default Translations;
