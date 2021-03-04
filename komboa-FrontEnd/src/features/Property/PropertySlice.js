import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    businessName: null,
    businessID: null,
    ownerId: null,

}

export const fetchBusiness = createAsyncThunk('business/fetchBusiness', async (payload, {dispatch, getState}) => {
    const response = await axios.get('/business')
    // dispatch(regBus(response.data))
    return response.data

})

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers:{
        regBus(state, action){
            const business = {
                businessName: action.payload.saveBusiness.businessName,
                businessID: action.payload.saveBusiness._id,
                ownerId: action.payload.saveBusiness.OwnerId
            }
            return {...state, business}
        },
        clearBussiness(){
            return initialState
        }
    },
    extraReducers:{
        [fetchBusiness.fulfilled]: (state, action) => {
            state = {...action.payload}
            return state
        },
        [fetchBusiness.pending]: (state, action) => {
            state = action.meta.requestId
        }
    }
})

export const businessSelector = (state) => {
    return state.persistedReducer.business
}

export const {regBus, clearBussiness} = businessSlice.actions

export default businessSlice.reducer

