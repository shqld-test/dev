import { resolve } from 'path'
import { h, ComponentType } from 'preact'
import { JSXInternal } from 'preact/src/jsx'

class Resource {
    path: string
    inline?: boolean

    constructor(path: string, options?: { inline?: boolean }) {
        this.path = resolve(path)
        this.inline = options.inline ?? false
    }
}

export const doctype = '<!DOCTYPE html>'
export const Link: ComponentType<
    JSXInternal.IntrinsicElements['link'] & {
        href: void
        children: Resource
    }
> = ({ href, ...props }) => <link {...props} href={href.path} />

export const Script: ComponentType<React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement> & {
        src: Resource
    },
    HTMLScriptElement
>> = ({ src, ...props }) => <script {...props} src={src.path} />

export const Head: ComponentType<{ title?: string }> = ({
    title,
    children,
}) => (
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>{title ? title + ' | shqld.dev' : 'shqld.dev'}</title>
        <script
            dangerouslySetInnerHTML={{
                __html: `
var j = sessionStorage.getItem('sp');
if (j) document.documentElement.setAttribute('data-sp', j)
            `,
            }}
        ></script>
        <Link
            rel="stylesheet"
            type="text/css"
            // href={new Resource('client/main.css')}
        >
            {new Resource('client/main.css')}
        </Link>
        {/* <script type="application/ld+json"></script> */}
        {/* {isPref && <script async src={new Resource('client/preference.js')}></script>} */}
        {children}
    </head>
)

export const Html: ComponentType = ({ children }) => (
    <html lang="en">{children}</html>
)
