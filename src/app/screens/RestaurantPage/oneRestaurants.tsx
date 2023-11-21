import { Box ,Button, Checkbox} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import Badge from "@mui/material/Badge";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";


const restaurant_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(8).keys());


export function OneRestaurants () {
    return(
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
                                        endIcon={<SearchIcon />}
                                    >
                                        Izlash
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Stack>

                    <Stack
                        style={{ width: "100%", display: "flex" }}
                        flexDirection={"row"}
                        sx={{ mt: "35px" }}
                    >
                        <Box
                            className={"prev_btn restaurant-prev"}>
                            <ArrowBackIosNewIcon
                                sx={{ fontSize: 40 }}
                                style={{ color:  "white"}}
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
                            {restaurant_list.map((ele, index) => {
                                return (
                                    <SwiperSlide
                                        style={{ cursor: "pointer" }}
                                        key={index}
                                        className={"restaurant_avatars"}
                                    >
                                        <img src={"/restaurant/burak.jpeg"} />
                                        <span>Burak Cevit</span>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <Box
                            className={"next_btn restaurant-next"}
                            style={{ color: "white" }}
                        >
                            <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
                        </Box>
                    </Stack>

                    <Stack
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-end"}
                        width={"90%"}
                        sx={{ mt: "65px"}}
                    >
                        <Box className={"dishes_filter_box"}>
                            <Button variant={"contained"} color="secondary">
                                new
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                price
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                likes
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                views
                            </Button>
                        </Box>
                    </Stack>

                    <Stack
                        style={{ width: "100%", display: "flex", minHeight: "600px"}}
                        flexDirection={"row"}
                    >
                        <Stack className={"dish_category_box"}>
                            <div className={"dish_category_main"}>
                                <Button variant={"contained"} color="secondary">
                                    boshqa
                                </Button>
                                <Button variant={"contained"} color="secondary">
                                    desert
                                </Button>
                                <Button variant={"contained"} color="secondary">
                                    ichimlik
                                </Button>
                                <Button variant={"contained"} color="secondary">
                                    salad
                                </Button>
                                <Button variant={"contained"} color="secondary">
                                    ovqatlar
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"dish_wrapper"}>
                            {product_list.map((ele, index) => {
                                const size_volume = "normal size";

                                return (
                                    <Box className={"dish_box"} key={`${index}`}>
                                        <Box className={"dish_img"}
                                             sx={{
                                                 backgroundImage: `url("/others/osh.png")`,
                                             }}
                                        >
                                            <div className={"dish_sale"}>{size_volume}</div>
                                            <Button
                                                className={"like_view_btn"}
                                                style={{ left: "36px" }}
                                            >
                                                <Badge badgeContent={8} color="primary">
                                                    <Checkbox
                                                        icon={<FavoriteBorder style={{ color: "white" }} />}
                                                        id={`${index}`}
                                                        checkedIcon={<Favorite style={{ color: "red" }} />}
                                                        /*@ts-ignore*/
                                                        checked={true}
                                                    />
                                                </Badge>
                                            </Button>
                                            <Button className={"view_btn"}>
                                                <img
                                                    src={"/icons/shopping-cart_oneres.svg"}
                                                    style={{ display: "flex"}}
                                                />
                                            </Button>
                                            <Button
                                                className={"like_view_btn"}
                                                style={{ right: "36px"}}
                                            >
                                                <Badge badgeContent={1000} color="primary">
                                                    <Checkbox
                                                        icon={
                                                            <RemoveRedEyeIcon style={{ color: "white" }} />
                                                        }
                                                    />
                                                </Badge>
                                            </Button>
                                        </Box>
                                        <Box className={"dish_desc"}>
                                            <span className={"dish_title_text"}>Surxon palov</span>
                                            <div className={"dish_desc_text"}>
                                                <MonetizationOnIcon />8
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
                    sx={{ mt: "100px"}}
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
                                            src={"/community/profile.4.png"}
                                            className={"review_img"}
                                        />
                                    </Box>

                                    <span className={"review_user"}>Sunat_Nur</span>
                                    <span className={"review_name"}>Foydalanuvchi</span>
                                    <p className={"review_desc"}>
                                        Menga bu restarant taomlari yoqadi. Barchang tavsiya qilaman!!!
                                    </p>
                                    <div className={"review_stars"}>
                                        <StarIcon style={{ color: "#F2BD57" }} />
                                        <StarIcon style={{ color: "#F2BD57" }} />
                                        <StarIcon style={{ color: "#F2BD57" }} />
                                        <StarIcon style={{ color: "whitesmoke" }} />
                                        <StarIcon style={{ color: "whitesmoke" }} />
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
                    sx={{ mt: "70px" }}
                >
                    <Box
                        className={"about_left"}
                        sx={{
                            backgroundImage: `url('/restaurant/texasdebrazil.webp')`,
                        }}
                    >
                        <div className={"about_left_desc"}>
                            <span>eng mazzali oshxona</span>
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
                    sx={{ mt: "60px" }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box className={"category_title"}>Oshxona Manzili</Box>
                    <iframe
                        style={{ marginTop: "60px",}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25294.242382150278!2d127.05066999999998!3d37.58379085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb5cd4298ec1%3A0xe040c8bbb76d2b24!2sDongdaemun-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1700545060503!5m2!1sen!2skr"
                        width="1320"
                        height="500"
                    ></iframe>

                </Stack>
            </Container>
        </div>
    );
}
