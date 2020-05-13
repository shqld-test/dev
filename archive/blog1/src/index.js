const path = require('path')
const fs = require('fs')
const http = require('http')
const marked = require('marked')
const hljs = require('highlight.js')
const prism = require('prismjs')
require('prismjs/plugins/custom-class/prism-custom-class')
require('prismjs/components/')()

prism.plugins.customClass.map({
    token: 't',
    boolean: 'l',
    number: 'l',
    comment: 'c',
    string: 's',
    keyword: 'k',
    regex: 'r',
    function: 'f',
    'function-variable': 'f',
    operator: 'o',
    builtin: 'b',
    punctuation: 'p',
    parameter: 'pr',
})

const src = fs.readFileSync(path.resolve('drafts/test.md'), 'utf8')

function highlight(code, lang) {
    switch (lang) {
        case 'point':
            return '<p class="point">' + code + '</p>'
        default: {
            if (prism.languages[lang])
                return prism.highlight(code, prism.languages[lang], lang)
            else throw new Error(`[ERR_NO_LANG_MATCH] '${lang}'`)
        }
    }
}

const html = marked(src, {
    gfm: true,
    mangle: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    langPrefix: '',
    headerPrefix: 'h-',
    highlight,
})

const css = (str) => `<style>${str}</style>`
const style = css`
    pre {
        padding: 16px;
        background: #282c35;
        color: white;
    }
    .t.k {
        color: #7f7f7f;
    }
    .t.l {
        color: #91c5d3;
    }
    .t.s {
        color: #a9cfa4;
    }
    .t.b {
        color: #9fbadd;
    }
    .t.f {
        color: #e1b5bb;
    }
    .t.o {
        color: #ffe2a9;
    }
    .t.p {
        color: lightgray;
    }
`

http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html')
    res.end(style + html)
}).listen(3000)

console.log(html)
