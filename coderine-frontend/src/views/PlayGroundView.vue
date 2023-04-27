<template>
    <div class="playground__grid">
        <header class="playground__header">
            <HeaderPlayground />
        </header>
        <main class="playground__main">
            <section class="playground__section">
                <Split ref="split1" :snapOffset="50" style="height: 100%;">
                    <SplitArea :size="50" :minSize="150">
                        <Split direction="vertical">
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views playground__views--html">
                                    <CodeEditor :language="'html'" :code="htmlCode" @update:code="handlerUpdateCode" />
                                </div>
                            </SplitArea>
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views playground__views--css">
                                    <CodeEditor :language="'css'" :code="cssCode" @update:code="handlerUpdateCode" />
                                </div>
                            </SplitArea>
                        </Split>
                    </SplitArea>
                    <SplitArea :size="50">
                        <Split direction="vertical" :minSize="150">
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views playground__views--js">
                                    <CodeEditor :language="'javascript'" :code="jsCode" @update:code="handlerUpdateCode" />
                                </div>
                            </SplitArea>
                            <SplitArea :size="50" :minSize="150">
                                <div class="playground__views">
                                    <iframe :srcdoc="renderHtml" class="playground__iframe"></iframe>
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
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { encode, decode } from 'js-base64'
import html from '../utils/htmlCode.js'
import CodeEditor from '../components/CodeEditor.vue'
import HeaderPlayground from '../components/HeaderPlayground.vue'


const htmlCode = ref('')
const cssCode = ref('')
const jsCode = ref('')
const renderHtml = ref('')


const router = useRouter();
onBeforeMount(() => {
    const urlBase64 = router.currentRoute.value.params.htmlTemplate;

    if (urlBase64) {
        const [htmlBase64, cssBase64, jsBase64] = urlBase64.split('|');

        htmlBase64 ? htmlCode.value = decode(htmlBase64) : htmlCode.value = '';
        cssBase64 ? cssCode.value = decode(cssBase64) : cssCode.value = '';
        jsBase64 ? jsCode.value = decode(jsBase64) : jsCode.value = '';
    }

    renderHtml.value = html(htmlCode.value, cssCode.value, jsCode.value);
})

/* const API_SHORTEN_URL = 'https://api.shrtco.de/v2/shorten?url=';
fetch(`${API_SHORTEN_URL}${window.location.origin}/playground/${renderBase64}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                //router.push({ name: 'PlaygroundTemplate', params: { htmlTemplate: renderBase64 } });
            }
        })
        .catch(error => {
            console.log(error);
        }); */

const handlerUpdateCode = (code, language) => {
    switch (language) {
        case 'html':
            htmlCode.value = code;
            break;
        case 'css':
            cssCode.value = code;
            break;
        case 'javascript':
            jsCode.value = code;
            break;
        default:
            break;
    }
}

watch([htmlCode, cssCode, jsCode], () => {
    renderHtml.value = html(htmlCode.value, cssCode.value, jsCode.value);

    const renderBase64 = `${encode(htmlCode.value)}|${encode(cssCode.value)}|${encode(jsCode.value)}`;

    router.push({ name: 'PlaygroundTemplate', params: { htmlTemplate: renderBase64 } });
})
</script>
