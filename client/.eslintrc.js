module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/prefer-es6-class": [1, "always"],
    "react/prefer-stateless-function": [1],
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "class-methods-use-this": "off",
  },
};
