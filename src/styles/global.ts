import { css } from '@linaria/core'

export const globalCSS = css`
    :global() {
        @media only screen and (max-width: 425px) {
            html {
                --font-size: 16px;
            }
        }
        @media only screen and (min-width: 425px) {
            html {
                --font-size: 16px;
            }
        }
        @media only screen and (min-width: 768px) {
            html {
                --font-size: 18px;
            }
        }

        html {
            /* font-family: 'Avenir', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, sans-serif; */
            font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
                'Helvetica Neue', Helvetica, Arial, sans-serif;

            font-size: calc(var(--font-size));
            background-color: #282c35;
            color: #d4d4d4;
            padding: 0;
            margin: 0;
            height: -webkit-fill-available;
        }

        body {
            min-height: 100vh;
            min-height: -webkit-fill-available;
        }

        * {
            box-sizing: border-box;
        }

        ::selection {
            background-color: #67769660;
        }

        a {
            color: #d4d4d4;
            text-decoration: none;
            border-bottom: 0.5px solid;
        }
    }
`
