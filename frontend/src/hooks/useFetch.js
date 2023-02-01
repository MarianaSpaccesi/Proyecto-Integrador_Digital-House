import { useState, useEffect } from 'react';


const useFetch = (
  BASE_URL = '', 
  error_msg = 'Ocurrió un error al recuperar la inforación'
  ) => {
  const [fetch_data, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //Pedimos los datos a la api
      try {
        const response = await window.fetch(BASE_URL);
        if (!response.ok) {
          throw new Error(`Http status ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setFetchData(data.results);
      } catch (error) {
        //Si hay un error ...
        console.error(error.message);
        setError(error_msg)
      }
      setLoading(false);
    }
    fetchData();
  }, [BASE_URL]);

  
  return { data: fetch_data, loading, error };
}

export default useFetch


