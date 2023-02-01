const url = `${process.env.REACT_APP_BASE_URL}city/`

const cityEndpoints = {
    getCities:  async () => {
        const response = await fetch(`${url}findAll/`, { method: 'GET' })
        const data = response.json()
        return data
    }
}

export default cityEndpoints;