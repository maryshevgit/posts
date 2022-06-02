import React from 'react'
import classNames from 'classnames'
import styles from '../../../App.module.scss'
import { getPagesArray } from '../../../utils/pages'

export const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
  return (
    <div style={{display:'flex'}}>
        {pagesArray.map(p => 
          <span 
            onClick={() => changePage(p)}
            key={p} 
            className={page === p ? classNames(styles.page, styles.page__current) : styles.page}
          >{p}</span>
        )}
    </div>
  )
}
