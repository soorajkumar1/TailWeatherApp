import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, GeoApi } from '../../GeoApi';

function Search({ onSearchChange }) {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, GeoApi)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude}, ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    })
                };
            })
            .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

    return (
        <ul className="flex ml-auto w-full font-bold">
            <li className="text-xs text-gray-800 ml-auto mr-6 border-b-2 border-green-400 cursor-pointer">Weather</li>
            <li className="text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-green-400">Alerts</li>
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">Map</li>
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">Satellite</li>
            <li className="text-xs text-gray-800 cursor-pointer border-b-2 hover:border-green-400">News</li>
        </ul>
        // <AsyncPaginate
        //     placeholder='Enter a city'
        //     debounceTimeout={600}
        //     value={search}
        //     onChange={handleOnChange}
        //     loadOptions={loadOptions}
        // />
    )
}

export default Search