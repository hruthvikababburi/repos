import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const pageStatusData = {
  initial: 'INITIAL',
  isLoading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    status: pageStatusData.initial,
    languagePara: languageFiltersData[0].id,
    repositoriesList: [],
  }

  componentDidMount() {
    this.getListData()
  }

  changeLanguageBtn = id => {
    this.setState({
      languagePara: id,
    })
    this.getListData()
  }

  getListData = async () => {
    this.setState({
      status: pageStatusData.isLoading,
    })
    const {languagePara} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${languagePara}`
    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const list = await response.json()
      console.log(list)

      const updatedList = list.popular_repos.map(each => ({
        id: each.id,
        avatarUrl: each.avatar_url,
        name: each.name,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
      }))

      this.setState({
        repositoriesList: updatedList,
        status: pageStatusData.success,
      })
    } else {
      this.setState({
        status: pageStatusData.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {repositoriesList} = this.state
    return (
      <ul className="repo-items-list">
        {repositoriesList.map(each => (
          <RepositoryItem eachRepoItem={each} key={each.name} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="failure-view-img"
    />
  )

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case pageStatusData.success:
        return this.renderSuccessView()
      case pageStatusData.failure:
        return this.renderFailureView()
      case pageStatusData.isLoading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {status, languagePara} = this.state
    console.log(status)
    return (
      <div className="main-page">
        <h1 className="page-heading">Popular</h1>
        <ul className="lang-filter-items-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              eachLanguageFilterItem={each}
              key={each.id}
              changeLanguageBtn={this.changeLanguageBtn}
              activeFilter={languagePara}
            />
          ))}
        </ul>
        {this.renderOutput()}
      </div>
    )
  }
}

export default GithubPopularRepos
