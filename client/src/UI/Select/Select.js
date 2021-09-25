import React from 'react'

export const Select = ({ values, convert, ...rest }) => {
  return (
    <select {...rest}>
      <option label="Выбрать" value={'Выбрать'} disabled></option>
      {values.map((value, index) => {
        return (
          <option key={index} label={convert[value]} value={value}></option>
        )
      })}
    </select>
  )
}
