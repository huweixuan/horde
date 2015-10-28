'use strict';

/**
 * Module dependencies.
 */

const views = require('co-views');
const React = require('react');

module.exports = (view, props) => views(__dirname + '/../')('index.ejs', 
    {
        reactOutput: React.renderToString(React.createFactory(require('../components/' + view))(props))
    }
);