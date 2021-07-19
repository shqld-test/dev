import * as path from 'path'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import { renderToStaticMarkup } from 'react-dom/server'
// import { Catalog } from './components/Catalog'
import { Entry } from './components/Entry'
import { Head } from './components/Head'



const server = fastify()

server.register((f, _opts, done) => {
    if (
        process.env['DRY_RUN'] === 'true' ||
        process.argv.slice(2).includes('--dry-run')
    ) {
        f.addHook('onReady', () => {
            console.info('Application is ready')
            process.exit(0)
        })
    }

    done()
})
server.register(fastifyStatic, {
    prefix: '/.assets',
    root: path.resolve('build'),
    setHeaders:
        process.env['NODE_ENV'] === 'development'
            ? (res) => res.setHeader('cache-control', 'no-store')
            : undefined,
})

const html_template =
    '<!DOCTYPE html><html lang="ja"><head>{{__HEAD__}}</head>{{__BODY__}}</html>'

server.get('/', (_, res) => {
    const html = html_template
        .replace('{{__HEAD__}}', renderToStaticMarkup(Head()))
        .replace('{{__BODY__}}', renderToStaticMarkup(Entry()))

    res.type('text/html').send(html)
})

server.get('/test', (_, res) => {
    res.send('hello')
})
server.get('/test2', (_, res) => {
    res.send('hello2')
})

await server.ready()

const port = Number(process.env['PORT']) || 3000
const host = process.env['HOST'] || '0.0.0.0'

await server.listen(port, host)

console.log(`Server listening at http://${host}:${port} ...`)
