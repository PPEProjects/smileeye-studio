import { createI18n } from 'vue-i18n'
// @ts-ignore
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
  legacy: false,
  locale: 'vi', // set locale
  fallbackLocale: 'vi', // set fallback locale,
  messages
})

export default i18n
