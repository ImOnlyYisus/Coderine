<template>
    <div id="app">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const msg = ref('Hello word')
</script>