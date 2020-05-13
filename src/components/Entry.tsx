import { cx } from '@linaria/core'
import React, { Fragment } from 'react'
import { stub } from '../stub'
import { globalCSS } from '../styles/global'
import { resetCSS } from '../styles/reset'
// import 'bulma/css/bulma.min.css'
// import '../styles/bulma.css'
// import '../styles/reset.css'

const props = stub

export const Entry = () => (
    <body className={cx(resetCSS, globalCSS)}>
        <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <a href="/">shqld.dev</a>
                </li>
                <li>
                    <a href="/blog">blog</a>
                </li>
                <li>
                    <a href="/blog/:id">{props.title}</a>
                </li>
                <li>
                    {/* Custom Elementsでうまいこと読んでいる場所を追加したい */}
                    <a href="/:heading">TODO: heading title</a>
                </li>
            </ul>
        </nav>
        <main>
            <article className="content">
                <h1>{props.title}</h1>

                <ul>
                    {props.tags.map((tag: string, i: number) => (
                        <li key={i} className="tag">
                            {tag}
                        </li>
                    ))}
                </ul>

                {props.body.map((section, i) => {
                    return (
                        <Fragment key={i}>
                            {React.createElement(`h${section.heading?.level}`, {
                                children: section.heading?.text,
                            })}
                            {section.contents.map(({ type, text }, i) => {
                                switch (type) {
                                    case 'script':
                                    case 'style':
                                        return null
                                    default:
                                        return React.createElement(type, {
                                            key: i,
                                            children: text,
                                        })
                                }
                            })}
                        </Fragment>
                    )
                })}
            </article>
        </main>

        <footer>
            <a href="/">blog.shqld.dev</a>
        </footer>

        <aside className="menu">
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li>
                    <a>Dashboard</a>
                </li>
                <li>
                    <a>Customers</a>
                </li>
            </ul>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
                <li>
                    <a>Team Settings</a>
                </li>
                <li>
                    <a className="is-active">Manage Your Team</a>
                    <ul>
                        <li>
                            <a>Members</a>
                        </li>
                        <li>
                            <a>Plugins</a>
                        </li>
                        <li>
                            <a>Add a member</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>Invitations</a>
                </li>
                <li>
                    <a>Cloud Storage Environment Settings</a>
                </li>
                <li>
                    <a>Authentication</a>
                </li>
            </ul>
            <p className="menu-label">Transactions</p>
            <ul className="menu-list">
                <li>
                    <a>Payments</a>
                </li>
                <li>
                    <a>Transfers</a>
                </li>
                <li>
                    <a>Balance</a>
                </li>
            </ul>
        </aside>
    </body>
)
