module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/npde_mpdules?(?react-dnd|react-dnd0html5-backend)"
  ]
};
