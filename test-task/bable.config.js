module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!react-dnd|react-dnd-html5-backend)/"
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"]
};
