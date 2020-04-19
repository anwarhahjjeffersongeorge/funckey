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

test('Ignores keys in \'excludeKeys\' option array', t=> {
  const fixture0 = {
    a(){},
    b(){},
    c:20,
    d: {
      prototype: 30303
    },
    prototype: {
      a(){},
      p(){},
      q:33,
      r:()=>{}
    }
  }
  const expected0 = [ 'a', 'b' ]
  const r0 = funckey({
    obj: fixture0
  })
  t.deepEqual(r0, expected0, 'ignores \'prototype\' key by default')


  const excludeKeys = ['a', 'r']
  const expected1 = [ 'b', 'prototype.p' ]
  const r1 = funckey({
    obj: fixture0, excludeKeys
  })
  // t.log(r1)
  t.deepEqual(r1, expected1, 'ignores specified keys at all nesting levels')
})


function nativeClasses(t, obj) {
  t.true(
    funckey({obj, propNames: true}).length > 0,
    'Gets functions'
  )
}

test('Identfies native Object functions using option \'pathNames\'', nativeClasses, Object)
test('Identfies native Array functions using option \'pathNames\'', nativeClasses, Array)
test('Identfies native Math functions using option \'pathNames\'', nativeClasses, Math)


test('Exports a function', t => {
  t.is(typeof funckey, 'function', 'is something')
  // t.is(typeof funckey, 'something', 'is a something type')
})
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
