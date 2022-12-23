import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import HttpBackend from "i18next-http-backend"; //

i18n
    // .use(HttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: "id",
        // supportedLngs: ["id", "en"], //
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        // backend: {
        //     loadPath: `http://localhost:4000/locales/{{lng}}/{{ns}}.json`,
        // },
        resources: {
            id: {
                translation: {
                    title: "Pastikan Anda mengisi secara teliti agar tidak terjadi pengulangan penginputan data ketika sudah live.",
                },
            },
            en: {
                translation: {
                    title: "Make sure you fill in carefully so that there is no repetition of data input when it is live.",
                },
            },
            "en-US": {
                translation: {
                    title: "Make sure you fill in carefully so that there is no repetition of data input when it is live.",
                },
            },
        },
    });

export default i18n;
