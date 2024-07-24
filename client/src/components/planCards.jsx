import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {GoogleMap, Marker} from '@react-google-maps/api'
import { useSelector } from 'react-redux';

const Server_url = process.env.REACT_APP_BACKEND_URL;

const PlanCards = () => {

    //to store the index of the card which is clicked
    const [isExpandedTripCardIndex, setIsExpandedTripCardIndex] = useState(null);

    //creating an array to loop over the loading and pulsing cards (I want to display 20 of them by default)
    const pulsingCardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    //to get if the search button was clicked
    const isSearchClicked = useSelector((state) => state.searchButtonClicked.isClicked);

    //now storing that search click state in one more variable to control it better
    const [isShouldPlanCardPulse, setIsShouldPlanCardPulse] = useState(isSearchClicked);
 
    //using a useEffect to update the isShouldPlanCardPulse state everytime isSearchClicked changes
    useEffect (() => {
        setIsShouldPlanCardPulse(isSearchClicked);
    }, [isSearchClicked]);
    console.log(isShouldPlanCardPulse);

    //to store some trip info data for testing
    const [isTripData, setIsTripData] = useState([]);

    //a marker to know the tripData was found (I am using 0 - when it should not exist(that is the pulsing cards should come only after search button is clicked), 1 - to get the pulsing cards, and 2 again it must go away)
    const [isTripDataFound, setIsTripDataFound] = useState(0);

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
    console.log(isTripDataFound);

        useEffect(() => {
            if((isTripDataFound === 0 || isTripDataFound === 2) && isSearchClicked){

                const tripCardUrl = Server_url + '/api/testing/tripcards';
                console.log(tripCardUrl);

                const planCardData = async () => {
                    try{
                        const tripCardInfo = await axios.get(tripCardUrl);
                        const tripCardArray = tripCardInfo.data;
                        console.log(tripCardArray.length);
                        if(tripCardArray.length > 1 && tripCardArray.length === tripCardArray[0].noOfTripCards){
                            setIsTripData(tripCardArray);
                            setIsTripDataFound(1);
                            return true;
                    }
                    return false;
                    }catch(err){
                        console.log(`Error in getting the tripcard info: ${err}`);
                    }
                    
                }
            
                    //this is a set timer in place to make sure the tripdata comes to the front-end the moment it is populated inside mongoDB
                const tripRetreivalIntervalID = setInterval(async () => {
                    const tripDataFound = await planCardData();                   
                    if(tripDataFound){
                        clearInterval(tripRetreivalIntervalID);
                    }
                },5000);

                //this return statement makes sure that the component is unmounted to avoid process overhead(atleast that's what I think is happening)
                return () => {
                    clearInterval(tripRetreivalIntervalID);
                    setIsShouldPlanCardPulse(false);
                } 

            }
                                 
                  
    }, [isTripDataFound, isSearchClicked]);
    

    //a small function to take care the visual rating stars reflect the actual ratings down to fractions
    const starRatingsReflector = (hotelRating) => {

        const result = [0, 0, 0, 0, 0];
        const wholeNumber = Math.floor(hotelRating);
        const fraction = hotelRating - wholeNumber;

        for (let i = 0; i < Math.min(wholeNumber, 5); i++) {
            result[i] = 1;
        }

        if (wholeNumber < 5) {
            result[wholeNumber] = fraction;
        }

        return result;
        }

        //a function to extract the base64 string for the hotel images and create a image url which will go directly into the src in my img tags for the hotel images rendering
        const hotelImageBase64Extractor = (base64String) => {

            const base64ExtractedString = base64String.toString('base64');
            const imgUrl = `data:image/jpeg;base64,${base64ExtractedString}`;
            return imgUrl;

        }


    return(
        <>
        {/* I will show the pulsing of a bunch of cards to indicate loading while the users wait */}
        {isShouldPlanCardPulse && (
        <div className = "grid gap-y-[60px] mx-[250px] grid-cols-4 ml-[-150px]">
     
        {pulsingCardsArray.map((index) => (  
            <div key={index} className="relative top-[160px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md">
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-64 mt-14 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-64 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-48 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-48 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-64 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-64 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-64 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-48 mt-2 ml-5 animate-pulse"></div>
                <div class="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-48 mt-2 ml-5 animate-pulse"></div>
            </div>
        ))}
        </div>

        )}
        

        {/* Below is an entire trip card format which I will use to render all the tripcards */}
        {isTripData.length > 0 && (
        
        <div className = "grid gap-y-[60px] mx-[250px] grid-cols-4 ml-[-150px]">
        {isTripData.map((tripData, index) => (

            <div key={index}>

                <button onClick = {() => handleTripCardExpansion(index)} className="relative hover:bg-gray-100 top-[160px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                    <div className='mr-52 mt-5 text-[20px] font-semibold text-sky-500'>Flight</div>
                    <div className='-ml-[61px] mt-3 w-52 font-semibold text-sm'>Depart: 
                    <div className="font-normal -mt-5 ml-[67px] w-64">{tripData.flight.originCity} → {tripData.flight.destinationCity},</div>
                    <div className="font-normal ml-60 text-[12px] w-32 -mt-5">{tripData.flight.departingFlights.noOfStops} stops · {tripData.flight.departingFlights.totalTime}</div>
                    </div>
                    <div className='-ml-[61px] mt-1 w-52 font-semibold text-sm'>Return: 
                    <div className="font-normal -mt-5 ml-[67px] w-64">{tripData.flight.destinationCity} → {tripData.flight.originCity},</div>
                    <div className="font-normal ml-[243px] text-[12px] w-32 -mt-5">{tripData.flight.returningFlights.noOfStops} stops · {tripData.flight.returningFlights.totalTime}</div>
                    </div>
                    <div className='mr-52 mt-2 text-[20px] font-semibold text-sky-500'>Stay</div>
                    <div className='relative text-sm font-[500] w-64 mt-2 ml-1'>{tripData.stay.name}</div>
                    <div class="flex items-center p-8 -mt-8 -ml-2">
                            <svg class="w-6 h-6 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                            <defs>
                                <linearGradient id="star-gradient-1">
                                    <stop offset={`${100 * starRatingsReflector(tripData.stay.averageRatings)[0]}%`}stopColor="#fde047" />
                                    <stop offset={`${100 * (1 - starRatingsReflector(tripData.stay.averageRatings)[0])}%`} stopColor="#666666"/>
                                </linearGradient>
                            </defs>
                                <path fill="url(#star-gradient-1)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <div className=''>{tripData.stay.averageRatings}</div>
                        </div>
                        
                        <div className='font-semibold -mt-9 ml-40 text-[22px] text-sky-500'>${(Number(tripData.flight.totalFlightPrice) + Number(tripData.stay.totalPrice)).toFixed(2)}</div>
                </button>


            {isExpandedTripCardIndex === index && (
                <div onClick = {handleTripCardClose} className = "fixed inset-0 bg-black bg-opacity-50 z-20 overflow-hidden"></div>
                )}

            {isExpandedTripCardIndex === index && (
                <div id="expanded-tripCard" className="fixed top-[50px] left-[300px] bg-white ring-1 ring-black ring-opacity-5 w-[800px] h-[730px] text-gray-700 font-normal rounded-lg shadow-md z-30 overflow-auto">

                
                    {/* top of the flight card will get rendered always (within the trip card)*/}
                    <div className = "flex flex-col p-8">
                    <div className = "font-bold text-xl mb-10">Your Trip to {tripData.flight.destinationCity}</div>
                    <div className = "ring-1 ring-black ring-opacity-10 rounded-md w-[710px] h-[50px]">
                        <div className = "text-sm text-green-600 p-3 justify-start">15% lower CO2e emissions than the average of all flights we offer for this route</div>
                    </div>
                    </div>
                    {/* below a segment starts includes all the departing flights */}
                    <div className = "flex flex-col">
                    <div className = "font-bold px-8">Flight to {tripData.flight.destinationCity}</div>
                    <div className = "text-[15px] text-gray-600 px-8 py-2">{tripData.flight.departingFlights.noOfStops} stops · {tripData.flight.departingFlights.totalTime}</div>

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
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{tripData.flight.departingFlights.departureTime1}</div>
                    <div className = "text-sm font-bold px-16">{tripData.flight.departingFlights.airport1}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{tripData.flight.departingFlights.arrivalTime1}</div>
                    <div className = "text-sm font-bold px-16 ">{tripData.flight.departingFlights.airport2 ? tripData.flight.departingFlights.airport2 : tripData.flight.departingFlights.destinationAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{tripData.flight.departingFlights.airline1}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{tripData.flight.departingFlights.flightNumber1} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {tripData.flight.departingFlights.duration1}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${tripData.flight.departingFlights.airline1Logo}`} />
                        </div>
                    </div>

                {/* below is the first layover and the dotted line segment */}
                   {tripData.flight.departingFlights.noOfStops > 0 && (
                    <div className = "flex flex-col">
                        <div className = "text-sm px-32 mt-20">Layover {tripData.flight.departingFlights.layoverTime1}</div>
                        <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                        </div>
                        <div className = "px-24 -mt-[72px]">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                        </div>
                    </div>
                   )}
                    
                    {/* below is the second flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {tripData.flight.departingFlights.noOfStops > 0 && (

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
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{tripData.flight.departingFlights.departureTime2}</div>
                    <div className = "text-sm font-bold px-16">{tripData.flight.departingFlights.airport2}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{tripData.flight.departingFlights.arrivalTime2}</div>
                    <div className = "text-sm font-bold px-16 ">{tripData.flight.departingFlights.airport3 ? tripData.flight.departingFlights.airport3 : tripData.flight.departingFlights.destinationAirport}
                    </div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{tripData.flight.departingFlights.airline2}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{tripData.flight.departingFlights.flightNumber2} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {tripData.flight.departingFlights.duration2}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${tripData.flight.departingFlights.airline2Logo}`} />
                        </div>
                    </div>

                    )}

                    {/* below is the second layover and the dotted line segment */}
                    {tripData.flight.departingFlights.noOfStops > 1 && (

                    <div className = "flex flex-col">
                        <div className = "text-sm px-32 mt-20">Layover {tripData.flight.departingFlights.layoverTime2}</div>
                        <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                        </div>
                        <div className = "px-24 -mt-[72px]">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                        </div>
                    </div>

                   )}

                    {/* below is the third flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {tripData.flight.departingFlights.noOfStops > 1 && (
                    
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
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{tripData.flight.departingFlights.departureTime3}</div>
                    <div className = "text-sm font-bold px-16">{tripData.flight.departingFlights.airport3}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{tripData.flight.departingFlights.arrivalTime3}</div>
                    <div className = "text-sm font-bold px-16 ">{tripData.flight.departingFlights.destinationAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{tripData.flight.departingFlights.airline3}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{tripData.flight.departingFlights.flightNumber3} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {tripData.flight.departingFlights.duration3}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${tripData.flight.departingFlights.airline3Logo}`} />
                        </div>
                    </div>

                    )}

                   

                    {/* below a segment starts includes all the return flights */}
                    <div className = "flex flex-col">
                    <div className = "font-bold px-8 mt-20">Flight to {tripData.flight.originCity}</div>
                    <div className = "text-[15px] text-gray-600 px-8 py-2">{tripData.flight.returningFlights.noOfStops} stops · {tripData.flight.returningFlights.totalTime}</div>

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
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{tripData.flight.returningFlights.departureTime1}</div>
                    <div className = "text-sm font-bold px-16">{tripData.flight.returningFlights.airport1}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{tripData.flight.returningFlights.arrivalTime1}</div>
                    <div className = "text-sm font-bold px-16 ">{tripData.flight.returningFlights.airport2 ? tripData.flight.returningFlights.airport2 : tripData.flight.returningFlights.originAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{tripData.flight.returningFlights.airline1}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{tripData.flight.returningFlights.flightNumber1} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {tripData.flight.returningFlights.duration1}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${tripData.flight.returningFlights.airline1Logo}`} />
                        </div>
                    </div>

                    {/* below is the first layover and the dotted line segment */}
                    {tripData.flight.returningFlights.noOfStops > 0 && (

                    <div className = "flex flex-col">
                    <div className = "text-sm px-32 mt-20">Layover {tripData.flight.returningFlights.layoverTime1}</div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                    </div>
                    <div className = "px-24 -mt-[72px]">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                    </div>
                    </div>

                    )}
                    
                    {/* below is the second flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {tripData.flight.returningFlights.noOfStops > 0 && (

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
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{tripData.flight.returningFlights.departureTime2}</div>
                    <div className = "text-sm font-bold px-16">{tripData.flight.returningFlights.airport2}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{tripData.flight.returningFlights.arrivalTime2}</div>
                    <div className = "text-sm font-bold px-16 ">{tripData.flight.returningFlights.airport3 ? tripData.flight.returningFlights.airport3 : tripData.flight.returningFlights.originAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{tripData.flight.returningFlights.airline2}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{tripData.flight.returningFlights.flightNumber2} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {tripData.flight.returningFlights.duration2}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${tripData.flight.returningFlights.airline2Logo}`} />
                        </div>
                    </div>

                    )}

                    {/* below is the second layover and the dotted line segment */}
                    {tripData.flight.returningFlights.noOfStops > 1 && (

                    <div className = "flex flex-col">
                    <div className = "text-sm px-32 mt-20">Layover {tripData.flight.returningFlights.layoverTime2}</div>
                    <div className = "text-[15px] font-thin text-gray-600 px-12 -mt-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="130" viewBox="0 0 1 100"> <path d="M0.5 0v130" stroke="black" stroke-width="1" stroke-dasharray="4 4"/> </svg>
                    </div>
                    <div className = "px-24 -mt-[72px]">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="16.000000pt" height="18.000000pt" viewBox="0 0 40.000000 42.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,42.000000) scale(0.100000,-0.100000)" fill="#333333" stroke="none"> <path d="M130 351 c-55 -29 -75 -64 -75 -130 0 -47 5 -64 27 -93 92 -120 285 -37 265 113 -14 103 -125 160 -217 110z m131 -23 c39 -22 69 -69 69 -108 0 -59 -71 -130 -130 -130 -59 0 -130 71 -130 130 0 35 40 98 74 114 43 21 72 20 117 -6z"/> <path d="M190 247 c0 -25 9 -42 35 -67 44 -43 60 -31 17 13 -20 21 -32 43 -32 60 0 15 -4 27 -10 27 -5 0 -10 -15 -10 -33z"/> </g></svg>
                    </div>
                    </div>

                    )}

                    {/* below is the third flight, it includes the svgs used and the data displayed in that rectangular segment, it defines one flight which will be later used to display based on no of stops */}
                    {tripData.flight.returningFlights.noOfStops > 1 && (
                    
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
                    <div className = "text-[12px] text-gray-600 px-16 -mt-20">{tripData.flight.returningFlights.departureTime3}</div>
                    <div className = "text-sm font-bold px-16">{tripData.flight.returningFlights.airport3}</div>
                    <div className = "text-[12px] text-gray-600 px-16 mt-6">{tripData.flight.returningFlights.arrivalTime3}</div>
                    <div className = "text-sm font-bold px-16 ">{tripData.flight.returningFlights.originAirport}</div> 
                    <div className = "text-[12px] text-gray-600 px-[570px] -mt-16 whitespace-nowrap">{tripData.flight.returningFlights.airline3}</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">{tripData.flight.returningFlights.flightNumber3} · Economy</div>
                    <div className = "text-[12px] text-gray-600 px-[570px] whitespace-nowrap">Flight time {tripData.flight.returningFlights.duration3}</div>
                    <div className = "ml-[525px] -mt-14">
                    <img className = "w-[26px]" src={`data:image/jpeg;base64,${tripData.flight.returningFlights.airline3Logo}`} />
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
                    <div className = "font-bold text-xl">${tripData.flight.totalFlightPrice}</div>
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

                    {/* this is where all the stay data starts */}
                    <div className = "flex flex-col -mt-[1350px]">
                    <a href={tripData.stay.websiteLink} target="_blank" rel="noopener noreferrer" className = "font-bold px-8 text-[24px] hover:text-sky-600">{tripData.stay.name}</a>
                        <img className = "p-8" src = {hotelImageBase64Extractor(tripData.stay.image1)} alt="la" style= {{width:"540px", height:"460px"}} />
                        <img className = "ml-[530px] -mt-[427px]" src = {hotelImageBase64Extractor(tripData.stay.image2)} alt="la" style= {{width:"240px", height:"190px"}} />
                        <img className = "ml-[530px] mt-5" src = {hotelImageBase64Extractor(tripData.stay.image3)} alt="la" style= {{width:"240px", height:"190px"}} />

                        <div class="flex items-center p-8">
                            <svg class="w-8 h-8 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                            <defs>
                                <linearGradient id="star-gradient-1">
                                    <stop offset={`${100 * starRatingsReflector(tripData.stay.averageRatings)[0]}%`}stopColor="#fde047" />
                                    <stop offset={`${100 * (1 - starRatingsReflector(tripData.stay.averageRatings)[0])}%`} stopColor="#666666"/>
                                </linearGradient>
                            </defs>
                                <path fill="url(#star-gradient-1)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-8 h-8  me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                            <defs>
                                <linearGradient id="star-gradient-2">
                                    <stop offset={`${100 * starRatingsReflector(tripData.stay.averageRatings)[1]}%`}stopColor="#fde047" />
                                    <stop offset={`${100 * (1 - starRatingsReflector(tripData.stay.averageRatings)[1])}%`} stopColor="#666666"/>
                                </linearGradient>
                            </defs>
                                <path fill="url(#star-gradient-2)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-8 h-8  me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                            <defs>
                                <linearGradient id="star-gradient-3">
                                    <stop offset={`${100 * starRatingsReflector(tripData.stay.averageRatings)[2]}%`}stopColor="#fde047" />
                                    <stop offset={`${100 * (1 - starRatingsReflector(tripData.stay.averageRatings)[2])}%`} stopColor="#666666"/>
                                </linearGradient>
                            </defs>
                                <path fill="url(#star-gradient-3)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-8 h-8  me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                            <defs>
                                <linearGradient id="star-gradient-4">
                                    <stop offset={`${100 * starRatingsReflector(tripData.stay.averageRatings)[3]}%`}stopColor="#fde047" />
                                    <stop offset={`${100 * (1 - starRatingsReflector(tripData.stay.averageRatings)[3])}%`} stopColor="#666666"/>
                                </linearGradient>
                            </defs>
                                <path fill="url(#star-gradient-4)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-8 h-8  me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                            <defs>
                                <linearGradient id="star-gradient-5">
                                    <stop offset={`${100 * starRatingsReflector(tripData.stay.averageRatings)[4]}%`}stopColor="#fde047" />
                                    <stop offset={`${100 * (1 - starRatingsReflector(tripData.stay.averageRatings)[4])}%`} stopColor="#666666"/>
                                </linearGradient>
                            </defs>
                                <path fill="url(#star-gradient-5)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <p class="ms-1 text-lg font-medium text-gray-500 dark:text-gray-700">{tripData.stay.averageRatings}</p>
                            <p class="ms-1 text-lg font-medium text-gray-500 dark:text-gray-700">out of</p>
                            <p class="ms-1 text-lg font-medium text-gray-500 dark:text-gray-700">5</p>
                        </div>

                        <div className = "flex flex-col font-bold p-8 -mt-10">
                                <div>Amenities</div>
                                
                                <div>
                                <div>    
                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                <path d="m22.602 61.141c0-0.82031 0.67969-1.5 1.5-1.5 0.83984 0 1.5 0.67969 1.5 1.5 0 0.84375-0.66016 1.5-1.5 1.5-0.82031 0-1.5-0.65625-1.5-1.5zm73.898 30.328c0 2.7773-2.2578 5.0352-5.0352 5.0352l-82.93-0.003906c-2.7773 0-5.0352-2.2578-5.0352-5.0352 0-2.7734 2.2578-5.0312 5.0352-5.0312h10.125v-16.211c0-1.6875 0.28906-3.3359 0.86328-4.9141 0.28125-0.78125 1.1406-1.1719 1.9219-0.89844 0.77734 0.28125 1.1797 1.1445 0.89844 1.9219-0.45312 1.2422-0.68359 2.5508-0.68359 3.8828v16.211h4.9766c-0.29688-4.7188 0.32812-9.4375 1.125-14.109 1.2539-2.1016 1.6055 6.6562 1.7812 7.4141 0.16016 2.2461 0.41406 6.6953 0.41406 6.6953h31.199c-0.27734-0.625-0.4375-1.3086-0.4375-2.0352 0-2.1133 1.3125-3.918 3.1641-4.6641v-0.30859c0-4.5938 3.3711-8.3906 7.7656-9.1133v-1.1211c0-0.82812 0.67187-1.5 1.5-1.5 0.82812 0 1.5 0.67188 1.5 1.5v1.1211c1.3477 0.22266 2.6055 0.70703 3.6953 1.4453v-1.5391c0-6.2734-5.1133-11.383-11.398-11.383h-4.0664c-0.125 0-0.23438 0.085937-0.26562 0.21094l-1.8477 7.5859c-0.72266 2.9805-3.375 5.0625-6.4453 5.0625h-8.5c-3.0781 0-5.7344-2.0938-6.4531-5.0859l-1.8164-7.5625c-0.03125-0.125-0.14062-0.21094-0.26562-0.21094h-4.2188c-1.1484 0-2.2812 0.17188-3.3672 0.50781-0.79688 0.24219-1.6328-0.19531-1.875-0.99219-0.24219-0.78906 0.19922-1.6328 0.99219-1.875 1.375-0.42578 2.8047-0.64062 4.2578-0.64062h4.2188c1.3281 0 2.457 0.8125 2.9648 2h0.53125c1.1602 0 2.1055-0.94531 2.1055-2.1055v-4.5156c-2.9453-1.5547-5.3438-4.0469-6.7617-7.1484-0.48828 0.11719-0.98828 0.1875-1.5039 0.1875-3.5781 0-6.4844-2.9102-6.4844-6.4844 0-3.082 2.1641-5.668 5.0781-6.3164-0.38281-4.1836 0.79688-8.3906 3.4492-11.816 1.4648-1.8906 3.2773-3.3906 5.3047-4.4883-0.36719-0.96875-0.56641-2-0.56641-3.043 0-4.7422 3.8594-8.6016 8.6016-8.6016 4.7422 0 8.6016 3.8594 8.6016 8.6016 0 1.043-0.19531 2.0781-0.5625 3.0469 2.0234 1.0977 3.8359 2.6016 5.3008 4.4883 2.6445 3.4141 3.8242 7.6055 3.4453 11.812 2.9219 0.64453 5.082 3.2344 5.082 6.3203 0 3.5781-2.9102 6.4844-6.4844 6.4844-0.51953 0-1.0234-0.070312-1.5156-0.19141-1.4258 3.1094-3.8164 5.5977-6.75 7.1484v4.5195c0 1.1602 0.94531 2.1055 2.1055 2.1055h0.6875c0.50781-1.1836 1.6367-2 2.9648-2h4.0664c7.9375 0 14.398 6.4531 14.398 14.383v4.9844c0.66016 1.2734 1.0703 2.6914 1.0703 4.2227v0.30859c1.8477 0.74609 3.1602 2.5508 3.1602 4.6641 0 0.72656-0.16016 1.4102-0.4375 2.0352h6.332c2.7773 0 5.0352 2.2578 5.0352 5.0312zm-31.645-50.266c0.17188 0.027344 0.34766 0.054687 0.52734 0.054687 1.9219 0 3.4844-1.5625 3.4844-3.4844 0-1.6055-1.0859-2.9609-2.5742-3.3633zm-29.715 0-1.4375-6.793c-1.4883 0.40234-2.5742 1.7578-2.5742 3.3633 0 1.9219 1.5625 3.4844 3.4844 3.4844 0.17969 0 0.35156-0.03125 0.52734-0.054687zm22.082-11.941c1.3945 1.5391 3.9609 2.9453 6.293 3.7383 0.89844-4.0859-0.011719-8.2383-2.5508-11.516-0.33203-0.42578-0.68359-0.83203-1.0547-1.2109 0.16016 4.0781-1.6406 7.4141-2.6875 8.9922zm-12.832-17.152c0 0.63281 0.14453 1.2461 0.35156 1.8398 1.6719-0.54297 3.4336-0.84766 5.25-0.84766 1.8164 0 3.582 0.30469 5.25 0.84766 0.20703-0.59375 0.35156-1.207 0.35156-1.8398 0-3.0898-2.5156-5.6016-5.6016-5.6016-3.0898 0-5.6016 2.5156-5.6016 5.6016zm-8.125 19.852c4.6953 1.1797 14.73 0.75781 17.875-3.5625 0.011719-0.019532 1.2305-1.5234 2.0234-3.6875 0.69531-1.9102 1.1172-4.3984 0.24219-7.0312-1.9492-1.0195-4.1328-1.5781-6.4141-1.5781-4.3242 0-8.3203 1.9609-10.969 5.3789-2.3359 3.0156-3.3047 6.7656-2.7578 10.48zm13.727 18.035c5.5938 0 10.477-3.7812 11.875-9.1953l1.0273-4.8516c-2.3867-0.77344-5.5586-2.2969-7.6094-4.3672-4.625 4.1758-13.496 4.3516-18.367 3.5664l1.2109 5.7188c1.3867 5.3516 6.2734 9.1328 11.863 9.1328zm9.0859 10.836c-2.75-0.074219-4.9688-2.3242-4.9688-5.0938v-3.3555c-1.3203 0.37109-2.6914 0.61328-4.1172 0.61328-1.4258 0-2.7969-0.24219-4.1172-0.61328v3.3555c0 2.7188-2.1445 4.9297-4.8281 5.0781l1.2266 5.1016c0.39453 1.6406 1.8477 2.7852 3.5352 2.7852h8.5c1.6797 0 3.1328-1.1406 3.5312-2.7734l1.2422-5.1016zm7.8008 18.539h12.52c-0.035157-3.4258-2.8242-6.2031-6.2578-6.2031s-6.2266 2.7773-6.2578 6.2031zm-3.168 5.0312c0 1.125 0.91406 2.0352 2.0352 2.0352h14.785c1.1211 0 2.0312-0.91406 2.0312-2.0352s-0.91406-2.0312-2.0312-2.0312h-14.785c-1.125 0-2.0352 0.91406-2.0352 2.0312zm29.781 7.0703c0-1.1211-0.91406-2.0312-2.0352-2.0312l-82.922-0.007812c-1.125 0-2.0352 0.91406-2.0352 2.0312 0 1.125 0.91406 2.0352 2.0352 2.0352h82.93c1.125 0 2.0352-0.91406 2.0352-2.0352z"/>
                               </svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">24 hr Concierge</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path d="M27.6,34.5c4.9,0,8.9-4,8.9-8.9c0-1.7-0.5-3.4-1.4-4.7v-6.4H19.9V21c-0.8,1.3-1.3,2.9-1.3,4.6   C18.7,30.5,22.7,34.5,27.6,34.5z M27.6,21.3c2.3,0,4.2,1.9,4.2,4.2s-1.9,4.2-4.2,4.2c-2.3,0-4.2-1.9-4.2-4.2S25.3,21.3,27.6,21.3z"/><path d="M89.8,57.8v-4.6h-1c-0.5-1.5-1.5-2.8-2.9-3.6C85.5,48,84.2,47,82.6,47c-1.6,0-2.9,1-3.3,2.5c-1.4,0.8-2.4,2.1-2.9,3.6h-1   v4.6H46.3V35.3h-14l-4.7,5.1l-4.7-5.1H9v22.5H5V95h90V57.8H89.8z M80,55c0-1.1,0.7-2.1,1.8-2.5l0.9-0.3l0.9,0.3   c1.1,0.4,1.8,1.4,1.8,2.5v1.6H80V55z M33.9,39.5h8.5v2.6H31.5L33.9,39.5z M26.1,47.8c0.8,0,1.5,0.7,1.5,1.6c0,0.9-0.7,1.6-1.5,1.6   c-0.8,0-1.5-0.7-1.5-1.6C24.7,48.6,25.3,47.8,26.1,47.8z M26.1,53.6c0.8,0,1.5,0.7,1.5,1.6c0,0.9-0.7,1.6-1.5,1.6   c-0.8,0-1.5-0.7-1.5-1.6C24.7,54.3,25.3,53.6,26.1,53.6z M12.8,39.5h8.5l2.4,2.6H12.8V39.5z M91,61.8v1.7H9v-1.7H91z M9,91V67.2h82   V91H9z"/><path d="M58.5,26.5c0,6.9,5.6,12.5,12.5,12.5s12.5-5.6,12.5-12.5C83.5,19.6,77.9,14,71,14S58.5,19.6,58.5,26.5z M71,17.8   c4.8,0,8.7,3.9,8.7,8.7s-3.9,8.7-8.7,8.7s-8.7-3.9-8.7-8.7S66.2,17.8,71,17.8z"/><path d="M71,28h4.6v-3h-3.1v-4.7h-3v6.2C69.5,27.3,70.2,28,71,28z"/><path d="M52.6,26.5c0,10.2,8.3,18.4,18.4,18.4s18.4-8.3,18.4-18.4S81.2,8,71,8c-0.8,0-1.5,0.7-1.5,1.5S70.2,11,71,11   c8.5,0,15.4,6.9,15.4,15.4S79.5,41.9,71,41.9S55.6,35,55.6,26.5c0-4.5,1.9-8.7,5.3-11.6l0.9,1.2c0.4,0.5,1.1,0.4,1.4-0.1l3-5.8   c0.3-0.6-0.2-1.3-0.9-1.2l-6.4,1c-0.6,0.1-0.9,0.8-0.5,1.3l0.8,1.2C54.9,15.9,52.6,21,52.6,26.5z"/></g></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">24 hr Reception</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 66 82.5" enable-background="new 0 0 66 66" xml:space="preserve"><g><path d="M30.0800724,14.0141039c-0.210022,0.039978-0.3699951,0.2199707-0.3900146,0.4299927l-1.2599487,11.710021   c-0.0200195,0.1599731,0.039978,0.3200073,0.1599731,0.4299927c0.0900269,0.0800171,0.210022,0.1300049,0.3400269,0.1300049   c0.0299683,0,0.0699463-0.0100098,0.0999756-0.0100098l2.3900146-0.5200195   c1.0000019-0.2099609,1.7899799-0.9500122,2.0700092-1.9299927l3.1599731-10.8999624   c0.0499878-0.1700439,0.0100098-0.3600464-0.1099854-0.4800415c-0.1199951-0.1300049-0.2999878-0.1900024-0.4700317-0.1499634   L30.0800724,14.0141039z"/><path d="M28.2900944,9.0440722l6.1799946-1.3299565l-4.4400043-5.0800171   c-0.6600342-0.7700195-1.6799927-1.1099854-2.6799927-0.9000244l-2.3900146,0.5100098   c-0.1500244,0.0400391-0.289978,0.1400146-0.3499756,0.2900391c-0.0599976,0.1499634-0.0500488,0.3200073,0.0299683,0.4599609   L28.2900944,9.0440722z"/><path d="M17.9000797,17.1041298l-0.6400146,4.3199463c-0.0458164,0.3673782,0.3123665,0.6558876,0.6000366,0.5599976   l1.6399536-0.3499756c0.1600342-0.0299683,0.3000488-0.1500244,0.3600464-0.3099976l1.2599487-3.289978   c1.2200317,0.539978,2.6000366,0.6900024,3.8900146,0.4099731l3.1099854-0.6400146   c0.0700073-0.0100098,0.1400146-0.0299683,0.210022-0.039978l0.3699951-3.4299917   c0.0499878-0.6400146,0.5499878-1.1799927,1.1900024-1.2999878l5.9700336-1.2900391   c0.0899658-0.0199585,0.1999512-0.0299683,0.3200073-0.0299683c0.4099731,0,0.8099976,0.1699829,1.0899658,0.4799805   c0.3499756,0.3499756,0.4899902,0.9100342,0.3400269,1.4400024l-0.6700439,2.3200073   c3.0700073-0.6600342,6.460022-1.4100342,10.4900513-2.3400269c1.5599976-0.3299561,2.9299927-1.2399902,3.8399658-2.5499878   c0.2999878-0.3999634,0.3200073-0.8800049,0.039978-1.3200073c-1.3999634-2.1799932-8.5999756-2.8499761-12.1599731-2.0100102   l-19.369997,4.1700444L17.89007,9.0741014c-0.1099854-0.1699829-0.3200073-0.25-0.5200195-0.210022l-2.4899893,0.5300293   c-0.1499634,0.0299683-0.2799683,0.1300049-0.3399658,0.2700195c-0.0700073,0.1399536-0.0700073,0.2999878-0.0100098,0.4400024   L17.9000797,17.1041298z M39.3601036,8.7141161c1.5799561-0.3400269,3.6099854-0.460022,5.7999878-0.210022l-5.2999878,1.1400146   c-0.6500244,0.1400146-1.2900391-0.1600342-1.6199951-0.6900024L39.3601036,8.7141161z"/><path d="M16.6100407,25.3137245h-0.999999v1c0.999999,0,0,0,0.999999,0V25.3137245z"/><path d="M15.9196119,16.5334511h-1v1c1,0,0,0,1,0V16.5334511z"/><path d="M23.8200016,28.3537636c0.2294922,0.4404297,0,0,0.2294922,0.4404297l0.8808594-0.4804688L24.45965,27.4338417   l-0.8798828,0.4804688L23.8200016,28.3537636z"/><path d="M18.6100407,26.3137245c1,0,0,0,1,0v-1h-1V26.3137245z"/><path d="M21.419611,26.4143105l0.4599609,0.1894531c0.4599609,0.1904297,0,0,0.4599609,0.1904297l0.3798828-0.9199219   l-0.4599609-0.1904297l-0.4599609-0.1894531L21.419611,26.4143105z"/><path d="M12.5797682,17.6838417l0.4804688-0.1396484l-0.2802734-0.9599609l-0.9599609,0.2792969   c0.2802734,0.9599609,0,0,0.2802734,0.9599609L12.5797682,17.6838417z"/><path d="M8.8297682,22.3039589l1-0.0800781l-0.0800781-0.9902344l-1,0.0800781l0.0400391,0.4902344   C8.8297682,22.3039589,8.7897291,21.8039589,8.8297682,22.3039589z"/><path d="M9.7799635,24.4338417l0.3496094,0.3603516c0.3398438,0.3701172,0,0,0.3398438,0.3701172l0.7304688-0.6904297   l-0.7001953-0.7294922L9.7799635,24.4338417z"/><path d="M10.459651,19.2141151l0.2900391-0.4101563l-0.8300781-0.5703125l-0.2792969,0.4101563l-0.2802734,0.4101563   c0.8203125,0.5703125,0,0,0.8203125,0.5703125L10.459651,19.2141151z"/><path d="M12.5602369,26.2141151l0.4892578,0.0595703c0.5,0.0605469,0,0,0.5,0.0605469l0.1201172-0.9902344l-0.9892578-0.1201172   L12.5602369,26.2141151z"/><path d="M59.2300987,34.2041054c-0.8600464-1.8200073-2.6900024-2.9899902-4.6900024-2.9899902H25.2897282v-0.6904297h-1v0.6904297   H6.2700758c-1.5899658,0-3.0200198,1.0799561-3.4799807,2.6199951C1.7600659,37.4541054,1.2500561,41.59412,1.2600659,45.7940712   h63.3099937L59.2300987,34.2041054z M13.0000563,43.0640907H4.9201002   c0.1699829-2.8200073,0.6199951-5.5999756,1.3299561-8.0999756h6.75V43.0640907z M26.6000919,43.0640907H17.64007v-8.0999756   h8.960022V43.0640907z M40.2000694,43.0640907h-8.9599628v-8.1199951h8.9599628V43.0640907z M44.8400841,34.9440956h9.7199707   c0.5800171,0,1.1400146,0.3599854,1.3900146,0.9000244l3.3300171,7.2199707H44.8400841V34.9440956z"/><path d="M1.2700757,46.7940712c0.0800171,3.8100586,0.5900269,7.4200439,1.5100096,10.4800415   c0.4400024,1.4799805,1.8499758,2.5100098,3.4299929,2.5100098h5.4000244c-0.0100098-0.1700439-0.0200195-0.3300171-0.0200195-0.5   c0-3.3300171,2.7199707-6.0400391,6.0499868-6.0400391c3.3400269,0,6.0499878,2.710022,6.0499878,6.0400391   c0,0.1699829-0.0099487,0.3299561-0.0199585,0.5h18.0100117c-0.0100098-0.1700439-0.0200195-0.3300171-0.0200195-0.5   c0-3.3300171,2.7199707-6.0400391,6.0599976-6.0400391c3.3300171,0,6.039978,2.710022,6.039978,6.0400391   c0,0.1699829-0.0100098,0.3299561-0.0199585,0.5h7.3999634c1.9899902,0,3.6000328-1.6100464,3.6000328-3.5900269v-9.4000244   H1.2700757z M63.7401085,54.9840736h-1.5100098c-0.7600098,0-1.3800049-0.6299438-1.3800049-1.3999634v-0.7700195   c0-0.7799683,0.6199951-1.4099731,1.3800049-1.4099731h1.5100098V54.9840736z"/><path d="M17.6443424,54.2392616c-2.7920523,0-5.0550528,2.2630005-5.0550528,5.0438232   c0,2.7921143,2.2630005,5.0438271,5.0550528,5.0438271c2.7808228,0,5.0438232-2.2517128,5.0438232-5.0438271   C22.6881657,56.5022621,20.4251652,54.2392616,17.6443424,54.2392616z M17.6451969,61.8273964   c-1.4091797,0-2.5556631-1.1416016-2.5556631-2.5439453s1.1464834-2.5439453,2.5556631-2.5439453   c1.4023438,0,2.5439453,1.1416016,2.5439453,2.5439453S19.0475407,61.8273964,17.6451969,61.8273964z"/><path d="M17.6451969,57.7395058c-0.8574219,0-1.5556641,0.6923828-1.5556641,1.5439453s0.6982422,1.5439453,1.5556641,1.5439453   c0.8515625,0,1.5439453-0.6923828,1.5439453-1.5439453S18.4967594,57.7395058,17.6451969,57.7395058z"/><path d="M47.7155113,57.7395058c-0.8574219,0-1.5556641,0.6923828-1.5556641,1.5439453s0.6982422,1.5439453,1.5556641,1.5439453   c0.8515625,0,1.5439453-0.6923828,1.5439453-1.5439453S48.5670738,57.7395058,47.7155113,57.7395058z"/><path d="M47.7153893,54.2392616c-2.7921143,0-5.0550537,2.2630005-5.0550537,5.0438232   c0,2.7921143,2.2629395,5.0438271,5.0550537,5.0438271c2.7808228,0,5.0438232-2.2517128,5.0438232-5.0438271   C52.7592125,56.5022621,50.496212,54.2392616,47.7153893,54.2392616z M47.7155113,61.8273964   c-1.4091797,0-2.5556641-1.1416016-2.5556641-2.5439453s1.1464844-2.5439453,2.5556641-2.5439453   c1.4023438,0,2.5439453,1.1416016,2.5439453,2.5439453S49.1178551,61.8273964,47.7155113,61.8273964z"/></g></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Airport Shuttle</div>
                                </div>

                               

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                <g>
                                <path d="m9.375 65.625c1.7266 0 3.125-1.3984 3.125-3.125v-25c0-1.7266-1.3984-3.125-3.125-3.125s-3.125 1.3984-3.125 3.125v25c0 1.7266 1.3984 3.125 3.125 3.125z"/>
                                <path d="m21.875 68.75v-37.5c0-1.7266-1.3984-3.125-3.125-3.125s-3.125 1.3984-3.125 3.125v37.5c0 1.7266 1.3984 3.125 3.125 3.125s3.125-1.3984 3.125-3.125z"/>
                                <path d="m90.625 34.375c-1.7266 0-3.125 1.3984-3.125 3.125v25c0 1.7266 1.3984 3.125 3.125 3.125s3.125-1.3984 3.125-3.125v-25c0-1.7266-1.3984-3.125-3.125-3.125z"/>
                                <path d="m84.375 68.75v-37.5c0-1.7266-1.3984-3.125-3.125-3.125s-3.125 1.3984-3.125 3.125v37.5c0 1.7266 1.3984 3.125 3.125 3.125s3.125-1.3984 3.125-3.125z"/>
                                <path d="m31.25 25c0-1.7266-1.3984-3.125-3.125-3.125s-3.125 1.3984-3.125 3.125v50c0 1.7266 1.3984 3.125 3.125 3.125s3.125-1.3984 3.125-3.125v-15.625h37.5v15.625c0 1.7266 1.3984 3.125 3.125 3.125s3.125-1.3984 3.125-3.125v-50c0-1.7266-1.3984-3.125-3.125-3.125s-3.125 1.3984-3.125 3.125v15.625h-37.5z"/>
                                </g>
                                </svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Gym</div>
                                </div>

                                </div>
                                </div>

                                <div className = "ml-40 -mt-[160px]">
                                <div>    
                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" x="0px" y="0px"><title>guest amenities</title><path d="M62,21H56.83a7,7,0,0,0-13.66,0H39.46l3.68-4.18a2,2,0,0,0-1.5-3.32H22A7.49,7.49,0,0,0,7,13.5H2A2,2,0,0,0,.5,16.82L19.82,38.76V51H12.45a2,2,0,0,0,0,4H31.2a2,2,0,1,0,0-4H23.82V38.75l4.88-5.53,11.48,13V58.5H32.8a2,2,0,1,0,0,4H51.55a2,2,0,0,0,0-4H44.18V46.26L63.5,24.32A2,2,0,0,0,62,21ZM22.36,21a2,2,0,0,0-1.5,3.32L23.22,27H14.8L6.43,17.5H37.21L34.13,21ZM49.64,34H34.72l-7.93-9H43.47a7,7,0,0,0,13.06,0h1Z"/><path d="M9,7.5a2,2,0,0,0,1.79-2.89l-1-2A2,2,0,1,0,6.21,4.39l1,2A2,2,0,0,0,9,7.5Z"/><path d="M47,15.5a2,2,0,0,0,1.79-2.89l-1-2a2,2,0,1,0-3.58,1.78l1,2A2,2,0,0,0,47,15.5Z"/><text x="0" y="84" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Bar</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M91.02,16h-2c-0.731,0-1.409,0.212-2,0.556V10c0-2.206-1.813-4-4.041-4H62.497H37.503H17.021c-2.229,0-4.041,1.794-4.041,4  v6.556C12.39,16.212,11.712,16,10.98,16h-2c-2.206,0-4,1.794-4,4v18.17c0,2.206,1.794,4,4,4h4.74v3.99c0,0.552,0.447,1,1,1h4.539  c0.553,0,1-0.448,1-1v-3.99h59.48v3.99c0,0.552,0.447,1,1,1h4.539c0.553,0,1-0.448,1-1v-3.99h4.74c2.206,0,4-1.794,4-4v-2V20  C95.02,17.794,93.226,16,91.02,16z M63.497,29V8h19.481c1.125,0,2.041,0.897,2.041,2v10v10.932  c-0.005-0.008-0.008-0.017-0.013-0.024c-0.714-1.143-1.949-1.825-3.306-1.825H63.48C63.482,29.054,63.497,29.029,63.497,29z   M38.503,29V8h22.994v21c0,0.029,0.015,0.054,0.017,0.083H38.486C38.488,29.054,38.503,29.029,38.503,29z M81.701,31.083  c0.662,0,1.264,0.331,1.622,0.905c0.038,0.058,0.065,0.121,0.097,0.183H16.339c0.002-0.004,0.005-0.006,0.007-0.01  c0.073-0.165,0.165-0.306,0.288-0.437c0.374-0.414,0.886-0.641,1.44-0.641H81.701z M14.98,20V10c0-1.103,0.916-2,2.041-2h19.481v21  c0,0.029,0.015,0.054,0.017,0.083H18.074c-1.11,0-2.176,0.473-2.908,1.282c-0.068,0.072-0.124,0.156-0.186,0.234V20z M18.26,45.16  h-2.539v-2.54h2.539V45.16z M84.279,45.16H81.74v-2.54h2.539V45.16z M93.02,36.17v2c0,1.103-0.897,2-2,2H8.98c-1.103,0-2-0.897-2-2  V20c0-1.103,0.897-2,2-2h2c1.103,0,2,0.897,2,2v13.17c0,0.552,0.447,1,1,1H86.02c0.553,0,1-0.448,1-1V20c0-1.103,0.897-2,2-2h2  c1.103,0,2,0.897,2,2V36.17z"/><path d="M85.768,75.276H14.232c-0.553,0-1,0.448-1,1v2.571c0,0.552,0.447,1,1,1h2.453v13.76c0,0.552,0.447,1,1,1s1-0.448,1-1v-4.688  h62.629v4.688c0,0.552,0.447,1,1,1s1-0.448,1-1v-13.76h2.453c0.553,0,1-0.448,1-1v-2.571C86.768,75.724,86.32,75.276,85.768,75.276z   M81.314,86.919H18.686v-7.072h62.629V86.919z M84.768,77.847h-2.17c-0.092-0.027-0.183-0.057-0.283-0.057H17.686  c-0.101,0-0.191,0.03-0.283,0.057h-2.17v-0.571h69.535V77.847z"/><path d="M29.239,57.974c-0.05-1.277-0.362-2.461-0.931-3.521c-0.641-1.196-1.508-2.064-2.508-2.512  c-1.009-0.453-2.083-0.447-3.014-0.389c-0.357-0.109-0.739-0.007-0.996,0.251c-0.245,0.199-0.393,0.511-0.367,0.85  c0.036,0.499,0.434,0.886,0.917,0.924c0.294,0.201,0.492,0.435,0.639,0.744c0.122,0.256,0.169,0.598,0.148,1.079  c-0.013,0.307-0.043,0.613-0.073,0.918c-0.072,0.75-0.147,1.524-0.015,2.354c0.163,1.015,0.616,2.025,1.313,2.921  c0.562,0.723,1.233,1.259,1.883,1.777l0.313,0.25c0.55,0.444,1.058,0.994,1.587,1.706h-3.278c-1.274,0-2.312,1.037-2.312,2.312  c0,0.611,0.242,1.163,0.631,1.577v1.355c0,1.891,1.538,3.43,3.43,3.43h6.789c1.892,0,3.43-1.539,3.43-3.43v-1.355  c0.389-0.414,0.631-0.965,0.631-1.576c0-1.275-1.037-2.312-2.313-2.312h-4.41c0.093-0.147,0.153-0.318,0.158-0.502  c0.188-0.244,0.461-0.403,0.784-0.448c0.697-0.098,1.412,0.029,2.169,0.161c1.057,0.184,2.255,0.393,3.546-0.005  c1.834-0.566,3.163-1.963,4.403-3.265c0.307-0.323,0.642-0.511,1.065-0.75c0.16-0.089,0.323-0.182,0.491-0.284  c0.472-0.286,0.623-0.901,0.337-1.374c-0.287-0.472-0.901-0.622-1.374-0.337v0c-0.792,0.48-1.528,0.608-2.632,0.455  c-0.325-0.045-0.647-0.094-0.967-0.143c-2.23-0.341-4.538-0.694-6.925,0.542c-1.47,0.761-2.213,1.745-2.581,2.791  c-0.041-0.253-0.071-0.512-0.077-0.78c-0.012-0.5,0.021-1.006,0.055-1.542C29.225,59.241,29.265,58.616,29.239,57.974z   M27.189,59.718c-0.035,0.555-0.072,1.128-0.059,1.716c0.001,0.031,0.002,0.063,0.003,0.093c-0.452-0.367-0.87-0.733-1.201-1.16  c-0.491-0.632-0.809-1.327-0.918-2.011c-0.093-0.576-0.032-1.192,0.031-1.844c0.033-0.342,0.065-0.685,0.08-1.028  c0.02-0.453,0.013-1.102-0.228-1.753c0.028,0.011,0.057,0.023,0.084,0.036c0.749,0.335,1.264,1.073,1.564,1.632  c0.423,0.789,0.656,1.682,0.694,2.653C27.262,58.591,27.227,59.138,27.189,59.718z M32.709,61.152  c1.806-0.936,3.612-0.661,5.702-0.34c0.298,0.045,0.598,0.091,0.9,0.134c-0.765,0.741-1.578,1.387-2.512,1.675  c-0.829,0.257-1.656,0.114-2.612-0.054c-0.639-0.111-1.292-0.226-1.989-0.226c-0.259,0-0.524,0.016-0.797,0.053  c-0.043,0.006-0.086,0.013-0.129,0.021C31.562,61.896,32.025,61.506,32.709,61.152z M34.824,70.57c0,0.789-0.642,1.43-1.43,1.43  h-6.789c-0.788,0-1.43-0.641-1.43-1.43V69.95h9.648V70.57z M35.143,67.327c0.172,0,0.313,0.14,0.313,0.312  c0,0.171-0.141,0.311-0.313,0.311H24.856c-0.172,0-0.312-0.14-0.312-0.311c0-0.172,0.14-0.312,0.312-0.312H35.143z"/><path d="M61,66.472c-0.073,0.366-0.109,0.728-0.109,1.108v1.59c0,1.552,0.604,3.017,1.707,4.13c1.106,1.096,2.571,1.7,4.123,1.7  c1.453,0,2.78-0.538,3.802-1.42h3.087c1.93,0,3.5-1.57,3.5-3.5s-1.57-3.5-3.5-3.5h-1.153c-0.007-0.036-0.009-0.072-0.017-0.108  c-0.095-0.467-0.504-0.802-0.98-0.802H61.98C61.504,65.67,61.095,66.005,61,66.472z M72.551,69.17v-0.59h1.059  c0.827,0,1.5,0.673,1.5,1.5s-0.673,1.5-1.5,1.5h-1.586C72.358,70.844,72.551,70.03,72.551,69.17z M62.891,67.67h7.66v1.5  c0,2.112-1.718,3.83-3.83,3.83c-1.021,0-1.986-0.398-2.709-1.114c-0.723-0.73-1.121-1.695-1.121-2.716V67.67z"/><path d="M63.093,53.243c-0.404-0.375-1.036-0.354-1.414,0.051c-2.646,2.843-0.295,5.121,1.261,6.628  c1.934,1.874,2.121,2.412,1.183,3.384c-0.384,0.397-0.372,1.03,0.025,1.414c0.194,0.187,0.444,0.28,0.694,0.28  c0.262,0,0.523-0.102,0.72-0.306c2.501-2.592,0.256-4.769-1.23-6.209c-1.966-1.905-2.335-2.597-1.188-3.83  C63.52,54.251,63.497,53.619,63.093,53.243z"/><path d="M67.923,53.243c-0.405-0.375-1.036-0.354-1.414,0.051c-2.646,2.843-0.295,5.121,1.261,6.628  c1.934,1.874,2.121,2.412,1.183,3.384c-0.384,0.397-0.372,1.03,0.025,1.414c0.194,0.187,0.444,0.28,0.694,0.28  c0.262,0,0.523-0.102,0.72-0.306c2.501-2.592,0.256-4.769-1.23-6.209c-1.966-1.905-2.335-2.597-1.188-3.83  C68.35,54.251,68.327,53.619,67.923,53.243z"/></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Executive Lounge</div>
                                </div>

                                

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><g><path d="M367.643,428.89c-51.459,0-93.326-41.864-93.326-93.323c0-51.46,41.867-93.325,93.326-93.325     s93.324,41.865,93.324,93.325C460.967,387.025,419.102,428.89,367.643,428.89z M367.643,257.241     c-43.189,0-78.326,35.137-78.326,78.325c0,43.188,35.137,78.323,78.326,78.323s78.324-35.136,78.324-78.323     C445.967,292.378,410.832,257.241,367.643,257.241z"/></g><g><path d="M367.643,454.712c-65.697,0-119.148-53.45-119.148-119.148c0-65.696,53.451-119.145,119.148-119.145     c65.699,0,119.148,53.448,119.148,119.145C486.791,401.262,433.342,454.712,367.643,454.712z M367.643,231.419     c-57.428,0-104.148,46.719-104.148,104.145c0,57.428,46.721,104.148,104.148,104.148s104.148-46.721,104.148-104.148     C471.791,278.138,425.07,231.419,367.643,231.419z"/></g><g><path d="M367.643,454.702c-4.143,0-7.5-3.357-7.5-7.5v-25.818c0-4.143,3.357-7.5,7.5-7.5s7.5,3.357,7.5,7.5v25.818     C375.143,451.345,371.785,454.702,367.643,454.702z"/></g><g><path d="M367.643,257.246c-4.143,0-7.5-3.357-7.5-7.5v-25.819c0-4.142,3.357-7.5,7.5-7.5s7.5,3.358,7.5,7.5v25.819     C375.143,253.889,371.785,257.246,367.643,257.246z"/></g><g><path d="M281.814,343.063h-25.809c-4.142,0-7.5-3.357-7.5-7.5s3.358-7.5,7.5-7.5h25.809c4.143,0,7.5,3.357,7.5,7.5     S285.957,343.063,281.814,343.063z"/></g><g><path d="M479.279,343.063h-25.811c-4.143,0-7.5-3.357-7.5-7.5s3.357-7.5,7.5-7.5h25.811c4.143,0,7.5,3.357,7.5,7.5     S483.422,343.063,479.279,343.063z"/></g><g><path d="M306.953,282.378c-1.92,0-3.838-0.732-5.303-2.197l-18.146-18.148c-2.512-2.406-3.084-6.323-1.168-9.389     c2.197-3.512,6.818-4.582,10.33-2.387l0.008,0.005c0.482,0.301,0.928,0.655,1.33,1.057l18.254,18.257     c2.928,2.929,2.928,7.678-0.002,10.606C310.793,281.646,308.873,282.378,306.953,282.378z"/></g><g><path d="M446.592,422.014c-1.99,0-3.963-0.788-5.418-2.312l-18.146-18.146c-2.93-2.929-2.93-7.678,0-10.606     c2.93-2.93,7.678-2.929,10.605-0.001l18.256,18.254c0.195,0.196,0.381,0.402,0.553,0.618c2.588,3.234,2.068,7.959-1.166,10.547     C449.891,421.476,448.234,422.014,446.592,422.014z"/></g><g><path d="M428.33,282.378c-1.918,0-3.838-0.732-5.303-2.196c-2.93-2.929-2.93-7.678,0-10.606l18.254-18.257     c0.402-0.401,0.848-0.756,1.33-1.057c3.514-2.195,8.145-1.13,10.338,2.382c1.93,3.088,1.342,7.035-1.215,9.436l-18.1,18.102     C432.17,281.646,430.25,282.378,428.33,282.378z"/></g><g><path d="M288.688,422.01c-1.643,0-3.295-0.536-4.678-1.642c-3.234-2.588-3.762-7.303-1.174-10.537l0.008-0.01     c0.172-0.216,0.357-0.422,0.553-0.618l18.254-18.254c2.93-2.928,7.678-2.928,10.607,0c2.928,2.93,2.928,7.678,0,10.607     l-18.189,18.189C292.615,421.237,290.66,422.01,288.688,422.01z"/></g><g><g><path d="M367.643,386.335c-17.777,0-32.24-13.07-32.24-29.136c0-4.143,3.357-7.5,7.5-7.5s7.5,3.357,7.5,7.5      c0,7.795,7.734,14.136,17.24,14.136s17.24-6.341,17.24-14.136s-7.734-14.136-17.24-14.136c-17.777,0-32.24-13.069-32.24-29.135      s14.463-29.136,32.24-29.136s32.24,13.07,32.24,29.136c0,4.143-3.357,7.5-7.5,7.5s-7.5-3.357-7.5-7.5      c0-7.795-7.734-14.136-17.24-14.136s-17.24,6.341-17.24,14.136c0,7.794,7.734,14.135,17.24,14.135      c17.777,0,32.24,13.07,32.24,29.136S385.42,386.335,367.643,386.335z"/></g><g><path d="M367.643,398.986c-4.143,0-7.5-3.357-7.5-7.5V279.646c0-4.143,3.357-7.5,7.5-7.5s7.5,3.357,7.5,7.5v111.841      C375.143,395.629,371.785,398.986,367.643,398.986z"/></g></g></g><g><g><g><path d="M144.357,269.757c-51.459,0-93.325-41.863-93.325-93.32c0-51.46,41.866-93.326,93.325-93.326      s93.325,41.866,93.325,93.326C237.682,227.894,195.817,269.757,144.357,269.757z M144.357,98.11      c-43.188,0-78.325,35.137-78.325,78.326c0,43.187,35.137,78.32,78.325,78.32s78.325-35.134,78.325-78.32      C222.682,133.247,187.546,98.11,144.357,98.11z"/></g><g><path d="M144.357,295.581c-65.698,0-119.148-53.449-119.148-119.148c0-65.696,53.45-119.145,119.148-119.145      s119.148,53.448,119.148,119.145C263.506,242.132,210.056,295.581,144.357,295.581z M144.357,72.288      c-57.427,0-104.148,46.719-104.148,104.145c0,57.428,46.721,104.148,104.148,104.148s104.148-46.721,104.148-104.148      C248.505,119.007,201.785,72.288,144.357,72.288z"/></g><g><path d="M144.357,295.569c-4.142,0-7.5-3.357-7.5-7.5v-25.816c0-4.143,3.358-7.5,7.5-7.5s7.5,3.357,7.5,7.5v25.816      C151.857,292.212,148.5,295.569,144.357,295.569z"/></g><g><path d="M144.357,98.114c-4.142,0-7.5-3.357-7.5-7.5V64.796c0-4.143,3.358-7.5,7.5-7.5s7.5,3.357,7.5,7.5v25.818      C151.857,94.757,148.5,98.114,144.357,98.114z"/></g><g><path d="M58.529,183.933H32.721c-4.142,0-7.5-3.357-7.5-7.5c0-4.142,3.358-7.5,7.5-7.5h25.808c4.142,0,7.5,3.358,7.5,7.5      C66.029,180.575,62.671,183.933,58.529,183.933z"/></g><g><path d="M255.995,183.933h-25.811c-4.142,0-7.5-3.357-7.5-7.5c0-4.142,3.358-7.5,7.5-7.5h25.811c4.142,0,7.5,3.358,7.5,7.5      C263.494,180.575,260.137,183.933,255.995,183.933z"/></g><g><path d="M83.668,123.247c-1.919,0-3.839-0.732-5.304-2.197L60.218,102.9c-2.512-2.406-3.084-6.322-1.168-9.388      c2.196-3.513,6.818-4.584,10.331-2.388l0.008,0.005c0.481,0.301,0.927,0.655,1.329,1.057l18.255,18.257      c2.929,2.93,2.928,7.679,0,10.607C87.507,122.515,85.588,123.247,83.668,123.247z"/></g><g><path d="M218.005,260.688l-18.263-18.261c-2.929-2.93-2.929-7.678,0-10.607c2.93-2.929,7.677-2.929,10.607,0l18.255,18.253      L218.005,260.688z"/></g><g><path d="M205.045,123.247c-1.919,0-3.838-0.732-5.303-2.196c-2.929-2.929-2.929-7.678,0-10.607l18.255-18.257      c0.401-0.401,0.847-0.756,1.329-1.057c3.513-2.194,8.144-1.13,10.339,2.383c1.93,3.087,1.341,7.034-1.215,9.435l-18.1,18.103      C208.885,122.515,206.965,123.247,205.045,123.247z"/></g><g><path d="M65.408,262.878c-1.919,0-3.838-0.731-5.301-2.195c-2.929-2.929-2.933-7.673-0.004-10.602l18.263-18.262      c2.929-2.928,7.677-2.929,10.607,0c2.929,2.93,2.928,7.678,0,10.607L70.717,260.68      C69.251,262.145,67.329,262.878,65.408,262.878z"/></g></g><g><g><path d="M153.587,236.456c-22.226,0-41.48-18.672-46.823-45.408c-0.95-4.739-1.432-9.656-1.432-14.612      c0-4.957,0.482-9.875,1.433-14.616c5.341-26.732,24.596-45.405,46.822-45.405c14.08,0,27.4,7.559,36.545,20.737      c2.362,3.403,1.517,8.076-1.886,10.438c-3.404,2.363-8.076,1.518-10.438-1.886c-6.302-9.081-15.13-14.289-24.222-14.289      c-14.985,0-28.19,13.714-32.114,33.35c-0.757,3.777-1.141,7.702-1.141,11.672c0,3.968,0.384,7.894,1.14,11.669      c3.925,19.639,17.13,33.352,32.115,33.352c9.095,0,17.923-5.209,24.22-14.291c2.36-3.404,7.033-4.251,10.437-1.89      c3.404,2.359,4.25,7.032,1.89,10.437C180.993,228.896,167.672,236.456,153.587,236.456z"/></g><g><g><path d="M140.745,170.792h-36.001c-4.142,0-7.5-3.358-7.5-7.5c0-4.143,3.358-7.5,7.5-7.5h36.001c4.142,0,7.5,3.357,7.5,7.5       C148.245,167.434,144.887,170.792,140.745,170.792z"/></g><g><path d="M140.745,197.078h-36.001c-4.142,0-7.5-3.357-7.5-7.5c0-4.142,3.358-7.5,7.5-7.5h36.001c4.142,0,7.5,3.358,7.5,7.5       C148.245,193.721,144.887,197.078,140.745,197.078z"/></g></g></g></g><g><g><g><path d="M103.322,370.431c-1.919,0-3.839-0.732-5.303-2.196c-2.929-2.929-2.929-7.678,0-10.606l25.966-25.967      c2.929-2.93,7.678-2.929,10.606-0.001c2.929,2.929,2.929,7.678,0,10.606l-25.966,25.967      C107.161,369.698,105.241,370.431,103.322,370.431z"/></g><g><path d="M157.466,372.643c-1.919,0-3.839-0.732-5.303-2.196l-28.179-28.179c-2.929-2.93-2.929-7.678,0-10.607      c2.929-2.928,7.678-2.928,10.606,0l28.179,28.179c2.929,2.93,2.929,7.678,0,10.607      C161.305,371.91,159.386,372.643,157.466,372.643z"/></g><g><path d="M185.843,427.65h-35.27c-15.87,0-28.781-12.915-28.781-28.79v-61.896c0-4.143,3.358-7.5,7.5-7.5s7.5,3.357,7.5,7.5      v61.896c0,7.604,6.182,13.79,13.781,13.79h35.27c4.142,0,7.5,3.357,7.5,7.5S189.985,427.65,185.843,427.65z"/></g></g><g><g><path d="M389.949,170.471c-1.92,0-3.84-0.732-5.305-2.197c-2.928-2.929-2.928-7.678,0-10.606l25.965-25.965      c2.93-2.929,7.678-2.929,10.607,0s2.93,7.678,0,10.606l-25.965,25.965C393.787,169.738,391.867,170.471,389.949,170.471z"/></g><g><path d="M389.949,170.471c-1.92,0-3.84-0.732-5.305-2.197l-28.178-28.179c-2.93-2.929-2.93-7.678,0-10.606s7.678-2.929,10.607,0      l28.178,28.179c2.93,2.929,2.93,7.678,0,10.606C393.787,169.738,391.867,170.471,389.949,170.471z"/></g><g><path d="M389.945,170.472c-4.143,0-7.5-3.358-7.5-7.5v-61.896c0-7.604-6.184-13.791-13.783-13.791h-35.27      c-4.143,0-7.5-3.357-7.5-7.5c0-4.142,3.357-7.5,7.5-7.5h35.27c15.871,0,28.783,12.916,28.783,28.791v61.896      C397.445,167.113,394.088,170.472,389.945,170.472z"/></g></g></g></g></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Currency Exchange</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px"><defs><style></style></defs><path class="cls-1" d="M60.034,75.827H39.966A1.364,1.364,0,0,1,38.6,74.464v-9.87H33.2V85.836h5.4V79.887a1.364,1.364,0,0,1,1.364-1.364H60.034A1.364,1.364,0,0,1,61.4,79.887v5.949h5.4V64.594H61.4v9.87a1.364,1.364,0,0,1-1.364,1.363ZM41.33,73.1V64.594H58.67V73.1ZM30.619,56.187H69.381L63.84,28.674H36.16L30.619,56.187Zm-1.66,2.727a1.36,1.36,0,0,1-1.307-1.755l6.066-30.115a1.358,1.358,0,0,1,1.332-1.092v-.005h29.9a1.364,1.364,0,0,1,1.356,1.216l6.041,30a1.359,1.359,0,0,1-1.306,1.755Zm-4.189,15V71.2H13.978a1.364,1.364,0,0,1-1.364-1.364V51.551H8.573c-.384,0-.845.211-.845.456v18a3.5,3.5,0,0,0,1.378,2.672,5.75,5.75,0,0,0,3.653,1.233Zm-9.429-16.2V50.188a1.364,1.364,0,0,0-1.363-1.364H12.723V36.293c0-.245.461-.456.845-.456H17.61V54.122a1.364,1.364,0,0,0,1.363,1.364h2.256L20.683,58.2H17.755a6.139,6.139,0,0,1-2.414-.483Zm5-19.789a6.172,6.172,0,0,0,1.757.249h2.622l.546-2.712H23.313A1.364,1.364,0,0,1,21.949,34.1V15.814H17.908c-.384,0-.845.211-.845.456V33.11h1.91a1.364,1.364,0,0,1,1.364,1.364v3.452ZM24.166,40.9,21.778,52.759H20.337V40.729a20.1,20.1,0,0,0,3.829.173ZM75.23,71.2v2.712H87.241a5.752,5.752,0,0,0,3.653-1.233,3.5,3.5,0,0,0,1.378-2.672v-18c0-.245-.461-.456-.845-.456H87.386V69.836A1.364,1.364,0,0,1,86.022,71.2Zm4.087-13-.546-2.712h2.256a1.364,1.364,0,0,0,1.363-1.364V35.837h4.042c.384,0,.845.211.845.456V48.824H86.022a1.364,1.364,0,0,0-1.363,1.364v7.527a6.139,6.139,0,0,1-2.414.483Zm.346-17.469v12.03H78.222L75.834,40.9a20.1,20.1,0,0,0,3.829-.173Zm-4.379-2.554h2.622a6.177,6.177,0,0,0,1.757-.249V34.474a1.364,1.364,0,0,1,1.364-1.364h1.91V16.27c0-.245-.461-.456-.845-.456H78.051V34.1a1.364,1.364,0,0,1-1.364,1.364H74.738l.546,2.712Zm-2.417,1.756,2.888,14.337a1.352,1.352,0,0,0,.05.247l1.046,5.193a1.429,1.429,0,0,0,.049.246l.386,1.913H22.714l.386-1.913a1.41,1.41,0,0,0,.049-.246L24.2,54.514a1.331,1.331,0,0,0,.05-.245L27.133,39.93a1.381,1.381,0,0,0,.049-.245l1.046-5.194a1.331,1.331,0,0,0,.05-.245l2.266-11.252H69.456l3.411,16.937ZM57.517,20.266V13.082a2.31,2.31,0,0,0-2.3-2.3H44.782a2.309,2.309,0,0,0-2.3,2.3v7.184Zm-17.761,0V13.082a5.038,5.038,0,0,1,5.026-5.027H55.217a5.038,5.038,0,0,1,5.027,5.027v7.184H70.567a1.363,1.363,0,0,1,1.355,1.217l2.267,11.253h1.135V14.451a1.364,1.364,0,0,1,1.363-1.364h5.405a3.409,3.409,0,0,1,3.572,3.183V33.11h.768A3.409,3.409,0,0,1,90,36.293V48.824c1.461,0,2.646-.14,3.846.849A3.015,3.015,0,0,1,95,52.007v18c0,3.909-3.8,6.632-7.758,6.632H84.333v8.2l3.224-2.063a1.358,1.358,0,1,1,1.459,2.29L85.682,87.2l3.838,1.919a1.358,1.358,0,0,1-1.215,2.429l-5.287-2.644L78.6,91.732a1.358,1.358,0,0,1-1.459-2.291l3.045-1.949-3.722-1.861A1.358,1.358,0,1,1,77.682,83.2l3.923,1.961V76.639H73.866A1.363,1.363,0,0,1,72.5,75.276v-5.44a1.363,1.363,0,0,1,1.363-1.363H84.659V60.6a8.923,8.923,0,0,1-2.414.33H79.867c.07.347.442,2.055.442,2.306a1.363,1.363,0,0,1-1.363,1.363H69.523V87.2a1.363,1.363,0,0,1-1.363,1.363H60.034A1.364,1.364,0,0,1,58.67,87.2V81.251H41.33V87.2a1.364,1.364,0,0,1-1.364,1.363H31.84A1.363,1.363,0,0,1,30.477,87.2V64.594H21.054a1.36,1.36,0,0,1-1.306-1.755l.385-1.914H17.755a8.917,8.917,0,0,1-2.414-.33v7.878H26.134A1.363,1.363,0,0,1,27.5,69.836v5.44a1.363,1.363,0,0,1-1.363,1.363h-7.74v8.525L22.318,83.2a1.358,1.358,0,1,1,1.215,2.428l-3.722,1.861,3.045,1.949A1.358,1.358,0,0,1,21.4,91.732l-4.415-2.826L11.7,91.55a1.358,1.358,0,0,1-1.215-2.429L14.318,87.2l-3.334-2.134a1.358,1.358,0,1,1,1.459-2.29l3.224,2.063v-8.2H12.759C8.8,76.639,5,73.916,5,70.007v-18a3.409,3.409,0,0,1,3.572-3.183H10V36.293a3.409,3.409,0,0,1,3.572-3.183h.768V16.27a3.408,3.408,0,0,1,3.572-3.183h5.4a1.364,1.364,0,0,1,1.363,1.364V32.736h1.135L28.1,21.364a1.358,1.358,0,0,1,1.331-1.092v-.006Z"/></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Conference Room</div>
                                </div>

                                </div>
                                </div>

                                <div className = "ml-[330px] -mt-[160px]">
                                <div>    
                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" x="0px" y="0px"><title>guest amenities</title><path d="M8,64H56a4,4,0,0,0,4-4V4a4,4,0,0,0-4-4H8A4,4,0,0,0,4,4V60A4,4,0,0,0,8,64Zm0-4V16H56V60ZM56,4v8H8V4Z"/><path d="M32,17A21,21,0,1,0,53,38,21,21,0,0,0,32,17Zm0,38A17,17,0,1,1,49,38,17,17,0,0,1,32,55Z"/><path d="M11,10H26a2,2,0,0,0,0-4H11a2,2,0,0,0,0,4Z"/><circle cx="41" cy="8" r="2"/><circle cx="47" cy="8" r="2"/><circle cx="53" cy="8" r="2"/></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Laundry</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" x="0px" y="0px"><g data-name="Layer 39"><path d="M23,14.29a4.44,4.44,0,0,1-7,0,4.44,4.44,0,0,1-7,0A4.46,4.46,0,0,1,5.5,16,4.23,4.23,0,0,1,5,16V27a1,1,0,0,0,1,1H9V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v8H26a1,1,0,0,0,1-1V16a4.23,4.23,0,0,1-.5.05A4.46,4.46,0,0,1,23,14.29ZM23,23a1,1,0,0,1-1,1H19a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1Z"/><path d="M10,11.5a2.5,2.5,0,0,0,5,0V4H12L10,9Z"/><path d="M8,11.5V9l2-5H8a2,2,0,0,0-1.56.75l-3,3.7A2,2,0,0,0,3,9.7v1.66A2.6,2.6,0,0,0,5.24,14,2.5,2.5,0,0,0,8,11.5Z"/><path d="M19.5,14A2.5,2.5,0,0,0,22,11.5V9L20,4H17v7.5A2.5,2.5,0,0,0,19.5,14Z"/><path d="M28.56,8.45l-3-3.7A2,2,0,0,0,24,4H22l2,5v2.5A2.5,2.5,0,0,0,26.76,14,2.6,2.6,0,0,0,29,11.36V9.7A2,2,0,0,0,28.56,8.45Z"/></g></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Convenience Store</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" fill="none" x="0px" y="0px"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 13C7 9.68629 9.68629 7 13 7H71C74.3137 7 77 9.68629 77 13V55H50.6683C48.7339 55 46.9731 56.1158 46.1471 57.865L43.7222 63H39C36.7909 63 35 64.7909 35 67C35 69.2091 36.7909 71 39 71H39.9444L39.4788 71.9862C39.1635 72.6538 39 73.3829 39 74.1212V77H13C9.68629 77 7 74.3137 7 71V13ZM20.0568 71V12.8182H43.0114C47.4242 12.8182 51.1837 13.661 54.2898 15.3466C57.3958 17.0133 59.7633 19.3333 61.392 22.3068C63.0398 25.2614 63.8636 28.6705 63.8636 32.5341C63.8636 36.3977 63.0303 39.8068 61.3636 42.7614C59.697 45.7159 57.2822 48.017 54.1193 49.6648C50.9754 51.3125 47.1686 52.1364 42.6989 52.1364H32.358V71H20.0568ZM40.7102 42.2784H32.358V22.875H40.6534C43.0398 22.875 45.0095 23.2822 46.5625 24.0966C48.1155 24.892 49.2708 26.0189 50.0284 27.4773C50.8049 28.9167 51.1932 30.6023 51.1932 32.5341C51.1932 34.447 50.8049 36.142 50.0284 37.6193C49.2708 39.0777 48.1155 40.2235 46.5625 41.0568C45.0284 41.8712 43.0777 42.2784 40.7102 42.2784ZM52.5596 57C50.6527 57 48.9119 58.0846 48.0714 59.7962L45.3763 65.2851C45.0325 65.0542 44.6186 64.9195 44.1733 64.9195H39.16C37.9671 64.9195 37 65.8865 37 67.0795C37 68.2724 37.9671 69.2395 39.16 69.2395H43.4346L42.1785 71.7975C41.8418 72.4834 41.6667 73.2373 41.6667 74.0013V82.0356L41.6667 82.04V91C41.6667 92.1045 42.5621 93 43.6667 93H49C50.1046 93 51 92.1045 51 91V88.68H79V91C79 92.1045 79.8954 93 81 93H86.3333C87.4379 93 88.3333 92.1045 88.3333 91V83.68V82.04V74.0013C88.3333 73.2373 88.1582 72.4834 87.8215 71.7975L86.5654 69.2395H90.84C92.0329 69.2395 93 68.2724 93 67.0795C93 65.8865 92.0329 64.9195 90.84 64.9195H85.8267C85.3814 64.9195 84.9675 65.0542 84.6237 65.2851L81.9286 59.7962C81.0881 58.0846 79.3473 57 77.4404 57H52.5596ZM78.4444 76.4406C77.8922 76.4406 77.4444 76.8883 77.4444 77.4406V78.3206C77.4444 78.8729 77.8922 79.3206 78.4444 79.3206H84.2222C84.7745 79.3206 85.2222 78.8729 85.2222 78.3206V77.4406C85.2222 76.8883 84.7745 76.4406 84.2222 76.4406H78.4444ZM44.7778 77.4406C44.7778 76.8883 45.2255 76.4406 45.7778 76.4406H51.5556C52.1078 76.4406 52.5556 76.8883 52.5556 77.4406V78.3206C52.5556 78.8729 52.1078 79.3206 51.5556 79.3206H45.7778C45.2255 79.3206 44.7778 78.8729 44.7778 78.3206V77.4406ZM59.7778 82.9196C59.2255 82.9196 58.7778 83.3673 58.7778 83.9196V84.7996C58.7778 85.3519 59.2255 85.7996 59.7778 85.7996H70.2222C70.7745 85.7996 71.2222 85.3519 71.2222 84.7996V83.9196C71.2222 83.3673 70.7745 82.9196 70.2222 82.9196H59.7778ZM50.4438 59.9912C50.6685 59.4856 51.1699 59.1598 51.7232 59.1598H78.2768C78.8301 59.1598 79.3315 59.4856 79.5562 59.9912L82.7917 67.2712C83.2032 68.197 82.5255 69.2398 81.5124 69.2398H48.4876C47.4745 69.2398 46.7968 68.197 47.2083 67.2712L50.4438 59.9912Z" fill="black"/></svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Parking</div>
                                </div>

                                <div className = "mt-5">    
                                <svg className = "w-6 h-6" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
                                <g>
                                <path d="m42.102 42.23c0.070313 0.089843 0.14063 0.17969 0.19922 0.26172 0.83984 1.0703 1.7109 1.5 2.7812 1.3398 0.42188-0.058593 0.80078-0.19922 1.1289-0.39844 0.03125-0.019532 0.058593-0.03125 0.089843-0.050782 0.011719 0 0.019531-0.019531 0.03125-0.03125 0.5-0.33984 0.89844-0.87109 1.2109-1.5898 0.039062-0.10156 0.089843-0.19922 0.12891-0.30859 0.30859-0.80859 0.39844-1.6797 0.44141-2.5312 0.019531-0.32031 0.03125-0.62891 0.03125-0.92969 0-0.39844-0.019531-0.76953-0.03125-1.1289-0.070312-1.3594-0.25-2.4609-0.57031-3.4688-0.21875-0.66016-0.60938-1.5117-1.2891-1.7695-0.10938-0.039062-0.21875-0.050781-0.33984-0.058594-0.058593 0-0.10937-0.03125-0.17187-0.03125-0.57031 0-1.1914 0.28125-1.6602 0.55078-0.55078 0.32031-1.0312 0.71094-1.4609 1.1484-0.30859 0.30859-0.57812 0.64844-0.82031 1.0117-0.46094 0.69141-0.78906 1.4492-0.96875 2.2695-0.10938 0.51172-0.16016 1.0312-0.14844 1.5508 0.019531 1.1289 0.32031 2.2383 0.87109 3.2891 0.16016 0.28906 0.32812 0.57812 0.53125 0.85938z"/>
                                <path d="m52.621 42.211c0.32812 0.55859 0.75 0.96875 1.2188 1.25 0.30859 0.19141 0.64062 0.32812 1 0.37891 0.41016 0.050781 0.80859 0 1.2109-0.14062 0.089844-0.03125 0.17188-0.070313 0.26172-0.10938 0.35156-0.16016 0.67969-0.37891 0.98828-0.67969 1.5312-1.5 2.2188-3.7383 1.8516-5.9688-0.050782-0.28125-0.10938-0.55859-0.19141-0.82031-0.53906-1.8711-1.8008-3.3984-3.4805-4.2109-0.10156-0.050781-0.17969-0.070312-0.28125-0.10938-0.37891-0.14844-0.73047-0.25-1.0195-0.25-0.17969 0-0.35156 0.03125-0.5 0.089844h-0.03125c-0.39063 0.16016-0.71875 0.53906-0.98828 1.1289-0.050781 0.10938-0.10156 0.21094-0.14844 0.32812-0.10156 0.28125-0.19141 0.57031-0.26953 0.85938-0.30078 1.1094-0.44141 2.3516-0.42969 3.8398 0 0.53125 0.011719 0.98047 0.039062 1.3984 0.070313 1.3789 0.30078 2.2305 0.76172 3.0117z"/>
                                <path d="m59.371 54.879c-0.33984-0.73047-0.85156-1.3984-1.5312-1.9688-0.28125-0.23047-0.57031-0.48047-0.85156-0.73828-0.46094-0.42969-0.91016-0.89844-1.3008-1.4414-0.37891-0.53125-0.75-1.0703-1.1211-1.6094-0.14844-0.21875-0.30078-0.42969-0.44922-0.64062-0.17969-0.26172-0.35938-0.53125-0.55078-0.78906-0.32812-0.46094-0.69922-0.83984-1.1016-1.1211h-0.011719c-0.67969-0.46875-1.4688-0.71094-2.3984-0.71094-0.26172 0-0.53125 0.019531-0.80859 0.050781-0.80859 0.10156-1.5 0.42188-2.1289 0.98828-0.37891 0.33984-0.73828 0.78125-1.0781 1.3086-0.019531 0.039063-0.050781 0.070313-0.070312 0.10938-1.0586 1.6094-2.3789 3.4492-4.1719 4.9414-0.60938 0.5-1.0391 1.1289-1.3086 1.8594-0.21875 0.57812-0.35156 1.2305-0.35156 1.9492 0 0.60938 0.10938 1.1992 0.30078 1.7617 0.19922 0.57812 0.51172 1.1211 0.89844 1.6016 0.26172 0.30859 0.55859 0.60156 0.89844 0.85937 0.32812 0.25 0.67188 0.44922 1.0391 0.60938 1.0898 0.48047 2.3086 0.57031 3.4805 0.23828 0.26172-0.078125 0.51953-0.14062 0.78125-0.19922 1.8789-0.41016 3.7188-0.35938 5.6016 0.17188 1.5898 0.44922 3.1602 0.17188 4.3984-0.67969 0.21875-0.14844 0.44141-0.32031 0.64062-0.51172 0.44141-0.41016 0.80859-0.91016 1.1094-1.4883 0.64844-1.2695 0.73828-2.6211 0.35156-3.8594-0.070313-0.21875-0.14844-0.44141-0.25-0.66016z"/>
                                <path d="m66.27 44.059c-0.10938-0.53125-0.25-1.0391-0.39844-1.5312-0.078125-0.26172-0.14844-0.51172-0.23828-0.76172-0.039062-0.10156-0.078124-0.17188-0.10937-0.26172-0.30078-0.69922-0.67188-1.1602-1.0508-1.2305h-0.070312c-0.03125 0-0.050782-0.011719-0.078125-0.011719-0.17969 0-0.39062 0.078125-0.62109 0.19922-0.19141 0.10156-0.37891 0.25-0.57812 0.42969-0.10156 0.089844-0.19922 0.17188-0.30078 0.28125-0.058594 0.058594-0.10938 0.12109-0.16016 0.17969-0.050781 0.058594-0.10937 0.10938-0.14844 0.17969-1.6992 2.25-2.6289 4.7188-2.7695 7.3398-0.050782 0.96094 0.17969 1.7188 0.62109 2.1797 0.050781 0.050781 0.078124 0.10938 0.12891 0.14844 0.078125 0.058593 0.17969 0.10156 0.26953 0.14844 0.55078 0.28906 1.3086 0.33984 2.1992 0.089844 0.57031-0.16016 1.0781-0.39062 1.5195-0.71094 1.3086-0.94141 2.0195-2.5703 2.0195-4.7383 0.03125-0.37891-0.03125-0.83984-0.10156-1.2695-0.039063-0.23828-0.089844-0.46875-0.12891-0.67969z"/>
                                <path d="m39.469 45.051c-0.55078-1.4609-1.4102-2.8398-2.5781-4.1094-0.23828-0.26172-0.46875-0.44141-0.69141-0.55078-0.17969-0.089844-0.35156-0.14844-0.5-0.14844h-0.12109c-0.39062 0.070312-0.78906 0.48828-1.1016 1.1719-0.35156 0.78906-0.60156 1.5781-0.76172 2.4492-0.16016 0.87109-0.23047 1.8086-0.21875 2.8984 0 0.14062 0.019531 0.28125 0.03125 0.42188 0.10156 1.4219 0.69141 2.6016 1.6914 3.3906 0.35156 0.26953 0.75 0.48047 1.1914 0.66016 0.39844 0.16016 0.80859 0.28906 1.2812 0.35938 0.75 0.10938 1.3789-0.011719 1.8086-0.37109 0.089844-0.078125 0.17969-0.17188 0.25-0.26172 0.23828-0.30859 0.39062-0.73828 0.42188-1.25 0.089844-1.6289-0.14844-3.1797-0.69922-4.6484z"/>
                                <path d="m50 20.5c-9.1602-9.0781-24-9.0586-33.129 0.070312-9.1484 9.1484-9.1484 24.051 0 33.211l32.07 32.07c0.28906 0.28906 0.67969 0.44141 1.0586 0.44141s0.76953-0.14844 1.0586-0.44141l32.07-32.07c9.1484-9.1602 9.1484-24.051 0-33.211-9.1289-9.1289-23.969-9.1602-33.129-0.070312zm31.012 31.16-31.012 31.012-31.012-31.012c-7.9805-7.9805-7.9805-20.98 0-28.961 3.9883-3.9883 9.2383-5.9883 14.48-5.9883 5.2383 0 10.488 2 14.48 5.9883l0.98828 0.98828c0.28125 0.28125 0.66016 0.44141 1.0586 0.44141 0.39844 0 0.78125-0.16016 1.0586-0.44141l0.98828-0.98828c7.9805-7.9805 20.969-7.9805 28.961 0 7.9805 7.9805 7.9805 20.98 0 28.961z"/>
                                </g>
                                </svg>
                                <div className = "text-sm font-normal ml-10 -mt-6">Pet Friendly</div>
                                </div>

                                

                                </div>
                                </div>

                                <div className = "ring-1 ring-black ring-opacity-5 bg-sky-100 w-[250px] h-72 ml-[495px] -mt-60 rounded-lg">
                                <div className = "font-normal w-40 ml-10 mt-5">1 King Bed, Balcony, 1 Bath, Sea View</div>
                                <div className = "font-bold text-xl ml-20 mt-28">${tripData.stay.totalPrice}</div>
                                <div className = "ml-16 mt-2">
                                <button className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-semibold font-sans tracking-tighter text-white bg-sky-500 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b"></span>
                                    <span className="relative">Reserve</span>
                                </button>
                                </div>
                                </div>
                                

                                

                                
                                <div className = "ml-[10px] mt-11">Explore nearby Places</div>
                                <div className = "w-[700px] h-72 ml-[15px] mt-7">
                                    <GoogleMap center={{lat: tripData.stay.hotelLocationLat, lng: tripData.stay.hotelLocationLon}} zoom={16} mapContainerStyle={{width: "100%", height: "100%"}}>
                                    <Marker position={{lat: tripData.stay.hotelLocationLat, lng: tripData.stay.hotelLocationLon}}></Marker>
                                    </GoogleMap>
                                </div>
                                <div className = "ml-[10px] mt-11 font-medium text-sm">Phone: {tripData.stay.phone}</div>
                                <div className = "ml-[10px] font-medium text-sm">{tripData.stay.address}</div>
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