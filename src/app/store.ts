import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from './screens/Homepage/slice';
import reduxLogger from "redux-logger";
import RestaurantPageReducer from "./screens/RestaurantPage/slice";
import OrdersPagesReducer from "./screens/OrdersPage/slice";
import CommunityPageReducer from "./screens/CommunityPage/slice"; // redux-logger ni vazifasi log qilib berish
// redux da  ma'lumotlar oqimini shakilantirib beradi, redux-storage dagi ma'lumotlar o'zgarishini ko'rsatib beradi


export const store = configureStore({
  // middleware da redux-loger ni yozib oldim
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
  reducer: { // reducer bilan redux storage ni bog'layabmiz
    homePage: HomePageReducer,
    restaurantPage: RestaurantPageReducer,
    ordersPage: OrdersPagesReducer,
    communityPage: CommunityPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;