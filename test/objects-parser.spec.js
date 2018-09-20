/*
 * prism-json-fold
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const objects = require('../src/parsers/objects')

test.group('Objects parser', () => {
  test('return true when array of spans forms an object starting', (assert) => {
    const template = [
      '<span class="token property">"user"',
      '<span class="token operator">:',
      '<span class="token punctuation">{'
    ]

    assert.isTrue(objects.matches(template, template[0], 0))
  })

  test('return false when punctuation is not curly brace', (assert) => {
    const template = [
      '<span class="token property">"user"',
      '<span class="token operator">:',
      '<span class="token punctuation">['
    ]

    assert.isFalse(objects.matches(template, template[0], 0))
  })

  test('return false when operator is missing', (assert) => {
    const template = [
      '<span class="token punctuation">{',
      '<span class="token property">"user"',
      '<span class="token operator">:',
      '<span class="token punctuation">{'
    ]

    assert.isFalse(objects.matches(template, template[0], 0))
  })

  test('return new content for the match', (assert) => {
    const template = [
      '<span class="token property">"user"',
      '<span class="token operator">:',
      '<span class="token punctuation">{'
    ]

    const expected = [
      '<span class="block block-keyed-object"><i class="caret"></i>',
      '<span class="token property">"user"</span>',
      '<span class="token operator">:</span>',
      '<span class="token punctuation">{</span>',
      '<span class="block-wrapper">'
    ]

    assert.deepEqual(objects.getContent(template, template[0], 0), {
      content: expected.join(''),
      jump: 2
    })
  })

  test('move property spaces to the block', (assert) => {
    const template = [
      '  <span class="token property">"user"',
      '<span class="token operator">:',
      '<span class="token punctuation">{'
    ]

    const expected = [
      '  <span class="block block-keyed-object"><i class="caret"></i>',
      '<span class="token property">"user"</span>',
      '<span class="token operator">:</span>',
      '<span class="token punctuation">{</span>',
      '<span class="block-wrapper">'
    ]

    assert.deepEqual(objects.getContent(template, template[0], 0), {
      content: expected.join(''),
      jump: 2
    })
  })

  test('return true for non-keyed objects', (assert) => {
    const template = [
      '<span class="token punctuation">[',
      '<span class="token punctuation">{'
    ]

    assert.isTrue(objects.matches(template, template[1], 1))
  })

  test('return true for non-keyed objects after command', (assert) => {
    const template = [
      '<span class="token punctuation">{',
      '<span class="token punctuation">,',
      '<span class="token punctuation">{'
    ]

    assert.isTrue(objects.matches(template, template[2], 2))
  })

  test('return content for non-keyed objects', (assert) => {
    const template = [
      '<span class="token punctuation">[',
      '<span class="token punctuation">{'
    ]

    const expected = [
      '<span class="block block-object"><i class="caret"></i>',
      '<span class="token punctuation">{</span>',
      '<span class="block-wrapper">'
    ]

    assert.deepEqual(objects.getContent(template, template[1], 1), {
      content: expected.join(''),
      jump: 0
    })
  })
})
