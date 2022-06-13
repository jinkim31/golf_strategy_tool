import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import '../rosNode'
import {GolfAdvice} from "../rosNode";
import {act} from "react-dom/test-utils";

export interface RosState {
    image: string
    advice:GolfAdvice
}

const initialState: RosState = {
    image:'',
    advice:{} as GolfAdvice,
}

export const rosSlice = createSlice({
    name: 'ros',
    initialState,
    reducers: {
        imageCallback: (state, action) => {
            state.image = action.payload
        },
        adviceCallback: (state, action) => {
            state.advice = action.payload
            console.log(action.payload)
        },
    }
})

export const {imageCallback, adviceCallback} = rosSlice.actions
export default rosSlice.reducer