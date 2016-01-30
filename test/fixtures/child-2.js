'use strict';
var assert = require('assert');
var shared = require('./shared');

assert.deepEqual(shared, ['foo', 'bar']);

process.send({
	passed: 'child-2',
	shared: shared
});
