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
    if (env.language === 'json') {
      env.highlightedCode = parser(env.highlightedCode)
    }
  })

  /**
   * Add event listener to toggle the groups
   */
  Prism.hooks.add('complete', function (env) {
    if (env.language === 'json') {
      env.element.querySelectorAll('.block i').forEach(function (block) {
        block.addEventListener('click', function () {
          this.parentElement.classList.toggle('open')
        })
      })
    }
  })
})()
