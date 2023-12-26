import React, { useEffect } from "react";
import {Container} from "@mui/material";
import {Statistics} from "./statistics";
import {TopRestaurants} from "./topRestaurants";
import {BestRestaurants} from "./bestRestaurants";
import {BestDishes} from "./bestDishes";
import {Advertisements} from "./advertisements";
import {Events} from "./events";
import {Recommendations} from "./recommendations";
import '../../../css/home.css';

// REDUX tegishli bulgan importlar.
import { useDispatch, useSelector } from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setTopRestaurants, setBestRestaurants} from "./slice";
import { Restaurant } from "../../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTopRestaurants: (data: Restaurant[]) => dispach(setTopRestaurants(data)),
    setBestRestaurants: (data: Restaurant[]) => dispach(setBestRestaurants(data)),
});

export function Homepage() {

    /** INITIALIZATION */

    const {setTopRestaurants, setBestRestaurants } = actionDispatch(useDispatch()); //HomePageSlicedan setTopRestaurantni chaqirib oldim.


    // Selector(malumot uquvchi) bizga Storedan datani olib beradi.

    // useEffect(() => {

    // backend data request => data ni olganimizda malumotni Redux Store ga borib yozib olamiz.
    // bu holatda bizga 2ta mantiq kerak buladi: SLICE va SELECTOR => biri borib storega mantiq yozadi,
    // biri yozilgan mantiqni olib uqiydi.
    // backenddan olgan datani Redux Storega borib yozadi, buning un SLICE(malumot yozuvchi degani) yordam beradi.

    useEffect(() => {  // back-end dan kelgan datani  ma'lumotni retriev qiladi
        const restaurantService = new RestaurantApiService();
        restaurantService
            .getTopRestaurants()
            .then((data) => {  // then javob kelsin, back-end dan data kelsin deyilyabdi

                // redux ni call qismi b
                setTopRestaurants(data); // kelgan data ni setTopRestaurants ga yuklayabman

            }).catch(err => console.log(err));

        restaurantService   // BestRestaurantning datalarini STORE qildik,
            .getRestaurants({ page: 1, limit: 4, order: 'mb_point'})
            .then((data) => {
                setBestRestaurants(data);
            }).catch(err => console.log(err));

    }, []);

    return  <div className="homepage">
        <Statistics />
        <TopRestaurants />
        <BestRestaurants />
        <BestDishes />
        <Advertisements />
        <Events />
        <Recommendations />

    </div>;
}