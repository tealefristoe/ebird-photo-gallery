import Head from 'next/head'
import speciesPageStyles from '../styles/speciesPage.module.css'
import SpeciesOptions from '../components/speciesOptions'
import Layout from '../components/layout'
import {bk, imageUrl1, imageUrl2} from '../lib/constants'
import {getBirdPhotos} from '../lib/data'
import {replaceSpaces, escapeSpaces} from '../lib/web'
import {photoRatingDisplay, photoDateLocationDisplay} from '../lib/photo'

export default class SpeciesPage extends React.Component {
  constructor(props) {
    super(props)
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
            />
            <div className={speciesPageStyles.photoGrid}>
              {this.props.photos.map(photo => {
                return (
                  <div className={speciesPageStyles.photoContainer}>
                    <img src={imageUrl1 + photo[bk.photoId] + imageUrl2} style={{width: '320px'}} />
                    {photoRatingDisplay(photo)}
                    {photoDateLocationDisplay(photo)}
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
