// Suppress punycode deprecation warning
process.emitWarning = (warning, type, code, ...args) => {
  if (code === 'DEP0040') return
  return process.emitWarning(warning, type, code, ...args)
}
