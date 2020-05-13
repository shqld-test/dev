import * as path from 'path'
import * as fs from 'fs'
import { h } from 'preact'
import * as marked from 'marked'
import prism from 'prismjs'

const Prism = prism

require('prismjs/plugins/custom-class/prism-custom-class')
const a = require('prismjs/components/prism-typescript')
const b = require('prismjs/components/prism-python')

console.log(a)
console.log(b)

import { Head, Html } from './lib/html'
import { renderHtml } from './lib/render'

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

const src = fs.readFileSync(path.resolve('../blog/drafts/test.md'), 'utf8')

function highlight(code, lang) {
    switch (lang) {
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

export default renderHtml(
    <Html>
        <Head>
            <link rel="stylesheet" type="text/css" href="/static/index.css" />
            <link rel="stylesheet" type="text/css" href="/static/blog.css" />
        </Head>
        <body>
            <article dangerouslySetInnerHTML={{ __html: html }} />
        </body>
    </Html>
)
