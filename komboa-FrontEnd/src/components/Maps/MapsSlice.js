import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

const mapSlice = createSlice({
    name: 'cordinates',
    initialState,
    reducers:{
        addCordinates: (state, action) => {
            return action.payload
        }
    }
})

export const cordinateSelector = (state) => {
    return state.persistedReducer.maps
}

export const {addCordinates} = mapSlice.actions 

export default  mapSlice.reducer