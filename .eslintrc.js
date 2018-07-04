module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    globals: {
        test: true,
        expect: true,
        describe: true,
        it: true
    },
    plugins: [
        'node'
    ],
    env: {
        browser: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:node/recommended',
    ],
    rules: {
        'node/exports-style': ['error', 'module.exports'],
        'linebreak-style': 0,
        'indent': [2, 4],
        'padded-blocks': 0,
        'class-methods-use-this': 0,
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true, 'optionalDependencies': false, 'peerDependencies': false}],
        'import/prefer-default-export': 1,
        'no-return-assign': 0,
        'no-multi-spaces': ['error', { ignoreEOLComments: true }],
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
        'no-console': 1,
        'no-unused-vars': 1,
        'no-underscore-dangle': ["error", { "allow": ["_id"] }]
    },
};