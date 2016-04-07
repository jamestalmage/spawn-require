import test from 'ava';
import fn from '../';
import {fork, exec} from 'child_process';

test.serial.cb('fork', t => {
	t.plan(3);

	t.context = fn([
		require.resolve('./fixtures/foo'),
		require.resolve('./fixtures/bar')
	]);

	fork(require.resolve('./fixtures/child-1'))
		.on('message', function (data) {
			if (data.passed === 'child-1') {
				t.pass('child 1 passed');
				t.deepEqual(data.shared, ['foo', 'bar']);
			}

			if (data.passed === 'child-2') {
				t.deepEqual(data.shared, ['foo', 'bar']);
				t.end();
			}
		});
});

test.serial.cb('exec', t => {
	t.plan(2);

	t.context = fn([
		require.resolve('./fixtures/foo'),
		require.resolve('./fixtures/bar')
	]);

	exec('node ' + require.resolve('./fixtures/child-1.js'), (err, stdout) => {
		t.ifError(err);
		var lines = stdout.split('\n').map(line => line.replace(/^\s*data:\s*/, ''));
		t.deepEqual(JSON.parse(lines[0]), {
			passed: 'child-1',
			shared: ['foo', 'bar']
		});
		t.end();
	});
});

test.serial.cb('babel', t => {
	t.plan(1);

	t.context = fn(['babel-register', 'babel-polyfill']);

	fork(require.resolve('./fixtures/babel'))
		.on('message', function (data) {
			t.deepEqual(data, {
				passed: 'babel',
				shared: []
			});
			t.end();
		});
});

test.afterEach(t => t.context());
