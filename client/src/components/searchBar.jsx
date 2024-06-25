import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../reduxSlices/datePickerOpenCloseSlice.js';
import axios from 'axios';

const SearchBar = () => {

    const dispatch = useDispatch();

    //just to get the budget value
    const [budget, setIsBudget] = useState(0);

    const [isWhoDropdownOpen, setIsWhoDropdownOpen] = useState(false);

    const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);

    const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);

    //handle dates in the from and to part of searchbar using redux (global state management system)
    const startDate = useSelector((state) => state.dateRangePicker.startDate);
    const endDate = useSelector((state) => state.dateRangePicker.endDate);

    //handles the opening and closing of the datePicker component
    const isOpen = useSelector((state) => state.datePickerOpenClose.isOpen);

    //To handle all the clicks in the Who dropdown
    const [isAdultClicked, setIsAdultClicked] = useState(0);
    const [isChildrenClicked, setIsChildrenClicked] = useState(0);
    const [isInfantClicked, setIsInfantClicked] = useState(0);
    const [isPetClicked, setIsPetClicked] = useState(0);

    //When user starts typing in the To search bar it must open
    const [isUserSearchingDestinations, setIsUserSearchingDestinations] = useState(null);

    //When user starts typing in the From search bar it must open
    const [isUserSearchingLocation, setIsUserSearchingLocation] = useState(null);

    //When user starts typing the destination - store, update and clear the data
    const [isPlaceData, setIsPlaceData] = useState([]);

    //When user starts typing the start location - store, update and clear the data
    const [isLocationStartData, setIsLocationStartData] = useState([]);

    //When user starts adding the people going for the trip store it as an array
    const [isGuestData, setIsGuestData] = useState('');

    //When the user selects a place to go To I want it to be stored in this variable
    const [isDestinationDataDisplay, setIsDestinationDataDisplay] = useState('');
    const destinationDisplayRef = useRef(null);

    //When the user selects a place to go From I want it to be stored in this variable
    const [isLocationStartDataDisplay, setIsLocationStartDataDisplay] = useState('');
    const locationStartDisplayRef = useRef(null);

    //Establishing debounce function to take care of performance and limit the API calls to permissible limits
    const debounce = (func, delay) => {
        let timerId = null;
        return(...args) => {
            clearTimeout(timerId);
            timerId = setTimeout( async () => {
                await func(...args)
            }, delay);
        };
    };

    //To automatically update the search results under the To search bar
    const fetchDestinationResults = async (isUserSearchingDestinations) => {
        
        if(isUserSearchingDestinations != ''){
            const api_places_url = `https://geocode.maps.co/search?q=${isUserSearchingDestinations}&api_key=664e9777ab2b4679205092qzedd4b91`

           
                try{
                    const response = await fetch(api_places_url);
                    const place_data = await response.json();
                    setIsPlaceData(place_data);
                } catch(err){
                    console.log(`Error in trying to get the places:${err}`);
                }

        } else {
            setIsPlaceData([]);
        }     
    }

    //debounce the function
    const debouncedFetchDestinationResults = debounce(fetchDestinationResults, 1200);

    //To automatically update the search results under the From search bar
    useEffect(() => {
        if(isUserSearchingLocation != ''){
            const api_places_url = `https://us1.locationiq.com/v1/search?key=pk.1e349ff8a694e26ecd3a3e66e6a1504b&q=${isUserSearchingLocation}&format=json`

            const fetchResults = async () => {
                try{
                    const response = await fetch(api_places_url);
                    const locationStart_data = await response.json();
                    setIsLocationStartData(locationStart_data);
                } catch(err){
                    console.log(`Error in trying to get the places:${err}`);
                }
            };

            fetchResults();
        } else {
            setIsLocationStartData([]);
        }
    }, [isUserSearchingLocation]);

   //handle the input value that should be displayed in Add guests in the search bar
   useEffect(() => {
    if (isAdultClicked+isChildrenClicked === 0 && isInfantClicked === 0 && isPetClicked === 0){
        setIsGuestData("");
    }
    else if(isAdultClicked+isChildrenClicked > 0 && isInfantClicked === 0 && isPetClicked === 0){
        setIsGuestData(`${isAdultClicked+isChildrenClicked} guests`);
    }
    else if(isAdultClicked+isChildrenClicked > 0 && isInfantClicked>0 && isPetClicked === 0){
        setIsGuestData(`${isAdultClicked+isChildrenClicked} guests, ${isInfantClicked} infants`);
    }
    else {
        setIsGuestData(`${isAdultClicked+isChildrenClicked} guests, ${isInfantClicked} infants, ${isPetClicked} pets`);
    }
   },[isAdultClicked, isChildrenClicked, isInfantClicked, isPetClicked]);

   //handle giving the clicked destination data to the variable declared which will be displayed

   const handlerDisplayPlaceData = (event) => {

    destinationDisplayRef.current = event.target;
    const destinationDisplayValue = destinationDisplayRef.current.textContent;
    setIsDestinationDataDisplay(destinationDisplayValue);
    setIsUserSearchingDestinations(destinationDisplayValue);
    setIsToDropdownOpen(!isToDropdownOpen);
   }

   //handle giving the clicked location start data to the variable declared which will be displayed

   const handlerLocationStartPlaceData = (event) => {

    locationStartDisplayRef.current = event.target;
    const locationsStartDisplayValue = locationStartDisplayRef.current.textContent;
    setIsLocationStartDataDisplay(locationsStartDisplayValue);
    setIsUserSearchingLocation(locationsStartDisplayValue);
    setIsFromDropdownOpen(!isFromDropdownOpen);
   }

   //Handle the From search bar dropdown for Click
   const handlerFromDropdownClick = () => {
        
    setIsFromDropdownOpen(!isFromDropdownOpen);
   }

    //Handle the From search bar dropdown for when user starts searching for destinations
    const handlerFromDropdownType = (e) => {

    const value = e.target.value;
    setIsUserSearchingLocation(value);
    setIsFromDropdownOpen(true);
   }

    //Handle the To search bar dropdown for Click
    const handlerToDropdownClick = () => {
        
        setIsToDropdownOpen(!isToDropdownOpen);
    }
    
    //Handle the To search bar dropdown for when user starts searching for destinations
    const handlerToDropdownType = (e) => {

        const value = e.target.value;
        setIsUserSearchingDestinations(value);
        setIsToDropdownOpen(true);
        debouncedFetchDestinationResults(value);
    }

    //Handles the who search bar drop down
    const handlerWhoDropdownClick = () => {

        setIsWhoDropdownOpen(!isWhoDropdownOpen);
    }

    //Handles the click of '+' and '-' in the who dropdown for adults
    const handleAdultPlusClick = () => {

        if(isAdultClicked < 16){
            setIsAdultClicked(isAdultClicked + 1);
        }
        else{
            setIsAdultClicked(isAdultClicked + 0);
        }
        
    }
    const handleAdultMinusClick = () => {

        if(isAdultClicked > 0){
            setIsAdultClicked(isAdultClicked - 1);
        }
        else{
            setIsAdultClicked(isAdultClicked - 0);
        }
        
    }

    //Handles the click of '+' and '-' in the who dropdown for children
    const handleChildrenPlusClick = () => {

        if(isChildrenClicked < 4){
            setIsChildrenClicked(isChildrenClicked + 1);
        }
        else{
            setIsChildrenClicked(isChildrenClicked + 0);
        }
        
    }
    const handleChildrenMinusClick = () => {

        if(isChildrenClicked > 0){
            setIsChildrenClicked(isChildrenClicked - 1);
        }
        else{
            setIsChildrenClicked(isChildrenClicked - 0);
        }
        
    }

    //Handles the click of '+' and '-' in the who dropdown for infants
    const handleInfantPlusClick = () => {

        if(isInfantClicked < 4){
            setIsInfantClicked(isInfantClicked + 1);
        }
        else{
            setIsInfantClicked(isInfantClicked + 0);
        }
        
    }
    const handleInfantMinusClick = () => {

        if(isInfantClicked > 0){
            setIsInfantClicked(isInfantClicked - 1);
        }
        else{
            setIsInfantClicked(isInfantClicked - 0);
        }
        
    }

    //Handles the click of '+' and '-' in the who dropdown for pets
    const handlePetPlusClick = () => {

        if(isPetClicked < 3){
            setIsPetClicked(isPetClicked + 1);
        }
        else{
            setIsPetClicked(isPetClicked + 0);
        }
        
    }
    const handlePetMinusClick = () => {

        if(isPetClicked > 0){
            setIsPetClicked(isPetClicked - 1);
        }
        else{
            setIsPetClicked(isPetClicked - 0);
        }
        
    }

    //handles the opening and closing of the date picker toggle from from and to
    const handleDatePickerOpenClose = () => {

        dispatch(setIsOpen(!isOpen));
    }

    //Preparing all inputs to be sent to server side
    const [allUserInput, setAllUserInput] = useState({
        BudgetInput: '',
        From: '',
        To: '',
        Depart:'',
        Return:'',
        Who: '',
    });

    //Update the allUserInput dictionary to get all inputs in one place (in our case a dictionary)
    const handleSearchClick = async () => {

        setIsBudget(document.getElementById("budgetInput").value);
        setAllUserInput({
            BudgetInput: budget,
            From: isLocationStartDataDisplay,
            To: isDestinationDataDisplay,
            Depart:startDate,
            Return:endDate,
            Who:isGuestData,
        })

        setTimeout (async () => {
            try{
                const response = await axios.post('http://localhost:4000/api/userInput', allUserInput);
                console.log("User input sent from client side.")
                console.log(response.data);
            } catch(error){
                console.log(`Error encountered in sending user input to server: ${error}`);
            }
        }, 100)  
        
    }
    return(
        <>
        <div className = "flex flex-row justify-center w-full">
        <div className = "absolute top-28 h-16 flex flex-row rounded-searchBox bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">


        <button className = "hover:bg-gray-100 px-5 py-2 w-[180px] rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
            <div className="relative right-[30px]">Budget</div>
          
                    <input id="budgetInput" className="w-[90px] text-black focus:outline-none focus:ring-0 hover:bg-gray-100 relative right-[10px] font-light text-sm" type="text" placeholder="Amount in $"/> 
            </button>

            <button onClick={handlerFromDropdownClick} className = "hover:bg-gray-100 px-5 py-2 w-[200px] rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
            <div className="relative right-[50px]">From</div>
          
                <form className = "relative right-[-6px] text-gray-400 font-light text-sm">
                    <input onChange={handlerFromDropdownType} className="text-black focus:outline-none focus:ring-0 hover:bg-gray-100" type="text" placeholder="Search your location" value={isUserSearchingLocation}/> 
                </form>
            </button>

            <button onClick={handlerToDropdownClick} className = "hover:bg-gray-100 px-5 py-2 w-[200px] rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
            <div className="relative right-[50px]">To</div>
          
                <form className = "relative right-[-15px] text-gray-400 font-light text-sm">
                    <input onChange={handlerToDropdownType} className="text-black focus:outline-none focus:ring-0 hover:bg-gray-100" type="text" placeholder="Search destinations" value={isUserSearchingDestinations}/> 
                </form>
            </button>
            
            <button onClick={handleDatePickerOpenClose} className = "hover:bg-gray-100 px-5 py-2 rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
                <div className="relative right-[42px]">Depart</div>
                <input className="relative right-[-10px] text-black font-light hover:bg-gray-100" type="text" placeholder="Enter start date" value={startDate} readOnly/>
                </button>
          
            <button onClick={handleDatePickerOpenClose} className = "hover:bg-gray-100 px-5 py-2 rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
                <div className="relative right-[49px]">Return</div>
                <input className="relative right-[-2px] text-black focus:outline-none font-light focus:ring-0 hover:bg-gray-100" type="text" placeholder="Enter end date" value={endDate} readOnly/>
                </button>

            <div className="flex flex-row hover:bg-gray-100 px-5 py-2 w-[200px] rounded-subSearchBox">
                <button onClick={handlerWhoDropdownClick} className = "relative right-[50px] text-gray-700 font-normal text-sm" type="button">Who
                <input className="relative right-[-58px] text-black focus:outline-none font-light focus:ring-0 hover:bg-gray-100" type="text" placeholder="Add guests" readOnly value={isGuestData}/>
                </button>
             
            <div>
                <div className = "relative right-[121px]">
                <button onClick={handleSearchClick}>
                <svg className = "relative right-[-95px] top-[-3px] fill-sky-500 hover:fill-sky-700" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="55px" height="55px" viewBox="0 0 25.334 25.334" xml:space="preserve"> <g><path d="M25.334,12.667c0,6.996-5.672,12.667-12.668,12.667C5.672,25.334,0,19.663,0,12.667S5.672,0,12.666,0,C19.662,0,25.334,5.671,25.334,12.667z"/></g></svg>
                
                <svg className="absolute top-[14px] right-[-77px] h-5 w-5 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>

        {isWhoDropdownOpen && (
            <div className="absolute top-[180px] right-[180px] w-[350px] h-72 z-10 mt-2 origin-top-right rounded-custom bg-white px-3 py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            
            
            <div className="py-3 px-3 h-[70px]" role="none">
               
                <div className="text-gray-700 font-normal">Adults</div>
                <div className = "text-gray-400 font-light text-sm">Ages 13 or above</div>
               

                <div className="relative right-[-240px] top-[-38px]">
                    <button onClick={handleAdultMinusClick} className="relative right-9 stroke-gray-400 hover:stroke-black" type="button">
                    <svg width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/></svg>
                    </button>
                    <div className="relative top-[-33px] right-[-12px]">{isAdultClicked}</div>
                    <button onClick={handleAdultPlusClick} className="relative top-[-59px] right-[-40px] stroke-gray-400 hover:stroke-black" type="button">
                    <svg width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/><path d="M24,32a0.5,0.5,0,0,1-.5-0.5v-15a0.5,0.5,0,0,1,1,0v15A0.5,0.5,0,0,1,24,32Z"/></svg>
                    </button>
                </div>
                
            
            </div>
            
            <div className="py-3 px-3 h-[70px]" role="none">
                
                <div className="text-gray-700 font-normal">Children</div>
                <div className = "text-gray-400 font-light text-sm">Ages 2 - 12</div>
                
                
                <div className="relative right-[-240px] top-[-38px]">
                    <button onClick={handleChildrenMinusClick} className="relative right-9 stroke-gray-400 hover:stroke-black" type="button">
                    <svg width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/></svg>
                    </button>
                    <div className="relative top-[-33px] right-[-12px]">{isChildrenClicked}</div>
                    <button onClick={handleChildrenPlusClick} className="relative top-[-59px] right-[-40px] stroke-gray-400 hover:stroke-black" type="button">
                    <svg  width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/><path d="M24,32a0.5,0.5,0,0,1-.5-0.5v-15a0.5,0.5,0,0,1,1,0v15A0.5,0.5,0,0,1,24,32Z"/></svg>
                    </button>
                </div>
                
            </div>
            <div className="py-3 px-3 h-[70px]" role="none">
                
                <div>Infants</div>
                <div className = "text-gray-400 font-light text-sm">Under 2</div>
                

                <div className="relative right-[-240px] top-[-38px]">
                    <button onClick={handleInfantMinusClick} className="relative right-9 stroke-gray-400 hover:stroke-black" type="button">
                    <svg width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/></svg>
                    </button>
                    <div className="relative top-[-33px] right-[-12px]">{isInfantClicked}</div>
                    <button onClick={handleInfantPlusClick} className="relative top-[-59px] right-[-40px] stroke-gray-400 hover:stroke-black" type="button">
                    <svg  width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/><path d="M24,32a0.5,0.5,0,0,1-.5-0.5v-15a0.5,0.5,0,0,1,1,0v15A0.5,0.5,0,0,1,24,32Z"/></svg>
                    </button>
                </div>                
                
            </div>
            <div className="py-3 px-3 h-[70px]" role="none">
                <div className="text-gray-700 font-normal">Pets</div>
                <div className="relative right-[-240px] top-[-24px]">
                    <button onClick={handlePetMinusClick} className="relative right-9 stroke-gray-400 hover:stroke-black" type="button">
                    <svg width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/></svg>
                    </button>
                    <div className="relative top-[-33px] right-[-12px]">{isPetClicked}</div>
                    <button onClick={handlePetPlusClick} className="relative top-[-59px] right-[-40px] stroke-gray-400 hover:stroke-black" type="button">
                    <svg  width="28px" height="28px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title>ONE-xicons</title><path d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48ZM24,1A23,23,0,1,0,47,24,23,23,0,0,0,24,1Z"/><path d="M31.5,24.5h-15a0.5,0.5,0,0,1,0-1h15A0.5,0.5,0,0,1,31.5,24.5Z"/><path d="M24,32a0.5,0.5,0,0,1-.5-0.5v-15a0.5,0.5,0,0,1,1,0v15A0.5,0.5,0,0,1,24,32Z"/></svg>
                    </button>
                </div>
            </div>
            
            </div>
        )}

        {isToDropdownOpen && isPlaceData.length > 0 && (

            <div className="absolute top-[182px] right-[440px] z-10 mt-2 w-[370px] origin-top-right rounded-custom bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">     
            
            
            <button onClick={handlerDisplayPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative justify-start text-gray-700 font-light text-[17px]">{isPlaceData[0].display_name}</div>
            </button>

            <button onClick={handlerDisplayPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative  text-gray-700 font-light text-[17px]">{isPlaceData[1].display_name}</div>
            </button>

            <button onClick={handlerDisplayPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative  text-gray-700 font-light text-[17px]">{isPlaceData[2].display_name}</div>
            </button>

            <button onClick={handlerDisplayPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative  text-gray-700 font-light text-[17px]">{isPlaceData[3].display_name}</div>
            </button>

            <button onClick={handlerDisplayPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative text-gray-700 font-light text-[17px]">{isPlaceData[4].display_name}</div>
            </button>

            </div>
        )}

        {isFromDropdownOpen && isLocationStartData.length > 0 && (

        <div className="absolute top-[182px] right-[840px] z-10 mt-2 w-[370px] origin-top-right rounded-custom bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">     


        <button onClick={handlerLocationStartPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
            <div className="relative justify-start text-gray-700 font-light text-[17px]">{isLocationStartData[0].display_name}</div>
        </button>

        <button onClick={handlerLocationStartPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
            <div className="relative  text-gray-700 font-light text-[17px]">{isLocationStartData[1].display_name}</div>
        </button>

        <button onClick={handlerLocationStartPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
            <div className="relative  text-gray-700 font-light text-[17px]">{isLocationStartData[2].display_name}</div>
        </button>

        <button onClick={handlerLocationStartPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
            <div className="relative  text-gray-700 font-light text-[17px]">{isLocationStartData[3].display_name}</div>
        </button>

        <button onClick={handlerLocationStartPlaceData} className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
            <div className="relative text-gray-700 font-light text-[17px]">{isLocationStartData[4].display_name}</div>
        </button>

        </div>
        )}  
        
        

        
        </>
    );
}

export default SearchBar;