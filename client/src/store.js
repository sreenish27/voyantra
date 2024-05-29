import { configureStore } from '@reduxjs/toolkit';
import dateRangePickerReducer from './reduxSlices/dateRangePickerSlice.js';
import datePickerOpenCloseReducer from './reduxSlices/datePickerOpenCloseSlice.js';

const store = configureStore({
    reducer: {
        dateRangePicker: dateRangePickerReducer,
        datePickerOpenClose: datePickerOpenCloseReducer,
    }
})

export default store;