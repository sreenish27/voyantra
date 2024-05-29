import { createSlice } from '@reduxjs/toolkit';

const dateRangePickerSlice = createSlice({
    name: 'dateRangePicker',
    initialState: {
        startDate: '',
        endDate: '',
    },

    reducers:{
        setStartDate(state, action){
            state.startDate = action.payload;
        },
        setEndDate(state, action){
            state.endDate = action.payload;
        },
    },
});

export const { setStartDate, setEndDate } = dateRangePickerSlice.actions;
export default dateRangePickerSlice.reducer;