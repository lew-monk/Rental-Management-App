import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  property: [],
};

export const fetchBusiness = createAsyncThunk(
  "business/fetchBusiness",
  async (payload, { dispatch, getState }) => {
    const response = await axios.get("/business");
    // dispatch(regBus(response.data))
    return response.data;
  }
);

const propertySearch = createSlice({
  name: "property Type",
  initialState,
  reducers: {
    regBus(state, action) {
      state = { ...action.payload };
      return state;
    },
    clearBussiness() {
      return initialState;
    },
  },
});

export const propertyFoundSelector = (state) => {
  return state.persistedReducer.propertyFound;
};

export const { regBus, clearBussiness } = propertySearch.actions;

export default propertySearch.reducer;
