[![Version](https://img.shields.io/github/package-json/v/anwarhahjjeffersongeorge/funckey/master.svg)](https://github.com/anwarhahjjeffersongeorge/funckey)[![Build Status](https://travis-ci.org/anwarhahjjeffersongeorge/funckey.svg?branch=master)](https://travis-ci.org/anwarhahjjeffersongeorge/funckey) [![codecov](https://codecov.io/gh/anwarhahjjeffersongeorge/funckey/branch/master/graph/badge.svg)](https://codecov.io/gh/anwarhahjjeffersongeorge/funckey)
------------

[![license](https://img.shields.io/github/license/anwarhahjjeffersongeorge/funckey.svg)](UNLICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)

--------------

# &mdash; `funckey` &mdash;
### [Documentation](https://anwarhahjjeffersongeorge.github.io/funckey/)

### Function-valued properties of objects as dot-separated/array paths.

------
## Installation

Run `npm install funckey`

## Inclusion
#### ESWhatever:
```
import funckey from 'funckey'
```

#### CommonJS:
```
const funckey = require('funckey').default
```

## Usage

Module exports a unary function accepting an __object with named parameters__ as follows:  

Argument     | Type/Default     | Required  | Description  
------------ | -----------------| --------- | -----------  
`obj`        | `Object`         | Yes       |  The object to search for functions  
`prefix`     | `String` = ''    | No        |  A prefix to add to found paths
`arrayMode`  | `Boolean`= false | No        | Whether to return paths as arrays instead of dot-separated strings. See `symbNames`.
`symbNames`  | `Boolean`= false | No        | Whether to search own property symbols. If true, arrayMode enabled by default.
`propNames`  | `Boolean`= false | No        | Whether to search own property names
`all`  | `Boolean`= false | No        | If true, include own property names and own property symbols
`excludes`   | `Array`= []    | No        | Object references to exclude from traversal (i.e., circular references)
`excludeKeys`   | `Array`= ['prototype']    | No        | Keyed references to exclude from traversal

#### Find enumerable functions in an object as dot-paths:
```
const fixture0 = {
  n(){},
  o: {
    a: ()=>{},
    b:3,
    c: {
      d(){},
      e: 4
    }
  }
}

funckey({obj: fixture0})
// ['n', 'o.a', 'o.c.d']
```

#### Find functions in a nested object as array path lists:
```
const fixture1 = {
  n(){},
  o: {
    a: ()=>{},
    b:3,
    c: {
      d(){},
      e: 4
    }
  }
}

funckey({obj: fixture1,  arrayMode: true})
// [['n'], ['o', 'a'], ['o', 'c', 'd'] ]
```

#### Find the function paths associated with the native Array object (ignoring `prototype` subpaths):
```
funcKey({obj: Array, propNames: true}) // [ 'isArray', 'from', 'of' ]
```
#### Find `string`- and `symbol`-keyed function pathss using `all` option:
```
const fixture2 = {
  a: 3,
  b(){},
  [Symbol.for('c')]: {
    ca: ()=>{},
    [Symbol.for('cb')]: ()=>{},
    cc: 'no'
  },
  d: {
    da () {},
    [Symbol.for('db')]:()=>{},
    dc: 33
  }
}

funckey({obj: fixture2, all:true})
// [
//   [ 'b' ],
//   [ 'd', 'da' ],
//   [ 'd', Symbol(db) ],
//   [ Symbol(c), 'ca' ],
//   [ Symbol(c), Symbol(cb) ]
// ]
```

## Testing
npm test
