<template>
    <Logo></Logo>
    <section class="login">
        <div class="login__container">
            <h1 class="login__title">{{ $t("login.title") }}</h1>
            <form @submit="onLogin" class="login__form">
                <label for="email" class="login__form--label">{{ $t("login.email")
                }}</label>
                <input type="email" v-model="email" id="email" class="input--primary" :class="{ 'input--error': error }"
                    :placeholder="$t('login.placeholders.email')" />
                <label for="password" class="login__form--label">{{ $t("login.password") }}</label>
                <input type="password" v-model="password" id="password" class="input--primary"
                    :class="{ 'input--error': error }" :placeholder="$t('login.placeholders.password')" />
                <button type="submit" class="generic__button--terciary">{{ $t("login.button") }}</button>
            </form>
            <p>{{ $t("login.link") }} <RouterLink to="/register" class="login__form--link">{{ $t("login.link2") }}
                </RouterLink>
            </p>
        </div>
        <div class="login__footer">
            <Footer />
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Logo from '@/components/Logo.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { toastify } from '@/utils/toastify'
import { useI18n } from 'vue-i18n'

const email = ref('demo@demo.com') //Demo user
const password = ref('demo12345_') //Password of demo user
const error = ref(false);
const { t } = useI18n();

const onLogin = (e) => {
    e.preventDefault();

    const { login } = useAuthStore();

    login(email.value, password.value)
        .then(() => {
            error.value = false;
            toastify(t("login.success"), "success");
        })
        .catch(() => {
            error.value = true;
            toastify(t("errors.credentials"), "Error");
        });
};
</script>

