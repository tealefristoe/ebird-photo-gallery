import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import {bk} from './constants'

const dataDirectory = path.join(process.cwd(), 'data')
// Options to use while parsing list csv files
const parseOptions = {columns: true, skip_empty_lines: true, bom: true}

const birdsPerPage = 200;
const maxPhotos = 25;

// Returns a list of available birders and one page of the life list with photo data for a single user
export function getData(user, startingId) {
  const birders = fs.readdirSync(dataDirectory)
  const data = {birders, totalCount: 0, lifeList: []}
  if (birders.includes(user)) {
    const userData = getBirderData(user, startingId)
    data.totalCount = userData.totalCount
    data.lifeList = userData.lifeList
  }
  return data
}

// Returns one page of the life list for a single birder
function getBirderData(birder, startingId) {
  // Get life and photo lists
  let lldata = getLifeList(birder)
  let pldata = getPhotoList(birder)

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

// Loads and returns the life list of a user
function getLifeList(birder) {
  const llname = 'life_list.csv'
  let lldata = []
  try {
    let llstring = fs.readFileSync(path.join(dataDirectory, birder, llname), 'utf8')
    lldata = parse(llstring, parseOptions)
  } catch (err) {
    console.error(err)
  }
  return lldata
}

// Loads and returns the photo list of a user
function getPhotoList(birder) {
  const plname = 'photo_list.csv'
  let pldata = []
  try {
    let plstring = fs.readFileSync(path.join(dataDirectory, birder, plname), 'utf8')
    pldata = parse(plstring, parseOptions)
  } catch (err) {
    console.error(err)
  }
  return pldata
}

// Finds all photos that match the given bird name in the photo data
function findPhotos(birdName, photoData) {
  let photos = []
  photoData.map(photo => {
    if (photos.length < maxPhotos && nameMatch(birdName, photo[bk.photoBirdName])) {
      photos.push(photo)
    }
  })
  return photos
}

// Returns data for all photos of a particular bird by a birder
export function getBirdPhotos(birder, birdName) {
  let pldata = getPhotoList(birder)
  return findPhotos(birdName, pldata)
}

// Utility function to match bird names
// Rejects hybrids and intergrades
function nameMatch(birdName, photoName) {
  // Uses regular expressions to avoid matching names that contain other names
  const birdRegExp = new RegExp(`\\b${birdName}\\b`)
  const photoRegExp = new RegExp(`\\b${photoName}\\b`)
  const match = (birdRegExp.test(photoName) || photoRegExp.test(birdName)) && !photoName.includes('ybrid') && !photoName.includes('/')
  return match
}
