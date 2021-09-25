import React, { useEffect, useState } from 'react'
import { table } from '../../API'
import { Row } from '../../Components/Row/Row'

import styles from './Table.module.css'
import { FilterRows } from './../../Components/FilterRows/FilterRows'
import { Pagination } from './../../Components/Pagination/Pagination'
import { calculateOffset } from '../../helpers'

export const Table = () => {
  const ITEMS_PER_PAGE = 5
  const LIMIT = ITEMS_PER_PAGE
  const [rows, setRows] = useState([])

  const [rowsCount, setRowsCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState({
    condition: '',
    value: '',
    column: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await table.api.getRowsPortion(offset, LIMIT)
      const length = await table.api.getRowsCount()
      if (data === false) return setIsError(false)
      setIsLoading(false)
      setIsError(false)
      setRows(data)
      setRowsCount(length)
    }
    fetchData()
  })

  const fetchFilteredRows = async () => {
    if (filters.value === '') {
      const data = await table.api.getRowsPortion(0, 5)
      const length = await table.api.getRowsCount()
      if (data === false) {
        setIsError(true)
        return
      }
      setRows(data)
      setIsError(false)
      setRowsCount(length)
      return null
    }
    const data = await table.api.getRowsPortion(0, 5, filters)
    if (data === false) return setIsError(true)
    const length = await table.api.getRowsCount(filters)
    setOffset(0)
    setCurrentPage(1)
    setRowsCount(length)
    setRows(data)
    setIsError(false)
  }

  const openFilter = () => setIsFilterVisible(true)
  const closeFilter = () => setIsFilterVisible(false)

  const selectPage = async (e) => {
    const selectedPage = e.target.textContent
    const offset = calculateOffset(ITEMS_PER_PAGE, selectedPage)
    const data = await table.api.getRowsPortion(offset, LIMIT, filters)
    if (data === false) {
      setIsError(true)
      return
    }
    setOffset(offset)
    setRows(data)
    setIsError(false)
    setCurrentPage(selectedPage)
  }

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }
  return (
    <div className={styles.Table}>
      {isError && (
        <h1 style={{ color: 'red' }}>
          Что-то пошло не так. Проверьте ваш запрос и попробуйте снова.
        </h1>
      )}
      <Row
        distance="Дистанция"
        count={'Количество'}
        date={'Дата'}
        name={'Имя'}
        openFilter={() => openFilter()}
      >
        {isFilterVisible && (
          <FilterRows
            filterRows={fetchFilteredRows}
            closeFilter={closeFilter}
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </Row>
      {rows.map((row, index) => {
        return <Row key={row.name + index} {...row} filter={false} />
      })}
      <Pagination
        count={rowsCount}
        selectPage={selectPage}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
      />
    </div>
  )
}
