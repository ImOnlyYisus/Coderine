<template>
    <div v-if="isLoggedIn">
        <router-link to="/dashboard">Dashboard</router-link>
        <a @click="logout">Logout</a>
    </div>
    <div v-else>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const isLoggedIn = ref(false);

if (window.Laravel.isLoggedIn) {
    this.isLoggedIn.value = true
}

const logout = () => {
    fetch('/sanctum/csrf-cookie')
        .then(response => {
            return fetch('/api/logout', {
                method: 'POST'
            });
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = '/';
            } else {
                console.log(data);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

</script>