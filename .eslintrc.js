module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['no-only-tests'],
  rules: {
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-implicit-any-catch': 0,
    'no-only-tests/no-only-tests': 'error',
  },
};
