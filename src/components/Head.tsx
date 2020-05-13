import React, { Fragment } from 'react'

export const Head = () => (
    <Fragment>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover"
        />
        <link rel="preload" as="style" href="/.assets/main.css" />
        <meta name="description" content="shqld.dev by Sho Miyamoto" />
        <title>blog.shqld.dev</title>
        <link rel="stylesheet" href="/.assets/main.css" />
    </Fragment>
)
