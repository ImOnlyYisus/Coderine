import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSplit from 'vue3-split-panel'

import App from './App.vue'
import router from './router'
import { i18n } from "./plugins/i18n";

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
}

import './assets/styles/css/split-panel.css'
import 'toastify-js/src/toastify.css'
import './assets/styles/css/import.css'

const app = createApp(App)

app.use(i18n)
app.use(VueSplit)
app.use(createPinia())
app.use(router)

app.mount('#app')
