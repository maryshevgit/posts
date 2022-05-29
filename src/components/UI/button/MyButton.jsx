import React from 'react'
import styles from './MyButton.module.scss'

const MyButton = (props) => {
  return (
    <button {...props} className={styles.btn}>
        {props.children}
    </button>
  )
}

export default MyButton