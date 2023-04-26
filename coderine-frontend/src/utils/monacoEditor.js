import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

window.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "html") {
            return new HtmlWorker();
        }
        return null;
    },
};

const htmlEditor = monaco.editor.create(document.getElementById("htmlEditor"), {
    value: ``,
    language: "html",
    theme: "vs-dark",
});

console.log(htmlEditor);
