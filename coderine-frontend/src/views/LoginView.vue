<template>
    <div class="login">
        <span @click="getAuthUser">Obtener usuario auth</span>
        {{ user }}
        <h1>Login</h1>
        <form @submit="onLogin">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" />
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const email = ref('jesusnarbona2001@gmail.com')
const password = ref('Esp605233612')
const user = ref('')

const onLogin = (e) => {
    e.preventDefault();

    useAuthStore().login(email.value, password.value)
};

onBeforeMount(() => {
    useAuthStore().getAuthUser()
    user.value = useAuthStore().user
    console.log(user.value);
});
</script>

<style scoped></style>