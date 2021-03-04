import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    files: [],
  
}

const dropSlice = createSlice({
    name: 'drop',
    initialState,
    reducers:{
        addImage: (state, action) => {
            return [...action.payload]
        }
    }
})


export const {addImage} = dropSlice.actions

export const fileSelector = (state) => {
    return state.persistedReducer.drop
}

export default dropSlice.reducer