import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import {bk} from './constants'

const dataDirectory = path.join(process.cwd(), 'data')

const birdsPerPage = 200;

// Returns a list of available birders and one page of the life list with photo data for a single user
export function getData(user, startingId) {
  const birders = fs.readdirSync(dataDirectory)
  const data = {birders, totalCount: 0, lifeList: []}
  if (birders.includes(user)) {
    console.log(user + ' is a birder')
    const userData = getBirderData(user, startingId)
    data.totalCount = userData.totalCount
    data.lifeList = userData.lifeList
  }
  return data
}

// Returns one page of the life list for a single birder
function getBirderData(birder, startingId) {
  const parseOptions = {columns: true, skip_empty_lines: true, bom: true}

  // Get life list
  const llname = 'life_list.csv'
  let lldata = []
  try {
    let llstring = fs.readFileSync(path.join(dataDirectory, birder, llname), 'utf8')
    lldata = parse(llstring, parseOptions)
    llstring = ""
  } catch (err) {
    console.error(err)
  }

  // Get photo list
  const plname = 'photo_list.csv'
  let pldata = []
  let topPhotos = {}
  try {
    let plstring = fs.readFileSync(path.join(dataDirectory, birder, plname), 'utf8')
    pldata = parse(plstring, parseOptions)
    plstring = ""
  } catch (err) {
    console.error(err)
  }

  // Find the photos for all of the birds on the requested page
  let list = []
  for (let i = startingId; i < startingId + birdsPerPage && i < lldata.length; i++) {
    let birdName = lldata[i][bk.lifeBirdName]
    let birdData = {photos: findPhotos(birdName, pldata)}
    birdData[bk.lifeBirdName] = birdName
    list.push(birdData)
  }

  return {totalCount: lldata.length, lifeList: list}
}

// Finds a photo that matches the given bird name in the photo data
function findPhotos(birdName, photoData) {
  let photos = []
  photoData.map(photo => {
    if (nameMatch(birdName, photo[bk.photoBirdName])) {
      photos.push(photo)
    }
  })
  return photos
}

// Utility function to match bird names
// Rejects hybrids and intergrades
function nameMatch(birdName, photoName) {
  const match = (birdName.includes(photoName) || photoName.includes(birdName)) && !photoName.includes('ybrid') && !photoName.includes('/')
  return match
}
