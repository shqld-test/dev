/** @type {import('@babel/core').TransformOptions} */
const config = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
        '@linaria',
    ],
    plugins: ['@babel/plugin-syntax-top-level-await'],
}

module.exports = config
