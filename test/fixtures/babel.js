import delay from 'delay';
import assert from 'assert';
import shared from './shared';

(async function (...args) {
	assert.deepEqual(args, ['a', 'b']);
	await delay(20);
	process.send({
		passed: 'babel',
		shared
	});
})('a', 'b');
