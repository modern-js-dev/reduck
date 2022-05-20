const punycode = require('punycode')
const sldMap = require('./data/sldMap.json')
const ccTldMap = require('./data/ccTldMap.json')

module.exports = function isValidDomain (value, opts) {
  if (typeof value !== 'string') return false
  if (!(opts instanceof Object)) opts = {}
  value = value.toLowerCase()

  if (value.endsWith('.')) {
    value = value.slice(0, value.length - 1)
  }

  if (opts.allowUnicode) {
    value = punycode.toASCII(value)
  }

  if (value.length > 253) {
    return false
  }

  const validChars = /^([\u0E00-\u0E7Fa-z0-9-._*]+)$/g
  if (!validChars.test(value)) {
    return false
  }

  if (opts.topLevel) {
    if (ccTldMap[value.replace(/\.$/, '')]) {
      return true
    }
  }

  const sldRegex = /(.*)\.(([\u0E00-\u0E7Fa-z0-9]+)(\.[a-z0-9]+))/
  const matches = value.match(sldRegex)
  let tld = null
  let labels = null
  if (matches && matches.length > 2) {
    if (sldMap[matches[2]]) {
      tld = matches[2]
      labels = matches[1].split('.')
    }
  }

  if (!labels) {
    labels = value.split('.')
    if (labels.length <= 1) return false

    tld = labels.pop()
    const tldRegex = /^(?:xn--)?(?!^\d+$)[\u0E00-\u0E7Fa-z0-9]+$/gi

    if (!tldRegex.test(tld)) return false
  }

  if (opts.subdomain === false && labels.length > 1) return false

  const isValid = labels.every(function (label, index) {
    if (opts.wildcard && index === 0 && label === '*' && labels.length > 1) {
      return true
    }

    let validLabelChars = /^([\u0E00-\u0E7Fa-zA-Z0-9-_]+)$/g
    if (index === labels.length - 1) {
      validLabelChars = /^([\u0E00-\u0E7Fa-zA-Z0-9-]+)$/g
    }

    // https://github.com/miguelmota/is-valid-domain/issues/22
    const doubleDashCount = (label.match(/--(--)?/g) || []).length
    const xnDashCount = (label.match(/xn--/g) || []).length
    if (index === labels.length - 1 && doubleDashCount !== xnDashCount) {
      return false
    }

    const isValid = (
      validLabelChars.test(label) &&
      label.length < 64 &&
      !label.startsWith('-') &&
      !label.endsWith('-')
    )

    return isValid
  })

  return isValid
}
