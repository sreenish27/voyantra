import React from 'react';

const PlanCards = () => {

    return(
        <>
        <div>
            <button className="relative top-[230px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 1
            </button>

            <button className="relative top-[230px] right-[-270px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 2
            </button>

            <button className="relative top-[230px] right-[-320px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 3
            </button>
        </div>

        <div>
            <button className="relative top-[270px] right-[-220px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 4
            </button>

            <button className="relative top-[270px] right-[-270px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Plan Card 5
            </button>

            <button className="relative top-[270px] right-[-320px] ring-1 ring-black ring-opacity-5 w-[300px] h-[250px] text-gray-700 font-normal rounded-lg shadow-md" type='button'>
                Build your own Plan
            </button>
        </div>

        </>
    );
}

export default PlanCards;