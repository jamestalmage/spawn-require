import test from 'ava';
import fn from '../';
import {fork} from 'child_process';

test.serial.cb(t => {
	t.plan(3);

	t.context = fn([
		require.resolve('./fixtures/foo'),
		require.resolve('./fixtures/bar')
	]);

	fork(require.resolve('./fixtures/child-1'))
		.on('message', function (data) {
			if (data.passed === 'child-1') {
				t.pass('child 1 passed');
				t.same(data.shared, ['foo', 'bar']);
			}

			if (data.passed === 'child-2') {
				t.same(data.shared, ['foo', 'bar']);
				t.end();
			}
		});
});

test.serial.cb(t => {
	t.plan(1);

	t.context = fn(['babel-register', 'babel-polyfill']);

	fork(require.resolve('./fixtures/babel'))
		.on('message', function (data) {
			t.same(data, {
				passed: 'babel',
				shared: []
			});
			t.end();
		});
});

test.afterEach(t => t.context());
