const path = require('path')
const fs = require('fs')
const { DefinePlugin } = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const precss = require('precss')
const { RawSource } = require('webpack-sources')

const { pages, chunks } = require('./package.json')

const artiry = (func) => (one) => func(one)

/** @type { Array<import('webpack').ConfigurationFactory> } */
const config = [
    (env, argv) => ({
        name: 'client',
        mode: isDev(env) ? 'development' : 'production',
        target: 'web',
        entry: Object.fromEntries(
            Object.values(pages)
                .concat(chunks)
                .reduce(
                    (map, cur) =>
                        map.set(
                            cur.replace(path.extname(cur), ''),
                            path.resolve(cur)
                        ),
                    new Map()
                )
        ),
        output: {
            filename:
                env !== 'production' ? '[name].js' : '[name].[contenthash].js',
            path: path.resolve('build/client'),
            publicPath: '/static/',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.css$/,
                    use: [
                        // env !== 'production'
                        //     ? 'style-loader'
                        //     : MiniCssExtractPlugin.loader,
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                use: [precss()],
                            },
                        },
                    ],
                },
            ],
        },
        devServer: {
            contentBase: [path.resolve('build')],
            compress: true,
            port: 3000,
            writeToDisk: true,
            contentBasePublicPath: '/static/',
            hot: true,
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve('public'),
                        to: path.resolve('build'),
                    },
                ],
            }),
            new MiniCssExtractPlugin({
                filename:
                    env !== 'production'
                        ? '[name].css'
                        : '[name].[contenthash].css',
            }),
            new DefinePlugin({
                'typeof window': JSON.stringify('object'),
            }),
        ],
    }),
    (env, argv) => ({
        name: 'template',
        mode: isDev(env) ? 'development' : 'production',
        target: 'node',
        entry: Object.fromEntries(
            pageNames.reduce(
                (entries, filePath, i) =>
                    entries.set(path.parse(filePath).name, filePath),
                new Map()
            )
        ),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve('build/templates'),
            libraryTarget: 'commonjs2',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new DefinePlugin({
                'typeof window': JSON.stringify('undefined'),
            }),
            {
                apply(compiler) {
                    compiler.hooks.emit.tap('EmitHtml', (compilation) =>
                        Object.keys(compilation.assets).forEach((fileName) => {
                            const { default: html } = eval(
                                compilation.assets[fileName].source()
                            )
                            const source = new RawSource(html)
                            compilation.assets[
                                path.join(
                                    '../',
                                    fileName.split('.').shift().concat('.html')
                                )
                            ] = source
                        })
                    )
                },
            },
        ],
    }),
    // (env, argv) => ({
    //     mode: isDev(env) ? 'development' : 'production',
    //     target: 'webworker',
    //     entry: path.resolve('worker/index.ts'),
    //     output: {
    //         filename: 'main.js',
    //         path: path.resolve('build/worker'),
    //     },
    //     resolve: {
    //         extensions: ['.ts', '.tsx', '.js', '.json'],
    //     },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.(ts|js)x?$/,
    //                 exclude: /node_modules/,
    //                 use: ['babel-loader'],
    //                 // options: {},
    //             },
    //         ],
    //     },
    //     plugins: [
    //         new DefinePlugin({
    //             'typeof window': JSON.stringify('undefined'),
    //         }),
    //     ].filter(Boolean),
    // }),
]

module.exports = config

let cache
function isDev(env) {
    if (!cache) {
        if (process.env.BUILD_ENV) {
            console.log(
                `build environment is overrided by BUILD_ENV: ${process.env.BUILD_ENV}`
            )
            cache = process.env.BUILD_ENV !== 'production'
            return cache
        }

        if (!env)
            throw new Error(
                [
                    '`--env` argument is not specified',
                    '    Example:',
                    '        yarn webpack --env production',
                    '        yarn dev --env=development',
                    '',
                ].join('\n')
            )

        cache = env !== 'production'
    }

    return cache
}
