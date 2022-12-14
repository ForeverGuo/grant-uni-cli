"use strict";

var dependencies = {
  "vue2-hbx": {
    "axios": "^0.21.1",
    "uview-ui": "^1.8.4",
    "vue": "^2.6.12",
    "vuex": "^3.6.2"
  },
  "vue3-hbx": {
    "axios": "^0.27.2",
    "pinia": "^2.0.22",
    "vk-uview-ui": "^1.3.9",
    "vue": "^3.2.38"
  }
};

var packageFn = function packageFn(name) {
  return {
    "name": "uniapp",
    "version": "",
    "description": "",
    "main": "main.js",
    "dependencies": dependencies[name],
    "scripts": {
      "init": "npm install"
    },
    "keywords": ["uniapp", "".concat(name)],
    "author": "grant",
    "license": "ISC",
    "devDependencies": {}
  };
};

module.exports = packageFn;