// slice ma'lumotni redux storega  yozish uchun xizmat qiladi

import {createSlice} from "@reduxjs/toolkit";
import {RestaurantPageState} from "../../../types/screen";


const initialState: RestaurantPageState = { //initialState ni interface si sifatida homepage interface ni tashkilashtirib olganman
    tartgetRestaurants: [],  // type restaurant bulgan arraylardan iborat.
    randomRestaurants: [], // birinchi back-end dan hec qanday qiymat olmasa boshlang'ich qiymatni pustoy qilib olyabman [],
    chosenRestaurant: null,
    targetProducts: [],
    chosenProduct: null,
};

const restaurantPageSlice = createSlice({
    name: "restaurantPage",
    initialState,
    reducers: {
        setTargetRestaurants: (state, action) => {
            state.tartgetRestaurants = action.payload;
        },
        setRandomRestaurants: (state, action) => {
            state.randomRestaurants = action.payload;
        },
        setChosenRestaurant: (state, action) => {
            state.chosenRestaurant = action.payload;
        },
        setTargetProducts: (state, action) => {
            state.targetProducts = action.payload;
        },
        setTargetChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },
    },
});

export const {
    setTargetRestaurants,
    setRandomRestaurants,
    setChosenRestaurant,
    setTargetProducts,
    setTargetChosenProduct
} = restaurantPageSlice.actions;

const RestaurantPageReducer = restaurantPageSlice.reducer;
export default RestaurantPageReducer;