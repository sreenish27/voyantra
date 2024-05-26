import React from 'react';
import NavBar from './components/navBar.jsx';
import SearchBar from './components/searchBar.jsx';
import PlanCards from './components/planCards.jsx';
import DatePickerToggle from './components/datePickerToggle.jsx';



const App = () => {

  return (
    <div>
      <div>
      <NavBar/>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        <PlanCards/>
      </div>
      <div>
        <DatePickerToggle/>
      </div>
    </div>
  );
};

export default App;




