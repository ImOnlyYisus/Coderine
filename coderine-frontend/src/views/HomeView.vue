<template>
    <Header></Header>
    <section class="home-view__section">
        <video
            src="/video/background-animation.mp4"
            loop
            autoplay="true"
            muted
            class="home-view__section--video"
        ></video>
        <div class="home-view__section--content">
            <Welcome></Welcome>
            <img src="/images/code-person.png" alt="" class="home-view__image" />
        </div>
    </section>
    <div class="home-view__footer">
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Welcome from '../components/Welcome.vue';
import Footer from '../components/Footer.vue';
</script>
