// Functions for processing and displaying photos and related information

import {bk} from './constants'

export function photoRatingDisplay(photoData) {
  if (photoData) {
    return (
      <span>
        <div>{'Community rating: ' + Number(Math.round(Number(photoData[bk.photoRating])+'e2')+'e-2')}</div>
        <div>{photoData[bk.photoRatingCount] + ' rating' + (photoData[bk.photoRatingCount] != 1 ? 's' : '')}</div>
      </span>
    )
  }
  return <span>No photo data</span>
}

export function photoDateLocationDisplay(photoData) {
  if (photoData) {
    const county = photoData[bk.photoCounty]
    return (
      <div>
        <div>{photoData[bk.photoLocality]}</div>
        <div>{county}{county && county != '' ? ', ' : ''}{photoData[bk.photoState]}, {photoData[bk.photoCountry]}</div>
        <div><a href={photoData[bk.photoChecklistUrl]}>{photoData[bk.photoDate]}</a></div>
      </div>
    )
  }
  return <span>No photo data</span>
}

// Returns an object with photo information
// topPhoto is the top rated photo
// curatedPhoto is the curated photo
// displayPhoto is the photo to display between the above two
// display is true if the photo shold be displayed
// reason is a string explaining why a photo sholdn't be displayed
export function getPhoto(speciesData, minQuality, photoPreference, curatedList) {
  let photoInfo = {speciesData, topPhoto: null, curatedPhoto: null, displayPhoto: null, display: true, reason: null}
  const birdName = speciesData[bk.lifeBirdName]

  // Find the top rated photo
  if (speciesData.photos.length > 0) {
    photoInfo.topPhoto = speciesData.photos[0]
  // Fail if there are no photos
  } else {
    photoInfo.display = false
    photoInfo.reason = 'noPhoto'
    return photoInfo
  }

  // Find the curated photo
  if (birdName in curatedList) {
    for (let i = 0; i < speciesData.photos.length; i++) {
      if (speciesData.photos[i][bk.photoId] == curatedList[birdName]) {
        photoInfo.curatedPhoto = speciesData.photos[i]
      }
    }
  }

  // Determine which photo to display
  if (['curatedOnly', 'curated'].includes(photoPreference) && photoInfo.curatedPhoto) {
    photoInfo.displayPhoto = photoInfo.curatedPhoto
  } else {
    photoInfo.displayPhoto = photoInfo.topPhoto
  }

  // Fail if there is no curated photo and only curated photos are being displayed
  if (photoPreference == 'curatedOnly' && !photoInfo.curatedPhoto) {
    photoInfo.display = false
    photoInfo.reason = 'noCurated'
    return photoInfo
  }

  // Fail if the display photo doesn't meet quality standards
  if (minQuality > 1 && photoInfo.displayPhoto[bk.photoRating] < minQuality - .5) {
    photoInfo.display = false
    photoInfo.reason = 'lowQuality'
    return photoInfo
  }

  // We're done!
  return photoInfo
}
