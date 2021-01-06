import optionsStyles from '../styles/options.module.css'
import {displayOverlayButton} from '../components/overlay'
import _ from 'underscore'

export default class Options extends React.Component {
  render () {
    let counts = this.props.processedList
      ? _.countBy(this.props.processedList, birdData => birdData.display ? 'withPhotos' : 'withoutPhotos')
      : {withPhotos: 0, withoutPhotos: 0}
    return (
      <div>
        <div id={optionsStyles.topOptionsBar}>
          <div id={optionsStyles.topOptions}>
            <span className={optionsStyles.disabled} style={{paddingRight: "5px", fontSize: "80%"}}>LIST:</span>
            <span className={optionsStyles.topOption}>
              <span className={optionsStyles.disabled}>World</span>
              {dropDown()}
            </span>
            <span className={optionsStyles.topOption}>
              <span className={optionsStyles.disabled}>All years</span>
              {dropDown()}
            </span>
            <span className={optionsStyles.disabled} style={{paddingLeft: "15px", fontStyle: "italic"}}>These options available soon!</span>
          </div>
        </div>
        <div id={optionsStyles.topTitleBar}>
          <div id={optionsStyles.topTitle}>
            <span className={optionsStyles.headingMain}>{this.props.user} </span>
            <span className={optionsStyles.headingMain} style={{fontWeight: "normal"}}>eBird Photo Gallery</span>
          </div>
        </div>
        <div id={optionsStyles.secondOptionsBar}>
          <div id={optionsStyles.secondOptions}>
            <div id={optionsStyles.speciesCountDisplay}>
              <div className={optionsStyles.speciesCount}>
                <span className={this.props.display == 'all' ? optionsStyles.selected : null} onClick={() => this.props.displayFunction('all')}>
                  {this.props.processedList.length < this.props.totalCount ? (<span>{String(this.props.processedList.length) + '/'}</span>) : ''}
                  {this.props.totalCount}{' '}
                <span className={optionsStyles.subSpeciesCount}>Species observed</span></span>
              </div>
              <div className={optionsStyles.speciesCount}>
                <span className={this.props.display == 'photos' ? optionsStyles.selected : null} onClick={() => this.props.displayFunction('photos')}>{counts['withPhotos'] || '0'} <span className={optionsStyles.subSpeciesCount}>Species with photos</span></span>
              </div>
              <div className={optionsStyles.speciesCount}>
                <span className={this.props.display == 'without' ? optionsStyles.selected : null} onClick={() => this.props.displayFunction('without')}>{counts['withoutPhotos'] || '0'} <span className={optionsStyles.subSpeciesCount}>Species missing photos</span></span>
              </div>
            </div>
            <div id={optionsStyles.optionsBox}>
              <div id={optionsStyles.optionsQuality}>
                <div>Minimum quality</div>
                <div>{[1,2,3,4,5].map(num =>
                  <a onClick={() => this.props.qualityFunction(num)} key={num} style={{cursor: "pointer"}}>
                    <svg height="20" width="20">
                      <polygon points="10,2 16,20 1,9 19,9 4,20"
                        style={num <= this.props.quality ? {fill:"#408f00"}: {fill:"#999999"}} />
                    </svg>
                  </a>
                )}
                </div>
              </div>
              <div>
                <div>Layout</div>
                {bulletOption('List', this.props.layout == 'list', () => this.props.layoutFunction('list'))}
                {bulletOption('Two Columns', this.props.layout == 'grid', () => this.props.layoutFunction('grid'))}
                {bulletOption('Grid', this.props.layout == 'compact', () => this.props.layoutFunction('compact'))}
              </div>
              <div>
                <div>Photo preference {displayOverlayButton()}</div>
                {bulletOption('Curated Only', this.props.photoPreference == 'curatedOnly', () => this.props.photoPreferenceFunction('curatedOnly'))}
                {bulletOption('Curated Preferred', this.props.photoPreference == 'curated', () => this.props.photoPreferenceFunction('curated'))}
                {bulletOption('Top Rated', this.props.photoPreference == 'topRated', () => this.props.photoPreferenceFunction('topRated'))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function bulletOption(label, selected, clickFunction) {
  return (<div
    style={{fontWeight: 'normal', cursor: "pointer"}}
    onClick={clickFunction}>{selected ?
      <svg height="16" width="16">
        <circle cx="8" cy="8" r="8" fill="#cccccc" />
        <circle cx="8" cy="8" r="5" fill="#408f00" />
      </svg> :
      <svg height="16" width="16">
        <circle cx="8" cy="8" r="8" fill="#cccccc" />
      </svg>} {label}
    </div>)
}

function dropDown() {
  return (<svg height="18" width="20">
    <polygon points="10,10 20,10 15,15"
      style={{fill:"#aaaaaa"}} />
  </svg>)
}
