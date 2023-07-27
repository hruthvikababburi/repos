// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepoItem} = props
  const {name, starsCount, issuesCount, forksCount, avatarUrl} = eachRepoItem
  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-icon-details-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repo-icon"
        />
        <p className="repo-icon-tag">{starsCount} stars</p>
      </div>
      <div className="repo-icon-details-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-icon"
        />
        <p className="repo-icon-tag">{forksCount} forks</p>
      </div>
      <div className="repo-icon-details-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repo-icon"
        />
        <p className="repo-icon-tag">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
