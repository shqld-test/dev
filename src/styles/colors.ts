import { css } from '@linaria/core'

export const colors = {
    normal: {
        primary: css`
            background-color: #0a0a0a;
            color: #fff;
        `,
        link: css`
            background-color: #0a0a0a;
            color: #fff;
        `,
        info: css`
            background-color: #3e8ed0;
            color: #fff;
        `,
        success: css`
            background-color: #48c78e;
            color: #fff;
        `,
        warning: css`
            background-color: #ffe08a;
            color: rgba(0, 0, 0, 0.7);
        `,
        danger: css`
            background-color: #f14668;
            color: #fff;
        `,
    },
    light: {
        primary: css`
            background-color: #ebfffc;
            color: #00947e;
        `,
        link: css`
            background-color: #eff1fa;
            color: #3850b7;
        `,
        info: css`
            background-color: #eff5fb;
            color: #296fa8;
        `,
        success: css`
            background-color: #effaf5;
            color: #257953;
        `,
        warning: css`
            background-color: #fffaeb;
            color: #946c00;
        `,
        danger: css`
            background-color: #feecf0;
            color: #cc0f35;
        `,
    },
}
