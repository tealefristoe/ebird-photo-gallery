import overlayStyles from '../styles/overlay.module.css'
import {spacer} from '../lib/web'

export class Overlay extends React.Component {
  render () {
    return (
      <div id={overlayStyles.overlay} onClick={() => document.getElementById(overlayStyles.overlay).style.display = "none"}>
        <div className={overlayStyles.overlayBox}>
          <div>
            <div className={overlayStyles.header}>Curated Photos</div>
            {spacer()}
            <div>Curated photos allow you to display any photo you want in your photo gallery.</div>
            {spacer()}
            <div>To select a curated photo:</div>
            <div>1. Click on the # photos link for a species.</div>
            <div>2. Click on any photo on the species page.</div>
            <div>You're done! Reload your photo gallery to see the curated photo instead of the top rated photo.</div>
            {spacer()}
          </div>
        </div>
      </div>
    )
  }
}

export function displayOverlayButton() {
  return (
    <span class={overlayStyles.displayOverlayButton} onClick={() => document.getElementById(overlayStyles.overlay).style.display = "block"}>
      ?
    </span>
  )
}
