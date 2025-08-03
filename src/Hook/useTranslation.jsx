import { useEffect, useState } from "react";
import { translations } from "../translations/AllTranslation";

function getNestedValue(obj, key) {
  return key.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export const useTranslation = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLang(storedLang);
  }, []);

  const t = (key) => {
    const value = getNestedValue(translations[lang], key);
    return value === undefined ? key : value;
  };

  return { lang, t };
};
