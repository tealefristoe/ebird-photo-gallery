// Utility functions for dealing with urls and the like

// Puts spaces and other illegal characters back in an escaped url
export function replaceSpaces(str) {
  return str.replace('+', ' ').replace('%20', ' ').replace('%27', "'")
}

// Removes spaces from a url
export function escapeSpaces(str) {
  return str.replace(' ', '+')
}

// Returns a dictionary of the params passed in a url
export function getParams(url) {
  let params = {}
  const parts = url.split('?')
  if (parts.length > 1) {
    const paramsString = parts[1].split('&')
    paramsString.map(param => {
      let [key, value] = param.split('=')
      params[key] = value
    })
  }
  return params
}
