import { configureStore } from '@reduxjs/toolkit';
import dateRangePickerSlice from './reduxSlices/dateRangePickerSlice.js';

const store = configureStore({
    reducer:{
        dateRangePicker: dateRangePickerSlice,
    }
})

export default store;