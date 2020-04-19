function f({
  obj, // Object to traverse
  arrayMode = false, // Return array paths
  symbNames = false, // Find symbol-named own properties
  propNames = false, // Find (including non-enumerable) named own properties excluding symbols
  all = false, // Find named properties and symbols
  prefix='',
  excludes = [],
  excludeKeys = ['prototype']
}) {
  // Current depth traversal
  this.depth = this.depth || 0

  // Exclude already-traversed objects
  excludes = Array.isArray(excludes) ? excludes : []
  excludes = excludes.includes(obj) ? excludes : [...excludes, obj]

  // Exclude specific keys
  excludeKeys = Array.isArray(excludeKeys) ? excludeKeys : []

  // Set greedy option
  if (all) {
    propNames = true
    symbNames = true
  }

  // Get entries to traverse in [[key, value], [key, value]] format
  let r = []
  if (propNames) {
    r = [...r, ...Object.getOwnPropertyNames(obj).map(n => [n, obj[n]])]
  }
  if (symbNames) {
    r = [...r, ...Object.getOwnPropertySymbols(obj).map(n => [n, obj[n]])]
  }
  if (!symbNames && !propNames) {
    r = [...r, ...Object.entries(obj)]
  }

  // Traverse entries recursively
  r = r.reduce((acc, [i, e]) => {
    if (!excludes.includes(e) && !excludeKeys.includes(i)){
      // Only traverse non-excluded keys
      if(e && typeof e === 'object') {
        // Recurse into object
        acc = [
          ...acc,
          ...f.call({depth: this.depth+1}, {
            obj: e,
            arrayMode: false,
            symbNames,
            propNames,
            all,
            prefix: [...prefix, i],
            excludes: [...excludes, e],
            excludeKeys
          })
        ]
      } else if (typeof e === 'function') {
        // Record function
        acc = prefix
        ? [...acc, [...prefix, i]]
        : [...acc, i]
      }
    }
    return acc
  }, [])

  // Sanitize traversal result per caller-specified modes
  if(symbNames === false){
    if (arrayMode === true) {
      return r.map(v => v.split('.'))
    } else {
      return r.map(v => Array.isArray(v) ? v.join('.') : v )
    }
  } else if (symbNames){
    return r.some(v => Array.isArray(v))
      ? r.map(v => Array.isArray(v) ? v : [v])
      : this.depth === 0 && arrayMode
        ? r.map(v => [v])
        : r
  }
}

// Export a function having a defined 'this' value
const funcKey = f.bind({depth: 0})
export default funcKey
