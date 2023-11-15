import React from "react";
import {Container} from "@mui/material";
import {BestRestaurants} from "./bestRestaurants";
import {TopRestaurants} from "./topRestaurants";
import {BestDishes} from "./bestDishes";
import {Advertisements} from "./advertisements";
import {Statistics} from "./statistics";
import {Events} from "./events";
import {Recommendations} from "./recommendations";
import "../../../css/home.css"


export function Homepage() {
    return <div className="homepage">
        <Statistics/>
        <TopRestaurants/>
        <BestRestaurants/>
        <BestDishes/>
        <Advertisements/>
        <Events/>
        <Recommendations/>
    </div>;
}

