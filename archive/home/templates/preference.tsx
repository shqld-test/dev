import { h, ComponentType, Fragment } from 'preact'
import { Html } from './lib/html'
import { renderHtml } from './lib/render'

const TogglePerf: ComponentType<{
    name: string
    value: string | boolean
}> = ({ name, value }) => (
    <toggle-pref data-name={name} data-value={value}>
        <label>
            <input type="radio" name={name} />
            <span>{value}</span>
        </label>
    </toggle-pref>
)

export default renderHtml(
    <Html>
        <body className="mono">
            <header>
                <div>
                    &gt;&nbsp; <a href="/">shqld.dev</a>
                </div>
            </header>
            <main>
                <h1>
                    <a href="/">preference</a>
                </h1>
                <div>---</div>
                <div className="yaml">
                    <dl>
                        <dt>ThemeColor</dt>
                        <dd>
                            <ul>
                                <li>
                                    <TogglePerf name="theme" value="light" />
                                </li>
                                <li>
                                    <TogglePerf name="theme" value="dark" />
                                </li>
                            </ul>
                        </dd>
                        <dt>MarkdownStyle</dt>
                        <dd>
                            <ul>
                                <li>
                                    <TogglePerf name="md" value="true" />
                                </li>
                                <li>
                                    <TogglePerf name="md" value="false" />
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </main>
        </body>
    </Html>
)
