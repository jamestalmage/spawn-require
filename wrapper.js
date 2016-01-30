var sw = require('spawn-wrap');

var toRequire = JSON.parse(process.argv[2]);

toRequire.forEach(function (toRequire) {
	require(toRequire);
});

sw.runMain();
