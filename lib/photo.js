// Functions for processing and displaying photos and related information

import {bk} from './constants'

// Functions for displaying photo information

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
  return photoDateLocationDisplayGeneric(photoData, false)
}

export function photoDateLocationWideDisplay(photoData) {
  return photoDateLocationDisplayGeneric(photoData, true)
}

function photoDateLocationDisplayGeneric(photoData, wide) {
  if (photoData) {
    return (
      <div>
        <div>{photoData[bk.photoLocality]}</div>
        {wide ?
          <div>{countyStateCountry(photoData)}</div> :
          <span><div>{countyState(photoData)}</div>
          <div>{photoData[bk.photoCountry]}</div></span>}
        <div>{photoData[bk.photoDate]}</div>
      </div>
    )
  }
  return <span>No photo data</span>
}

export function photoLinksDisplay(photoData) {
  if (photoData) {
    return (
      <div>
        <div>{photoData[bk.photoDate] || photoData[bk.photoLocality] || photoData[bk.photoChecklistUrl] ?
          <a href={photoData[bk.photoChecklistUrl]} target="_blank">eBird Checklist</a> :
          <a href="https://support.ebird.org/en/support/solutions/articles/48000803210-sensitive-species-in-ebird" target="_blank">Sensitive Species</a>
        }</div>
        <div><a href={photoData[bk.photoSpecimenUrl]} target="_blank">Macaulay Library</a></div>
      </div>
    )
  }
  return <span>No photo data</span>
}

function countyState(photoData) {
  const county = photoData[bk.photoCounty]
  return county + (county && county != '' ? ', ' : '') + photoData[bk.photoState]
}

function countyStateCountry(photoData) {
  return countyState(photoData) + ', ' + photoData[bk.photoCountry]
}

// Returns an object with photo information
// topPhoto is the top rated photo
// curatedPhoto is the curated photo
// displayPhoto is the photo to display between the above two
// display is true if the photo shold be displayed
// displayType is the type of photo being displayed (curated or topRated)
// reason is a string explaining why a photo sholdn't be displayed
export function getPhoto(speciesData, minQuality, photoPreference, curatedList) {
  let photoInfo = {
    speciesData,
    topPhoto: null,
    curatedPhoto: null,
    displayPhoto: null,
    display: true,
    displayType: '',
    reason: null,
  }
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
    photoInfo.displayType = 'curated'
  } else {
    photoInfo.displayPhoto = photoInfo.topPhoto
    photoInfo.displayType = 'topRated'
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
