import React, {useEffect} from "react";
import {Box, Button, Stack,} from "@mui/material";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link} from "@mui/joy";
import {Favorite} from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {PaginationItem} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SwiperCore, {Autoplay, Navigation} from "swiper";
// REDUX
import {createSelector} from "reselect";
import {retrieveTargetRestaurants} from "./selector";
import {Restaurant} from '../../../types/user';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setTargetRestaurants} from "./slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";


SwiperCore.use([Autoplay, Navigation,]);
const order_list = Array.from(Array(8).keys());

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTargetRestaurants: (data: Restaurant[]) => dispatch(setTargetRestaurants(data)),
});

/** REDUX SELECTOR */
const targetRestaurantRetriever = createSelector(
    retrieveTargetRestaurants,
    (targetRestaurants) => ({
        targetRestaurants,
    })
);

export function AllRestaurants() {
    /** INITIALIZATIONS */
    const {setTargetRestaurants} = actionDispatch(useDispatch());
    const {targetRestaurants} = useSelector(targetRestaurantRetriever);

    useEffect(() => {
        // todo retrieve target restaurant data
    }, []);

    return (
        < div className="all_restaurant">
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className={"fil_search_box"} sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box className={"fil_box"}>
                        <a>Zo'r</a>
                        <a>Mashhur</a>
                        <a>Trendagi</a>
                        <a>Yangi</a>
                    </Box>
                    <Box className={"search_big_box"}>
                        <form
                            className={"search_form"}
                            action={""}
                            method={""}
                        >
                            <input
                                type={"search"}
                                className={"searchInput"}
                                name={"resSearch"}
                                placeholder={"qidiruv"}
                            />
                            <Button
                                className={"button_search"}
                                variant="contained"
                                endIcon={<SearchIcon/>}
                            >
                                Izlash
                            </Button>
                        </form>
                    </Box>
                </Box>
                <Stack className={"all_res_box"}>
                    <CssVarsProvider>
                        {order_list.map(ele => {
                            return (
                                <Card
                                    variant="outlined"
                                    sx={{
                                        minHeight: 410,
                                        minWidth: 290,
                                        mx: "17px",
                                        my: "20px",
                                    }}
                                >
                                    <CardOverflow>
                                        <AspectRatio ratio="1">
                                            <img src={"/restaurant/burak.jpeg"} alt=""/>
                                        </AspectRatio>
                                        <IconButton
                                            aria-label="Like minimal photography"
                                            size="md"
                                            variant="solid"
                                            color="neutral"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            sx={{
                                                position: "absolute",
                                                zIndex: 2,
                                                borderRadius: "50%",
                                                right: "1rem",
                                                bottom: 0,
                                                transform: "translateY(50%)",
                                                color: "rgba(0,0,0, .04)",
                                            }}
                                        >
                                            <Favorite
                                                style={{color: "white"}}
                                            />
                                        </IconButton>
                                    </CardOverflow>
                                    <Typography level="h2" sx={{fontSize: "lg", mt: 0.5}}>
                                        Burak Cevit
                                    </Typography>
                                    <Typography level="body-sm" sx={{mt: 0.1, mb: 0.5}}>
                                        <Link
                                            href=""
                                            startDecorator={<LocationOnRoundedIcon/>}
                                            textColor="neutral.700"
                                        >
                                        </Link>
                                        Tashkent city
                                    </Typography>

                                    <Typography level="body-sm" sx={{mt: 0.5, mb: 0.5}}>
                                        <Link
                                            href=""
                                            startDecorator={<CallIcon/>}
                                            textColor="neutral.700"
                                        >
                                            8210 0000 0000
                                        </Link>
                                    </Typography>
                                    <CardOverflow
                                        variant="soft"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 1.5,
                                            py: 1.5,
                                            px: "var(--Card-padding)",
                                            borderTop: "1px solid",
                                            bgcolor: "background.level1",
                                        }}
                                    >
                                        <Typography
                                            level="body-sm"
                                            sx={{
                                                fontWeight: "md",
                                                color: "text.secondary",
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            1000{" "}
                                            <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                        </Typography>
                                        <Box sx={{width: 2, bgcolor: "divider"}}/>
                                        <Typography
                                            level="body-sm"
                                            sx={{
                                                fontWeight: "md",
                                                color: "text.secondary",
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <div>500</div>
                                            <FavoriteIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                        </Typography>
                                    </CardOverflow>
                                </Card>
                            );
                        })}
                    </CssVarsProvider>
                </Stack>

                <Stack className={"bottom_box"}>
                    <img className={"line_img"} src={"/restaurant/icons_right.svg"} alt=""/>
                    <Pagination
                        count={3}
                        page={1}
                        renderItem={(item) => (
                            <PaginationItem components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }} sx={{color: "brown"}} {...item}
                            />
                        )}
                    />
                    <img className={"line_img_two"} src={"/restaurant/icons_right.svg"} alt=""/>
                </Stack>
            </Stack>
        </div>
    );
}