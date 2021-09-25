import React from 'react'

import styles from './Input.module.css'

export const Input = ({ ...rest }) => {
  return <input className={styles.Input} {...rest} />
}
