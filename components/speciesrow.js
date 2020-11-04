import speciesRowStyles from '../styles/speciesrow.module.css'
import {bk} from '../lib/constants'
import {testQuality} from '../lib/quality'

const imageUrl1 = 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/'
const imageUrl2 = '/320'

export default class SpeciesRow extends React.Component {
  render () {
    const birdName = this.props.species[bk.lifeBirdName]
    let photo = this.props.species.photos.length > 0 ? this.props.species.photos[0] : null
    if (this.props.display == 'all'
      || (this.props.display == 'photos' && photo && testQuality(this.props.quality, photo))
      || (this.props.display == 'without' && !(photo && testQuality(this.props.quality, photo)))) {
      return (
        <div className={speciesRowStyles.speciesRow}>
          <div className={speciesRowStyles.speciesHeader}>
            {photo
              ? (<div>
                  <div className={speciesRowStyles.speciesName}><a href={photo[bk.photoSpeciesUrl]}>{birdName}</a></div>
                  <div className={speciesRowStyles.scientificName}>{photo[bk.photoScientificName]}</div>
                </div>)
              : <div className={`${speciesRowStyles.speciesName} ${speciesRowStyles.missing}`}>{birdName}</div>}
          </div>
          <div className={speciesRowStyles.photoInfo1}>
            <div>{photo ? 'Community rating: ' + Number(Math.round(Number(photo[bk.photoRating])+'e2')+'e-2') : ''}</div>
            <div>{photo ? photo[bk.photoRatingCount] + ' rating' + (photo[bk.photoRatingCount] != 1 ? 's' : '') : ''}</div>
          </div>
          {photo
            ? (<div className={speciesRowStyles.photoInfo2}>
                <div>{photo[bk.photoLocality]}</div>
                <div>{photo[bk.photoCounty]}, {photo[bk.photoState]}, {photo[bk.photoCountry]}</div>
                <div><a href={photo[bk.photoChecklistUrl]}>{photo[bk.photoDate]}</a></div>
                </div>)
            : <div className={speciesRowStyles.photoInfo2} />}
          <div className={speciesRowStyles.photo}>
            {!photo
              ? <span className={speciesRowStyles.missing}>Missing photo</span>
              : testQuality(this.props.quality, photo)
                ? (<a href={photo[bk.photoSpecimenUrl]}><img src={imageUrl1 + photo[bk.photoId] + imageUrl2} style={{width: '320px'}} /></a>)
                : <span className={speciesRowStyles.lowQuality}>Quality too low</span>
            }
          </div>
        </div>
      )
    } else {
      return <span />
    }
  }
}
