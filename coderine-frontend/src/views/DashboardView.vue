<template>
    <Header></Header>
    <section class="dashboard__section">
        <h1 class="dashboard__section--title">{{ $t("dashboard.title") }}</h1>
        <CardComponent v-for="component in components" :key="component.id" :component="component" v-if="isLoaded"
            @postComment="updateComments" @likeComponent="updateLikes">
        </CardComponent>
        <CardComponentSkeletor v-for="component in 5" :key="component" v-else />
    </section>
    <Footer></Footer>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '../components/Footer.vue';
import CardComponent from '../components/CardComponent.vue';
import CardComponentSkeletor from '../components/CardComponentSkeletor.vue';
import { ref } from 'vue';
import { useComponentsStore } from '@/stores/components';

const isLoaded = ref(false);
const components = ref([]);


if (useComponentsStore().allComponents.length > 0) {
    components.value = useComponentsStore().allComponents;
    isLoaded.value = true;
} else {
    useComponentsStore().getAllComponents()
        .then(resultOfComponents => {
            components.value = resultOfComponents;
            isLoaded.value = true;
        })
        .catch(err => {
            console.log(err);
        })
}

const updateComments = (componentToUpdate) => {
    const component = components.value.find(component => component.id === componentToUpdate.id);
    component.comments = componentToUpdate.comments;
}

const updateLikes = (componentToUpdate) => {
    const component = components.value.find(component => component.id === componentToUpdate.id);
    component.votes = componentToUpdate.votes;
}

</script>

<style scoped></style>