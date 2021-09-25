import React from 'react'

import styles from './Button.module.css'

export const Button = ({ value, ...rest }) => {
  return (
    <button className={styles.Button} {...rest}>
      {value}
    </button>
  )
}
