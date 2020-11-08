import Link from 'next/link'
import speciesRowStyles from '../styles/speciesrow.module.css'
import {photoRatingDisplay, photoDateLocationDisplay} from '../lib/photo'
import {bk, imageUrl1, imageUrl2} from '../lib/constants'
import {testQuality} from '../lib/quality'
import {escapeSpaces} from '../lib/web'

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
          {photo
            ? (<div className={speciesRowStyles.photoInfo1}>
                <Link href={'/species?user=' + escapeSpaces(this.props.user) + '&bird=' + escapeSpaces(birdName)}>
                  <a>{this.props.species.photos.length + ' photo' + (this.props.species.photos.length != 1 ? 's' : '')}</a>
                </Link>
                {photoRatingDisplay(photo)}
              </div>)
            : <div className={speciesRowStyles.photoInfo1} />}
          {photo
            ? (<div className={speciesRowStyles.photoInfo2}>
                {photoDateLocationDisplay(photo)}
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
