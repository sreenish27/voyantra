import { createSlice } from '@reduxjs/toolkit';

const datePickerOpenCloseSlice = createSlice({
    name: 'datePickerOpenClose',
    initialState:{
        isOpen: false,
    },
    reducers:{
        setIsOpen(state, action){
            state.isOpen = action.payload;
        },
    },
});

export const { setIsOpen } = datePickerOpenCloseSlice.actions;
export default datePickerOpenCloseSlice.reducer;