module.exports = {
  "extends": ["airbnb-base", "prettier"],
  "parser": "babel-eslint",
  "rules": {
    "no-underscore-dangle": 0,
    "arrow-body-style": 0,
    "no-unused-expressions": 0,
    "no-plusplus": 0,
    "lines-between-class-members": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/*-test.js",
          "**/__mocks__/**",
          "**/__fixtures__/**",
          "**/demo/**"
        ]
      }
    ],
    "no-prototype-builtins": 0,
    "no-restricted-syntax": 0,
    "no-mixed-operators": 0,
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ],
    "import/prefer-default-export": 0,
    "arrow-parens": 0,
    "prefer-destructuring": 0,
    "no-use-before-define": 0
  },
  "env": {
    "jasmine": true,
    "jest": true
  },
  "plugins": ["flowtype", "prettier"],
  "globals": {
    "Class": true,
    "Iterator": true,
    "$Shape": true,
    "$Keys": true,
    "$FlowFixMe": true,
    "fetch": true
  }
}
