module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
    globals: {
        TweenMax: true
    }
};
