<template>
    <main class="playground__main">
        <section class="playground__section">
            <Split ref="split1" @onDragEnd="onDragEnd" :snapOffset="50" style="height: 100%;">
                <SplitArea :size="50" :minSize="150">
                    <Split direction="vertical">
                        <SplitArea :size="50" :minSize="150">
                            <div class="playground__views">
                                <textarea v-model="htmlCode" class="playground__code" placeholder="html"></textarea>
                                <HtmlIcon></HtmlIcon>
                            </div>
                        </SplitArea>
                        <SplitArea :size="50" :minSize="150">
                            <div class="playground__views">
                                <textarea v-model="cssCode" class="playground__code" placeholder="css"></textarea>
                                <CssIcon></CssIcon>
                            </div>
                        </SplitArea>
                    </Split>
                </SplitArea>
                <SplitArea :size="50">
                    <Split direction="vertical" :minSize="150">
                        <SplitArea :size="50" :minSize="150">
                            <div class="playground__views">
                                <textarea v-model="jsCode" class="playground__code" placeholder="js"></textarea>
                                <JsIcon></JsIcon>
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
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { encode, decode } from 'js-base64'
import HtmlIcon from '../components/icons/HtmlIcon.vue'
import CssIcon from '../components/icons/CssIcon.vue'
import JsIcon from '../components/icons/JsIcon.vue'
import html from '../utils/htmlCode.js'


const htmlCode = ref('')
const cssCode = ref('')
const jsCode = ref('')
const renderHtml = ref('')


const router = useRouter();
onMounted(() => {
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

watch([htmlCode, cssCode, jsCode], () => {
    renderHtml.value = html(htmlCode.value, cssCode.value, jsCode.value);

    const renderBase64 = `${encode(htmlCode.value)}|${encode(cssCode.value)}|${encode(jsCode.value)}`;

    router.push({ name: 'PlaygroundTemplate', params: { htmlTemplate: renderBase64 } });
})
</script>
