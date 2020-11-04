import Head from 'next/head'
import Layout from '../components/layout'
import Options from '../components/options'
import SpeciesRow from '../components/speciesrow'
import {bk} from '../lib/constants'
import {getData} from '../lib/data'
import {replaceSpaces, escapeSpaces} from '../lib/web'
import axios from 'axios'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      lifeList: props.lifeList,
      quality: 1,
      display: 'all',
    }
  }

  componentDidMount() {
    // After initial page load we need to get the rest of the user's bird list
    this.loadBirds()
  }

  // Loads a "page" of birds then repeats if not all birds have been loaded yet
  loadBirds() {
    if (this.state.lifeList.length < this.props.totalCount) {
      let url = `http://localhost:3000/api/morePhotos?user=${escapeSpaces(this.state.user)}&startingIndex=${this.state.lifeList.length}`
      url = `https://ebird-photo-gallery.vercel.app/api/morePhotos?user=${escapeSpaces(this.state.user)}&startingIndex=${this.state.lifeList.length}`

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
            />
            <div>
              {lifeList.map(bird => {
                return (<SpeciesRow
                  key={bird[bk.lifeBirdName]}
                  display={this.state.display}
                  quality={this.state.quality}
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
  let props = {user: 'user' in context.query ? replaceSpaces(context.query.user) : 'Teale Fristoe'}
  let data = getData(props.user, 0)
  props.totalCount = data.totalCount
  props.lifeList = data.lifeList
  return {
    props
  }
}
