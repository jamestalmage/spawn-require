# spawn-require [![Build Status](https://travis-ci.org/jamestalmage/spawn-require.svg?branch=master)](https://travis-ci.org/jamestalmage/spawn-require)

> user-land `--require` flag equivalent that can handle forked processes

Node `>= 4.0.0` provides a `--require` flag that allows you to register require hooks like `babel-register`, and `coffee-script/register` from the command line, but it has a few drawbacks:
 
1. It does not work on older versions of Node ('0.12' or before), which is problematic if you want to test your module on all LTS versions of Node.

2. It *is* propagated to child processes which use `child_process.fork`, but not those that use `child_process.exec` or `child_process.spawn`. 
 
`spawn-require` solves both the above problems. It slows down forking quite a bit compared to the native Node implementations, so you should only use it if you actually need `1` or `2` above. 

## Install

```
$ npm install --save spawn-require
```


## CLI

```
$ spawn-require babel-register babel-polyfill coffee-script/register -- node my-module.js
```

Registers Babel and CoffeeScript require hooks before launching `my-module.js`. If `my-module.js` spawns additional processes, the require hooks will be loaded in those spawned processes as well. 

Note the `--` separator. Everything before is a require hook, everything after is considered the program args.

## API     

```js
const spawnRequire = require('spawn-require');

const unwrap = spawnRequire(['babel-register', 'babel-polyfill', 'coffee/register']);
//=> unwrap can be called later to undo the wrapping
```

### spawnRegister(modulePaths)

Wraps `child_process` so spawned children will always require the specified modules before executing.

#### modulePaths

Type: `array` of `string`s

An list of modules that should be required before executing any forked processes (you may want to resolve them all to absolute paths).  

## License

MIT © [James Talmage](http://github.com/jamestalmage)
