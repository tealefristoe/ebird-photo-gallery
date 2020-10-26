import {bk} from './constants'

export function testQuality(minQuality, photoData) {
  if (!photoData) {
    return false
  }

  return minQuality == 1
    ? true
    : photoData[bk.photoRating] > minQuality - 1
}
