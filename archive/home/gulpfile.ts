import * as path from 'path'
import * as fs from 'fs'
import { parallel, series, task, src, dest } from 'gulp'
import { ComponentType } from 'preact'
import concat from 'gulp-concat'
import { Transform, Readable } from 'stream'
import rimraf from 'rimraf'
import terser from 'gulp-terser'
import rev from 'gulp-rev'
import { renderHtml } from './templates/lib/render'

require('@babel/register')({
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
})

const clean = (cb) => rimraf('build/', cb)

const copy = (from: string, to: string) =>
    async function copy() {
        return src(from).pipe(dest(to))
    }

import postcss from 'gulp-postcss'
import precss from 'precss'
import csso from 'gulp-csso'

const stylesheet = (input: Array<string>, output: string) =>
    async function stylesheet() {
        return (
            src('client/*.css')
                .pipe(postcss([precss()]))
                .pipe(csso())
                // .pipe(rev())
                // .pipe(
                //     rev.manifest({
                //         base: 'build/',
                //         merge: true,
                //     })
                // )
                .pipe(dest('build/'))
        )
    }

const html = (output: string, Component: ComponentType) =>
    async function html() {
        return fs.promises.writeFile(
            path.resolve(output),
            renderHtml(Component)
        )
    }

const javascript = (input: Array<string>, output: string) =>
    async function javascript() {
        return src(input)
            .pipe(terser())
            .pipe(rev())
            .pipe(
                rev.manifest({
                    base: output,
                    merge: true,
                })
            )
            .pipe(dest(output))
    }

const mkdir = (dirPath: string) => async () => fs.promises.mkdir(dirPath)

export default series(
    series(clean, mkdir('build/')),
    parallel(
        copy('public/*', 'build/'),
        stylesheet(
            [
                'client/reset.css',
                'client/sakura.css',
                'client/user.css',
                'client/yaml.css',
                'client/pref.css',
            ],
            'build/styles.css'
        )
        // html('build/index.html', Top),
        // html('build/preference.html', Preference),
        // javascript(['client/preference.js'], 'build/')
    )
)
