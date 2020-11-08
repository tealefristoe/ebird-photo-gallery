import {escapeSpaces} from './web'
import axios from 'axios'

let apiUrl = `http://localhost:3000/api/`
apiUrl = `https://ebird-photo-gallery.vercel.app/api/`

// Returns a url for requesting more bird info from the server
export function morePhotosUrl(user, startingIndex) {
  return `${apiUrl}morePhotos?user=${escapeSpaces(user)}&startingIndex=${startingIndex}`
}

export function setCuratedPreference(user, birdName, photoId) {
  const url = `${apiUrl}setCuratedPreference?birder=${escapeSpaces(user)}&birdName=${escapeSpaces(birdName)}&photoId=${photoId}`
  postNoResponse(url)
}

export function clearCuratedPreference(user, birdName) {
  const url = `${apiUrl}clearCuratedPreference?birder=${escapeSpaces(user)}&birdName=${escapeSpaces(birdName)}`
  postNoResponse(url)
}

function postNoResponse(url) {
  axios.get(url)
    .then(result => {})
    .catch(err => console.log(err))
}
