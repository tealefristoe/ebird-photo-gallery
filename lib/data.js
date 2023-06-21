import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import {bk, savedPhotoData} from './constants'

const dataDirectory = path.join(process.cwd(), 'data')
// Options to use while parsing list csv files
const parseOptions = {columns: true, skip_empty_lines: true, bom: true}

const birdsPerPage = 200;
const maxPhotos = 25;

// Returns a list of available birders and one page of the life list with photo data for a single user
export function getData(user, startingId) {
  const birders = getBirders()
  const data = {birders, totalCount: 0, lifeList: []}
  if (birders.includes(user)) {
    const userData = getBirderData(user, startingId)
    data.totalCount = userData.totalCount
    data.lifeList = userData.lifeList
  }
  return data
}

export function getBirders() {
  return fs.readdirSync(dataDirectory)
}

// Returns the data for a single user from the user's life and photo lists
export function processData(user) {
  const birders = fs.readdirSync(dataDirectory)
  if (birders.includes(user)) {
    return processBirderData(user)
  }
  return []
}

// Returns one page of the life list for a single birder
function getBirderData(birder, startingId) {
  // get life list to determine total length
  let lldata = getLifeList(birder)

  // get processed list
  let pldata = getProcessedList(birder, startingId / birdsPerPage)

  return {totalCount: lldata.length, lifeList: pldata}
}

// Returns the life list for a user, using data from their life and photo lists
function processBirderData(birder) {
  // Get life and photo lists
  let lldata = getLifeList(birder)
  let pldata = getPhotoList(birder)

  // Find the photos for each bird
  let list = []
  for (let i = 0; i < lldata.length; i++) {
    if (lldata[i][bk.lifeCountable] === "1") {
      let birdName = lldata[i][bk.lifeBirdName]
      let birdData = {photos: findPhotos(birdName, pldata)}
      birdData[bk.lifeBirdName] = birdName
      list.push(birdData)
    }
  }

  return list
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

// Returns the file name for a page of a life list
function processedListFileName(page) {
  return 'processed_list' + page + '.json'
}

// Returns one page of the birder's life list with photo data
function getProcessedList(birder, page) {
  let processedData = []
  try {
    let processedString = fs.readFileSync(path.join(dataDirectory, birder, processedListFileName(page)), 'utf8')
    processedData = JSON.parse(processedString)
  } catch (err) {
    console.error(err)
  }
  return processedData
}

// Saves a user's processed lists in a series of files
export function writeProcessedList(birder, processedList) {
  let page = 0
  for (let i = 0; i < processedList.length; i += birdsPerPage) {
    try {
      let plfstring = fs.writeFileSync(path.join(dataDirectory, birder, processedListFileName(page)), JSON.stringify(processedList.slice(i, i + birdsPerPage)))
      page++
    } catch (err) {
      console.error(err)
    }
  }
}

// Reduces photo data to only include what we'll use
function reducePhotoData(photoData) {
  let reducedData = {}
  savedPhotoData.forEach(field => {
    reducedData[field] = photoData[field]
  })
  return reducedData
}

// Finds all photos that match the given bird name in the photo data
function findPhotos(birdName, photoData) {
  let photos = []
  const useRegExp = true
  let birdRegExp = null
  if (useRegExp) {
    birdRegExp = new RegExp(`\\b${birdName}\\b`)
  }
  photoData.map(photo => {
    if (useRegExp) {
      if (photos.length < maxPhotos && nameMatchRegExp(birdName, birdRegExp, photo[bk.photoBirdName])) {
        photos.push(reducePhotoData(photo))
      }
    } else {
      if (photos.length < maxPhotos && nameMatch(birdName, photo[bk.photoBirdName])) {
        photos.push(reducePhotoData(photo))
      }
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
// birdRegExp should be '\b{birdName}\b'
function nameMatchRegExp(birdName, birdRegExp, photoName) {
  // Uses regular expressions to avoid matching names that contain other names
  const photoRegExp = new RegExp(`\\b${photoName}\\b`)
  const match = (birdRegExp.test(photoName) || photoRegExp.test(birdName)) && !photoName.includes('ybrid') && !photoName.includes('/')
  return match
}

// Name matching is the same but without regular expressions
function nameMatch(birdName, photoName) {
  const match = (birdName.includes(photoName) || photoName.includes(birdName)) && !photoName.includes('ybrid') && !photoName.includes('/')
  return match
}
