import {Box, Container, Stack,} from "@mui/material";
import {MonetizationOn} from "@mui/icons-material";
import React from "react";

export function BestDishes() {
    return (
        <div className="best_dishes_frame">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title"> Trendagi ovqatlar</Box>
                    <Stack sx={{mt: "43px"}} flexDirection={"row"}>

                        <Box className={"dish_box"}>
                            <Stack
                                className="dish_img"
                                sx={{
                                    backgroundImage: `url(
                                    https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg                                   
                                    )`
                                }}
                            >
                                <div className={"dish_sale"}>normal size</div>
                                <div className={"view_btn"}>
                                    <div> Batafsil ko'rish</div>
                                    <img
                                        src={"/icons/Arrow8.svg"}
                                        style={{marginLeft: "9px"}}
                                    />
                                </div>
                            </Stack>
                            <Stack className={"dish_desc"}>
                                <span className={"dish_title_text"}>Cheese Pasta</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn/>
                                    11
                                </span>
                            </Stack>
                        </Box>

                        <Box className={"dish_box"}>
                            <Stack
                                className="dish_img"
                                sx={{
                                    backgroundImage: `url(
                                    https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg                                   
                                    )`
                                }}
                            >
                                <div className={"dish_sale"}>normal size</div>
                                <div className={"view_btn"}>
                                    <div> Batafsil ko'rish</div>
                                    <img
                                        src={"/icons/Arrow8.svg"}
                                        style={{marginLeft: "9px"}}
                                    />
                                </div>
                            </Stack>
                            <Stack className={"dish_desc"}>
                                <span className={"dish_title_text"}>Cheese Pasta</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn/>
                                    11
                                </span>
                            </Stack>
                        </Box>

                        <Box className={"dish_box"}>
                            <Stack
                                className="dish_img"
                                sx={{
                                    backgroundImage: `url(
                                    https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg                                   
                                    )`
                                }}
                            >
                                <div className={"dish_sale"}>normal size</div>
                                <div className={"view_btn"}>
                                    <div> Batafsil ko'rish</div>
                                    <img
                                        src={"/icons/Arrow8.svg"}
                                        style={{marginLeft: "9px"}}
                                    />
                                </div>
                            </Stack>
                            <Stack className={"dish_desc"}>
                                <span className={"dish_title_text"}>Cheese Pasta</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn/>
                                    11
                                </span>
                            </Stack>
                        </Box>

                        <Box className={"dish_box"}>
                            <Stack
                                className="dish_img"
                                sx={{
                                    backgroundImage: `url(
                                    https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg                                   
                                    )`
                                }}
                            >
                                <div className={"dish_sale"}>normal size</div>
                                <div className={"view_btn"}>
                                    <div> Batafsil ko'rish</div>
                                    <img
                                        src={"/icons/Arrow8.svg"}
                                        style={{marginLeft: "9px"}}
                                    />
                                </div>
                            </Stack>
                            <Stack className={"dish_desc"}>
                                <span className={"dish_title_text"}>Cheese Pasta</span>
                                <span className={"dish_desc_text"}>
                                    <MonetizationOn/>
                                    11
                                </span>
                            </Stack>
                        </Box>

                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}