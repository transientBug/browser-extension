// module.exports = {
//   theme: {
//     extend: {}
//   },
//   variants: {},
//   plugins: []
// }

// This is a work around for the macro not knowing flex-grow
// https://github.com/bradlc/babel-plugin-tailwind-components/issues/32
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  ...defaultTheme,
  theme: {
    flex: {
      ...defaultTheme.flex,
      grow: "1 0",
      shrink: "0 1"
    }
  }
};
