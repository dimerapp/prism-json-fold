/*
 * prism-json-fold
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

module.exports = {
  /**
   * Returns a boolean telling is line is one of the given
   * punctuation or not
   *
   * @method isPunctuation
   *
   * @param  {String}      line
   * @param  {Array}      values
   *
   * @return {Boolean}
   */
  isPunctuation (line, values) {
    return values.some(function (value) {
      return line.indexOf(`punctuation">${value}`) > -1
    })
  },

  /**
   * Returns a boolean telling is line is one of the given operators
   *
   * @method isOperator
   *
   * @param  {String}   line
   * @param  {Array}   values
   *
   * @return {Boolean}
   */
  isOperator (line, values) {
    return values.some(function (value) {
      return line.indexOf(`operator">${value}`) > -1
    })
  },

  /**
   * Retuns a boolean telling if line is a property
   *
   * @method isProperty
   *
   * @param  {String}   line
   *
   * @return {Boolean}
   */
  isProperty (line) {
    return line.indexOf('property">') > -1
  },

  /**
   * Returns the span for the main block
   *
   * @method getBlock
   *
   * @param  {String} identifier
   *
   * @return {String}
   */
  getBlock (identifier) {
    return `<span class="block block-${identifier}"><i class="caret"></i>`
  },

  /**
   * Returns the span for the block wrapper
   *
   * @method getBlockWrapper
   *
   * @return {String}
   */
  getBlockWrapper () {
    return '<span class="block-wrapper">'
  },

  /**
   * Returns whitspaces from the front of the span tag
   *
   * @method getSpaces
   *
   * @param  {String}  content
   *
   * @return {String}
   */
  getSpaces (content) {
    const match = content.match(/^(\s+)/)
    return match ? match[1] : ''
  },

  /**
   * Returns a boolean telling if current content is a closing
   * array of objectq
   *
   * @method isClosingBlock
   *
   * @param  {String}       content
   *
   * @return {Boolean}
   */
  isClosingBlock (content) {
    return content.indexOf('punctuation">}') > -1 || content.indexOf('punctuation">]') > -1
  }
}
