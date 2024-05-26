import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

const SearchBar = () => {


    const [isWhoDropdownOpen, setIsWhoDropdownOpen] = useState(false);

    const [isWhereDropdownOpen, setIsWhereDropdownOpen] = useState(false);

    // //handles the dates in the From and To part of the search bar - this is using redux (global state management package)
    // const isStartDate = useSelector((state) => state.dateRanges.isStartDate);
    // const isEndDate = useSelector((state) => state.dateRanges.isEndDate);

    //To handle all the clicks in the Who dropdown
    const [isAdultClicked, setIsAdultClicked] = useState(0);
    const [isChildrenClicked, setIsChildrenClicked] = useState(0);
    const [isInfantClicked, setIsInfantClicked] = useState(0);
    const [isPetClicked, setIsPetClicked] = useState(0);

    //When user starts typing in the Where search bar it must open
    const [isUserSearchingDestinations, setIsUserSearchingDestinations] = useState(null);

    //When user starts typing the place store, update and clear the data
    const [isPlaceData, setIsPlaceData] = useState([]);

    useEffect(() => {
        if(isUserSearchingDestinations != ''){
            const api_places_url = `https://geocode.maps.co/search?q=${isUserSearchingDestinations}&api_key=664e9777ab2b4679205092qzedd4b91`

            const fetchResults = async () => {
                try{
                    const response = await fetch(api_places_url);
                    const place_data = await response.json();
                    setIsPlaceData(place_data);
                } catch(err){
                    console.log(`Error is trying to get the places:${err}`);
                }
            };

            fetchResults();
        } else {
            setIsPlaceData([]);
        }
    }, [isUserSearchingDestinations]);

    //Handle the where search bar dropdown for Click
    const handlerWhereDropdownClick = () => {
        
        setIsWhereDropdownOpen(!isWhereDropdownOpen);
    }
    
    //Handle the where search bar dropdown for when user starts searching for destinations
    const handlerWhereDropdownType = (e) => {

        const value = e.target.value;
        setIsUserSearchingDestinations(value);
        setIsWhereDropdownOpen(true);
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

    return(
        <>
        <div className = "flex flex-row justify-center w-full">
        <div className = "absolute top-28 h-16 flex flex-row rounded-searchBox bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">


        <button className = "hover:bg-gray-100 px-5 py-2 w-[220px] rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
            <div className="relative right-[50px]">Budget</div>
          
                <form className = "relative right-[0px] text-gray-400 font-light text-sm">
                    <input className="text-black focus:outline-none focus:ring-0 hover:bg-gray-100" type="text" placeholder="Enter an amount in $"/> 
                </form>
            </button>

            <button onClick={handlerWhereDropdownClick} className = "hover:bg-gray-100 px-5 py-2 w-[250px] rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
            <div className="relative right-[70px]">Where</div>
          
                <form className = "relative right-[18px] text-gray-400 font-light text-sm">
                    <input onChange={handlerWhereDropdownType} className="text-black focus:outline-none focus:ring-0 hover:bg-gray-100" type="text" placeholder="Search destinations" value={isUserSearchingDestinations}/> 
                </form>
            </button>
            
            
            <button className = "hover:bg-gray-100 px-5 py-2 rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
                <div className="relative right-[42px]">From</div>
                <input className="relative right-[-13px] text-black focus:outline-none font-light focus:ring-0 hover:bg-gray-100" type="text" placeholder="Enter start date" value="dcda" readOnly/>
                </button>
          
            <button className = "hover:bg-gray-100 px-5 py-2 rounded-subSearchBox text-gray-700 font-normal text-sm" type="button">
                <div className="relative right-[38px]">To</div>
                <input className="relative right-[-13px] text-black focus:outline-none font-light focus:ring-0 hover:bg-gray-100" type="text" placeholder="Enter end date" value="dcda" readOnly/>
                </button>

            <div className="flex flex-row hover:bg-gray-100 px-5 py-2 w-[250px] rounded-subSearchBox">
                <button onClick={handlerWhoDropdownClick} className = "text-gray-700 font-normal text-sm" type="button">Who
                <div className = "relative right-[-21px] text-gray-400 font-light text-sm">Add guests</div>
                </button>
             
            <div>
                <div className = "relative">
                <button>
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
            <div className="absolute top-[180px] right-[320px] w-[350px] h-72 z-10 mt-2 origin-top-right rounded-custom bg-white px-3 py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            
            
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

        {isWhereDropdownOpen && isPlaceData.length > 0 && (

            <div className="absolute top-[182px] right-[640px] z-10 mt-2 w-[370px] origin-top-right rounded-custom bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">     
            
            
            <button className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative justify-start text-gray-700 font-light text-[17px]">{isPlaceData[0].display_name}</div>
            </button>

            <button className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative  text-gray-700 font-light text-[17px]">{isPlaceData[1].display_name}</div>
            </button>

            <button className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative  text-gray-700 font-light text-[17px]">{isPlaceData[2].display_name}</div>
            </button>

            <button className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative  text-gray-700 font-light text-[17px]">{isPlaceData[3].display_name}</div>
            </button>

            <button className="py-2 px-2 h-[60px] ring-1 ring-white ring-opacity-5 w-[370px] rounded-custom hover:bg-gray-100" role="none">
                <div className="relative text-gray-700 font-light text-[17px]">{isPlaceData[4].display_name}</div>
            </button>

            </div>
        )}
        
        

        
        </>
    );
}

export default SearchBar;