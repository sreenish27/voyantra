import React from 'react';
import NavBar from './components/navBar.jsx';
import SearchBar from './components/searchBar.jsx';
import PlanCards from './components/planCards.jsx';
import DatePickerToggle from './components/datePickerToggle.jsx';
import {useJsApiLoader} from '@react-google-maps/api'

//keeping it outside because was getting a performance issue warning, of passing "libraries" as a prop
const libraries = ['places'];

const App = () => {

  //using the google maps api to refactore the autocomplete code
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_VOYANTRA_GOOGLE_API_KEY,
    libraries,
    })

    if (loadError) {
      return <div>Error loading Google Maps API</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      <div>
      <NavBar/>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        <DatePickerToggle/>
      </div>
      <div>
        <PlanCards/>
      </div>
      
    </div>
  );
};

export default App;




