import Link from 'next/link'
import optionsStyles from '../styles/options.module.css'
import {escapeSpaces} from '../lib/web'

export default class Options extends React.Component {
  render () {
    return (
      <div>
        <div id={optionsStyles.topOptionsBar}>
          <div id={optionsStyles.topOptions}>
            <Link href={'/?user=' + escapeSpaces(this.props.user)}>
              <a>Back to eBird Photo Gallery</a>
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
            Click a photo to make it the curated photo.
          </div>
        </div>
      </div>
    )
  }
}
