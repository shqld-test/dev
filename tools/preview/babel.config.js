const getClientEnvironment = require('./config/env.js')
const paths = require('./config/paths.js')

const hasJsxRuntime = (() => {
    if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
        return false
    }

    try {
        require.resolve('react/jsx-runtime')
        return true
    } catch (e) {
        return false
    }
})()

const isEnvDevelopment = process.env.BUILD_ENV === 'development'
const isEnvProduction = !isEnvDevelopment
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))
const shouldUseReactRefresh = env.raw.FAST_REFRESH

module.exports = (api) => {
    api.cache(true)

    return {
        presets: [
            [
                require.resolve('babel-preset-react-app'),
                {
                    runtime: hasJsxRuntime ? 'automatic' : 'classic',
                },
            ],
        ],

        plugins: [
            [
                require.resolve('babel-plugin-named-asset-import'),
                {
                    loaderMap: {
                        svg: {
                            ReactComponent:
                                '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                    },
                },
            ],
            isEnvDevelopment &&
                shouldUseReactRefresh &&
                require.resolve('react-refresh/babel'),
        ].filter(Boolean),
        compact: isEnvProduction,
    }
}
