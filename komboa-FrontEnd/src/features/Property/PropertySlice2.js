import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchProperty = createAsyncThunk('property/fetchProperty', async (payload) => {
    const response = await axios.get('/tests')
    return response.data
})


const initialState = {
    Property: []
}

const propertySlice2 = createSlice({
    name: 'property',
    initialState,
    reducers: {
        properties: (state, action) => {
            return {state, ...action.payload}
        },
        clearProperties: (state, action) => {
            return initialState
        }
    },
    extraReducers:{
        [fetchProperty.fulfilled]: (state, action) => {
            state = {...action.payload}
            return state
        }
    }
})

export const imageSelector = (state) => {
    return state.persistedReducer.property
}
export const {properties, clearProperties} = propertySlice2.actions

export default propertySlice2.reducer