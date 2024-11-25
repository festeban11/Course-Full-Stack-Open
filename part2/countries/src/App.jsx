import { useState, useEffect} from 'react'

import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

import axios from 'axios';
import Weather from './components/Weather';

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  const [searchName, setSearchName] = useState('')


 

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      //console.log(response.data);
      setCountries(response.data);
      setShowCountry(response.data);
    });
  }, []);

  const handleSearchCountry = (event) => {
    //console.log(event.target.value)    
    const searchValue = event.target.value.toLowerCase();
    setSearchName(searchValue)
    //console.log(searchValue)
    setShowCountry(countries.filter((country) => 
      country.name.common.toLowerCase().includes(searchValue)
    ));
    if (searchValue === '') {
      setShowCountry(countries)
    }

    
  }



  return (
    <div>
      <h1>Country Data</h1>
      <Filter searchName={searchName} handleSearchCountry={handleSearchCountry} />
      {showCountry.length === 1 ? (
        <Country country={showCountry[0]} />
      ) : null}
      {showCountry.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countries={showCountry} setShowCountry={setShowCountry}
        />
       
      )}
     
    </div>
  )
}

export default App