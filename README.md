# prv
**Private fields in Javascript**

[![npm](https://img.shields.io/npm/v/prv.svg)](https://npmjs.com/package/prv)
[![license](https://img.shields.io/npm/l/prv.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/prv.svg)](https://travis-ci.org/Download/prv)
[![Greenkeeper badge](https://badges.greenkeeper.io/Download/prv.svg)](https://greenkeeper.io/)
[![greenkeeper](https://img.shields.io/david/Download/prv.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

This NPM module can be used to associate private data with objects. 
It stores an associated object with the private data in a [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), 
keyed on the subject. If the subject is garbage collected, so is the private data.

This module works in Node JS (v4 and up) and all browsers that have [support](https://caniuse.com/#feat=es5) for WeakMap (all modern browsers). 

## Install
```sh
npm install --save prv
```

## Include in your app

### require
```js
const createAccessor = require('prv')
const prv = createAccessor()
// or, shorthand
const prv = require('prv')() // <-- note the double braces
```

### import
```js
import createAccessor from 'prv'
const prv = createAccessor()
```

### Copy-paste
Since this module is super-small, it might be beneficial for 
you to just copy-paste it into your codebase verbatim:

```js
const createAccessor = () => {
  const p = new WeakMap()
  return o => {
    if (! p.has(o)) p.set(o, {})
    return p.get(o)
  }
}
```

Yup, that's all there is to it!

## Usage
Create an accessor function and use it to associate private 
data with objects. Only code that has access to the accessor 
function can reach the private data.

```js
import createAccessor from 'prv'
const prv = createAccessor()

class Point {
  constructor(x, y) {
    prv(this).x = x
    prv(this).y = y
  }

  get x() {
    return prv(this).x
  }

  get y() {
    return prv(this).y
  }
}

const point = new Point(0,0)
console.info(point.x) // 0
console.info(point.y) // 0

// attempting to set x
// ignored in 'sloppy' mode
// throws TypeError in strict mode
point.x = 10
```

## Issues
Add an issue in the [issue tracker](https://github.com/download/prv/issues)
to let me know of any problems you find, or questions you may have.

## Copyright
Copyright 2018 by [Stijn de Witt](https://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
