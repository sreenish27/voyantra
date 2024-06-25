import axios from "axios";

//a function to get the trip cards from the server and store it here to be used in all of client side
const fetchTripCardData = async () => {

    const response = await axios.get('http://localhost:4000/api/testing/tripcards');
    return response.data;
}

// const testdata = await fetchTripCardData();

// console.log(testdata);

// export const tripcards = await fetchTripCardData();
export default fetchTripCardData;