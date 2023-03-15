
import styles from '../styles/layout.module.css'
import {photoRatingDisplay, photoDateLocationDisplay, photoDateLocationWideDisplay, photoLinksDisplay, curatedLink} from '../lib/photo'
import {spacer, halfSpacer, displayTypeLabel} from '../lib/web'

export default class HiddenDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    if (this.state.show || this.props.forceShow) {
      return (<div>
        <div className={styles.noSelect}>
          <a onClick={() => this.setState({show: false})} style={{cursor: "pointer"}}>
            <svg height="18" width="20">
              <polygon points="5,10 15,10 10,15"
                style={{fill:"currentColor"}} />
            </svg>
            Hide Photo Details
          </a>
        </div>
        {halfSpacer()}
        {this.props.photoData ? <div>{displayTypeLabel(this.props.photoData.displayType)}</div> : <div/>}
        {this.props.displayCuratedLink ? curatedLink(this.props.user, this.props.photoData) : ''}
        {this.props.displayCuratedLink ? spacer() : ''}
        {photoRatingDisplay(this.props.photo)}
        {spacer()}
        {photoDateLocationWideDisplay(this.props.photo)}
        {spacer()}
        {photoLinksDisplay(this.props.photo)}
      </div>)
    } else {
      return (<div className={styles.noSelect}>
        <a onClick={() => this.setState({show: true})} style={{cursor: "pointer"}}>
          <svg height="18" width="20">
            <polygon points="10,7 10,17 15,12"
              style={{fill:"currentColor"}} />
          </svg>
          Show Photo Details
          </a>
      </div>)
    }
  }
}
