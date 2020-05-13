const path = require('path')

const PATH_PROJECT_ROOT = __dirname

/** @type {{ BUILD_ENV: string}} */
const { BUILD_ENV } = process.env

// TODO: 結局本番ではどうなるか、を一眼で分かりたいので目立たせることが大事
const __DEV__ = BUILD_ENV === 'development'

// TODO: scriptsの命名規則はどれがよいか

/** @type {import('webpack').Configuration} */
const config = {
    mode: !__DEV__ ? 'production' : 'development',
    target: 'node',
    entry: path.join(PATH_PROJECT_ROOT, 'src/index.ts'),
    output: {
        path: path.join(PATH_PROJECT_ROOT, 'build'),
        // FIXME: esmodule
        libraryTarget: 'commonjs',
        clean: true,
    },
    optimization: {
        splitChunks: false,
    },
    cache: true,
    experiments: {
        topLevelAwait: true,
    },
    externalsPresets: { node: true },
    externals: [
        require('webpack-node-externals')({
            modulesDir: path.join(PATH_PROJECT_ROOT, 'node_modules'),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    plugins: [
        new (require('mini-css-extract-plugin'))(),
        __DEV__ &&
            new (require('nodemon-webpack-plugin'))({
                script: path.join(PATH_PROJECT_ROOT, 'build/main.js'),
                watch: path.join(PATH_PROJECT_ROOT, 'build/main.js'),
                ext: 'js,jsx,ts,tsx,json',
                nodeArgs: ['--inspect=9222'],
                env: {
                    NODE_ENV: process.env.NODE_ENV,
                },
            }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: '@linaria/webpack-loader',
                        options: {
                            sourceMap: __DEV__,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: require('mini-css-extract-plugin').loader,
                        options: {},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: __DEV__,
                        },
                    },
                ],
            },
        ],
    },
}

module.exports = config
