<template>
    <div class="playground__grid">
        <header class="playground__header">
            <HeaderPlayground :canSave="canSave" @save="onSave" :canEdit="canEdit" />
        </header>
        <main class="playground__main">
            <section class="playground__section">
                <Split ref="split1" :snapOffset="50" style="height: 100%">
                    <SplitArea :size="50" :minSize="150">
                        <Split direction="vertical">
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views playground__views--html">
                                    <MonacoEditor
                                        :options="options"
                                        language="html"
                                        v-model:value="htmlCode"
                                    >
                                    </MonacoEditor>
                                </div>
                            </SplitArea>
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views playground__views--css">
                                    <MonacoEditor
                                        :options="options"
                                        language="css"
                                        v-model:value="cssCode"
                                    >
                                    </MonacoEditor>
                                </div>
                            </SplitArea>
                        </Split>
                    </SplitArea>
                    <SplitArea :size="50">
                        <Split direction="vertical" :minSize="150">
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views playground__views--js">
                                    <MonacoEditor
                                        :options="options"
                                        language="javascript"
                                        v-model:value="jsCode"
                                    >
                                    </MonacoEditor>
                                </div>
                            </SplitArea>
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views">
                                    <iframe
                                        :srcdoc="renderHtml"
                                        class="playground__iframe"
                                    ></iframe>
                                </div>
                            </SplitArea>
                        </Split>
                    </SplitArea>
                </Split>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { encode, decode } from 'js-base64';
import html from '../utils/htmlCode.js';
import HeaderPlayground from '../components/HeaderPlayground.vue';
import MonacoEditor from 'monaco-editor-vue3';
import { useComponentsStore } from '../stores/components';
import { useAuthStore } from '../stores/auth';
import { saveAlert } from '../utils/sweetAlerts';
import { useI18n } from 'vue-i18n';
import { toastify } from '../utils/toastify';
import { v4 as uuidv4 } from 'uuid';

const { t } = useI18n();

const htmlCode = ref('');
const cssCode = ref('');
const jsCode = ref('');
const renderHtml = ref('');
const canSave = ref(false);
const canEdit = ref(false);

const options = {
    theme: 'vs-dark',
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
};
const router = useRouter();
const uuid = router.currentRoute.value.params.componentId || uuidv4();

const userId = ref('');
userId.value = useAuthStore().user.id;

if (router.currentRoute.value.name === 'Playground') {
    router.push({ name: 'PlaygroundComponent', params: { componentId: uuid, user: userId.value } });
    canEdit.value = true;
}

if (router.currentRoute.value.name === 'PlaygroundTemplate') {
    const { allComponents } = useComponentsStore();
    if (allComponents) {
        const component = allComponents.find(
            ({ id }) => id === router.currentRoute.value.params.componentId,
        );
        if (component) {
            if (component.user_id === useAuthStore().user.id) {
                canEdit.value = true;
            }
        }
    }
}

onBeforeMount(() => {
    const urlBase64 = router.currentRoute.value.params.htmlTemplate;
    userId.value = router.currentRoute.value.params.user;

    if (urlBase64) {
        const [htmlBase64, cssBase64, jsBase64] = urlBase64.split('|');

        htmlBase64 ? (htmlCode.value = decode(htmlBase64)) : (htmlCode.value = '');
        cssBase64 ? (cssCode.value = decode(cssBase64)) : (cssCode.value = '');
        jsBase64 ? (jsCode.value = decode(jsBase64)) : (jsCode.value = '');
    }

    renderHtml.value = html(htmlCode.value, cssCode.value, jsCode.value);
});

watch([htmlCode, cssCode, jsCode], () => {
    renderHtml.value = html(htmlCode.value, cssCode.value, jsCode.value);

    const renderBase64 = `${encode(htmlCode.value)}|${encode(cssCode.value)}|${encode(
        jsCode.value,
    )}`;

    router.push({ name: 'PlaygroundTemplate', params: { htmlTemplate: renderBase64 } });

    canSave.value = true;
});

const onSave = () => {
    if (!canSave.value) return;

    canSave.value = false;
    const renderBase64 = `${encode(htmlCode.value)}|${encode(cssCode.value)}|${encode(
        jsCode.value,
    )}`;
    useComponentsStore()
        .getComponentById(uuid)
        .then((component) => {
            useComponentsStore()
                .updateComponent(component)
                .then(() => {
                    toastify(t('playground.alert.success'), 'success');
                })
                .catch(() => {
                    toastify(t('playground.alert.error'), 'error');
                });
        })
        .catch(() => {
            saveAlert(
                t('playground.alert.title'),
                t('playground.alert.text'),
                t('playground.alert.save'),
            ).then((result) => {
                if (result.isConfirmed) {
                    if (result.value) {
                        const component = {
                            id: uuid,
                            name: result.value,
                            code: renderBase64,
                        };

                        useComponentsStore()
                            .saveComponent(component)
                            .then(() => {
                                toastify(t('playground.alert.success'), 'success');
                            })
                            .catch(() => {
                                toastify(t('playground.alert.error'), 'error');
                            });
                    }
                }
            });
        });
};
</script>
