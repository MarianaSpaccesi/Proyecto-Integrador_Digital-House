const url = `${process.env.REACT_APP_BASE_URL}product/`

const productEndpoints = {
    getProductById:  async (id) => {
        const response = await fetch(`${url}find/${id}`, { method: 'GET' })
        const data = response.json()
        return data
    },
    getRandom:  async (qty) => {
        const response = await fetch(`${url}getRandom/${qty}`, { method: 'GET' })
        const data = response.json()
        return data
    },
    getProducts:  async () => {
        const response = await fetch(`${url}findAll/`, { method: 'GET' })
        const data = response.json()
        return data
    }
}

export default productEndpoints;
