import React, {useState} from 'react';
import { DateRangePicker } from 'rsuite';
import { parse, format } from 'date-fns';

const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

const DatePickerToggle = () => {

    const [isStartDate, setIsStartDate] = useState(null);
    const [isEndDate, setIsEndDate] = useState(null);

    

    const handleDateChange = (value) => {

        setIsStartDate(value[0]);
        setIsEndDate(value[1]);
    }

    // //Formatting start date to "Month day"
    // const parsedStartDate = parse(isStartDate, 'yyyy-MM-dd', new Date());
    // const formattedStartDate = format(parsedStartDate, 'MMMM dd');

    // //Formatting end date to "Month day"
    // const parsedEndDate = parse(isEndDate, 'yyyy-MM-dd', new Date());
    // const formattedEndDate = format(parsedEndDate, 'MMMM dd');
    

    return (
        <>
        <div className="relative right-[20px] top-[380px] transform rotate-90">
        <DateRangePicker onChange={handleDateChange}
        className="rounded-lg shadow-lg"
        placeholder = " "
        shouldDisableDate={combine(allowedMaxDays(332), beforeToday())}
        />
        </div>
        </>
    )
};


export default DatePickerToggle;
// export {formattedStartDate,formattedEndDate};