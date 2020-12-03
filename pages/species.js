import Head from 'next/head'
import speciesPageStyles from '../styles/speciesPage.module.css'
import SpeciesOptions from '../components/speciesOptions'
import Layout from '../components/layout'
import {bk, imageUrl1, imageUrl2} from '../lib/constants'
import {getBirdPhotos} from '../lib/data'
import {getDatabase} from '../lib/database'
import {replaceSpaces, escapeSpaces, curatedLabel, topRatedLabel} from '../lib/web'
import {photoRatingDisplay, photoDateLocationDisplay, photoLinksDisplay} from '../lib/photo'

export default class SpeciesPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      curated: null
    }
  }

  getDatabaseReference() {
    return getDatabase().ref('/curated/' + this.props.user + '/' + this.props.bird)
  }

  componentDidMount() {
    // Get curated photo
    this.getDatabaseReference().once('value').then(
      snapshot => {
        this.setState({curated: snapshot.val() ? snapshot.val() : null})
      }
    )
  }

  setCuratedPreference(photoId) {
    this.setState({curated: photoId})
    this.getDatabaseReference().set(photoId)
  }

  clearCuratedPreference() {
    this.setState({curated: null})
    this.getDatabaseReference().remove()
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>eBird Photo Gallery: {this.props.bird} Photos</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Layout>
            <SpeciesOptions
              user={this.props.user}
              bird={this.props.bird}
              curated={this.state.curated}
              clearCuratedPreference={() => this.clearCuratedPreference()}
            />
            <div className={speciesPageStyles.photoGrid}>
              {this.props.photos.map(photo => {
                return (
                  <div
                      key={photo[bk.photoId]}
                      className={this.state.curated == photo[bk.photoId] ? speciesPageStyles.photoContainerCurated : speciesPageStyles.photoContainer}
                    >
                    <img src={imageUrl1 + photo[bk.photoId] + imageUrl2} style={{width: '320px'}} onClick={() => this.setCuratedPreference(photo[bk.photoId])} />
                    {this.props.photos[0] == photo ? <div>{topRatedLabel()}</div> : ''}
                    {this.state.curated && this.state.curated == photo[bk.photoId] ? <div>{curatedLabel()}</div> : ''}
                    {photoRatingDisplay(photo)}
                    {photoLinksDisplay(photo)}
                  </div>
                )
              })}
            </div>
          </Layout>
        </main>

      </div>
    )
  }
}

export async function getServerSideProps(context) {
  let props = {
    user: 'user' in context.query ? replaceSpaces(context.query.user) : 'Teale Fristoe',
    bird: 'bird' in context.query ? replaceSpaces(context.query.bird) : "Townsend's Warbler",
  }
  props.photos = getBirdPhotos(props.user, props.bird)
  return {
    props
  }
}
