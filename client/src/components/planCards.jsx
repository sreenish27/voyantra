import React, {useState, useEffect} from 'react';
// import fetchTripCardData from '../tripcardsdata';
import axios from 'axios';

const PlanCards = () => {


   
    //to store the index of the card which is clicked
    const [isExpandedTripCardIndex, setIsExpandedTripCardIndex] = useState(null);

    //to store the noOfStops of 

    //to store some trip info data for testing
    const [isTripFlightData, setIsTripFlightData] = useState([]);

    const handleTripCardExpansion = (index) => {
        setIsExpandedTripCardIndex(prevIndex => prevIndex === index ? null : index);
    }

    //a function to close the expanded trip card when clicked anywhere else on the screen, e is the event where a click is happened near the expanded card
    const handleTripCardClose = () => {
        setIsExpandedTripCardIndex(null);
    }

    //an useEffect to listen to a click outside the card and take care of closing the expanded trip card
    useEffect (() => {
        const handleOutsideClick = (e) => {
            if(isExpandedTripCardIndex !== null && !e.target.closest('#expanded-tripCard')){
                handleTripCardClose();
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    },[isExpandedTripCardIndex]);

    //a useEffect to fill in info in the trip card
    useEffect(() => {

        const tripCard_url = 'http://localhost:4000/api/testing/tripcards';

      

            const getTripCardInfo = async () => {
                try{
                    const tripCardInfo = await axios.get(tripCard_url);
                    const tripCardArrayData = tripCardInfo.data;
                    setIsTripFlightData(tripCardArrayData);
                    console.log(tripCardArrayData);
                } catch(err){
                    console.log(`Error in getting the trip card data: ${err}`);
                }
            }
            getTripCardInfo();

    },[]);


    return(
        <>

        {/* Below is an entire trip card format which I will use to render all the tripcards */}
        {isTripFlightData.length > 0 && (
        
        <div className = "grid gap-y-[60px] mx-[250px] grid-cols-4 ml-[-150px]">
        {isTripFlightData.map((flightData, index) => (

            <div key={index}>

                <button onClick = {() => handleTripCardExpansion(index)} className="relative hover:bg-gray-100 top-[160px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                    Plan Card {index + 1}
                </button>


            {isExpandedTripCardIndex === index && (
                <div onClick = {handleTripCardClose} className = "fixed inset-0 bg-black bg-opacity-50 z-20 overflow-hidden"></div>
                )}

            {isExpandedTripCardIndex === index && (
                <div id="expanded-tripCard" className="fixed top-[50px] left-[300px] bg-white ring-1 ring-black ring-opacity-5 w-[800px] h-[730px] text-gray-700 font-normal rounded-lg shadow-md z-30 overflow-auto">

                
                    {/* top of the flight card will get rendered always (within the trip card)*/}
                    <div className = "flex flex-col p-8">
                    <div className = "font-bold text-xl mb-10">Your Trip to {flightData.flight.destinationCity}</div>
                    <div className = "ring-1 ring-black ring-opacity-10 rounded-md w-[710px] h-[50px]">
                        <div className = "text-sm text-green-600 p-3 justify-start">15% lower CO2e emissions than the average of all flights we offer for this route</div>
                    </div>
                    </div>
                    {/* below a segment starts includes all the departing flights */}
                    <div className = "flex flex-col">
                    <div className = "font-bold px-8">Flight to {flightData.flight.destinationCity}</div>
                    <div className = "text-[15px] text-gray-600 px-8 py-2">{flightData.flight.departingFlights.noOfStops} stops · 19h 20m</div>

                    {/* below is the first flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    <div className = "flex flex-col">
                    <div className = "text-[15px] font-thin text-gray-600 px-10 mt-3">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="55" viewBox="0 0 2 58"> <path d="M1 0v58" stroke="black" stroke-width="2"/> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-10 -mt-1">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{flightData.flight.departingFlights.departureTime1}</div>
                    <div className = "text-sm font-bold px-16">{flightData.flight.departingFlights.airport1}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{flightData.flight.departingFlights.arrivalTime1}</div>
                    <div className = "text-sm font-bold px-16 ">{flightData.flight.departingFlights.airport2 ? flightData.flight.departingFlights.airport2 : flightData.flight.departingFlights.destinationAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{flightData.flight.departingFlights.airline1}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{flightData.flight.departingFlights.flightNumber1} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {flightData.flight.departingFlights.duration1}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${flightData.flight.departingFlights.airline1Logo}`} />
                        </div>
                    </div>

                {/* below is the first layover and the dotted line segment */}
                   {flightData.flight.departingFlights.noOfStops > 0 && (
                    <div className = "flex flex-col">
                        <div className = "text-sm px-32 mt-20">Layover {flightData.flight.departingFlights.layoverTime1}</div>
                        <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                        </div>
                        <div className = "px-24 -mt-[72px]">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                        </div>
                    </div>
                   )}
                    
                    {/* below is the second flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {flightData.flight.departingFlights.noOfStops > 0 && (

                    <div className = "flex flex-col">
                    <div className = "text-[15px] font-thin text-gray-600 px-10 mt-16">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="55" viewBox="0 0 2 58"> <path d="M1 0v58" stroke="black" stroke-width="2"/> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-10 -mt-1">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{flightData.flight.departingFlights.departureTime2}</div>
                    <div className = "text-sm font-bold px-16">{flightData.flight.departingFlights.airport2}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{flightData.flight.departingFlights.arrivalTime2}</div>
                    <div className = "text-sm font-bold px-16 ">{flightData.flight.departingFlights.airport3 ? flightData.flight.departingFlights.airport3 : flightData.flight.departingFlights.destinationAirport}
                    </div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{flightData.flight.departingFlights.airline2}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{flightData.flight.departingFlights.flightNumber2} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {flightData.flight.departingFlights.duration2}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${flightData.flight.departingFlights.airline2Logo}`} />
                        </div>
                    </div>

                    )}

                    {/* below is the second layover and the dotted line segment */}
                    {flightData.flight.departingFlights.noOfStops > 1 && (

                    <div className = "flex flex-col">
                        <div className = "text-sm px-32 mt-20">Layover {flightData.flight.departingFlights.layoverTime2}</div>
                        <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                        </div>
                        <div className = "px-24 -mt-[72px]">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                        </div>
                    </div>

                   )}

                    {/* below is the third flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {flightData.flight.departingFlights.noOfStops > 1 && (
                    
                    <div className = "flex flex-col">
                    <div className = "text-[15px] font-thin text-gray-600 px-10 mt-16">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="55" viewBox="0 0 2 58"> <path d="M1 0v58" stroke="black" stroke-width="2"/> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-10 -mt-1">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{flightData.flight.departingFlights.departureTime3}</div>
                    <div className = "text-sm font-bold px-16">{flightData.flight.departingFlights.airport3}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{flightData.flight.departingFlights.arrivalTime3}</div>
                    <div className = "text-sm font-bold px-16 ">{flightData.flight.departingFlights.destinationAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{flightData.flight.departingFlights.airline3}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{flightData.flight.departingFlights.flightNumber3} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {flightData.flight.departingFlights.duration3}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${flightData.flight.departingFlights.airline3Logo}`} />
                        </div>
                    </div>

                    )}

                   

                    {/* below a segment starts includes all the return flights */}
                    <div className = "flex flex-col">
                    <div className = "font-bold px-8 mt-20">Flight to {flightData.flight.originCity}</div>
                    <div className = "text-[15px] text-gray-600 px-8 py-2">{flightData.flight.returningFlights.noOfStops} stops · 19h 20m</div>

                    {/* below is the first flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    <div className = "flex flex-col">
                    <div className = "text-[15px] font-thin text-gray-600 px-10 mt-3">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="55" viewBox="0 0 2 58"> <path d="M1 0v58" stroke="black" stroke-width="2"/> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-10 -mt-1">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{flightData.flight.returningFlights.departureTime1}</div>
                    <div className = "text-sm font-bold px-16">{flightData.flight.returningFlights.airport1}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{flightData.flight.returningFlights.arrivalTime1}</div>
                    <div className = "text-sm font-bold px-16 ">{flightData.flight.returningFlights.airport2 ? flightData.flight.returningFlights.airport2 : flightData.flight.returningFlights.originAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{flightData.flight.returningFlights.airline1}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{flightData.flight.returningFlights.flightNumber1} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {flightData.flight.returningFlights.duration1}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${flightData.flight.returningFlights.airline1Logo}`} />
                        </div>
                    </div>

                    {/* below is the first layover and the dotted line segment */}
                    {flightData.flight.returningFlights.noOfStops > 0 && (

                    <div className = "flex flex-col">
                    <div className = "text-sm px-32 mt-20">Layover {flightData.flight.returningFlights.layoverTime1}</div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                    </div>
                    <div className = "px-24 -mt-[72px]">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                    </div>
                    </div>

                    )}
                    
                    {/* below is the second flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {flightData.flight.returningFlights.noOfStops > 0 && (

                    <div className = "flex flex-col">
                    <div className = "text-[15px] font-thin text-gray-600 px-10 mt-16">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="55" viewBox="0 0 2 58"> <path d="M1 0v58" stroke="black" stroke-width="2"/> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-10 -mt-1">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{flightData.flight.returningFlights.departureTime2}</div>
                    <div className = "text-sm font-bold px-16">{flightData.flight.returningFlights.airport2}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{flightData.flight.returningFlights.arrivalTime2}</div>
                    <div className = "text-sm font-bold px-16 ">{flightData.flight.returningFlights.airport3 ? flightData.flight.returningFlights.airport3 : flightData.flight.returningFlights.originAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{flightData.flight.returningFlights.airline2}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{flightData.flight.returningFlights.flightNumber2} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {flightData.flight.returningFlights.duration2}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${flightData.flight.returningFlights.airline2Logo}`} />
                        </div>
                    </div>

                    )}

                    {/* below is the second layover and the dotted line segment */}
                    {flightData.flight.returningFlights.noOfStops > 1 && (

                    <div className = "flex flex-col">
                    <div className = "text-sm px-32 mt-20">Layover {flightData.flight.returningFlights.layoverTime2}</div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                    </div>
                    <div className = "px-24 -mt-[72px]">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                    </div>
                    </div>

                    )}

                    {/* below is the third flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {flightData.flight.returningFlights.noOfStops > 1 && (
                    
                    <div className = "flex flex-col">
                    <div className = "text-[15px] font-thin text-gray-600 px-10 mt-16">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="55" viewBox="0 0 2 58"> <path d="M1 0v58" stroke="black" stroke-width="2"/> </svg>
                    </div>
                    <div className = "text-[15px] font-thin text-gray-600 px-10 -mt-1">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="14.000000pt" height="16.000000pt" viewBox="0 0 38.000000 40.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M115 366 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124 -15 327 -176 257z m126 -31 c64 -34 87 -120 49 -182 -50 -83 -170 -83 -220 0 -68 111 55 242 171 182z"/> </g> </svg>
                    </div>
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{flightData.flight.returningFlights.departureTime3}</div>
                    <div className = "text-sm font-bold px-16">{flightData.flight.returningFlights.airport3}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{flightData.flight.returningFlights.arrivalTime3}</div>
                    <div className = "text-sm font-bold px-16 ">{flightData.flight.returningFlights.originAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{flightData.flight.returningFlights.airline3}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{flightData.flight.returningFlights.flightNumber3} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {flightData.flight.returningFlights.duration3}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${flightData.flight.returningFlights.airline3Logo}`} />
                        </div>
                    </div>

                    )}

                    {/* below is the divider line, it must come just after the end of departing flights and the location must adjust based on the no of stops */}
                    <div className = "flex flex-col">
                    <div className="-mt-10">
                    <hr className="h-px my-24 border-0 w-[720px] bg-gray-300 mx-auto"></hr>
                    </div>

                    {/* Bagage related info, this will always be there */}
                    <div className = "font-bold px-10 -mt-20">Baggage</div>

                    <div className = "text-sm text-gray-600 w-64 px-10">The total baggage included in the price</div>

                    <div className= "-ml-80 -mt-40">
                    <hr className="h-[220px] my-24 border-0 w-px bg-gray-300 mx-auto"></hr>
                    </div>

                    {/* below are the 3 possible baggage related info that can arise regardless of the flight, the only change will be what to displayed for each airline based on their baggage policy */}
                    <div className = "px-80 mt-2">
                    <div className = "-mt-80">
                    <div className = "text-sm text-gray-800 ">2 personal items</div>
                    <div className = "text-sm text-gray-800 whitespace-nowrap">Fits under the seat in front of you</div>
                    <div className = "text-sm text-green-600 ml-96 -mt-7">Included</div>
                    <div className = "text-sm text-gray-800 -mt-10 -ml-12">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20.000000pt" height="38.000000pt" viewBox="0 0 74.000000 92.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,92.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M339 837 c-40 -18 -59 -37 -74 -73 -7 -18 -23 -35 -35 -39 -28 -9 -55 -35 -75 -75 -13 -25 -15 -68 -15 -256 1 -211 3 -228 21 -248 19 -20 31 -21 210 -23 211 -3 232 2 249 53 13 38 12 427 -1 461 -12 33 -57 80 -89 93 -18 8 -31 22 -35 38 -11 53 -104 93 -156 69z m70 -48 c17 -6 36 -20 42 -30 9 -18 5 -19 -66 -19 -41 0 -75 4 -75 8 0 11 30 38 50 45 8 3 15 6 16 6 1 1 15 -4 33 -10z m118 -115 c15 -12 34 -32 40 -45 18 -33 18 -430 1 -447 -13 -13 -331 -18 -362 -6 -14 5 -16 34 -16 223 0 296 5 303 207 298 85 -2 107 -6 130 -23z"/> <path d="M244 446 c-16 -12 -19 -28 -20 -108 -2 -127 -1 -128 164 -128 153 0 151 -1 152 123 0 123 -4 127 -158 127 -86 0 -123 -4 -138 -14z m254 -53 c3 -10 -24 -13 -112 -13 -98 0 -116 2 -116 15 0 13 17 15 112 13 78 -2 113 -7 116 -15z m-108 -77 c0 -16 27 -29 41 -20 5 3 9 12 9 20 0 8 10 14 25 14 22 0 25 -4 25 -35 l0 -35 -110 0 -110 0 0 35 0 35 60 0 c45 0 60 -4 60 -14z"/> </g> </svg>
                    </div>
                    </div>

                    <div className = "mt-4">
                    <div className = "text-sm text-gray-800 ">2 carry-on bags</div>
                    <div className = "text-sm text-gray-800 whitespace-nowrap">9.1 x 15.8 x 21.7 inches · Max weight 17.6 lbs</div>
                    <div className = "text-sm text-green-600 ml-96 -mt-7">Included</div>
                    <div className = "text-sm text-gray-800 -mt-10 -ml-12">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="18.000000pt" height="36.000000pt" viewBox="0 0 62.000000 96.000000"preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M216 874 c-3 -9 -6 -78 -6 -155 l0 -139 -34 0 c-48 0 -83 -15 -91 -40 -5 -16 -8 -232 -5 -352 0 -28 37 -58 70 -58 23 0 30 -4 30 -20 0 -14 7 -20 21 -20 12 0 23 8 26 20 5 18 14 20 79 20 67 0 74 -2 74 -20 0 -27 40 -27 47 0 4 13 14 20 31 20 14 0 35 11 49 26 23 25 24 29 23 201 -2 162 -3 177 -23 199 -16 19 -30 24 -69 24 l-49 0 2 144 c1 79 -1 148 -5 155 -4 7 -38 11 -86 11 -62 0 -79 -3 -84 -16z m130 -281 c-3 -8 -22 -13 -46 -13 l-40 0 0 129 0 130 43 3 42 3 3 -119 c1 -66 0 -126 -2 -133z m129 -238 l0 -170 -169 -3 c-129 -2 -171 1 -178 10 -9 15 -11 282 -2 316 6 22 7 22 178 20 l171 -3 0 -170z"/> <path d="M187 444 c-4 -4 -7 -16 -7 -26 0 -17 9 -18 123 -16 114 3 122 4 122 23 0 19 -8 20 -116 23 -63 1 -118 -1 -122 -4z"/> <path d="M182 288 c3 -22 6 -23 123 -23 113 0 120 1 120 20 0 19 -8 20 -123 23 l-123 3 3 -23z"/> </g> </svg>
                    </div>
                    </div>

                    <div className = "mt-4">
                    <div className = "text-sm text-gray-800 ">2 checked bags</div>
                    <div className = "text-sm text-gray-800 whitespace-nowrap">Max weight 50.7 lbs</div>
                    <div className = "text-sm text-green-600 ml-96 -mt-7">Included</div>
                    <div className = "text-sm text-gray-800 -mt-10 -ml-12">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="34.000000pt" viewBox="0 0 64.000000 94.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,94.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M192 888 c-7 -7 -12 -31 -12 -55 l0 -43 -44 0 c-28 0 -52 -7 -67 -19 l-24 -19 -2 -284 c-3 -273 -2 -285 18 -306 20 -22 32 -26 81 -22 22 1 30 -4 38 -24 5 -14 16 -26 24 -26 16 0 29 27 20 41 -3 5 28 9 71 9 72 0 76 -1 85 -26 12 -31 44 -29 48 3 3 20 9 22 47 21 35 -2 48 2 64 21 20 23 21 36 21 305 0 155 -4 286 -8 292 -13 19 -50 34 -86 34 -36 0 -36 0 -36 43 0 24 -5 48 -12 55 -16 16 -210 16 -226 0z m188 -68 l0 -30 -75 0 -75 0 0 30 0 30 75 0 75 0 0 -30z m125 -360 l0 -275 -194 -3 c-134 -2 -198 1 -207 9 -11 9 -14 62 -14 264 0 140 3 261 6 269 6 14 31 16 208 14 l201 -3 0 -275z"/> <path d="M187 634 c-4 -4 -7 -16 -7 -26 0 -17 9 -18 123 -16 114 3 122 4 122 23 0 19 -8 20 -116 23 -63 1 -118 -1 -122 -4z"/> <path d="M187 483 c-4 -3 -7 -15 -7 -25 0 -16 10 -18 120 -18 101 0 122 3 127 16 3 9 0 20 -8 25 -16 10 -222 12 -232 2z"/> <path d="M184 331 c-7 -7 -4 -41 4 -41 4 -1 56 -2 116 -2 91 -1 112 1 120 15 6 9 7 19 4 23 -8 7 -237 12 -244 5z"/> </g> </svg>
                    </div>
                    </div>

                    <div className = "text-[12px] text-gray-800 mt-8 -ml-14">Baggage policies:</div>
                    </div>

                    {/* below is the divider line */}
                    <div className= "-mt-44">
                    <hr className="h-px my-24 border-0 w-[720px] bg-gray-300 mx-auto"></hr>
                    </div>

                    <div className = "px-8 -mt-16">
                    <div className = "font-bold text-xl">${flightData.flight.totalFlightPrice}</div>
                    <div className = "text-[12px] text-gray-600">Total price for all travelers</div>
                    <div className="mt-[1345px] -ml-4">
                    <button className="relative top-[-1394px] left-[630px] inline-flex items-center justify-center px-10 py-4 overflow-hidden font-semibold font-sans tracking-tighter text-white bg-sky-500 rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b"></span>
                        <span className="relative">Confirm</span>
                    </button>
                    </div>
                    </div>
                    
                    </div>

                    </div>

                </div>

                </div>
            )} 

            </div>

        ))}
        
        </div>

        )}
        </>
    );
}

export default PlanCards;