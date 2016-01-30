'use strict';
var assert = require('assert');
var childProcess = require('child_process');
var shared = require('./shared');

assert.deepEqual(shared, ['foo', 'bar']);

function send(data) {
	if (process.send) {
		process.send(data);
		return;
	}
	console.log('data: ', data);
}

send({
	passed: 'child-1',
	shared: shared
});

childProcess
	.fork(require.resolve('./child-2.js'))
	.on('message', function (data) {
		if (data.passed === 'child-2') {
			send(data);
		}
	});
