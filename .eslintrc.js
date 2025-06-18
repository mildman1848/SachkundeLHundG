module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all'
  ],
  rules: {
    // Eigene Regeln hier eintragen
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
