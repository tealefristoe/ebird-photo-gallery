import Head from 'next/head'
import styles from '../styles/layout.module.css'
import Layout from '../components/layout'
import Options from '../components/options'
import SpeciesRow from '../components/speciesrow'
import {bk, allowedDisplays, allowedQualities, allowedPhotoPreferences, allowedLayouts} from '../lib/constants'
import {morePhotosUrl} from '../lib/api'
import {getPhoto} from '../lib/photo'
import {getData} from '../lib/data'
import {getDatabase} from '../lib/database'
import {replaceSpaces, escapeSpaces} from '../lib/web'
import axios from 'axios'

const savedPreferencesKey = 'ebird-photo-gallery-preferences'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      lifeList: props.lifeList,
      curatedList: {},
      quality: props.quality,
      layout: props.layout,
      display: props.display,
      photoPreference: props.photoPreference,
    }
    this.savedPreferences = {}
  }

  componentDidMount() {
    // Get curated list
    getDatabase().ref('/curated/' + this.state.user).once('value').then(
      snapshot => {
        this.setState({curatedList: snapshot.val() ? snapshot.val() : {}})
      }
    )

    // After initial page load we need to get the rest of the user's bird list
    this.loadBirds()

    // Load locally saved preferences
    const savedPreferencesString = window.localStorage.getItem(savedPreferencesKey)
    if (savedPreferencesString) {
      this.savedPreferences = JSON.parse(savedPreferencesString)
    } else {
      this.savedPreferences = {}
    }
    let newState = {}
    const prefKeys = Object.keys(this.savedPreferences)
    for (let i = 0; i < prefKeys.length; i++) {
      let k = prefKeys[i]
      // If we're allowed to override, do so with the saved preference
      if (loadLocalKey(k) in this.props && this.props[loadLocalKey(k)]) {
        newState[k] = this.savedPreferences[k]
      // Otherwise save the new preference
      } else {
        this.savedPreferences[k] = this.props[k]
      }
    }
    this.setState(newState)
    localStorage.setItem(savedPreferencesKey, JSON.stringify(this.savedPreferences))
  }

  // Updates a preference in state and saves it locally
  updatePreference(k, v) {
    this.setState({[k]: v})
    this.savedPreferences[k] = v
    localStorage.setItem(savedPreferencesKey, JSON.stringify(this.savedPreferences))
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
    // Process the life list to determine which photo to display
    let processedList = []
    lifeList.forEach(speciesData => processedList.push(getPhoto(speciesData, this.state.quality, this.state.photoPreference, this.state.curatedList)))

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
              processedList={processedList}
              display={this.state.display}
              displayFunction={d => this.updatePreference('display', d)}
              layout={this.state.layout}
              layoutFunction={l => this.updatePreference('layout', l)}
              quality={this.state.quality}
              qualityFunction={num => this.updatePreference('quality', num)}
              photoPreference={this.state.photoPreference}
              photoPreferenceFunction={pref => this.updatePreference('photoPreference', pref)}
            />
            <div className={this.state.layout == 'list' ? styles.listContainer : this.state.layout == 'grid' ? styles.gridContainer : styles.listContainer}>
              {processedList.map(photoData => {
                return (<SpeciesRow
                  user={this.state.user}
                  key={photoData.speciesData[bk.lifeBirdName]}
                  display={this.state.display}
                  layout={this.state.layout}
                  photoData={photoData}
                />)
              })}
            </div>
          </Layout>
        </main>

      </div>
    )
  }
}

// A prop to determine if local saved preferences should override props
// Preferences specified as queries in the url should not be overridden
let loadLocalKey = prop => prop + 'LoadLocal'

export async function getServerSideProps(context) {
  // Set queried props or use defaults and allow overriding with locally saved preferences
  let props = {}
  if ('user' in context.query) {
    props.user = replaceSpaces(context.query.user)
    props[loadLocalKey('user')] = false
  } else {
    props.user = 'Teale Fristoe'
    props[loadLocalKey('user')] = true
  }
  // k is key, a is allowed values, d is default value
  let setProp = (k, a, d) => {
    if (k in context.query && a.includes(context.query[k])) {
      props[k] = context.query[k]
      props[loadLocalKey(k)] = false
    } else {
      props[k] = d
      props[loadLocalKey(k)] = true
    }
  }
  setProp('quality', allowedQualities, '1')
  setProp('display', allowedDisplays, 'all')
  setProp('layout', allowedLayouts, 'list')
  setProp('photoPreference', allowedPhotoPreferences, 'curated')
  let data = getData(props.user, 0)
  props.totalCount = data.totalCount
  props.lifeList = data.lifeList
  return {
    props
  }
}
