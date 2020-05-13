module.exports = {
    presets: [[require.resolve('babel-preset-react-app')]],
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
    ].filter(Boolean),
}
