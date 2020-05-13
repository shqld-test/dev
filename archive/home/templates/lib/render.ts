import { VNode } from 'preact'
import { render } from 'preact-render-to-string'
import htmlMinifier from 'html-minifier'
import { doctype } from './html'

function minify(html: string): string {
    return htmlMinifier.minify(html, {
        removeAttributeQuotes: true,
        ignoreCustomComments: true,
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        conservativeCollapse: false,
        removeTagWhitespace: true,
        removeComments: true,
        removeEmptyElements: true,
    })
}

export function renderHtml(html: VNode) {
    return doctype + render(html)
}
