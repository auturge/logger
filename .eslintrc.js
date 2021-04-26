module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        "plugin:@typescript-eslint/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": [ 'warn'
            // Unfortunately, adding a method to a the generic interface Array<T> causes
            // eslint to warn about T being unused. So let's nix JUST the variable T.
            // Ignoring a pattern is less than ideal, but in this case, T is pretty thoroughly "the generic type variable",
            // and I can agree with myself not to use single-letter variables for anything else.
            , { "varsIgnorePattern": "(T)" } // regex to match the whole variable name "T"
        ],
        "no-unused-vars": "off"
    }
}
