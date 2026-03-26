import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsEN from "./en/en.json";
import translationsAR from "./ar/ar.json";
import translationsHE from "./he/he.json";


const resources = {
  en: {
    translation: translationsEN,
  },
  ar: {
    translation: translationsAR,
  },
  he: {
    translation: translationsHE
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "ar", // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    supportedLngs: ['ar', 'en', 'he']
  });

export default i18n;
