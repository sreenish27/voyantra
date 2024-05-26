import {createSlice} from '@reduxjs/toolkit';

const dateRangePickerSlice = createSlice({
    name:'dateRangePicker',
    initialState:{
        isStartDate:'',
        isEndDate:'',
    },
    reducer:{
        setIsStartDate: (state, action) => {
            state.isStartDate = action.payload;
        },
        setIsEndDate: (state, action) => {
            state.isEndDate = action.payload;
        },
    },
});

export const {setIsStartDate, setIsEndDate} = dateRangePickerSlice.actions;

export default dateRangePickerSlice.reducer;