var childProcess = require('child_process');

childProcess.exec('node ' + require.resolve('./child-1.js'), function (err, stdout) {
	if (err) {throw err}
	console.log(stdout)
});
