<template>
    <div class="header__playground">
        <RouterLink to="/">
            <img src="/images/favicon.png" alt="Logo coderine" class="header__playground__image--logo">
        </RouterLink>


        <img src="/images/icons/go-back.svg" alt="Go back" class="header__playground__image--icons" @click="goToHome">

        <img src="/images/icons/save-icon.png" alt="Icono de guardar" class="header__playground__image--icons" :class="{
            'header__playground__image--disabled': !canSave
        }" @click="onSave" v-if="canEdit">
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    canSave: {
        type: Boolean,
        default: false
    },
    canEdit: {
        type: Boolean
    }
})

const emits = defineEmits(['save'])

const onSave = () => {
    emits('save')
}

const goToHome = () => {
    router.push('/')
}
</script>