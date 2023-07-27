// Write your code here
import {Component} from 'react'

import './index.css'

class LanguageFilterItem extends Component {
  render() {
    const {eachLanguageFilterItem, changeLanguageBtn, activeFilter} = this.props

    const {language, id} = eachLanguageFilterItem
    const onClickLanguageFilterBtn = () => {
      changeLanguageBtn(id)
    }

    const styling =
      activeFilter === id
        ? 'active-lang-filter-item-btn'
        : 'lang-filter-item-btn'

    return (
      <li className="lang-filter-item">
        <button
          type="button"
          className={styling}
          onClick={onClickLanguageFilterBtn}
        >
          {language}
        </button>
      </li>
    )
  }
}
export default LanguageFilterItem
