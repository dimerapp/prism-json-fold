/*
 * prism-json-fold
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const utils = require('../utils')

module.exports = {
  /**
   * Returns a boolean telling if stack and the current line
   * content looks like an object literal
   *
   * @method matches
   *
   * @param  {Array} stack
   * @param  {String} content
   * @param  {Number} index
   *
   * @return {Boolean}
   */
  matches (stack, content, index) {
    /**
     * If array is part of an array
     *
     * [
     *   [],
     *   []
     * ]
     */
    if (utils.isPunctuation(content, ['['])) {
      if (!stack[index - 1]) {
        return false
      }
      return utils.isPunctuation(stack[index - 1], ['[', ','])
    }

    /**
     * If it's starting of a keyed object.
     *
     * "user": {
     * }
     */
    if (stack.length < index + 2 || !utils.isProperty(content)) {
      return false
    }

    return utils.isOperator(stack[index + 1], [':']) && utils.isPunctuation(stack[index + 2], ['['])
  },

  /**
   * Returns the new content block for the matched object node. This method
   * can blindly believe that content, stack is validated properly using
   * the `matches` method.
   *
   * @method getContent
   *
   * @param  {Array}   stack
   * @param  {String}  content
   * @param  {Number}  index
   *
   * @return {Object} { content: String, jump: Number }
   */
  getContent (stack, content, index) {
    if (utils.isPunctuation(content, ['['])) {
      const wrappedContent = `${content.trim()}</span>`
      const openingBlock = `${utils.getSpaces(content)}${utils.getBlock('array')}`
      const block = `${openingBlock}${wrappedContent}${utils.getBlockWrapper()}`
      return { content: block, jump: 0 }
    }

    const operator = `${stack[index + 1]}</span>`
    const punctuation = `${stack[index + 2]}</span>`
    const wrappedContent = `${content.trim()}</span>`
    const openingBlock = `${utils.getSpaces(content)}${utils.getBlock('keyed-array')}`

    const block = `${openingBlock}${wrappedContent}${operator}${punctuation}${utils.getBlockWrapper()}`
    return { content: block, jump: 2 }
  }
}
