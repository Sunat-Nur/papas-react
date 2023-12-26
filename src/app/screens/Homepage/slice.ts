// slice ma'lumot yozish hisoblanadi (storage ga )

import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = { //initialState ni interface si sifatida homepage interface ni tashkilashtirib olganman
    topRestaurants: [],  // type restaurant bulgan arraylardan iborat.
    bestRestaurants: [], // birinchi back-end dan hec qanday qiymat olmasa boshlang'ich qiymatni pustoy qilib olyabman [],
    trendProducts: [],
    bestBoArticles: [],
    trendBoArticles: [],
    newsBoArticles: [],

};

// HomePageSlice ma'lumot joylovchi qismi hisoblanadi
const HomePageSlice = createSlice({  // createSlice ni tooketdan olyabman
    name: 'homePage',
    initialState, // initialState yuqoridagi qiymatlarni kirityabman
    reducers: { //  store ni o'zgatiruvchi hisoblanadi

        // bu yerda topRestaurantlani initialState ni o'zgartiryabdi
        setTopRestaurants: (state, action) => {  // state -- ma'umotlar manbaiga ulaniw

            // state -- InitialState dan keladigan datani. actiondan kelayotgan datani reducer dan keladigan datani qiymatiga tenglab beradi
            state.topRestaurants = action.payload  // state -- InitialState dan keladigan datani. actiondan kelayotgan datani reducer dan keladigan datani qiymatiga tenglab beradi
        },// bu yerda BestRestaurants initialState ni o'zgartiryabdi
        setBestRestaurants: (state, action) => {
            state.bestRestaurants = action.payload
        },
        setTrendProducts: (state, action) => {
            state.trendProducts = action.payload
        },
        setBestBoArticles: (state, action) => {
            state.bestBoArticles = action.payload
        },
        setTrendBoArticles: (state, action) => {
            state.trendBoArticles = action.payload
        },
        setNewsBoArticles: (state, action) => {
            state.newsBoArticles = action.payload
        },
    },
});

export const { // reducer larni slice dan tashqarida ishlatish uchun complex  kurinishda yozib olyabman
    setTopRestaurants,
    setBestRestaurants,
    setTrendProducts,
    setBestBoArticles,
    setTrendBoArticles,
    setNewsBoArticles
} = HomePageSlice.actions;

// homepage reducer larni complex qilib olib storage ga integratsiya qilib olaman
// butun reducelari redux-storage bilan bog'lawni uchun ishlatyabman

const HomePageReducer = HomePageSlice.reducer; // HomePageSlice dan reducer (data ni ) olib HomePageReducer ga tenglayabman
export default HomePageReducer; // va HomePageReducer ni export qilyabman