
// back-end dagi schema model front-end da interface tushunchasiga teng
// create schema_model ----> create interface

import { BoArticle } from "./boArticle";
import { Product } from "./product";
import {Member, Restaurant} from "./user";
import {Order} from "./order";
import {Follower, Following} from "./follow";


/** REACT app state **/
export interface AppRootState {  // app dagi barcha interfacelarni integratsiya qilayopman. ularga biriktirilgan page lar va ularni typelari
    homePage: HomePageState;  // homepage => homepage typedan iborat;
    restaurantPage: RestaurantPageState;
    ordersPage: OrdersPageState;
    communityPage: CommunityPageState;
    memberPage: MemberPageState;
}

/** homePage  **/
// Homepage ichida kerakli data => typelar tashkillshtirib oldim.
export interface  HomePageState { //  homepageimning interfaceni hosil qilib oldim.
    topRestaurants: Restaurant[];  // type restaurant bulgan arraylardan iborat.
    bestRestaurants: Restaurant[];
    trendProducts: Product[];
    bestBoArticles: BoArticle[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}

/** restaurant page **/
export interface RestaurantPageState{
    tartgetRestaurants: Restaurant[];
    randomRestaurants: Restaurant[];
    chosenRestaurant: Restaurant | null;
    targetProducts: Product[];
    chosenProduct: Product | null;
}

/** orders page **/
export interface OrdersPageState{
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}


/** community page **/
export interface CommunityPageState{
    targetBoArticles: BoArticle[];

}

/** Member page **/
export interface MemberPageState {
    chosenMember: Member | null;
    chosenMemberBoArticles: BoArticle[];
    chosenSingleBoArticles: BoArticle | null;
    memberFollowers: Follower[];
    memberFollowings: Following[];
}