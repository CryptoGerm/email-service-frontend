const fs = require('fs');
const path = require('path');
const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'redux-saga',
    'react',
    'react-hooks',
    'jsx-a11y',
    'jest',
    'security',
  ],
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:security/recommended',
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/extensions': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'react/jsx-curly-newline': 'off',
    'react/jsx-indent-props': 'off',
    'import/no-cycle': [2, { maxDepth: 1 }],
    'no-multi-assign': 0,
    'no-param-reassign': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
    'react/jsx-props-no-spreading': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/destructuring-assignment': 'off',
    'react/prefer-stateless-function': 'off',
    'react/no-unused-state': 0,
    'security/detect-object-injection': 0,
    camelcase: 'off',
    'react/no-did-update-set-state': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  ignorePatterns: ['node_modules/'],
};
