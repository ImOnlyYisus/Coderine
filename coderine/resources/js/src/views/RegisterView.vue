<template>
    <div>
        <h1>Register</h1>
        <div class="login-form">
            <input type="text" v-model="name">
            <input type="email" v-model="email">
            <input type="password" v-model="password">
            <span @click="register">Register</span>
            <p>tienes cuenta? <router-link to="/login">Logueate</router-link></p>
        </div>
        {{ error }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const register = () => {
    if (password.value.length > 0) {
        fetch('/sanctum/csrf-cookie')
            .then(response => {
                return fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name.value,
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
                    window.location.href = '/login';
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