// const url = `${process.env.REACT_APP_BASE_URL}user/`
const url = `http://localhost:8080/booking/`

const config = (payload) => {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
}
    
;
const BookingEndpoints = {
    createBooking: async (payload) => {
        
        const response = await fetch(`${url}create/`, config(payload))
        const data = response.json()
        return data
    },

}

export default BookingEndpoints;
