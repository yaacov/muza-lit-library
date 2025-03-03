import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base JS config
  js.configs.recommended,

  // Browser globals
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TypeScript config
  ...tseslint.configs.recommended,

  // Base file matchers
  {
    files: ['**/*.{js,mjs,cjs,ts}', 'src/*.{js,mjs,cjs,ts}'],
  },

  // Script-specific config
  {
    files: ['**/*.js', 'src/*.js'],
    languageOptions: {
      sourceType: 'script',
    },
  },

  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Turn off ESLint rules that conflict with Prettier
      indent: 'off',
      '@typescript-eslint/indent': 'off',
      'prettier/prettier': 'error',
    },
  },

  // Lit plugin config + rules
  {
    plugins: {
      lit: litPlugin,
    },
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1 }],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],

      // Lit recommended rules
      'lit/attribute-value-entities': 'error',
      'lit/binding-positions': 'error',
      'lit/no-duplicate-template-bindings': 'error',
      'lit/no-invalid-escape-sequences': 'error',
      'lit/no-invalid-html': 'error',
      'lit/no-legacy-template-syntax': 'error',
      'lit/no-property-change-update': 'error',
      'lit/no-template-bind': 'error',
      'lit/no-template-map': 'error',
      'lit/no-useless-template-literals': 'error',
      'lit/prefer-static-styles': 'error',
    },
  },
];
