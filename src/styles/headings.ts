import { css } from '@linaria/core'

const heading = {
    'font-weight': 600,
    'line-height': 1.125,
}

export const headings = {
    h1: css`
        ${heading}
        font-size: 2em;
        margin-bottom: 0.5em;
    `,
    h2: css`
        ${heading}
        font-size: 1.75em;
        margin-bottom: 0.5714em;
    `,
    h3: css`
        ${heading}
        font-size: 1.5em;
        margin-bottom: 0.6666em;
    `,
    h4: css`
        ${heading}
        font-size: 1.25em;
        margin-bottom: 0.8em;
    `,
    h5: css`
        ${heading}
        font-size: 1.125em;
        margin-bottom: 0.8888em;
    `,
    h6: css`
        ${heading}
        font-size: 1em;
        margin-bottom: 1em;
    `,
}
