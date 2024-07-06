import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getLanguages, translateText } from "./store/actions";

export default function App() {
  const dispatch = useDispatch();
  const translatedText = useSelector((store) => store.translateReducer);
  const [text, setText] = useState("");

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  const { languages } = useSelector((store) => store.languageReducer);
  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  //* Dil dizisini bizden istenilen formata çevirmek için map ile döndük
  //*dizinin içerisnde her bir elemanın coded ve name değerlerini value ve label değerlerine çevirdik.
  //! Diziyi formatlama işleminde her render sırasında olmasını istemediğimiz için useMemo kullanarak cache'e gönderdik.
  const formatted = useMemo(
    () =>
      languages.map((item) => ({
        label: item.name,
        value: item.code,
      })),
    [languages]
  );

  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  let translatedContent;
  if (translatedText.isLoading) {
    translatedContent = "Loading...";
  } else if (translatedText.isError) {
    translatedContent = "An error occurred";
  } else {
    translatedContent = translatedText.answer || "";
  }

  return (
    <div className="h-screen bg-zinc-900 text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-content-center">
        <h1 className="text-4xl font-semibold text-center mb-6 tracking-widest">
          TRANSLATER +
        </h1>
        {/* Top */}
        <div className="flex gap-3 items-center text-black">
          <Select
            onChange={(e) => setSourceLang(e)}
            value={sourceLang}
            className="flex-1 font-semibold"
            options={formatted}
          />
          <button
            onClick={handleChange}
            className="bg-zinc-700 px-6 py-[10px] rounded-lg hover:ring-3 text-white hover:bg-zinc-800"
          >
            SWAP
          </button>
          <Select
            onChange={(e) => setTargetLang(e)}
            value={targetLang}
            className="flex-1 font-semibold"
            options={formatted}
          />
        </div>
        {/* Bottom */}
        <div className="flex mt-5 md:gap-[105px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[600px] text-black p-2 text-[20px] rounded"
            ></textarea>
          </div>
          <div className="flex-1 relative">
            <textarea
              disabled
              value={translatedContent}
              className="w-full min-h-[300px] max-h-[600px] text-black p-2 text-[20px] rounded cursor-copy"
            ></textarea>
            {translatedText.isLoading && (
              <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleTranslate}
          className="bg-zinc-800 tracking-wide p-2 mt-4 text-[24px] rounded-lg hover:ring-2 transition"
        >
          TRANSLATE
        </button>
      </div>
    </div>
  );
}
