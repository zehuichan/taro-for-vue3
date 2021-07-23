const pageGenerator = require('./tpls/page/prompt')
const componentGenerator = require('./tpls/component/prompt')
const storeGenerator = require('./tpls/store/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('page', pageGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
