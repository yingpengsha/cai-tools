module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    extends: 'airbnb-base',
    globals: {
        __static: true
    },
    plugins: [
        'html'
    ],
    'rules': {
        'global-require': 0,
        'import/no-unresolved': 0,
        'no-param-reassign': 0,
        'no-shadow': 0,
        'import/extensions': 0,
        'import/newline-after-import': 0,
        'no-multi-assign': 0,
        'prefer-destructuring': 0,
        'no-underscore-dangle': 0,
        'no-restricted-syntax': 0,
        'import/prefer-default-export': 0,
        'one-var': 0,
        'import/no-extraneous-dependencies': 0,
        'no-return-assign': 0,
        'no-prototype-builtins': 0,
        'no-case-declarations': 0,
        'no-buffer-constructor': 0,
        'no-template-curly-in-string': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}