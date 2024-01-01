import React, {useEffect, useState} from "react";
import "../../../css/order.css"
import {Box, Container, Stack} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "../orders/pausedOrders"
import ProcessOrders from "../orders/processOrders"
import FinishedOrders from "../orders/finishedOrders"
import {Restaurant} from "../../../types/user";
import {Product} from "../../../types/product";

// REDUX
import {Dispatch} from "@reduxjs/toolkit";
import {setPausedOrders, setProcessOrders, setFinishedOrders} from "./slice";
import {useDispatch} from "react-redux";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setPausedOrders: (data: Restaurant[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Restaurant) => dispatch(setProcessOrders(data)),
    setFinishedOrders: (data: Product[]) => dispatch(setFinishedOrders(data)),
});

/** REDUX SELECTOR */


export function OrdersPage() {
    /** Initializations  */
    const {setPausedOrders, setProcessOrders, setFinishedOrders } =
        actionDispatch(useDispatch())
    const [value, setValue] = useState("1");


    useEffect(() => {

    }, []);

    /** Handlers  */
    const handleChange = (event: any, newValue: string) => {
        console.log("newValue", newValue);
        setValue(newValue);
    };

    // @ts-ignore
    return (
        <div className={"order_page"}>
            <Container
                maxWidth="lg"
                style={{display: "flex", flexDirection: "row"}}
                sx={{mt: "50px", mb: "50px"}}
            >
                <Stack className={"order_left"}>
                    <TabContext value={value}>
                        <Box className={"order_nev_frame"}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <TabList onChange={handleChange}
                                    // value={value}
                                         aria-label="basic tabs example"
                                         style={{display: "flex", justifyContent: "space-between"}}
                                >
                                    <Tab label="Buyurtmalarim" value={"1"}/>
                                    <Tab label="Jarayon" value={"2"}/>
                                    <Tab label="Yakunlangan" value={"3"}/>
                                </TabList>
                            </Box>
                        </Box>
                        <Stack className={"order_main_content"}>
                            <PausedOrders/>
                            <ProcessOrders/>
                            <FinishedOrders/>
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order_right"}>
                    <Box className={"order_info_box"}>
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                        >
                            <div className={"order_user_img"}>
                                <img
                                    src={"/community/sunat_nur.png"}
                                    className={"order_user_avatar"}
                                    alt=""
                                />
                                <div className={"order_user_icon_box"}>
                                    <img
                                        src={"/icons/user_icon..svg"}
                                        className={"order_user_prof_ing"}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <span className={"order_user_name"}>sunat_nur</span>
                            <span className={"order_user_prof"}>foydalanuvchi</span>
                        </Box>
                        <Box
                            style={{border: "1px solid #A1A1A1"}}
                            width={"100%"}
                            sx={{mt: "40px", mb: "8px"}}
                        >
                        </Box>
                        <Box className={"order_user_address"}>
                            <div style={{display: "flex"}}>
                                <LocationOnIcon/>
                            </div>
                            <div className={"spec_address_txt"}>Tashkent Yunusobod abad 4</div>
                        </Box>
                    </Box>
                    <Box className={"order_info_box"} sx={{mt: "15px"}}>
                        <input type={"text"} name={"card_creator"} placeholder={"card_number: 000 00 0000 00"}
                               className={"card_input"}/>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
                        >
                            <input type={"text"} name={"card_period"} placeholder={"07 / 24"}
                                   className={"card_half_input"}/>
                            <input type={"text"} name={"card_cvv"} placeholder={"CVV : 010"}
                                   className={"card_half_input"}/>
                        </div>
                        <input type={"text"} name={"card_creator"} placeholder={"sunat_nur"} className={"card_input"}/>
                        <div className={"card_box"}>
                            <img src={"/icons/Western-union.svg"} alt=""/>
                            <img src={"/icons/Paypal.svg"} alt=""/>
                            <img src={"/icons/Western-union.svg"} alt=""/>
                            <img src={"/icons/Paypal.svg alt="} alt=""/>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}




