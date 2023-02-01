const url = `${process.env.REACT_APP_BASE_URL}user/`
const urlLocal = `http://localhost:8080/user/`

const config = (payload) => {
    return {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }
}
const UserEndpoints = {
    createUser: async (payload) => {
        const response = await fetch(`${url}create`, config(payload))
        const data = response.json()
        return data
    },
    login: async (payload) => {
        const response = await fetch(`${url}login`, config(payload))
        const data = response.json()
        return data
    },
    getUser: async (token) =>{
            const response = await fetch(`${urlLocal}`, { 
                method: 'GET', 
                headers: {
                    'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                }})
            const data = response.json()
            console.log(data);
            
            return data
    }
}

export default UserEndpoints;
