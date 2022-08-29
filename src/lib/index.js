const toKebabCase = (value) =>
  value.replace(new RegExp('(\\s|_|-)+', 'gmi'), '-')

module.exports = { toKebabCase }
