import fs from 'fs'
import path from 'path'
import parse from 'csv-parse/lib/sync'
import {bk} from './constants'

const dataDirectory = path.join(process.cwd(), 'data')

export function getData(user) {
  const birders = fs.readdirSync(dataDirectory)
  const data = {birders, lists: {}}
  if (birders.includes(user)) {
    data.lists[user] = getBirderData(user)
  } else {
    data.lists[user] = {lifeList: [], photoList: {}}
  }
  return data
}

function getBirderData(birder) {
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
    // Find the best photo of each species
    pldata.forEach((data, index) => {
      if (!(data[bk.photoBirdName] in topPhotos)) {
        // Might need to add more filters here
        topPhotos[data[bk.photoBirdName]] = data
      }
    })
    plstring = ""
    pldata = []
  } catch (err) {
    console.error(err)
  }

  // Find best photo for each species
  lldata.forEach((birdData, index) => {
    lldata[index].photo = findPhoto(birdData[bk.lifeBirdName], topPhotos)
  })

  return {lifeList: lldata, photoList: topPhotos}
}

function findPhoto(birdName, photoData) {
  let foundPhoto = null
  Object.keys(photoData).forEach((photoSpecies, pindex) => {
    if (!foundPhoto && nameMatch(birdName, photoSpecies)) {
      foundPhoto = photoData[photoSpecies]
    }
  })
  return foundPhoto
}

function nameMatch(birdName, photoName) {
  const match = (birdName.includes(photoName) || photoName.includes(birdName)) && !photoName.includes('ybrid') && !photoName.includes('/')
  return match
}
