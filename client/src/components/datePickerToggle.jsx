import React, {useRef} from 'react';
import { DateRangePicker } from 'rsuite';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '../reduxSlices/dateRangePickerSlice.js';



const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

const DatePickerToggle = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.datePickerOpenClose.isOpen);


    const handleDateChange = (value) => {

        if(value && value.length === 2){
            const parsedstartDate = new Date(value[0]);
            const startDate = format(parsedstartDate, 'MMMM dd');

            const parsedendDate = new Date(value[1]);
            const endDate = format(parsedendDate, 'MMMM dd');

            dispatch(setStartDate(startDate));
            dispatch(setEndDate(endDate));
        }
        
    }
    
    return (
        <>
        <div className="relative right-[200px] top-[380px] transform rotate-90">
        <DateRangePicker onChange={handleDateChange} onOk = {handleDateChange}
        className="rounded-lg shadow-lg"
        placeholder = " "
        open={isOpen}
        shouldDisableDate={combine(allowedMaxDays(332), beforeToday())}
        />
        </div>
        </>
    )
};


export default DatePickerToggle;
