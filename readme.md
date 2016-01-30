# spawn-require [![Build Status](https://travis-ci.org/jamestalmage/spawn-require.svg?branch=master)](https://travis-ci.org/jamestalmage/spawn-require)

> user-land --require flag equivalent that can handle forked processes


## Install

```
$ npm install --save spawn-require
```


## CLI

```
$ spawn-require babel-core/register coffee/register -- node my-module.js
```

Registers Babel and CoffeeScript require hooks before launching `my-module.js`. If `my-module.js` spawns additional processes, those require hooks will be loaded in those spawned processes as well. 

Note the `--` separator. Everything before is a require hook, everything after is considered the program args.

## API     

```js
const spawnRequire = require('spawn-require');

const unwrap = spawnRequire(['babel-core/register', 'coffee/register']);
//=> unwrap can be called later to undo the wrapping
```

### spawnRegister(modulePaths)

Wraps `child_process` so spawned children will always require the specified modules before executing.

#### modulePaths

Type: `array` of `string`s

An list of modules that should be required before executing any forked processes (you may want to resolve them all to absolute paths).  

## License

MIT © [James Talmage](http://github.com/jamestalmage)
