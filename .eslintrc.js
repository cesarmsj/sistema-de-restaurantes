module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    env: {
        browser: true,
        es6: true
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier/@typescript-eslint',
        'standard'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    
    rules: {
    }
};