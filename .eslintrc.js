module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 0,
    'default-case': 0,
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'no-use-before-define': ['error', { variables: false }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
