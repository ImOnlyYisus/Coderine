<template>
    <div>
        <h1>Login</h1>
        <div class="login-form">
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <span @click="login">Login</span>
            <p>No tienes cuenta? <router-link to="/register">registrate</router-link></p>
        </div>
        {{ error }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');

const login = () => {
    if (password.value.length > 0) {
        fetch('/sanctum/csrf-cookie')
            .then(response => {
                return fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    })
                });
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    error.value = data.message;
                }
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        error.value = 'Por favor ingrese su contraseña';
    }
}

const router = useRouter();
const beforeEnter = (to, from, next) => {
    if (window.Laravel.isLoggedIn) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
};

</script>

<style></style>