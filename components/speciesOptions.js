import Link from 'next/link'
import optionsStyles from '../styles/options.module.css'
import {displayOverlayButton} from '../components/overlay'
import {escapeSpaces} from '../lib/web'

export default class Options extends React.Component {
  render () {
    return (
      <div>
        <div id={optionsStyles.topOptionsBar}>
          <div id={optionsStyles.topOptions}>
            <Link href={'/?user=' + escapeSpaces(this.props.user)}>
              <a><svg height="18" width="18">
                <polygon points="3,12 15,6 15,18"
                  style={{fill:"rgb(95, 223, 255)"}} />
              </svg> Back to eBird Photo Gallery</a>
            </Link>
          </div>
        </div>
        <div id={optionsStyles.topTitleBar}>
          <div id={optionsStyles.topTitle}>
            <span className={optionsStyles.headingMain}>{this.props.user} </span>
            <span className={optionsStyles.headingMain} style={{fontWeight: "normal"}}>{this.props.bird} Photos</span>
          </div>
        </div>
        <div id={optionsStyles.secondOptionsBar}>
          <div id={optionsStyles.secondOptions}>
            {this.props.curated
              ? <span onClick={() => this.props.clearCuratedPreference()} className={optionsStyles.optionButton}>Clear curated photo.</span>
              : <span>Click a photo to make it the curated photo. {displayOverlayButton()}</span>}
          </div>
        </div>
      </div>
    )
  }
}
