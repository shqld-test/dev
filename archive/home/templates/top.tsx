import { h, ComponentType } from 'preact'
import { Html } from './lib/html'
import { renderHtml } from './lib/render'

export default renderHtml(
    <Html>
        <body className="mono">
            <main>
                <h1>
                    <a href="/">shqld.dev</a>
                </h1>

                <div>---</div>

                <div className="yaml">
                    <dl>
                        <dt>about_me</dt>
                        <dd>
                            <dl>
                                <div>
                                    <dt>name</dt>
                                    <dd>Sho Miyamoto</dd>
                                </div>
                                <div>
                                    <dt>job</dt>
                                    <dd>Web Developer</dd>
                                </div>
                                <div>
                                    <dt>industry</dt>
                                    <dd>News Media</dd>
                                </div>
                                <br />
                                <div>
                                    <a
                                        href="https://github.com/shqld"
                                        target="_blank"
                                        referrerpolicy="no-referrer"
                                        rel="noopener"
                                    >
                                        <dt>github</dt>
                                        <dd>shqld</dd>
                                    </a>
                                </div>

                                <div>
                                    <a
                                        href="https://twitter.com/webseals"
                                        target="_blank"
                                        referrerpolicy="no-referrer"
                                        rel="noopener"
                                    >
                                        <dt>twitter</dt>
                                        <dd>webseals</dd>
                                    </a>
                                </div>
                            </dl>
                        </dd>

                        <br />

                        <dt>contents</dt>
                        <dd>
                            <ul>
                                <li>To Be Determined</li>
                            </ul>
                        </dd>

                        <br />
                    </dl>
                </div>
            </main>
            <footer>
                <a href="/preference">configurePreference();</a>
            </footer>
        </body>
    </Html>
)
