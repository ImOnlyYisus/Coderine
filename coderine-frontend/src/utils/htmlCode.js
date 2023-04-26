const html = (html, css, js) => `
<html>
<head>
    <style>${css}</style>
</head>
<body>
    ${html}
</body>
<script>${js}</script>
</html>`;

export default html;
