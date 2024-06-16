import {parse, format} from 'date-fns';


const processUserInput = (inputFromUser) => {

            //getting the globaluserinput in another variable
        const storeGlobalUserInput = inputFromUser;

        const parsedUserInput = JSON.parse(storeGlobalUserInput);

        //extracting, processing the user input in the format I want and storing it in variables
        const userBudget = Number(parsedUserInput.BudgetInput);
        //Departing date
        const userDepartDate = parsedUserInput.Depart;
        const parsedDepartDate = parse(userDepartDate, 'MMMM dd', new Date());
        const formattedDepartDate = format(parsedDepartDate, 'yyyy-MM-dd');

        const userReturnDate = parsedUserInput.Return;
        const parsedReturnDate = parse(userReturnDate, 'MMMM dd', new Date());
        const formattedReturnDate = format(parsedReturnDate, 'yyyy-MM-dd');

        const userFromLocation = parsedUserInput.From;

        const userToLocation = parsedUserInput.To;

        const userWhoGuests = parsedUserInput.Who;
        let userWhoGuestsAdultandChildren = 0;
        let userWhoGuestsInfants = 0;

        if(userWhoGuests.length > 10){
            userWhoGuestsAdultandChildren = Number(userWhoGuests[0]);
            userWhoGuestsInfants = Number(userWhoGuests[10]);
        }
        else{
            userWhoGuestsAdultandChildren = number(userWhoGuests[0]);
        }

        //putting all the processed input data into an object and exporting it so that it is easier to handle elsewhere in the server-side code for further processessing
        const apiReadyUserInput = {
            "budget":userBudget,
            "departDate":formattedDepartDate,
            "returnDate":formattedReturnDate,
            "fromLocation":userFromLocation,
            "toLocation":userToLocation,
            "noOfAdultsandChildren":userWhoGuestsAdultandChildren,
            "noOfInfants":userWhoGuestsInfants
        };

        return apiReadyUserInput;

}

export default processUserInput;



