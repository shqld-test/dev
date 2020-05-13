import { ComponentType } from 'preact'

declare module 'JSX' {
    interface IntrinsicElements {
        [key: string]: ComponentType
    }
}
