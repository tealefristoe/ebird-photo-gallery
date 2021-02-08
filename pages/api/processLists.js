
import {replaceSpaces, getParams} from '../../lib/web'
import {getBirders, processData, writeProcessedList} from '../../lib/data'

function process(birder) {
  writeProcessedList(birder, processData(birder))
}

// an api end point for processing raw life and photo lists for a user
export default (req, res) => {
  let {user} = getParams(req.url)
  user = replaceSpaces(user)
  console.log('user: ' + user)
  if (user == 'all') {
    getBirders().forEach(birder => process(birder))
  } else {
    process(user)
  }
  res.status(200).end()
}
