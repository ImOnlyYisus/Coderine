<template>
    <div class="chat__wrapper">
        <section class="chat-component">
            <div class="chat-component__box">
                <div class="chat-component__box--messages">
                    <div
                        class="chat-component__box--messages--message"
                        v-for="comment in comments"
                        :key="uniqueKey"
                    >
                        <div class="chat-component__box--messages--message--avatar">
                            <img :src="comment.avatar" />
                        </div>
                        <div class="chat-component__box--messages--message--content">
                            <div class="chat-component__box--messages--message--content--name">
                                {{ comment.name }}
                                <span class="message-time"
                                    >{{ createAt(comment.pivot.created_at) }}
                                </span>
                            </div>
                            <div class="chat-component__box--messages--message--content--text">
                                {{ comment.pivot.comment }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="chat-component__input">
            <input
                type="text"
                placeholder="Escribe un mensaje"
                v-model="postMessage"
                :class="{ 'input--error': error }"
            />
            <span class="generic__button--primary" @click="sendMessage">Enviar</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { useComponentsStore } from '../stores/components';
const props = defineProps({
    comments: {
        type: Array,
        required: true,
    },
    component: {
        type: Object,
        required: true,
    },
});

const postMessage = ref('');
const error = ref(false);
const uniqueKey = `${props.comments.id}-${props.comments.comment}`;

const createAt = (createAt) => {
    const date = new Date(createAt);
    //Format to day of month hours:minutes
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`;
};

const emit = defineEmits(['postComment']);

const sendMessage = () => {
    if (postMessage.value.length <= 0) {
        error.value = true;
        return;
    }
    const newMessage = {
        id: props.component.id,
        comment: postMessage.value,
    };
    useComponentsStore()
        .postComment(newMessage)
        .then((component) => {
            emit('postComment', component);
            postMessage.value = '';
        });
};
</script>
