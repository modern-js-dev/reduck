const isValidDomain = require('../')

const domain = document.querySelector('#domain')
const subdomain = document.querySelector('#subdomain')
const topLevel = document.querySelector('#topLevel')
const wildcard = document.querySelector('#wildcard')
const unicode = document.querySelector('#unicode')
const output = document.querySelector('#output')

domain.addEventListener('input', update)
subdomain.addEventListener('change', update)
topLevel.addEventListener('change', update)
wildcard.addEventListener('change', update)
unicode.addEventListener('change', update)

update()

function update(event) {
  if (event) event.preventDefault()
  output.innerHTML = String(isValidDomain(domain.value, {
    subdomain: subdomain.checked,
    topLevel: topLevel.checked,
    wildcard: wildcard.checked,
    allowUnicode: unicode.checked,
  }))
}
