import './App.css';
import Search from './Components/Search/Search';
import CurrentWeather from './Components/Weather/CurrentWeather';
import { useState } from 'react';
import DetailCard from './Components/DetailCard';
import Header from './Components/Header';
import SummaryCard from './Components/SummaryCard';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setNoData] = useState('No Data Yet');
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Unknown Location');

  // const handleOnSearchChange = (searchData) => {
  //   console.log(searchData)
  // }

  const getWeather = async (location) => {
    setWeatherData([])

    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat = ${location[0]}&lon=${location[1]}`

    try {
      // let res = await fetch(`${process.env.REACT_APP_URL + how_to_search}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let res = await fetch(`${process.env.REACT_APP_URL + how_to_search}
      &appid=${API_KEY}&units=metric`)
      let data = await res.json

      if (data.cod != 200) {
        setNoData('Location Not Found')
        return
      }

      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)

    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const { latitude, longitude } = location.coords
    getWeather([longitude, longitude])
  }

  const handleChange = (input) => {
    const { value } = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }


  return (
    <div className='bg-gray-800 flex itens-center justify-center w-screen h-screen py-10'>
      <div className='flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100'>
        {/* form card section */}
        <div className='form-container'>
          <div className='flex items-center justify-center'>
            <h3 className='my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 rounded--md bg-white bg-opacity-30'>
              Forecast
            </h3>

            <div className='flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg'>
              <i className='fa fa-map my-auto' aria-hidden='true'></i>
              <div className='text-right'>
                <p className='font-semiblod text-sm ml-2 '>{city}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-white text-2xl'>The only weather forecase you need</h1>
            <hr className='h-1 bg-white w-1/4 rounded-full my-5' />
            <form noValidate onSubmit={handleSubmit} className='flex justify-center w-full'>
              <input
                className='relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200 '
                onChange={handleChange}
                required
              />
              <button type='submit' className='z-10 '>
                {/* <i className='fa fa-search text-white ml-10 border-1 my-auto z-10 cursor-pointer p-3' aria-hidden='true' 
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP)
                }}>

                </i> */}
                <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP)
                }}></i>
              </button>
            </form>
          </div>
        </div>
        {/* info card section */}
        <div className='w-2/4 p-5'>
          <Header />
          <div className='flex flex-col my-10'>
            {weatherData.length === 0 ?
              <div className='container p-4 flex items-center justify center h-1/3 mb-auto'>
                <h1 className='text-gray-300 text-4xl font-bold uppercase'>{noData}</h1>
              </div> : <>
                <h1 className='text-5xl text-gray-800 mt-auto mb-4'>
                  Today
                </h1>
                <DetailCard data={weatherData} />
                <h1 className='text-3xl text-gray-600 mb-4 mt-10'>More On {city}</h1>
                <ul className='grid grid-cols-2 gap-2'>
                  {weatherData.list.map((days, index) => {
                    if (index > 0) {
                      return (<SummaryCard key={index} day={days} />)
                    }
                  })}
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
    // <div className="App">
    //   <Search onSearchChange={handleOnSearchChange} />
    //   <CurrentWeather />
    // </div>

  );
}

export default App;
