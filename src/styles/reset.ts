import { css } from '@linaria/core'

export const resetCSS = css`
    /* Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property */
    *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
        all: unset;
        display: revert;
    }

    /* Preferred box-sizing value */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Remove list styles (bullets/numbers) */
    ol,
    ul {
        list-style: none;
    }

    /* For images to not be able to exceed their container */
    img {
        max-width: 100%;
    }

    /* removes spacing between cells in tables */
    table {
        border-collapse: collapse;
    }
`
