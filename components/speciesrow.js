import Link from 'next/link'
import HiddenDescription from './hiddenDescription'
import speciesRowStyles from '../styles/speciesrow.module.css'
import {photoRatingDisplay, photoDateLocationDisplay, photoDateLocationWideDisplay, photoLinksDisplay} from '../lib/photo'
import {bk, imageUrl1, imageUrl2} from '../lib/constants'
import {escapeSpaces, spacer, displayTypeLabel} from '../lib/web'

export default class SpeciesRow extends React.Component {
  curatedLink(photoData) {
    return (
      <Link href={'/species?user=' + escapeSpaces(this.props.user) + '&bird=' + escapeSpaces(photoData.speciesData[bk.lifeBirdName])}>
        <a target="_blank">{photoData.speciesData.photos.length + ' photo' + (photoData.speciesData.photos.length != 1 ? 's' : '')}</a>
      </Link>
    )
  }

  displayPhoto(photoData, photo) {
    return photoData.display
      ? (<a href={photo[bk.photoSpecimenUrl]} target="_blank"><img src={imageUrl1 + photo[bk.photoId] + imageUrl2} style={{width: '320px'}} /></a>)
      : photoData.reason == "noPhoto"
      ? <span className={speciesRowStyles.missing}>No photo submitted</span>
      : photoData.reason == "noCurated"
      ? <span className={speciesRowStyles.lowQuality}>No curated photo</span>
      : photoData.reason == "lowQuality"
      ? <span className={speciesRowStyles.lowQuality}>Community rating too low</span>
      : <span className={speciesRowStyles.missing}>Cannot display photo for unknown reason</span>
  }

  render () {
    const photoData = this.props.photoData
    const birdName = photoData.speciesData[bk.lifeBirdName]
    const photo = photoData.displayPhoto
    if (this.props.display == 'all'
      || (this.props.display == 'photos' && photoData.display)
      || (this.props.display == 'without' && !photoData.display)) {
      if (this.props.layout == 'list') {
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
                  {this.curatedLink(photoData)}
                  {spacer()}
                  {displayTypeLabel(photoData.displayType)}
                  {spacer()}
                  {photoLinksDisplay(photo)}
                </div>)
              : <div className={speciesRowStyles.photoInfo1} />}
            {photo
              ? (<div className={speciesRowStyles.photoInfo2}>
                  {photoRatingDisplay(photo)}
                  {spacer()}
                  {photoDateLocationWideDisplay(photo)}
                  </div>)
              : <div className={speciesRowStyles.photoInfo2} />}
            <div className={speciesRowStyles.photo}>
              {this.displayPhoto(photoData, photo)}
            </div>
          </div>
        )
      } else if (this.props.layout == 'grid') {
        return (
          <div className={speciesRowStyles.speciesRowGrid}>
            <div className={speciesRowStyles.speciesHeader}>
              {photo
                ? (<div>
                    <span className={speciesRowStyles.speciesNameGrid}><a href={photo[bk.photoSpeciesUrl]}>{birdName}</a></span>
                  </div>)
                : <div className={`${speciesRowStyles.speciesNameGrid} ${speciesRowStyles.missing}`}>{birdName}</div>}
            </div>
            <div className={speciesRowStyles.curatedLink}>
              {photo ? this.curatedLink(photoData) : ''}
            </div>
          <div className={speciesRowStyles.photoGrid}>
            {this.displayPhoto(photoData, photo)}
          </div>
            {photo
              ? (<div className={speciesRowStyles.photoInfoGrid}>
                  <div>{displayTypeLabel(photoData.displayType)}</div>
                  {photoRatingDisplay(photo)}
                  <div style={{height: '1em'}} />
                  {photoDateLocationDisplay(photo)}
                  <div style={{height: '1em'}} />
                  {photoLinksDisplay(photo)}
                </div>)
              : <div className={speciesRowStyles.photoInfoGrid} />}
          </div>
        )
      } else if (this.props.layout == 'compact') {
        return (
          <div className={speciesRowStyles.speciesRowCompact}>
            <div className={speciesRowStyles.speciesHeader}>
              {photo
                ? (<div>
                    <span className={speciesRowStyles.speciesNameGrid}><a href={photo[bk.photoSpeciesUrl]}>{birdName}</a></span>
                  </div>)
                : <div className={`${speciesRowStyles.speciesNameGrid} ${speciesRowStyles.missing}`}>{birdName}</div>}
            </div>
            <div className={speciesRowStyles.other}>
              <div className={speciesRowStyles.photoCompact}>
                {this.displayPhoto(photoData, photo)}
              </div>
              {photo
                ? (<div className={speciesRowStyles.photoInfoCompact}>
                    <HiddenDescription displayType={photoData.displayType} photo={photo} />
                  </div>)
                : <div className={speciesRowStyles.photoInfoGrid} />}
            </div>
          </div>
        )
      // Unknown layout
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
}
