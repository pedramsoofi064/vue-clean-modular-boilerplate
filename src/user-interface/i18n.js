import { createI18n } from 'vue-i18n'
import fa from '@/locales/fa.json'
import en from '@/locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { fa, en },
  numberFormats: {
    fa: { decimal: { style: 'decimal', useGrouping: true } },
    en: { decimal: { style: 'decimal', useGrouping: true } }
  },
  datetimeFormats: {
    fa: { short: { year: 'numeric', month: '2-digit', day: '2-digit' } },
    en: { short: { year: 'numeric', month: '2-digit', day: '2-digit' } }
  },
  pluralRules: {
    fa: (n) => (n === 1 ? 0 : 1)
  }
})

export default i18n