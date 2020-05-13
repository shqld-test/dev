import { createElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
    const props = {
        title: 'あのイーハトヴォの',
        description: 'あのイーハトヴォの',
        tags: ['宮澤', '賢治'],
        body: [
            {
                heading: 2,
                title: 'あのイーハトヴォの',
                contents: [
                    {
                        type: 'p',
                        content:
                            'ああああああああああああああああああああああああ',
                    },
                ],
            },
            {
                heading: 3,
                title: 'あのイーハトヴォの',
                contents: [
                    {
                        type: 'p',
                        content: 'asdf',
                    },
                ],
            },
        ],
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>blog.shqld.dev</title>
                <meta name="description" content="blog.shqld.dev by shqld" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <article>
                    <h1 className={styles.title}>{props.title}</h1>

                    <p className={styles.description}>{props.description}</p>

                    <ul className={styles.tags}>
                        {props.tags.map((tag: string, i: number) => (
                            <li key={i} className={styles.tagItem}>
                                {tag}
                            </li>
                        ))}
                    </ul>

                    <hr />

                    {props.body.map((section, i) => {
                        return (
                            <section key={i}>
                                {createElement(`h${section.heading}`, {
                                    children: section.title,
                                })}
                                {section.contents.map(
                                    ({ type, content }, i) => {
                                        switch (type) {
                                            case 'script':
                                            case 'style':
                                                return null
                                            default:
                                                return createElement(type, {
                                                    key: i,
                                                    children: content,
                                                })
                                        }
                                    }
                                )}
                            </section>
                        )
                    })}
                </article>
            </main>

            <footer className={styles.footer}>
                <Link href="/">blog.shqld.dev</Link>
            </footer>
        </div>
    )
}
