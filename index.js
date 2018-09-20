/*
 * prims-json-fold
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const parser = require('./src/parser');

(function () {
  /**
   * Standard check for prism plugins.
   */
  if ((typeof self !== 'undefined' && !self.Prism) || (typeof global !== 'undefined' && !global.Prism)) {
    return
  }

  Prism.hooks.add('before-insert', (env) => {
    env.highlightedCode = parser(env.highlightedCode)
  })
})()
