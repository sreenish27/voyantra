import React, {useState, useEffect} from 'react';

const PlanCards = () => {


    //To handle the expanding of the trip card
    const [isTripCardExpanded, setIsTripCardExpanded] = useState(false);

    //To create a semi black screen and disable everything when the trip card is expanded
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTripCardExpansion = () => {
        setIsTripCardExpanded(!isTripCardExpanded);
        setIsModalOpen(true);
    }
    

    //a function to close the expanded trip card when clicked anywhere else on the screen, e is the event where a click is happened near the expanded card
    const handleTripCardClose = () => {
        setIsTripCardExpanded(false);
        setIsModalOpen(false);
    }

    //an useEffect to listen to a click outside the card and take care of closing the expanded trip card
    useEffect (() => {
        const handleOutsideClick = (e) => {
            if(isTripCardExpanded === true && !e.target.closest('#expanded-tripCard')){
                handleTripCardClose();
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    },[isTripCardExpanded]);


    return(
        <>
        <div>
            <button onClick = {handleTripCardExpansion} className="relative hover:bg-gray-100 top-[160px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 1
            </button>

            <button className="relative hover:bg-gray-100 top-[160px] right-[-270px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 2
            </button>

            <button className="relative hover:bg-gray-100 top-[160px] right-[-320px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 3
            </button>
        </div>

        <div>
            <button className="relative hover:bg-gray-100 top-[205px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 4
            </button>

            <button className="relative hover:bg-gray-100 top-[205px] right-[-270px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 5
            </button>

            <button className="relative hover:bg-gray-100 top-[205px] right-[-320px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Build your own Plan
            </button>
        </div>
        {isModalOpen && (
            <div onClick = {handleTripCardClose} className = "fixed inset-0 bg-black bg-opacity-50 z-20 pointer-events-none"></div>
            )}
        {isTripCardExpanded && (
            <div id="expanded-tripCard" className="fixed top-[50px] left-[250px] bg-white ring-1 ring-black ring-opacity-5 w-[900px] h-[730px] text-gray-700 font-normal rounded-lg shadow-md z-30 overflow-auto">
            <div className = "relative top-[320px] left-[160px]">
                Expanded Trip Card, will fill up with all the details of an individual trip.
            </div>
            </div>
        )} 
        </>
    );
}

export default PlanCards;