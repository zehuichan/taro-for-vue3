import { camelize } from './format'

export function withInstall(options) {
  options.install = (app) => {
    const { name } = options
    app.component(name, options)
    app.component(camelize(`-${name}`), options)
  }

  return options
}
