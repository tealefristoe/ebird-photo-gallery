// Utility functions for dealing with urls and the like

// Puts spaces and other illegal characters back in an escaped url
export function replaceSpaces(str) {
  return str.split('+').join(' ').split('%20').join(' ').split('%27').join("'")
}

// Removes spaces from a url
export function escapeSpaces(str) {
  return str.split(' ').join('+')
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

export function spacer() {
  return <div style={{height: '1em'}} />
}

export function halfSpacer() {
  return <div style={{height: '.5em'}} />
}

// Returns a curated or top rated label to explain why a photo is being displayed
export function displayTypeLabel(displayType) {
  return displayType == 'curated' ? curatedLabel() : displayType == 'topRated' ? topRatedLabel() : ''
}

export function curatedLabel() {
  return <span style={{fontWeight: "bold", color: "#8899bb"}}>Curated Photo</span>
}

export function topRatedLabel() {
  return <span style={{fontWeight: "bold", color: "#666666"}}>Top Rated Photo</span>
}
