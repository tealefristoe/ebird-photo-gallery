import Head from 'next/head'
import Layout from '../components/layout'
import Options from '../components/options'
import SpeciesRow from '../components/speciesrow'
import {bk} from '../lib/constants'
import {getData} from '../lib/data'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "Teale Fristoe",
      quality: 1,
      display: 'all',
    }
  }

  render() {
    let data = this.props.data
    let lifeList = data.lists[this.state.user].lifeList
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
  const data = getData()
  return {
    props: {data}
  }
}
