import {Box, Stack} from "@mui/material"
import TabPanel from "@mui/lab/TabPanel";
import React from "react";


// REDUX
import {createSelector} from "reselect";
import {retrieveProcessOrders} from "../OrdersPage/selector";
import {Order} from "../../../types/order";
import {Product} from "../../../types/product";
import {serverApi} from "../../../lib/Config";
import {useSelector} from "react-redux";
import moment from "moment";
import Button from "@mui/material/Button";
import OrderApiService from "../../apiServices/orderApiService";
import {sweetErrorHandling, sweetFailureProvider} from "../../../lib/sweetAlert";

/** REDUX SELECTOR */
const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({
        processOrders,
    })
);

export default function ProcessOrders(props: any) {
    /** INITIALIZATIONS */
    const {processOrders} = useSelector(processOrdersRetriever);


    /** HANDLERS  */
    const finishOrderHandler = async (event: any) => {
        try {
            const order_id = event.target.value;
            const data = {order_id: order_id, order_status: "DELETED"};

            if (!localStorage.getItem("member_data")) {
                sweetFailureProvider("Please login first!", true);
            }
            let confirmation = window.confirm("Buyurtmani olganigizni tastiqlaysizmi ?");
            if (confirmation) {
                const orderService = new OrderApiService();
                await orderService.updateOrderStatus(data);
                props.setOrderRebuild(new Date());
            }
        } catch (err) {
            console.log("finishOrderHandler, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: Order) => {
                    return (
                        <Box className={"order_main_box"}>
                            <Box className={"order_box_scroll"}>
                                {order.order_items.map((item) => {
                                    const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0];
                                    const image_path = `${serverApi}/${product.product_images[0]}`;
                                    return (
                                        <Box className={"ordersName_price"}>
                                            <img src={image_path} className={"orderDishImage"}/>
                                            <p className={"titleDish"}>{product.product_name}</p>
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
                                    <p className={"data_compl"}>
                                        {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                                    </p>
                                    <Button
                                        value={order._id}
                                        onClick={finishOrderHandler}
                                        variant="contained"
                                        style={{
                                            background: "#0288D1",
                                            color: "#FFFFFF",
                                            borderRadius: "10px",
                                            boxShadow:
                                                "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
                                        }}
                                    >
                                        yakunlash
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