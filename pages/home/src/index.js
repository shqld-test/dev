import './styles/app.css'
import './styles/index.css'

export const Home = () => (
    <main className="main">
        <article className="article">
            <h1 className="title">
                <a href="/">shqld.dev</a>
            </h1>
            <ul>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="under_construction">📝 blog</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="https://github.com/shqld">github@shqld</a>
                </li>
                <li>
                    <a href="https://twitter.com/shqld">twitter@shqld</a>
                </li>
            </ul>
        </article>
        <div className="logo" alt="logo" />
    </main>
)
