<template>
    <MonacoEditor :options="options" :language="language" v-model:value="editor" @input="handlerInput">
    </MonacoEditor>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import MonacoEditor from 'monaco-editor-vue3'

const props = defineProps({
    code: String,
    language: String,
})

const editor = ref(props.code);

const emit = defineEmits(['update:code']);

const options = {
    theme: 'vs-dark',
    value: editor.value,
    automaticLayout: true,
    acceptSuggestionOnEnter: 'on',
    scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
    },
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoIndent: 'full',
    autoSurround: 'languageDefined',
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    cursorStyle: 'line',
    folding: true,
    formatOnPaste: true,
    formatOnType: true,

    minimap: {
        enabled: false,
    },
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    renderIndentGuides: true,
    renderLineHighlight: 'all',
    renderWhitespace: 'none',
    helpActions: true,
    fontSize: 16,
    padding: {
        top: 10,
        bottom: 10,
    },
    wordWrap: 'on',
    wordWrapColumn: 80,
}

const handlerInput = () => {
    emit('update:code', editor.value, props.language);
}
</script>

<style scoped></style>