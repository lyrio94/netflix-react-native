import I18n from 'i18n-js';

const normalizeTranslate = {
  en_US: "en_US",
  en: "en_US",
  pt_BR: "pt_BR",
  pt_US: "pt_BR"
}

I18n.translations = {
  en: require("./en-US.json"),
  pt_BR: require("./pt-BR.json")
}

const getLanguage = () => {
  return "pt_BR"
}

export const configureLanguageToI18n = () => {

  const language = getLanguage()
  const translateNormalize = normalizeTranslate[language]
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize)

  iHaveThisLanguage ? I18n.locale = translateNormalize : I18n.defaultLocale = "pt_BR"

  console.log(I18n.t("search"));
}


export const translate = (word) => I18n.t(word)