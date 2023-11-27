import {Box, Stack, Button} from "@mui/material"
import TabPanel from "@mui/lab/TabPanel";
import React from "react";


const pausedOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
];

export default function PausedOrders(props: any) {
    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order) => {
                    return (
                        <Box className={"order_main_box"}>
                            <Box className={"order_box_scroll"}>
                                {order.map((item) => {
                                    const image_path = `/others/sandvich.jpeg`;
                                    return (
                                        <Box className={"ordersName_price"}>
                                            <img src={image_path} className={"orderDishImage"}/>
                                            <p className={"titleDish"}>Sandvich</p>
                                            <Box className={"priceBox"}>
                                                <p>$7</p>
                                                <img src={"/icons/Close.svg"}/>
                                                <p>3</p>
                                                <img src={"/icons/Pause.svg"}/>
                                                <p style={{marginLeft: "15px"}}>$21</p>
                                            </Box>
                                        </Box>
                                    );
                                })}

                                <Box className={"total_price_box red_solid"}>
                                    <Box className={"boxTotal"}>
                                        <p>mahsulot narxi</p>
                                        <p>$21</p>
                                        <img src={"/icons/Plus.svg"} style={{marginLeft: "20px"}}/>
                                        <p>yetkazib berish</p>
                                        <p>$2</p>
                                        <img
                                            src={"/icons/Pause.svg"}
                                            style={{marginLeft: "20px"}}
                                        />
                                        <p>total price</p>
                                        <p>$23</p>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        style={{ borderRadius: "10px", background: "red" }}
                                    >
                                        BEKOR QILISH
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "rgb(2, 136, 209)",
                                            color: "rgb(255, 255, 255)",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        TO'LASH
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    )
}