import Head from 'next/head'
import styles from '../styles/layout.module.css'
import Layout from '../components/layout'
import Options from '../components/options'
import SpeciesRow from '../components/speciesrow'
import {bk, allowedDisplays, allowedQualities, allowedPhotoPreferences} from '../lib/constants'
import {morePhotosUrl} from '../lib/api'
import {getData} from '../lib/data'
import {replaceSpaces, escapeSpaces} from '../lib/web'
import axios from 'axios'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      lifeList: props.lifeList,
      quality: props.quality,
      display: props.display,
      photoPreference: props.photoPreference,
    }
  }

  componentDidMount() {
    // After initial page load we need to get the rest of the user's bird list
    this.loadBirds()
  }

  // Loads a "page" of birds then repeats if not all birds have been loaded yet
  loadBirds() {
    if (this.state.lifeList.length < this.props.totalCount) {
      const url = morePhotosUrl(this.state.user, this.state.lifeList.length)

      // Request the next page of birds
      axios.get(url)
        .then(result => {
          // Add the newly fetched birds to the list list
          let newList = this.state.lifeList.concat(result.data.lifeList)
          this.setState({lifeList: newList})
          // Repeat if we don't have all birds yet
          if (newList.length < this.props.totalCount) {
            this.loadBirds()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    let totalCount = this.props.totalCount
    let lifeList = this.state.lifeList
    return (
      <div className="container">
        <Head>
          <title>eBird Photo Gallery</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Layout>
            <Options
              user={this.state.user}
              totalCount={totalCount}
              lifeList={lifeList}
              display={this.state.display}
              displayFunction={d => this.setState({display: d})}
              quality={this.state.quality}
              qualityFunction={num => this.setState({quality: num})}
              photoPreference={this.state.photoPreference}
              photoPreferenceFunction={pref => this.setState({photoPreference: pref})}
            />
            <div>
              {lifeList.map(bird => {
                return (<SpeciesRow
                  user={this.state.user}
                  key={bird[bk.lifeBirdName]}
                  display={this.state.display}
                  quality={this.state.quality}
                  photoPreference={this.state.photoPreference}
                  species={bird}
                />)
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
  }
  // k is key, a is allowed values, d is default value
  let setProp = (k, a, d) => {
    props[k] = k in context.query && a.includes(context.query[k]) ? context.query[k] : d
  }
  setProp('quality', allowedQualities, '1')
  setProp('display', allowedDisplays, 'all')
  setProp('photoPreference', allowedPhotoPreferences, 'curated')
  let data = getData(props.user, 0)
  props.totalCount = data.totalCount
  props.lifeList = data.lifeList
  return {
    props
  }
}
