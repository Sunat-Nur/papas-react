import {Box, Stack, Button} from "@mui/material"
import TabPanel from "@mui/lab/TabPanel";
import React from "react";


// REDUX
import {createSelector} from "reselect";
import {useSelector} from "react-redux";
import {retrievePausedOrders} from "./selector";
import {Order} from "../../../types/order";
import {serverApi} from "../../../lib/Config";
import {Product} from "../../../types/product";
import {sweetErrorHandling, sweetFailureProvider} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";

/** REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({
        pausedOrders,
    })
);

export default function PausedOrders(props: any) {

    /** INITIALIZATIONS */
    const {pausedOrders} = useSelector(pausedOrdersRetriever);

    /** HANDLERS  */
        // const deleteOrderHandler = async (event: any) => {
        //     try {
        //         const order_id = event.target.value;
        //         const data = {order_id: order_id, order_status: "DELETED"};
        //
        //         if (!localStorage.getItem("member_data")) {
        //             sweetFailureProvider("Please login first!", true);
        //         }
        //         let confirmation = window.confirm("Buyurtmani bekor qilishni xoxlaysizmi ?");
        //         if (confirmation) {
        //             const orderService = new OrderApiService();
        //             await orderService.updateOrderStatus(data).then();
        //             props.setOrderRebuild(new Date());
        //         }
        //     } catch (err) {
        //         console.log("deleteOrderHandler, ERROR:", err);
        //         sweetErrorHandling(err).then();
        //     }
        // };
    const finishOrderHandler = async (event: any) => {
            try {
                const order_id = event.target.value;
                const data = {order_id: order_id, order_status: "FINISHED"};

                if (!localStorage.getItem("member_data")) {
                    sweetFailureProvider("Please login first!", true);
                }
                let confirmation = window.confirm("Buyurtmani olganigizni tastiqlaysizmi ?");
                if (confirmation) {
                    const orderService = new OrderApiService();
                    await orderService.updateOrderStatus(data).then();
                    props.setOrderRebuild(new Date());
                }
            } catch (err) {
                console.log("finishOrderHandler, ERROR:", err);
                sweetErrorHandling(err).then();
            }
        };

    const processOrderHandler = async (event: any) => {
        try {
            const order_id = event.target.value;
            const data = {order_id: order_id, order_status: "PROCESS"};

            if (!localStorage.getItem("member_data")) {
                sweetFailureProvider("Please login first!", true);
            }
            let confirmation = window.confirm("Buyurtmani to'lashni tasdiqlaysizmi ?");
            if (confirmation) {
                const orderService = new OrderApiService();
                await orderService.updateOrderStatus(data).then();
                props.setOrderRebuild(new Date());
            }
        } catch (err) {
            console.log("processOrderHandler, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    }

    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box className={"order_main_box"}>
                            <Box className={"order_box_scroll"}>
                                {order?.order_items?.map((item, index) => {
                                    const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0];
                                    const image_path = `${serverApi}/${product?.product_images[0]}`;
                                    return (
                                        <Box className={"ordersName_price"}>
                                            <img src={image_path} className={"orderDishImage"}/>
                                            <p className={"titleDish"}>{product?.product_name}</p>
                                            <Box className={"priceBox"}>
                                                <p>${item.item_price}</p>
                                                <img src={"/icons/Close.svg"}/>
                                                <p>{item.item_quantity}</p>
                                                <img src={"/icons/Pause.svg"}/>
                                                <p style={{marginLeft: "15px"}}>
                                                    ${item.item_price * item.item_quantity}
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}

                                <Box className={"total_price_box red_solid"}>
                                    <Box className={"boxTotal"}>
                                        <p>mahsulot narxi</p>
                                        <p>${order.order_total_amount - order.order_delivery_cost}</p>
                                        <img src={"/icons/Plus.svg"} style={{marginLeft: "20px"}}/>
                                        <p>yetkazib berish</p>
                                        <p>${order.order_delivery_cost}</p>
                                        <img
                                            src={"/icons/Pause.svg"}
                                            style={{marginLeft: "20px"}}
                                        />
                                        <p>total price</p>
                                        <p>${order.order_total_amount}</p>
                                    </Box>
                                    <Button
                                        value={order._id}
                                        onClick={finishOrderHandler}
                                        variant="contained"
                                        style={{borderRadius: "10px", background: "red"}}
                                    >
                                        BEKOR QILISH
                                    </Button>
                                    <Button
                                        value={order._id}
                                        onClick={processOrderHandler}
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