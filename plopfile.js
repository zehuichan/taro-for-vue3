const pageGenerator = require('./template/page/prompt')
const componentGenerator = require('./template/component/prompt')
const storeGenerator = require('./template/store/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('page', pageGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
