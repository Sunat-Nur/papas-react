import React, {useEffect, useRef, useState} from "react";
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
import {SearchObj} from "../../../types/others";
import {serverApi} from "../../../lib/Config";
import assert from "assert";
import {Definer} from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";


SwiperCore.use([Autoplay, Navigation,]);

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
    const [targetSearchObject, setTartgetSearchObject] = useState<SearchObj>({
        page: 1,
        limit: 4,
        order: "mb_point",
    });
    const refs: any = useRef([]);

    useEffect(() => {
        const restaurantService = new RestaurantApiService();
        restaurantService.getRestaurants(targetSearchObject)
            .then(data => setTargetRestaurants(data))
            .catch((err) => console.log(err));
    }, [targetSearchObject]);

    /** HANDLERS  */
    const searchHandler = (category: string) => {
        targetSearchObject.page = 1;
        targetSearchObject.order = category;
        setTartgetSearchObject({...targetSearchObject});  // targetSearchObject ning qiymatlaridan tashkil topgan yangi object hosil qilyabman
    };
    const handlePaginationChange = (event: any, value: number) => {
        targetSearchObject.page = value;
        setTartgetSearchObject({...targetSearchObject});
    };


    const targetLikeHandler = async (e: any, id: string) => {
        try {
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: "member",
            });
            assert.ok(like_result, Definer.general_err1);

            if (like_result.like_status > 0) {
                e.target.style.fill = "red";
                refs.current[like_result.like_ref_id].innerHTML++;
            } else {
                e.target.style.fill = "white"
                refs.current[like_result.like_ref_id].innerHTML--;
            }
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log("targetLikeTop, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        < div className="all_restaurant">
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className={"fil_search_box"} sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box className={"fil_box"} style={{cursor: "pointer"}}>
                        <a onClick={() => searchHandler("mb_point")}>Zo'r</a>
                        <a onClick={() => searchHandler("mb_views")}>Mashhurlar</a>
                        <a onClick={() => searchHandler("mb_likes")}>Trendagi</a>
                        <a onClick={() => searchHandler("createdAt")}>Yangi</a>
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
                        {targetRestaurants.map((ele: Restaurant) => {
                            const image_path = `${serverApi}/${ele.mb_image}`;
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
                                            <img src={image_path} alt=""/>
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
                                                onClick={(e) => targetLikeHandler(e, ele._id)}
                                                style={{
                                                    fill:
                                                        ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                            ? "red"
                                                            : "white",
                                                }}
                                            />
                                        </IconButton>
                                    </CardOverflow>
                                    <Typography level="h2" sx={{fontSize: "lg", mt: 0.5}}>
                                        {ele.mb_nick} restaurant
                                    </Typography>
                                    <Typography level="body-sm" sx={{mt: 0.1, mb: 0.5}}>
                                        <Link
                                            href=""
                                            startDecorator={<LocationOnRoundedIcon/>}
                                            textColor="neutral.700"
                                        >
                                        </Link>
                                        {ele.mb_address}
                                    </Typography>

                                    <Typography level="body-sm" sx={{mt: 0.5, mb: 0.5}}>
                                        <Link
                                            href=""
                                            startDecorator={<CallIcon/>}
                                            textColor="neutral.700"
                                        >
                                            {ele.mb_phone}
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
                                            {ele.mb_views}
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
                                            <div
                                                ref={(element) => (refs.current[ele._id] = element)}
                                            >
                                                {ele.mb_likes}
                                            </div>
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
                        count={
                            targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
                        }
                        page={targetSearchObject.page}
                        renderItem={(item) => (
                            <PaginationItem components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                            }} sx={{color: "brown"}} {...item}
                            />
                        )}
                        onChange={handlePaginationChange}
                    />
                    <img className={"line_img_two"} src={"/restaurant/icons_right.svg"} alt=""/>
                </Stack>
            </Stack>
        </div>
    );
}