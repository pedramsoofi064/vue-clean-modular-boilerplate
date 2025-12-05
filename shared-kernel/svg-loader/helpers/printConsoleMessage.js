const printConsoleMessage = (type, text) => {
  console[type](`[infra-svg-loader]: ${text}`)
}

export default printConsoleMessage