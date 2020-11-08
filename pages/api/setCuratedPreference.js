import {setCuratedPreference} from '../../lib/data'
import {replaceSpaces, getParams} from '../../lib/web'

// An api end point for setting a user's photo as the curated preference
export default (req, res) => {
  let {birder, birdName, photoId} = getParams(req.url)
  setCuratedPreference(replaceSpaces(birder), replaceSpaces(birdName), photoId)
  res.status(200).end()
}
