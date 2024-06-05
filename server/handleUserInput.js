import { globaluserinput } from './server.js';
import {parse, format} from 'date-fns';
import { getRawUserInput } from './userInputStore.js';
import { setApiReadyInput, getApiReadyUserInput } from './apiReadyUserInputStore.js';

const processUserInput = (inputFromUser) => {

            //getting the globaluserinput in another variable
        const storeGlobalUserInput = inputFromUser;

        const parsedUserInput = JSON.parse(storeGlobalUserInput);

        //extracting, processing the user input in the format I want and storing it in variables
        const userBudget = Number(parsedUserInput.BudgetInput);

        //Departing date
        const userDepartDate = parsedUserInput.Depart;
        const parsedDepartDate = parse(userDepartDate, 'MMMM dd', new Date());
        const formattedDepartDate = format(parsedDepartDate, 'MM dd YYYY');

        const userReturnDate = parsedUserInput.Return;
        const parsedReturnDate = parse(userReturnDate, 'MMMM dd', new Date());
        const formattedReturnDate = format(parsedReturnDate, 'MM dd YYYY');

        const userFromLocation = parsedUserInput.From;

        const userToLocation = parsedUserInput.To;

        const userWhoGuests = parsedUserInput.Who;
        let userWhoGuestsAdultandChildren = 0;
        let userWhoGuestsInfants = 0;

        if(length(userWhoGuests) > 10){
            userWhoGuestsAdultandChildren = number(userWhoGuests[0]);
            userWhoGuestsInfants = number(userWhoGuests[10]);
        }
        else{
            userWhoGuestsAdultandChildren = number(userWhoGuests[0]);
        }

        //putting all the processed input data into an object and exporting it so that it is easier to handle elsewhere in the server-side code for further processessing
        const apiReadyUserInput = {
            budget:userBudget,
            departDate:formattedDepartDate,
            returnDate:formattedReturnDate,
            fromLocation:userFromLocation,
            toLocation:userToLocation,
            noOfAdultsandChildren:userWhoGuestsAdultandChildren,
            noOfInfants:userWhoGuestsInfants
        };

        return apiReadyUserInput;

}

const rawuserinput = getRawUserInput();

//actually running the function:
if (rawuserinput && typeof rawuserinput === Object && Object.keys(rawuserinput).length !== 0){
   try{
   setApiReadyInput(processUserInput(globaluserinput));
   } catch (err){
    console.log(`Error in processing the input: ${err}`);
   }
    
}
else{
    console.log("No input entered");
}



