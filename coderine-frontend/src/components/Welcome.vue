<template>
    <div class="welcome">
        <h1 class="welcome__title">{{ $t("welcome-component.title") }}</h1>
        <h2 class="welcome__subtitle">{{ $t("welcome-component.subtitle") }}</h2>
        <hr>
        <p class="welcome__paragraph--question">{{ $t("welcome-component.paragraph-1") }}
        </p>
        <p class="welcome__paragraph">{{ $t("welcome-component.paragraph-2") }}</p>
        <p class="welcome__paragraph">
        </p>
        <p class="welcome__paragraph">{{ $t("welcome-component.paragraph-3") }}</p>
        <p class="welcome__paragraph">{{ $t("welcome-component.paragraph-4") }}</p>
        <p class="welcome__paragraph">{{ $t("welcome-component.paragraph-5") }}</p>
        <div class="welcome__links">
            <RouterLink to="/register" class="generic__button--secondary">
                {{ $t("welcome-component.button") }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
