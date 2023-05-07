import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

export const i18n = createI18n({
    legacy: false,
    locale: "es",
    globalInjection: true,
    fallbackLocale: window.navigator.language.substring(0, 2) || "en",
    availableLocales: ["en", "es"],
    messages: messages,
});