import optionsStyles from '../styles/options.module.css'
import {testQuality} from '../lib/quality'
import _ from 'underscore'

export default class Options extends React.Component {
  render () {
    let counts = _.countBy(this.props.lifeList, bird => testQuality(this.props.quality, bird.photo) ? 'withPhotos' : 'withoutPhotos')
    return (
      <div>
        <div id={optionsStyles.topOptionsBar}>
          <div id={optionsStyles.topOptions}>
            <span className={optionsStyles.disabled} style={{paddingRight: "5px", fontSize: "80%"}}>LIST:</span>
            <span className={optionsStyles.topOption}>
              <span className={optionsStyles.disabled}>{this.props.user}</span>
              {dropDown()}
            </span>
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
                <span className={this.props.display == 'all' ? optionsStyles.selected : null} onClick={() => this.props.displayFunction('all')}>{this.props.lifeList.length} <span className={optionsStyles.subSpeciesCount}>Species observed</span></span>
              </div>
              <div className={optionsStyles.speciesCount}>
                <span className={this.props.display == 'photos' ? optionsStyles.selected : null} onClick={() => this.props.displayFunction('photos')}>{counts['withPhotos']} <span className={optionsStyles.subSpeciesCount}>Species with photos</span></span>
              </div>
              <div className={optionsStyles.speciesCount}>
                <span className={this.props.display == 'without' ? optionsStyles.selected : null} onClick={() => this.props.displayFunction('without')}>{counts['withoutPhotos']} <span className={optionsStyles.subSpeciesCount}>Species missing photos</span></span>
              </div>
            </div>
            <div id={optionsStyles.optionsBox}>
              <div id={optionsStyles.optionsQuality}>
                Minimum quality: {[1,2,3,4,5].map(num =>
                  <a onClick={() => this.props.qualityFunction(num)} key={num} style={{cursor: "pointer"}}>
                    <svg height="20" width="20">
                      <polygon points="10,2 16,20 1,9 19,9 4,20"
                        style={num <= this.props.quality ? {fill:"#408f00"}: {fill:"#999999"}} />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function dropDown() {
  return (<svg height="18" width="20">
    <polygon points="10,10 20,10 15,15"
      style={{fill:"#aaaaaa"}} />
  </svg>)
}
