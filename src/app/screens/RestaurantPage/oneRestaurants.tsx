import {Box, Button, Checkbox} from "@mui/material";
import {Container, Stack} from "@mui/system";
import React, {useEffect, useRef, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Swiper, SwiperSlide} from "swiper/react";
import Badge from "@mui/material/Badge";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";
import {useHistory, useParams} from "react-router-dom";

import {Product} from "../../../types/product";
import {ProductSearchObj} from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import {serverApi} from "../../../lib/Config";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import assert from "assert";
import {Definer} from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";

// REDUX
import {createSelector} from "reselect";
import {retrieveRandomRestaurants, retrieveChosenRestaurant, retrieveTargetProducts} from "./selector";
import {Restaurant} from '../../../types/user';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setRandomRestaurants, setChosenRestaurant, setTargetProducts} from "./slice";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setRandomRestaurants: (data: Restaurant[]) => dispatch(setRandomRestaurants(data)),
    setChosenRestaurant: (data: Restaurant) => dispatch(setChosenRestaurant(data)),
    setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const randomRestaurantsRetriever = createSelector(
    retrieveRandomRestaurants,
    (randomRestaurants) => ({
        randomRestaurants,
    })
);
const chosenRestaurantRetriever = createSelector(
    retrieveChosenRestaurant,
    (chosenRestaurant) => ({
        chosenRestaurant,
    })
);
const targetProductsRetriever = createSelector(
    retrieveTargetProducts,
    (targetProducts) => ({
        targetProducts,
    })
);


export function OneRestaurants(props: any) {

    /** INITIALIZATIONS */
    const history = useHistory();
    let {restaurant_id} = useParams<{ restaurant_id: string }>();
    const {setRandomRestaurants, setChosenRestaurant, setTargetProducts} =
        actionDispatch(useDispatch())

    const {randomRestaurants} = useSelector(randomRestaurantsRetriever);
    const {chosenRestaurant} = useSelector(chosenRestaurantRetriever);
    const {targetProducts} = useSelector(targetProductsRetriever);
    const [chosenRestaurantId, setChosenRestaurantId] =
        useState<string>(restaurant_id);
    const [targetProductsSearchObj, setTargetProductSearchObj] =
        useState<ProductSearchObj>({
            page: 1,
            limit: 8,
            order: "createdAt",
            restaurant_mb_id: restaurant_id,
            product_collection: "dish",
        });

    const [productRebuild, setProductRebuild] = useState<Date>(new Date());

    useEffect(() => {

        const restaurantService = new RestaurantApiService();
        restaurantService.getRestaurants({page: 1, limit: 10, order: "random"})
            .then((data) => setRandomRestaurants(data))
            .catch((err) => console.log(err));

        restaurantService.getChosenRestaurant(chosenRestaurantId)
            .then((data) => setChosenRestaurant(data))
            .catch((err) => console.log(err));


        const productService = new ProductApiService();
        productService.getTargetProducts(targetProductsSearchObj)
            .then((data) => setTargetProducts(data))
            .catch((err) => console.log(err));
    }, [chosenRestaurantId, targetProductsSearchObj, productRebuild]);

    /** HANDLERS  */
    const chosenRestaurantHandler = (id: string) => {
        setChosenRestaurantId(id);
        targetProductsSearchObj.restaurant_mb_id = id;
        setTargetProductSearchObj({...targetProductsSearchObj});
        history.push(`/restaurant/${id}`);
    };

    const searchCollectionHandler = (collection: string) => {
        targetProductsSearchObj.page = 1;
        targetProductsSearchObj.product_collection = collection;
        setTargetProductSearchObj({...targetProductsSearchObj});
    };

    const searchOrderHandler = (order: string) => {
        targetProductsSearchObj.page = 1;
        targetProductsSearchObj.order = order;
        setTargetProductSearchObj({...targetProductsSearchObj});
    };

    const chosenDishHandler = (id: string) => {
        history.push(`/restaurant/dish/${id}`);
    };


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
        <div className="single_restaurant">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar_big_box"}>
                        <Box className={"top_text"}>
                            <p>Texas De Brazil Restaurant</p>
                            <Box className={"Single_search_big_box"}>
                                <form className={"Single_search_form"} action={""} method={""}>
                                    <input
                                        type={"search"}
                                        className={"Single_searchInput"}
                                        name={"Single_resSearch"}
                                        placeholder={"Qidiruv"}
                                    />
                                    <Button
                                        className={"Single_button_search"}
                                        variant="contained"
                                        endIcon={<SearchIcon/>}
                                    >
                                        Izlash
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Stack>

                    <Stack
                        style={{width: "100%", display: "flex"}}
                        flexDirection={"row"}
                        sx={{mt: "35px"}}
                    >
                        <Box
                            className={"prev_btn restaurant-prev"}>
                            <ArrowBackIosNewIcon
                                sx={{fontSize: 40}}
                                style={{color: "white"}}
                            />
                        </Box>
                        <Swiper
                            className={"restaurant_avatars_wrapper"}
                            slidesPerView={7}
                            centeredSlides={false}
                            spaceBetween={30}
                            navigation={{
                                nextEl: ".restaurant-next",
                                prevEl: ".restaurant-prev",
                            }}
                        >
                            {randomRestaurants.map((ele: Restaurant) => {
                                const image_path = `${serverApi}/${ele.mb_image}`;
                                return (
                                    <SwiperSlide
                                        onClick={() => chosenRestaurantHandler(ele._id)}
                                        style={{cursor: "pointer"}}
                                        key={ele._id}
                                        className={"restaurant_avatars"}
                                    >
                                        <img src={image_path}/>
                                        <span>{ele.mb_nick}</span>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <Box
                            className={"next_btn restaurant-next"}
                            style={{color: "white"}}
                        >
                            <ArrowForwardIosIcon sx={{fontSize: 40}}/>
                        </Box>
                    </Stack>

                    <Stack
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-end"}
                        width={"90%"}
                        sx={{mt: "65px"}}
                    >
                        <Box className={"dishes_filter_box"}>
                            <Button
                                variant={"contained"}
                                color="secondary"
                                onClick={() => searchOrderHandler("createdAt")}
                            >
                                new
                            </Button>
                            <Button
                                variant={"contained"}
                                color="secondary"
                                onClick={() => searchOrderHandler("product_price")}
                            >
                                price
                            </Button>
                            <Button
                                variant={"contained"}
                                color="secondary"
                                onClick={() => searchOrderHandler("product_likes")}
                            >
                                likes
                            </Button>
                            <Button
                                variant={"contained"}
                                color="secondary"
                                onClick={() => searchOrderHandler("product_views")}
                            >
                                views
                            </Button>
                        </Box>
                    </Stack>

                    <Stack
                        style={{width: "100%", display: "flex", minHeight: "600px"}}
                        flexDirection={"row"}
                    >
                        <Stack className={"dish_category_box"}>
                            <div className={"dish_category_main"}>
                                <Button
                                    variant={"contained"}
                                    color="secondary"
                                    onClick={() => searchCollectionHandler("etc")}
                                >
                                    boshqa
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color="secondary"
                                    onClick={() => searchCollectionHandler("desert")}
                                >
                                    desert
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color="secondary"
                                    onClick={() => searchCollectionHandler("drink")}
                                >
                                    ichimlik
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color="secondary"
                                    onClick={() => searchCollectionHandler("salad")}
                                >
                                    salad
                                </Button>
                                <Button
                                    variant={"contained"}
                                    color="secondary"
                                    onClick={() => searchCollectionHandler("dish")}
                                >
                                    ovqatlar
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"dish_wrapper"}>
                            {targetProducts.map((product: Product, index) => {
                                const image_path = `${serverApi}/${product.product_images[0]}`
                                const size_volume =
                                    product.product_collection === "drink"
                                        ? product.product_volume + "l"
                                        : product.product_size + "size";
                                console.log("product::::", product);
                                return (
                                    <Box
                                        onClick={() => chosenDishHandler(product._id)}
                                        className={"dish_box"} key={product._id}
                                    >
                                        <Box className={"dish_img"}
                                             sx={{
                                                 backgroundImage: `url(${image_path})`,
                                             }}
                                        >
                                            <div className={"dish_sale"}>{size_volume}</div>
                                            <Button
                                                className={"like_view_btn"}
                                                style={{left: "36px"}}
                                            >
                                                <Badge badgeContent={product.product_likes} color="primary">
                                                    <Checkbox
                                                        icon={<FavoriteBorder style={{color: "white"}}/>}
                                                        id={product._id}
                                                        checkedIcon={<Favorite style={{color: "red"}}/>}
                                                        onClick={(e) => {
                                                            targetLikeProduct(e);
                                                            e.stopPropagation();
                                                        }}
                                                        checked={
                                                            product?.me_liked &&
                                                            product?.me_liked[0]?.my_favorite
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </Badge>
                                            </Button>
                                            <Button className={"view_btn"}
                                                    onClick={(e) => {
                                                        props.onAdd(product);
                                                        e.stopPropagation();
                                                    }}
                                            >
                                                <img
                                                    src={"/icons/shopping_cart.svg"}
                                                    style={{display: "flex"}}
                                                />
                                            </Button>
                                            <Button
                                                className={"like_view_btn"}
                                                style={{right: "36px"}}
                                            >
                                                <Badge badgeContent={product.product_views} color="primary">
                                                    <Checkbox
                                                        icon={
                                                            <RemoveRedEyeIcon style={{color: "white"}}/>
                                                        }
                                                    />
                                                </Badge>
                                            </Button>
                                        </Box>
                                        <Box className={"dish_desc"}>
                                            <span className={"dish_title_text"}>{product.product_name}</span>
                                            <div className={"dish_desc_text"}>
                                                <MonetizationOnIcon/>{product.product_price}
                                            </div>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>

            <div className={"review_for_restaurant"}>
                <Container
                    sx={{mt: "100px"}}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box className={"category_title"}>Oshxona haqida fikrlar</Box>
                    <Stack
                        flexDirection={"row"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100"}
                    >
                        {Array.from(Array(4).keys()).map((ele, index) => {
                            return (
                                <Box className={"review_box"} key={index}>
                                    <Box display={"flex"} justifyContent={"center"}>
                                        <img
                                            src={"/community/sunat_nur.png"}
                                            className={"review_img"}
                                        />
                                    </Box>

                                    <span className={"review_user"}>Sunat_Nur</span>
                                    <span className={"review_name"}>Foydalanuvchi</span>
                                    <p className={"review_desc"}>
                                        Menga bu restarant taomlari yoqadi. Barchang tavsiya qilaman!!!
                                    </p>
                                    <div className={"review_stars"}>
                                        <StarIcon style={{color: "#F2BD57"}}/>
                                        <StarIcon style={{color: "#F2BD57"}}/>
                                        <StarIcon style={{color: "#F2BD57"}}/>
                                        <StarIcon style={{color: "whitesmoke"}}/>
                                        <StarIcon style={{color: "whitesmoke"}}/>
                                    </div>

                                </Box>
                            );
                        })}
                    </Stack>

                </Container>
            </div>

            <Container className="member_reviews">
                <Box className={"category_title"}>Oshxona haqida</Box>
                <Stack
                    display={"flex"}
                    flexDirection={"row"}
                    width={"90%"}
                    sx={{mt: "70px"}}
                >
                    <Box
                        className={"about_left"}
                        sx={{
                            backgroundImage: `url(${serverApi}/${chosenRestaurant?.mb_image})`,
                        }}
                    >
                        <div className={"about_left_desc"}>
                            <span>{chosenRestaurant?.mb_nick}</span>
                            <p>{chosenRestaurant?.mb_description}</p>
                        </div>
                    </Box>
                    <Box className={"about_right"}>
                        {Array.from(Array(3).keys()).map((ele, index) => {
                            return (
                                <Box display={'flex'} flexDirection={"row"} key={index}>
                                    <div className={"about_right_img"}></div>
                                    <div className={"about_right_desc"}>
                                        <span>Bizning mohir oshpazlarimiz</span>
                                        <p>Bizning oshpazlarimiz dunto taniydigan
                                            oliygohlarda talim olishgan
                                        </p>
                                    </div>
                                </Box>
                            );
                        })}
                    </Box>
                </Stack>


                <Stack
                    sx={{mt: "60px"}}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box className={"category_title"}>Oshxona Manzili</Box>
                    <iframe
                        style={{marginTop: "60px",}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25294.242382150278!2d127.05066999999998!3d37.58379085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb5cd4298ec1%3A0xe040c8bbb76d2b24!2sDongdaemun-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1700545060503!5m2!1sen!2skr"
                        width="1320"
                        height="500"
                    ></iframe>

                </Stack>
            </Container>
        </div>
    );
}
