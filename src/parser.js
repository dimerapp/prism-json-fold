/*
 * prism-json-fold
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const utils = require('./utils')
const parsers = require('./parsers')

/**
 * Parses the prism HTML content and wraps the JSON objects
 * and arrays inside other spans to make them foldable
 *
 * @method parser
 *
 * @param  {String} content
 *
 * @return {String}
 */
module.exports = function parser (content) {
  const lines = content.split('</span>')
  let newLines = ''
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (utils.isClosingBlock(line)) {
      /**
       * Here we close 3 spans in total and here's why
       *
       * 1. First span is the to close the current span, which was removed during the `split` call.
       * 2. 2nd span is the `.block-wrapper` which was opened by the parsers.
       * 3. 3rd span is the `.block` which was again opened by the parsers.
       */
      newLines += `${line}</span></span></span>`
    } else {
      /**
       * Find the first match parser. To parsers cannot parse the same expression.
       */
      const matchingParser = parsers.find((parser) => parser.matches(lines, line, index))

      if (matchingParser) {
        const { jump, content } = matchingParser.getContent(lines, line, index)
        newLines += content

        /**
         * Parsers returns the jump value, which indicates that we can jump x number of
         * the lines without parsing them.
         */
        index = index + jump
      } else {
        newLines += `${line}</span>`
      }
    }
    index++
  }

  return newLines
}
