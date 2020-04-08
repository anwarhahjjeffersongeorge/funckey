export default function funcKey({
  obj,
  arrayMode,
  prefix='',
  excludes = []
}) {
  excludes = Array.isArray(excludes) ? excludes : []
  excludes = excludes.includes(obj) ? excludes : [...excludes, obj]
  const r = Object.entries(obj)
    .reduce((acc, [i, e]) => {
      if(typeof e === 'object' && !excludes.includes(e)) {
        acc = [
          ...acc,
          ...funcKey({
            obj: e,
            prefix: [...prefix, i],
            arrayMode: false,
            excludes: [...excludes, e]
          })
        ]
      } else if (typeof e === 'function') {
        acc = prefix
          ? [...acc, [...prefix, i]]
          : [...acc, i]
      }
      return acc
    }, [])
  if (arrayMode === true) {
    return r.map(v => v.split('.'))
  } else {
    return r.map(v => Array.isArray(v) ? v.join('.') : v )
  }
}
