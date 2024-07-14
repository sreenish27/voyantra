import { createSlice } from '@reduxjs/toolkit';

const searchButtonClickedSlice = createSlice({
    name: 'searchButtonClicked',
    initialState: {
        isClicked:false
    },

    reducers:{
        setIsClicked(state, action){
            state.isClicked = action.payload;
        }
    },
});

export const { setIsClicked } = searchButtonClickedSlice.actions;
export default searchButtonClickedSlice.reducer;