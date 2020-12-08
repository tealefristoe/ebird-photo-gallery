
import {replaceSpaces, getParams} from '../../lib/web'
import {processData, writeProcessedList} from '../../lib/data'

// an api end point for processing raw life and photo lists for a user
export default (req, res) => {
  let {user} = getParams(req.url)
  user = replaceSpaces(user)
  let processedList = processData(replaceSpaces(user))
  writeProcessedList(user, processedList)
  //res.status(200).json(processData(replaceSpaces(user)))
  res.status(200).end()
}
