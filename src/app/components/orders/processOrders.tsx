import {Box, Stack} from "@mui/material"
import TabPanel from "@mui/lab/TabPanel";
import React from "react";


const processOrders = [
    [1, 2, 3],
    [1, 2, 3],
    [1, 2, 3],
];

export default function ProcessOrders(props: any) {
    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order) => {
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
                                        <p>$22</p>
                                        <img src={"/icons/Plus.svg"} style={{marginLeft: "20px"}}/>
                                        <p>yetkazib berish</p>
                                        <p>$2</p>
                                        <img
                                            src={"/icons/Pause.svg"}
                                            style={{marginLeft: "20px"}}
                                        />
                                        <p>total price</p>
                                        <p>$24</p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    )
}