import {escapeSpaces} from './web'
import axios from 'axios'

let apiUrl = `http://localhost:3000/api/`
apiUrl = `https://ebird-photo-gallery.vercel.app/api/`

// Returns a url for requesting more bird info from the server
export function morePhotosUrl(user, startingIndex) {
  return `${apiUrl}morePhotos?user=${escapeSpaces(user)}&startingIndex=${startingIndex}`
}
