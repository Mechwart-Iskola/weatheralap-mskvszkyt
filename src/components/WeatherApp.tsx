import React, { useEffect, useState } from 'react'
   
type City = {
    id: number
    cityName: string
    temperature: number
    weather: string
    icon: string
}

const WeatherApp = () => {
    const [cities,setCities] = useState<City[]>()
    const [city,setCity] = useState<City | null>()
    const [searchCity, setSearchCity] = useState('')
    const [err, setErr] = useState('')

    const handleSearchCity= (e:React.ChangeEvent<HTMLInputElement>)=> {
        setSearchCity(e.target.value)
    }

    const fetchCities = async() => {
        const response = await fetch("/Weather.json")
        const data = await response.json()
        setCities(data.weather)
    }

    useEffect(()=>{
        fetchCities()
    },[])

    const findCity = () => {
        const found = cities?.find((x) =>
          x.cityName.toLowerCase().includes(searchCity.toLowerCase())
        );
    
        if (found) {
          setCity(found);
          setErr("");
        } else {
          setCity(null);
          setErr("No user found with the given name.");
        }
      };
    

 return (
   <div className='container'>

    <div className="search-section">
        <input type="text" placeholder='Give a location' value={searchCity} onChange={handleSearchCity}/>
        <button className='search-btn' onClick={findCity}>Search</button>
    </div>

    {city ? 
    <div className="city-info">
        <img src={city.icon} alt="" />
        <p>City: {city.cityName}</p>
        <p>Temperature: {city.temperature}<sup>o</sup>C</p>
        <p>Weather: {city.weather}</p>
    </div> 
    : <></>}

    <div className="result-section">
        {err ? <p>{err}</p> : <></>}
    </div>
   </div>
 )
}
   
export default WeatherApp