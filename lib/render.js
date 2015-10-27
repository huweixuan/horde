'use strict';

/**
 * Module dependencies.
 */

let views = require('co-views');

module.exports = views(__dirname + '/../views', {
  map: { ejs: 'ejs' }
});