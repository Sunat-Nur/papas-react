import React, {useEffect, useRef, useState} from "react";
import {Box, Container, Stack} from "@mui/system";
import {Swiper, SwiperSlide} from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs} from "swiper";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import {useHistory, useParams} from "react-router-dom";
import {Product} from "../../../types/product";

// REDUX
import {createSelector} from "reselect";
import {retrieveChosenProduct, retrieveChosenRestaurant} from "./selector";
import {Restaurant} from '../../../types/user';
import {Dispatch} from "@reduxjs/toolkit";
import {setChosenProduct, setChosenRestaurant} from "./slice";
import {useDispatch, useSelector} from "react-redux";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import {serverApi} from "../../../lib/Config";
import assert from "assert";
import {Definer} from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
    setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data)),
});

/** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({
        chosenProduct,
    })
);

const chosenRestaurantRetriever = createSelector(
    retrieveChosenRestaurant,
    (chosenRestaurant) => ({
        chosenRestaurant,
    })
);

const chosen_list = Array.from(Array(3).keys());

export function ChosenDish(props: any) {

    /** INITIALIZATIONS */
    let {dish_id} = useParams<{ dish_id: string }>();

    const {setChosenProduct, setChosenRestaurant,} = actionDispatch(useDispatch());
    const {chosenProduct} = useSelector(chosenProductRetriever);
    const {chosenRestaurant} = useSelector(chosenRestaurantRetriever);
    const label = {inputProps: {"aria-label": "Checkbox demo"}};
    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    const dishRelatedProcess = async () => {
        try {
            const productService = new ProductApiService();
            const product: Product = await productService.getChosenDish(dish_id);
            setChosenProduct(product); // redux iga setChosenProduct ni path qilyabman

            const restaurantService = new RestaurantApiService();
            const restaurant = await restaurantService.getChosenRestaurant(
                product.restaurant_mb_id
            );
            setChosenRestaurant(restaurant);  // redux iga setChosenRestaurant ni path qilyabman
        } catch (err) {
            console.log(`dishRelatedProcess, ERROR:  `, err);
        }
    };

    useEffect(() => {
        dishRelatedProcess().then();
    }, [productRebuild]);

    /** HANDLERS  */
    const targetLikeProduct = async (e: any) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: e.target.id,
                group_type: "product",
            });
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            setProductRebuild(new Date());
        } catch (err: any) {
            console.log("targetLikeProduct, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div className="chosen_dish_page">
            <Container className="dish_container"
                       sx={{display: "flex"}}
            >
                <Stack className="chosen_dish_slider">
                    <Swiper
                        className="dish_swiper"
                        loop={true}
                        spaceBetween={10}
                        navigation={true}

                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {chosenProduct?.product_images.map((ele: string) => {
                            const image_path = `${serverApi}/${ele}`
                            return (
                                <SwiperSlide>
                                    <img
                                        style={{width: "100%", height: "100%"}}
                                        src={image_path}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <Swiper
                        className="dish_swiper_second"
                        loop={true}
                        freeMode={true}
                        watchSlidesProgress={true}
                        spaceBetween={25}
                        navigation={{
                            nextEl: null,
                        }}
                        slidesPerView={3}
                        modules={[FreeMode, Navigation, Thumbs]}
                    >
                        {chosenProduct?.product_images.map((ele: string) => {
                            const image_path = `${serverApi}/${ele}`
                            return (
                                <SwiperSlide
                                    style={{height: "107px", display: "flex",}}
                                >
                                    <img style={{width: "100%", height: "100%"}} src={image_path}/>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Stack>
                <Stack className={"chosen_dish_info_container"}>
                    <Box className={"chosen_dish_info_box"}>
                        <strong className={"dish_text"}>{chosenProduct?.product_name}</strong>
                        <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>
                        <Box className={"rating_box"}>
                            <Rating name="half_rating" defaultValue={3.5} precision={0.5} style={{fontSize: "30px"}}/>
                            <div className={"evaluation_box"}>
                                <div
                                    style={{display: "flex", alignItems: "center", marginRight: "20px",}}
                                >
                                    <Checkbox
                                        {...label}
                                        icon={<FavoriteBorder/>}
                                        checkedIcon={<Favorite style={{color: "red"}}/>}
                                        id={chosenProduct?._id}
                                        onClick={targetLikeProduct}
                                        checked={!!chosenProduct?.me_liked[0]?.my_favorite
                                        }
                                    />
                                    <span>{chosenProduct?.product_likes}</span>
                                </div>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <RemoveRedEyeIcon sx={{mr: "10px"}}/>
                                    <span>{chosenProduct?.product_views}</span>
                                </div>
                            </div>
                        </Box>
                        <p className={"dish_desc_info"}>
                            {chosenProduct?.product_description
                                ? chosenProduct?.product_description
                                : "no description"}
                        </p>
                        <Marginer
                            direction="horizontal"
                            height="1"
                            width="100%"
                            bg="#000000"
                        />
                        <div className={"dish_price_box"}>
                            <span>Price:</span>
                            <span>${chosenProduct?.product_price}</span>
                        </div>
                        <div className={"button_box"}>
                            <Button variant="contained" sx={{background: "blue"}}
                                    onClick={() => {
                                        props.onAdd(chosenProduct)
                                    }}
                            >
                                add to basket</Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}