import React from 'react'
import styles from './Pagination.module.css'

export const Pagination = ({
  count,
  selectPage,
  itemsPerPage,
  currentPage,
}) => {
  const generatePages = () => {
    const pages = []
    const totalPages = Math.ceil(count / itemsPerPage)

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={
            +currentPage === i ? styles.SelectedPage : styles.PageNumber
          }
          onClick={selectPage}
        >
          {i}
        </button>
      )
    }
    return pages
  }
  return <>{generatePages()}</>
}
