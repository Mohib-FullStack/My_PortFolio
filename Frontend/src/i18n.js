// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFR from "../locales/fr/translation.json";
import translationEN from "../locales/en/translation.json";
import translationZH from "../locales/zh/translation.json";
import store from "../app/store"; // Import your Redux store

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  zh: { translation: translationZH },
};

i18n.use(initReactI18next).init({
  resources,
  lng: store.getState().language.language, // Get the initial language from Redux store
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

// Listen for language changes in the Redux store
store.subscribe(() => {
  const currentLanguage = store.getState().language.language;
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage); // Update i18next language
  }
});

export default i18n;




//! only navbar
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import translationEN from "../locales/en/translation.json";
// import translationFR from "../locales/fr/translation.json";
// import translationZH from "../locales/zh/translation.json";

// const resources = {
//   fr: { translation: translationFR },
//   en: { translation: translationEN },
//   zh: { translation: translationZH },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: "fr", // Default language
//   fallbackLng: "fr",
//   interpolation: {
//     escapeValue: false,
//   },
// });

// export default i18n;



// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpApi from 'i18next-http-backend';

// i18n
//   .use(HttpApi)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     supportedLngs: ['en', 'fr', 'ar', 'es', 'ja', 'zh', 'pl', 'lu', 'bn'],
//     fallbackLng: 'en',
//     detection: {
//       order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
//       caches: ['cookie'],
//     },
//     backend: {
//       loadPath: '/locales/{{lng}}/translation.json',
//     },
//     react: {
//       useSuspense: false,
//     },
//   });

// export default i18n;
