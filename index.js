'use strict';
var sw = require('spawn-wrap');
var wrapperPath = require.resolve('./wrapper.js');

module.exports = function wrap(modulePaths) {
	return sw([wrapperPath, JSON.stringify(modulePaths)]);
};
