<template>
    <header class="generic__header">
        <div class="header__container">
            <div class="header__nav-links--left">
                <RouterLink to="/"><strong>01.</strong>{{ $t("header-component.links.home") }}</RouterLink>
                <RouterLink to="/playground"><strong>02.</strong>{{ $t("header-component.links.playground") }}</RouterLink>
                <RouterLink to="/components"><strong>03.</strong>{{ $t("header-component.links.components") }}</RouterLink>
            </div>

            <img src="/images/logo-dark.png" alt="Logo Coderine" class="header__logo">
            <div class="header__nav-links-right">
                <RouterLink to="/register" v-if="!useAuthStore().isAutheticated" class="generic__button--primary">{{
                    $t("header-component.links.register") }}
                </RouterLink>
                <RouterLink to="/login" v-if="!useAuthStore().isAutheticated" class="generic__button--secondary">{{
                    $t("header-component.links.login") }}
                </RouterLink>
                <span v-if="useAuthStore().isAutheticated" class="generic__button--secondary" @click="onLogout">{{
                    $t("header-component.links.logout") }}
                </span>

                <div class="header__user" v-if="useAuthStore().isAutheticated">
                    <img :src="useAuthStore().user.avatar" alt="Avatar" class="header__user--avatar"
                        :title="useAuthStore().user.name">
                    <p class="header__user--name">{{ useAuthStore().user.name }}</p>
                </div>

                <div class="header__language-selector">
                    <div class="header__language-selector--button">
                        <input type="checkbox" class="header__language-selector--checkbox" @click="onToggleLanguage"
                            v-if="isChecked" />
                        <input type="checkbox" class="header__language-selector--checkbox" @click="onToggleLanguage" v-else
                            checked />
                        <div class="header__language-selector--knobs"></div>
                        <div class="header__language-selector--layer"></div>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { confirmCancel } from '@/utils/sweetAlerts'
import { toastify } from '@/utils/toastify'

const { t, locale } = useI18n();

const onToggleLanguage = () => {
    const supportedLocales = ["es", "en"];
    const newLocale = locale.value === "es" ? "en" : "es";
    if (supportedLocales.includes(newLocale)) {
        locale.value = newLocale;
    }
};

const onLogout = () => {
    confirmCancel(t("header-component.logout.title"), t("header-component.logout.message"))
        .then((result) => {
            if (result.isConfirmed) {
                useAuthStore().logout();
                toastify(t("header-component.logout.success"), "success");
            }
        });
};

const isChecked = computed(() => {
    return locale.value === "es";
});
</script>

