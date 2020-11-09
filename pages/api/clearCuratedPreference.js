import {clearCuratedPreference} from '../../lib/data'
import {replaceSpaces, getParams} from '../../lib/web'

// An api end point for setting a user's photo as the curated preference
export default (req, res) => {
  let {birder, birdName} = getParams(req.url)
  clearCuratedPreference(replaceSpaces(birder), replaceSpaces(birdName))
  res.status(200).end()
}
