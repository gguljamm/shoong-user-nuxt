module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "plugin:vue/essential"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "parser": 'babel-eslint',
    "ecmaVersion": 2018,
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    'linebreak-style': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'import/extensions': ['error', {
      'js': 'never',
      'vue': 'always'
    }],
    'template-curly-spacing' : 'off',
    'indent': ['error', 2, {
      'ignoredNodes': ['TemplateLiteral']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-underscore-dangle' : 1,
    'import/no-unresolved': 0,
    'max-len': 'off',
  }
};
