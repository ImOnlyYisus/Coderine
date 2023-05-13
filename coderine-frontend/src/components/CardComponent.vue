<template>
    <div class="card--wrapper">
        <figure class="card-component">
            <div class="card-component__like">
                <img src="/images/icons/heart-click.svg" alt="Like button" @click="likeComponent" />
            </div>
            <iframe :srcdoc="render" class="card-component--picture"></iframe>
            <h1 class="card-component--title">{{ component.name }}</h1>
            <figcaption class="card-component--info">
                <div class="card-component--info__user">
                    <img
                        :src="component.user.avatar"
                        :alt="component.user.name"
                        class="card-component--info__user--image"
                    />
                    <div class="card-component--info__user--name">
                        <img src="/images/favicon.png" alt="" />
                        {{ component.user.name }}
                    </div>
                </div>
                <div class="card-component--meta">
                    <div class="card-component--meta__likes">
                        <img src="/images/icons/heart.svg" alt="Like image" v-if="hasMyLike" />
                        <img src="/images/icons/heart-outline.svg" alt="Like image" v-else />
                        {{ numberOfVotes }}
                    </div>
                    <div class="card-component--meta__post">
                        <img src="/images/icons/chat.svg" alt="Chat image" />
                        {{ numberOfPosts }}
                    </div>
                    <p class="card-component--meta__createAt">{{ createAt }}</p>
                </div>
                <img
                    src="/images/logo-white.png"
                    alt="Logo coderine"
                    class="card-component--info__logo"
                />
                <RouterLink
                    :to="{
                        name: 'PlaygroundTemplate',
                        params: {
                            componentId: component.id,
                            htmlTemplate: component.code,
                            user: component.user.id,
                        },
                    }"
                >
                    <img
                        src="/images/icons/edit.svg"
                        alt="Modificar componente"
                        class="card-component--info__edit"
                    />
                </RouterLink>
            </figcaption>
        </figure>
        <ChatCompoent
            :comments="component.comments"
            :component="component"
            @postComment="updateComments"
        ></ChatCompoent>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { computed, defineProps, defineEmits, onMounted, ref } from 'vue';
import html from '../utils/htmlCode.js';
import { decode } from 'js-base64';
import ChatCompoent from './ChatComponent.vue';
import { useComponentsStore } from '../stores/components';
import { useAuthStore } from '../stores/auth';

const props = defineProps({
    component: {
        type: Object,
        required: true,
    },
});

const hasMyLike = ref(false);
const emit = defineEmits(['postComment', 'likeComponent']);

const numberOfVotes = computed(() => {
    return props.component.votes ? props.component.votes.length : 0;
});

const numberOfPosts = computed(() => {
    return props.component.comments ? props.component.comments.length : 0;
});

const render = computed(() => {
    const [htmlBase64, cssBase64, jsBase64] = props.component.code.split('|');

    return html(decode(htmlBase64), decode(cssBase64), decode(jsBase64));
});

const createAt = computed(() => {
    const date = new Date(props.component.created_at);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
});

onMounted(() => {
    const { user } = useAuthStore();
    if (props.component.votes) {
        const voted = props.component.votes.find(({ id }) => id === user.id);

        if (voted) {
            hasMyLike.value = true;
        }
    }
});

const updateComments = (component) => {
    emit('postComment', component);
};

const likeComponent = () => {
    const likeComponent = { id: props.component.id };
    useComponentsStore()
        .likeComponent(likeComponent)
        .then((component) => {
            hasMyLike.value = !hasMyLike.value;
            emit('likeComponent', component);
        });
};
</script>

<style scoped></style>
