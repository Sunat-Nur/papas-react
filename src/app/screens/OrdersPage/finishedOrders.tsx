import {Box, Stack} from "@mui/material"
import TabPanel from "@mui/lab/TabPanel";
import React from "react";


// REDUX
import {createSelector} from "reselect";
import {useSelector} from "react-redux";
import {retrieveFinishedOrders} from "./selector";
import {Order} from "../../../types/order";
import {Product} from "../../../types/product";
import {serverApi} from "../../../lib/Config";

/** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({
        finishedOrders,
    })
);


export default function FinishedOrders(props: any) {
    /** INITIALIZATIONS */
    const {finishedOrders} = useSelector(finishedOrdersRetriever);

    console.log("finishedOrders", finishedOrders);
    return (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders?.map((order: Order) => {
                    return (
                        <Box className={"order_main_box"}>
                            <Box className={"order_box_scroll"}>
                                {order.order_items.map((item) => {
                                    const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0];
                                    const image_path = `${serverApi}/${product?.product_images[0]}`;
                                    return (
                                        <Box className={"ordersName_price"}>
                                            <img src={image_path} className={"orderDishImage"}/>
                                            <p className={"titleDish"}>{product?.product_name}</p>
                                            <Box className={"priceBox"}>
                                                <p>${item.item_price}</p>
                                                <img src={"/icons/Close.svg"}/>
                                                <p>{item?.item_quantity}</p>
                                                <img src={"/icons/Pause.svg"}/>
                                                <p style={{marginLeft: "15px"}}>
                                                    ${item?.item_price * item?.item_quantity}
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}

                                <Box className={"total_price_box red_solid"}>
                                    <Box className={"boxTotal"}>
                                        <p>mahsulot narxi</p>
                                        <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                        <img src={"/icons/plus.svg"} style={{marginLeft: "20px"}}/>
                                        <p>yetkazib berish</p>
                                        <p>${order.order_delivery_cost}</p>
                                        <img
                                            src={"/icons/Pause.svg"}
                                            style={{marginLeft: "20px"}}
                                        />
                                        <p>total price</p>
                                        <p>${order.order_total_amount}</p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </TabPanel>
    );
}