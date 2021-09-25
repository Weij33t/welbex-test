const url = 'http://localhost:8080/'

const addFiltersQueryParams = (fetchUrl, filters) => {
  fetchUrl.searchParams.append('column', filters.column)
  fetchUrl.searchParams.append('condition', filters.condition)
  fetchUrl.searchParams.append('value', filters.value)
}

export const api = {
  async getRowsPortion(offset, limit, filters) {
    try {
      const fetchUrl = new URL(url)
      fetchUrl.pathname = '/api/table/rows'
      fetchUrl.searchParams.append('offset', offset)
      fetchUrl.searchParams.append('limit', limit)
      if (filters) {
        addFiltersQueryParams(fetchUrl, filters)
      }
      const response = await fetch(fetchUrl.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
      return false
    }
  },
  async getRowsCount(filters) {
    try {
      const fetchUrl = new URL(url)
      fetchUrl.pathname = '/api/table/rows/count'
      if (filters) {
        addFiltersQueryParams(fetchUrl, filters)
      }
      const response = await fetch(fetchUrl.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const length = response.json()
      return length
    } catch (error) {
      console.log(error)
      return false
    }
  },
}
