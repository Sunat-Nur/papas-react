import React, { useEffect } from "react";
import {Box, Container, Stack} from "@mui/material";
import {MonetizationOn} from "@mui/icons-material/";

// REDUX tegishli bulgan importlar.
import { useDispatch, useSelector } from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { setTrendProducts } from "./slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveTrendProducts } from "./selector";
import {createSelector} from "reselect";
import { serverApi } from "../../../lib/Config";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTrendProducts: (data: Product[]) => dispach(setTrendProducts(data)),
});

/** REDUX SELECTOR */
const trendProductsRetriever = createSelector(
    retrieveTrendProducts,
    (trendProducts) => ({
        trendProducts,
    })
);


export function BestDishes() {

    /** INITIALIZATION */
    const {setTrendProducts} = actionDispatch(useDispatch());
    const {trendProducts} = useSelector(trendProductsRetriever); //useSelectorga topRestaurantRetrieverni kiritib undan topRestaurantni qabul qilib olayopman.
    useEffect(() => {
        const productService = new ProductApiService();
        productService.getTargetProducts({order: "product_likes", page: 1, limit: 7})
            .then(data => setTrendProducts(data))  // productApiServicedan return bulgan qiymatni olib kelamiz.
            .catch(err => console.log(err));
    }, []);

    return(
        <div className="best_dishes_frame">
            <Container>
                <Stack
                    flexDirection={"column"}
                    alignItems={'center'}
                >
                    <Box className={'category_title'}>Trendagi Ovqatlar</Box>
                    <Stack  sx={{mt: "43px"}} flexDirection={"row"}>
                        {trendProducts.map((product: Product) => {

                            const image_path = `${serverApi}/${product.product_images[0]}`
                            // product sizelar un teorema.
                            const size_volume = product.product_collection === 'drink'
                                ? product.product_volume + 'l'
                                : product.product_size + 'size';

                            return(
                                <Box className="dish_box">
                                    <Stack className="dish_img"
                                           sx={{
                                               backgroundImage: `url(${image_path})`,
                                           }}
                                    >
                                        <div className={"dish_sale"}>{size_volume}</div>
                                        <div className={"view_btn"}>
                                            Batafsil ko'rinish
                                            <img
                                                src={"/icons/strilka.png"}
                                                style={{ marginLeft: "9px" }}
                                            />
                                        </div>
                                    </Stack>
                                    <Stack className={"dish_desc"}>
                                        <span className={"dish_title_text"}>{product.product_name}</span>
                                        <span className={"dish_desc_text"}>
                                        <MonetizationOn />
                                            {product.product_price}
                                    </span>
                                    </Stack>
                                </Box>
                            )
                        })}

                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}