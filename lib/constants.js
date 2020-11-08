
// Keys used for life and photo lists
export const bk = {
  lifeBirdName: 'Species',
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
  photoProfileUrl: 'Contributor Profile URL',
  photoChecklistUrl: 'eBird Checklist URL',
  photoSpeciesUrl: 'ebird Species URL',
  photoSpecimenUrl: 'Specimen Page URL',
}

// Url pieces for displaying a photo. The photo id shold go between these two pieces
export const imageUrl1 = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'
export const imageUrl2 = '/320'

// Allowed display options
export const allowedDisplays = [
  'all',
  'photos',
  'without',
]

// Allowed photo qualities
export const allowedQualities = [1,2,3,4,5]
