import { configureStore } from '@reduxjs/toolkit';
import dateRangePickerReducer from './reduxSlices/dateRangePickerSlice.js';
import datePickerOpenCloseReducer from './reduxSlices/datePickerOpenCloseSlice.js';
import searchButtonClickedReducer from './reduxSlices/searchButtonClickedSlice.js';

const store = configureStore({
    reducer: {
        dateRangePicker: dateRangePickerReducer,
        datePickerOpenClose: datePickerOpenCloseReducer,
        searchButtonClicked: searchButtonClickedReducer
    }
})

export default store;