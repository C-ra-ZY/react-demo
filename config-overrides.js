const {override, addBabelPlugin, addDecoratorsLegacy} = require("customize-cra");

module.exports = override(addDecoratorsLegacy(), addBabelPlugin("styled-jsx/babel"));
