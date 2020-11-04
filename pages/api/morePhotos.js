import {getData} from '../../lib/data'
import {replaceSpaces, getParams} from '../../lib/web'

// An api end point for getting a "page" of birds from the server
export default (req, res) => {
  let {user, startingIndex} = getParams(req.url)
  res.status(200).json(getData(replaceSpaces(user), parseInt(startingIndex)))
}
