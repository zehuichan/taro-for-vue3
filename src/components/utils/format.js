const camelizeRE = /-(\w)/g

export const camelize = (str) =>
  str.replace(camelizeRE, (_, c) => c.toUpperCase())
