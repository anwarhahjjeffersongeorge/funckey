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

## Usage

Module exports a unary function accepting an __object with named parameters__ as follows:  

Argument     | Type           | Required | Description  
------------ | ---------------| -------- | -----------  
`o`     | `Object`       | Yes      |  The object to search for functions  
`prefix`     | `String`       | No       |  A prefix to add to found paths
`arrayMode`  | `Boolean`      | No       | Whether to return paths as arrays instead of dot-separated strings
`excludes`   | `Array`        | No       | Object references to exclude from traversal (i.e., circular references)

#### Find functions in an object as dot-paths:
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

funckey({object: fixture0}) // ['n', 'o.a', 'o.c.d']
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

funckey({object: fixture1,  arrayMode: true})
// ^ [['n'], ['o', 'a'], ['o', 'c', 'd'] ]
```
## Testing
npm test
