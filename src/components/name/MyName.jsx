import React from 'react'
import styles from './MyName.module.scss'

const Name = ({name}) => {
  return (
    <div className={styles.name}>
        {name}
    </div>
  )
}

export default Name