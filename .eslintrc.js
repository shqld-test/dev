const config = {
    extends: ['eslint:recommended', 'plugin:lit-a11y/recommended'],

    env: {
        node: true,
        es6: true,
    },

    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },

    plugins: ['import', 'lit-a11y'],

    settings: {},

    rules: {
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
    },
}

module.exports = config
