// @ts-ignore
import { createI18n } from 'vue-i18n/index'
import en from '../langs/en.json'
import vi from '../langs/vi.json'

const messages = {
  en,
  vi
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages
})

export default i18n
