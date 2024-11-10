import i18n from "i18next";
import enDictinaries from "../dictionaries/en";
import viDictionaries from "../dictionaries/vi";
import { initReactI18next } from "react-i18next";
import { clientStorage } from "./storage";
import { LANGUAGE_STORAGE_KEY } from "../constant";

const resources = {
  en: {
    translation: enDictinaries,
  },
  vi: {
    translation: viDictionaries,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: clientStorage.get(LANGUAGE_STORAGE_KEY) || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
