<template>
    <Logo></Logo>
    <section class="register">
        <div class="register__container">
            <h1 class="register__title">{{ $t('register.title') }}</h1>
            <form class="register__form" @submit="onSubmit">
                <div>
                    <label for="text" class="register__form--label">{{
                        $t('register.name')
                    }}</label>
                    <input
                        type="text"
                        v-model="name"
                        id="name"
                        class="input--primary"
                        :placeholder="$t('register.placeholders.name')"
                        :class="{ 'input--error': error }"
                    />
                </div>
                <div>
                    <label for="email" class="register__form--label">{{
                        $t('register.email')
                    }}</label>
                    <input
                        type="email"
                        v-model="email"
                        id="email"
                        class="input--primary"
                        :placeholder="$t('register.placeholders.email')"
                        :class="{ 'input--error': error }"
                    />
                </div>
                <div>
                    <label for="password" class="register__form--label">{{
                        $t('register.password')
                    }}</label>
                    <input
                        type="password"
                        v-model="password"
                        id="password"
                        class="input--primary"
                        :placeholder="$t('register.placeholders.password')"
                        :class="{ 'input--error': error }"
                    />
                </div>
                <div>
                    <label for="password" class="register__form--label">{{
                        $t('register.password-confirmation')
                    }}</label>
                    <input
                        type="password"
                        v-model="confirmPassword"
                        id="confirmPassword"
                        class="input--primary"
                        :placeholder="$t('register.placeholders.password')"
                        :class="{ 'input--error': error }"
                    />
                </div>
                <div>
                    <label for="avatar" class="register__form--label">Avatar</label>
                    <input
                        type="text"
                        id="avatar"
                        v-model="avatar"
                        class="input--primary"
                        :placeholder="$t('register.placeholders.avatar')"
                        :class="{ 'input--error': error }"
                    />
                </div>
                <button type="submit" class="generic__button--terciary">
                    {{ $t('register.title') }}
                </button>
            </form>
            <p>
                {{ $t('register.link') }}
                <RouterLink to="/login" class="register__form--link"
                    >{{ $t('register.link2') }}
                </RouterLink>
            </p>
        </div>
        <div class="register__footer">
            <Footer />
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Footer from '@/components/Footer.vue';
import Logo from '@/components/Logo.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { toastify } from '@/utils/toastify';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const avatar = ref(null);
const error = ref(false);

const onSubmit = (event) => {
    event.preventDefault();
    const { register } = useAuthStore();

    const user = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        avatar: avatar.value,
    };

    register(user, t)
        .then(() => {
            error.value = false;
            toastify(t('register.success'), 'success');
        })
        .catch((err) => {
            error.value = true;
            toastify(err.message, 'Error');
        });
};
</script>
