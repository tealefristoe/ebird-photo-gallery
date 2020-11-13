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
