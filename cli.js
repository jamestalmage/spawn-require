#!/usr/bin/env node
'use strict';
var spawnRequire = require('./');
var resolveCwd = require('resolve-cwd');
var foregroundChild = require('foreground-child');

var idx = process.argv.indexOf('--');
var toRequire = process.argv.slice(2, idx).map(resolveCwd);
var args = process.argv.slice(idx + 1);

spawnRequire(toRequire);

foregroundChild(args);
