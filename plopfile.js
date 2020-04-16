const viewGenerator = require('./plop-templates/post/prompt')
module.exports = function (plop) {
  plop.setGenerator('post', viewGenerator)
}
