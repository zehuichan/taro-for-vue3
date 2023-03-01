const src = {
  mounted(el, binding) {
    el.props.src = process.env.BASE_URL + binding.value
  }
}

export function setupSrcDirective(app) {
  app.directive('src', src)
}

export default src
