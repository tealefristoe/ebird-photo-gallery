import {photoRatingDisplay, photoDateLocationDisplay, photoDateLocationWideDisplay, photoLinksDisplay} from '../lib/photo'
import {spacer, halfSpacer, displayTypeLabel} from '../lib/web'

export default class HiddenDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    if (this.state.show) {
      return (<div>
        <div><a onClick={() => this.setState({show: false})} style={{cursor: "pointer"}}>
          <svg height="18" width="20">
            <polygon points="5,10 15,10 10,15"
              style={{fill:"currentColor"}} />
          </svg>
          Hide Photo Details
          </a></div>
        {halfSpacer()}
        <div>{displayTypeLabel(this.props.displayType)}</div>
        {photoRatingDisplay(this.props.photo)}
        {spacer()}
        {photoDateLocationWideDisplay(this.props.photo)}
        {spacer()}
        {photoLinksDisplay(this.props.photo)}
      </div>)
    } else {
      return (<div>
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
