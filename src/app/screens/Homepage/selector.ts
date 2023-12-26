 // selector back-end dan ma'umotni olib
 // ma'lumotni olib to'gridan to'gri ishlatlmadik reducer orqali redux-store ni o'zgartirdim
 // store ni ichidan selector orqali endi xoxlagan ma'lumotni olib kelish mumkin

import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

 //state ni ko'rsatib: obshi butun application ni state ni AppRootState olyabman
const selectHomePage = (state: AppRootState) => state.homePage;// stateni ichidan faqat  homepage ni  olib ber deyabman.
 // homePage ni ichida restaurant larni retriev qilish  bo'lsa
export const retrieveTopRestaurants = createSelector( // bu yerda mantiq yozilyabdi
    selectHomePage, // qaysi section ligini kursatyabman, selectHomePage u yerda
    // va uni ichida homePage ni ichdan ( retrieve ni ichidan) topRestaurants (slice da joylashga) larni olib ber deyabman
    (HomePage) => HomePage.topRestaurants
);

export const retrieveBestRestaurants = createSelector(
    selectHomePage, // menga homepageni olib bersin
    (HomePage) => HomePage.bestRestaurants // bestRestaurants slice dan joylashgan
);

export const retrieveTrendProducts = createSelector(
    selectHomePage, // menga homepageni olib bersin
    (HomePage) => HomePage.trendProducts
);

export const retrieveBestBoArticles = createSelector(
    selectHomePage, // menga homepageni olib bersin
    (HomePage) => HomePage.bestBoArticles
);

export const retrieveTrendBoArticles = createSelector(
    selectHomePage, // menga homepageni olib bersin
    (HomePage) => HomePage.trendBoArticles
);

export const retrieveNewsBoArticles = createSelector(
    selectHomePage, // menga homepageni olib bersin
    (HomePage) => HomePage.newsBoArticles
);