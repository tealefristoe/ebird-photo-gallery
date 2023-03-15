
// Keys used for life and photo lists
export const bk = {
  lifeBirdName: 'Common Name',
  photoBirdName: 'Common Name',
  photoScientificName: 'Scientific Name',
  photoId: 'ML Catalog Number',
  photoRating: 'Average Community Rating',
  photoRatingCount: 'Number of Ratings',
  photoDate: 'Date',
  photoCountry: 'Country',
  photoState: 'State',
  photoCounty: 'County',
  photoLocality: 'Locality',
  photoChecklistId: 'eBird Checklist ID',
  photoSpeciesCode: 'eBird Species Code',
}

// Fields to save when processing photo data
export const savedPhotoData = [
  bk.photoBirdName,
  bk.photoScientificName,
  bk.photoId,
  bk.photoRating,
  bk.photoRatingCount,
  bk.photoDate,
  bk.photoCountry,
  bk.photoState,
  bk.photoCounty,
  bk.photoLocality,
  bk.photoChecklistId,
  bk.photoSpeciesCode,
]

// Url pieces for displaying a photo. The photo id shold go between these two pieces
export const imageUrl1 = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'
export const imageUrl2 = '/320'

// Functions for generating urls to reach cornell pages related to a photo
export const checklistUrl = id => "https://ebird.org/checklist/" + id
export const speciesUrl = code => "https://ebird.org/species/" + code
// Pass photoData.photoId to specimenUrl()
export const specimenUrl = id => "https://macaulaylibrary.org/asset/" + id

// Allowed display options
export const allowedDisplays = [
  'all',
  'photos',
  'without',
]

// Allowed photo qualities
export const allowedQualities = ['1','2','3','4','5']

// Allowed layouts
export const allowedLayouts = ['list', 'grid', 'compact']

// Allowed photo preferences
export const allowedPhotoPreferences = ['curatedOnly', 'curated', 'topRated']
