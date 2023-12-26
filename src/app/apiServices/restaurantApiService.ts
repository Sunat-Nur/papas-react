import axios from "axios";
import assert from "assert";
import {serverApi} from "../../lib/Config";
import {Definer} from "../../lib/Definer";
import {Restaurant} from "../../types/user";
import {SearchObj} from "../../types/others";

class RestaurantApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi; // path ni localhost ga tenglab olyabman
    }

    async getTopRestaurants() {

        try {
            const url = "/restaurants?order=top&page=1&limit=4",  // postmandagi getrestaurantni URLi.
                // this.path + url,  url ni path ga bog'layabman
                result = await axios.get(this.path + url, {withCredentials: true}); //withCredentials, cookie ni borwserga  yuborishga ruxsat berilyabdi
            // buyerda back-end ishlaydi datani kelishini kutadi
            assert.ok(result, Definer.general_err1);

            console.log("state:", result.data.state); // axios.result.data ni ichida back-end da hosil qilgan datani olyabman
            const top_restaurants: Restaurant[] = result.data.data; // resultni ichida  kelayotgan datani top-rest ga saqlab,
            return top_restaurants; // va  top-restaurant da return qilyabman

        } catch (err: any) {

            console.log(`ERROR ::: getTopRestaurants ${err.message}`);
            throw err;
        }
    }


    async getRestaurants(data: SearchObj) { //SearchObj interface hosil qildim

        try {
            const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,  // postmandagi getrestaurantni URLi.
                result = await axios.get(this.path + url, {withCredentials: true});
            assert.ok(result, Definer.general_err1);

            console.log("state:", result.data.state); //backenddan qaytargan malumotimiz res.json formatni ichidagi state hamda successlar datani ichida berilmoqda.
            const restaurants: Restaurant[] = result.data.data; //toprestaurantsni type: interface Restaurant bulayopti,
            // resultni ichidan kelayotgan datani ichidagi data; resultni ichidagi data axios bn keladi, 2chi data backendda hosil qilingan data.
            return restaurants;

        } catch (err: any) {

            console.log(`ERROR ::: getRestaurants ${err.message}`);
            throw err;
        }
    }

}

export default RestaurantApiService;