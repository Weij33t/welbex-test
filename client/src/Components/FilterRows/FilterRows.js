import React from 'react'
import { Select } from './../../UI/Select/Select'
import { Input } from './../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'

import styles from './FilterRows.module.css'

export const FilterRows = ({
  filters,
  setFilters,
  filterRows,
  closeFilter,
}) => {
  const columnNames = ['name', 'count', 'distance']
  const conditions = ['equals', 'contains', 'greater', 'lower']

  const convertColumn = {
    distance: 'Дистанция',
    name: 'Имя',
    count: 'Количество',
  }

  const convertCondition = {
    equals: 'Равно',
    greater: 'Больше',
    lower: 'Меньше',
    contains: 'Содержит',
  }
  return (
    <>
      <div className={styles.FilterOverlay} onClick={closeFilter}></div>
      <div className={styles.Filter}>
        <Select
          onChange={(e) =>
            setFilters({
              ...filters,
              column: e.target.value,
            })
          }
          value={filters.column || 'Выбрать'}
          values={columnNames}
          convert={convertColumn}
        />
        <Select
          onChange={(e) =>
            setFilters({
              ...filters,
              condition: e.target.value,
            })
          }
          value={filters.condition || 'Выбрать'}
          convert={convertCondition}
          values={conditions}
        />
        <Input
          onChange={(e) => {
            setFilters({ ...filters, value: e.target.value })
          }}
          value={filters.value}
          placeholder={'Значение'}
        />
        <Button onClick={() => filterRows()} value={'Фильтровать'} />
        <Button
          onClick={() => setFilters({ value: '', condition: '', column: '' })}
          value={'Сбросить'}
        />
      </div>
    </>
  )
}
