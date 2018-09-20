suite('Small sample', function () {
  benchmark('Without json fold', function () {
    window.Prism.highlight(window.samples.small, window.Prism.languages.json, 'json')
  })

  benchmark('With json fold', function () {
    window.prismJsonFold(window.Prism.highlight(window.samples.small, window.Prism.languages.json, 'json'))
  })
})

suite('Large sample', function () {
  benchmark('Without json fold', function () {
    window.Prism.highlight(window.samples.large, window.Prism.languages.json, 'json')
  })

  benchmark('With json fold', function () {
    window.prismJsonFold(window.Prism.highlight(window.samples.large, window.Prism.languages.json, 'json'))
  })
})
