# Prism JSON fold
> Convert JSON arrays and objects to foldable groups in Prism.Js

![](https://res.cloudinary.com/adonisjs/image/upload/q_100/v1537431260/prism-json-fold_vhw5tf.gif)

[![travis-image]][travis-url]
[![npm-image]][npm-url]

This plugin parses the json output of Prism and wraps them inside groups to make them foldable. In nutshell it does the following:

1. Adds a `before-update` hook to Prism hooks system.
2. Reads the HTML generated by Prism.
3. Parses the HTML and wraps them inside groups.
4. Updates the HTML on Prism instance.

### 💁 [Learn more](#why-parse-the-html) about why we took the approach of parsing HTML.

## Setup
Install it from npm as follows

```shell
npm i prism-json-fold
```

Require or import it after Prism.

```js
import 'prismjs'
import 'prism-json-fold'

// commonjs
require('prismjs')
require('prism-json-fold')
```

or grap it from CDN

```html
<script type="text/javascript" src="https://unpkg.com/prism-json-fold"></script>
```

## Why parse the HTML?
After observing the Prism output carefully, it does not group the HTML in any way. All of the prism elements are sibling `span` tags.

Also extending the `json` grammar is not possible, since **Prism grammar (ideally javascript) regular expressions** are not recursive in nature, which means you cannot define a regex, which will recursively find `Objects` or `Arrays` inside JSON.

Finally, the only way is to parse the HTML output and wrap things together. There is little overhead in doing that, since we have to go through each HTML element and here's the benchmarks on same.

- The benchmarks are ran on Chrome Mac OSX.
- And here's the [sample data](benchmarks/samples.js).

```shell
## Small data set
Chrome 69.0.3497 (Mac OS X 10.13.6)  Small sample: Without json fold at 64445 ops/sec
Chrome 69.0.3497 (Mac OS X 10.13.6)  Small sample: With json fold at 51232 ops/sec

## Large data set
Chrome 69.0.3497 (Mac OS X 10.13.6)  Large sample: Without json fold at 1995 ops/sec
Chrome 69.0.3497 (Mac OS X 10.13.6)  Large sample: With json fold at 1431 ops/sec
```

### Tips to improve speed
In ideal situation, you must load and run PrismJs inside a worker. It will avoid blocking the UI completely and helps in delivering better experience. Learn more about [loading prism inside a worker]().

## CSS
The following CSS is required to get the desired output. Feel free to modify the CSS as per your needs (if required).

> Not everything requires changes. So I have added a comment `You may have to change this`, for properties that may require changes.

```css
code .block {
 position: relative;
}

code i.caret {
  position: absolute;
  font-style: normal;
  cursor: pointer;

  /** You may have to change this */
  width: 10px;
  height: 10px;
  top: -3px;
  left: -12px;
  color: #ccc;
}

code i.caret:before {
  /** You may have to change this: It only works when using font awesome */
  content: '\25B8';
}

code .block-wrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: top;
  
  /** You may have to modify this */
  max-height: 24px;
  max-width: 45px;
  color: #ccc;
}

code .block-wrapper > * {
  opacity: 0;
}

code .block-wrapper:before {
  content: '...';
  top: -2px;
  position: absolute;
  left: 3px;
}

code .block-wrapper:after {
  top: 0px;
  position: absolute;
  right: 0;
}

code .block-keyed-object > .block-wrapper:after,
code .block-object > .block-wrapper:after {
  content: '}';
}

code .block-keyed-array > .block-wrapper:after,
code .block-array > .block-wrapper:after {
  content: ']';
}

code .block.open > .block-wrapper {
  display: initial;
}

code .block.open > .block-wrapper > * {
  opacity: 1;
}

code .block.open > .block-wrapper:before,
code .block.open > .block-wrapper:after {
  display: none;
}

code .block.open > i.caret:before {
  transform: rotate(90deg);
}
```

## Change log
The change log can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Contributing
The code is written as clean as possible, while keeping the peformance as the main priority. If you are contributing, make sure:

1. To avoid creating too many arrays and then joining them recursively to create the string. Instead concatenate to the string directly.
2. Avoid using ES next code, which requires polyfills or will increase the bundle size in any manner.

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## Authors & License
[Harminder Virk](https://github.com/thetutlage) and [contributors](https://github.com/dimerapp/prism-json-fold/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[travis-image]: https://img.shields.io/travis/dimerapp/prism-json-fold/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/dimerapp/prism-json-fold "travis"

[npm-image]: https://img.shields.io/npm/v/prism-json-fold.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/prism-json-fold "npm"
