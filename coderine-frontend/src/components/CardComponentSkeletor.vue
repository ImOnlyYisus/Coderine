<template>
    <figure class="card-component">
        <Skeletor height="200px" width="280px"></Skeletor>
        <h1 class="card-component--title">
            <Skeletor></Skeletor>
        </h1>
        <figcaption class="card-component--info">
            <div class="card-component--info__user">
                <Skeletor circle height="50px" width="50px"></Skeletor>
                <div class="card-component--info__user--name">
                    <Skeletor pill height="20px" width="20px"></Skeletor>
                    <Skeletor pill height="20px" width="180px"></Skeletor>
                </div>
            </div>
            <div class="card-component--meta">
                <div class="card-component--meta__likes">
                    <Skeletor height="20px" width="20px" pill></Skeletor>
                    <Skeletor height="20px" width="80px" pill></Skeletor>
                </div>
                <div class="card-component--meta__post">
                    <Skeletor height="20px" width="20px" pill></Skeletor>
                    <Skeletor height="20px" width="80px" pill></Skeletor>
                </div>
            </div>
            <Skeletor height="20px" width="100px" pill></Skeletor>
        </figcaption>
    </figure>
</template>

<script setup>
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';
</script>
