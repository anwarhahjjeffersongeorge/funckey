'use strict'
import test from 'ava'
import funckey from '..'

test('Returns top-level paths corresponding to functions/classes', t => {
  const fixture0 = {
    a (){},
    b: 22,
    c: ()=>{},
    [Symbol.for('d')](){},
    e: {},
    f: class f{},
  }

  const r = funckey({
    obj: fixture0,
    all: true
  })

  t.true(r.every(k => typeof fixture0[k] === 'function'))
})

test('Returns nested paths corresponding to functions', t => {
  const fixture0 = {
    a: {
      aa(){},
      ab: 33
    },
    b: {
      ba: () => {},
      bb: 23233232023
    },
  }

  const r = funckey({
    obj: fixture0,
    arrayMode: true
  })

  t.true(r.every(([k, kk]) => typeof fixture0[k][kk] === 'function'))
})

test('Gets top-level function-valued keys', t => {
  const fixture0 = {
    a(){},
    b(){},
    c: class cc{},
    d: 33
  }
  const targetDotPaths = ['a', 'b', 'c']
  t.deepEqual(
    funckey({
      obj: fixture0
    }),
    targetDotPaths,
    'Finds top-level dot-paths'
  )
  const targetArrayPaths = [['a'], ['b'], ['c'] ]
  t.deepEqual(
    funckey({
      obj: fixture0,
      arrayMode: true
    }),
    targetArrayPaths,
    'Finds top-level array paths'
  )
})

test('Gets nested function-valued keys', t => {
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
  const targetDotPaths = ['n', 'o.a', 'o.c.d']
  t.deepEqual(
    funckey({
      obj: fixture1
    }),
    targetDotPaths,
    'Finds nested dot-paths'
  )
  const targetArrayPaths = [['n'], ['o', 'a'], ['o', 'c', 'd'] ]
  t.deepEqual(
    funckey({
      obj: fixture1,
      arrayMode: true
    }),
    targetArrayPaths,
    'Finds nested array paths'
  )
})

test('Handles circular references', t => {
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
  fixture0.d = fixture0
  const targetDotPaths = ['n', 'o.a', 'o.c.d']
  let dotResult, arrayResult
  const dotTest = () => {
    dotResult = funckey({
      obj: fixture0
    })
  }
  const arrayTest = () => {
    arrayResult = funckey({
      obj: fixture0,
      arrayMode: true
    })
  }
  t.notThrows(dotTest, `Ignores circular reference when finding dot path`)
  t.deepEqual(
    dotResult,
    targetDotPaths,
    'Finds nested dot-paths'
  )
  t.notThrows(arrayTest, `Ignores circular reference when finding array path`)
  const targetArrayPaths = [['n'], ['o', 'a'], ['o', 'c', 'd'] ]
  t.deepEqual(
    arrayResult,
    targetArrayPaths,
    'Finds nested array paths'
  )
})

test('Ignores null, undefined elements', t => {
  const fixture0 = {
    n(){},
    m: null,
    o: {
      a: ()=>{},
      b:3,
      c: {
        d(){},
        e: 4
      },
      d: undefined
    }
  }
  fixture0.d = fixture0
  const targetDotPaths = ['n', 'o.a', 'o.c.d']
  let dotResult, arrayResult
  const dotTest = () => {
    dotResult = funckey({
      obj: fixture0
    })
  }
  const arrayTest = () => {
    arrayResult = funckey({
      obj: fixture0,
      arrayMode: true
    })
  }
  t.notThrows(dotTest, `Ignores circular reference when finding dot path`)
  t.deepEqual(
    dotResult,
    targetDotPaths,
    'Finds nested dot-paths'
  )
  t.notThrows(arrayTest, `Ignores circular reference when finding array path`)
  const targetArrayPaths = [['n'], ['o', 'a'], ['o', 'c', 'd'] ]
  t.deepEqual(
    arrayResult,
    targetArrayPaths,
    'Finds nested array paths'
  )
})
