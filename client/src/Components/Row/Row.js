import React from 'react'

import styles from './Row.module.css'
import { Button } from './../../UI/Button/Button'

export const Row = ({ date, name, count, distance, children, openFilter }) => {
  return (
    <div className={styles.Row}>
      <span className={styles.Cell}>{date}</span>
      <span className={styles.Cell}>{name}</span>
      <span className={styles.Cell}>{count}</span>
      <span className={styles.Cell}>{distance}</span>
      {openFilter && <Button onClick={openFilter} value={'Фильтр'} />}
      {children}
    </div>
  )
}
