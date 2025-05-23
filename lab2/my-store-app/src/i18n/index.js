import { createI18n } from 'vue-i18n';
import en from './en';
import uk from './uk';

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || 'uk', //default
    fallbackLocale: 'en',
    messages: {
        en,
        uk
    }
});

export default i18n;