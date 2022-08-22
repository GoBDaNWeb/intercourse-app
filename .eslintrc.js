module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['next/core-web-vitals', 'airbnb', 'plugin:prettier/recommended'],
    overrides: [],
    ignorePatterns: ['next.config.js', '.eslintrc.js'],
    plugins: ['react', 'prettier'],
    rules: {
        quotes: [
            'warn',
            'single',
            {
                avoidEscape: true,
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'react/react-in-jsx-scope': ['off'],
        'react/prop-types': ['off'],
        'react/button-has-type': ['off'],
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'no-underscore-dangle': ['off'],
        'react/jsx-no-useless-fragment': ['off'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-alert': ['off'],
        'jsx-a11y/click-events-have-key-events': ['off'],
        'jsx-a11y/no-static-element-interactions': ['off'],
        'jsx-a11y/no-noninteractive-element-interactions': ['off'],
        'consistent-return': 'off',
        'import/order': ['off'],
        camelcase: ['off'],
        'import/no-unresolved': ['off'],
        'no-shadow': ['off'],
        'react/jsx-no-constructed-context-values': ['off'],
    },
};
