import React, {useCallback, useContext, useEffect, useState} from "react";
import {Avatar, Box, Stack} from "@mui/material";
import {Send} from "@mui/icons-material";
import "../../../css/community.css";
import assert from "assert";
import {Definer} from "../../../lib/Definer";
import {sweetErrorHandling} from "../../../lib/sweetAlert";
import {SocketContext} from "../../context/socket";


export function CommunityChats() {
    /** Initializations **/
    const [messagesList, setMessagesList] = useState([]);
    const socket = useContext(SocketContext);
    const [onlineUsers, setOnlineUsers] = useState<number>();

    useEffect(() => {
        socket.connect();
        console.log("Printed");

        socket?.on("connect", function () {
            console.log("CLIENT: connected");
        });

        socket?.on("newMsg", (new_msg: any) => {
            console.log("CLIENT: new message");
        });

        socket?.on("greetMsg", (new_msg: any) => {
            console.log("CLIENT: greet message");
        });

        socket?.on("infoMsg", (msg: any) => {
            console.log("CLIENT: info message");
            setOnlineUsers(msg.total);
        });


        return () => {
            socket.disconnect();
        };
    }, [socket]);


    /** Handler **/
    // const getInputMessageHandler = useCallback(
    //     (e: ChangeEvent<HTMLInputElement>) => {
    //         const text = e.target.value;
    //         setMessage(text);
    //     },
    //     [message]
    // );
    //
    // const getKeyHandler = (e: any) => {
    //     try {
    //         if (e.key === "Enter") {
    //             assert.ok(message, Definer.input_err2);
    //             onSendBtnHandler();
    //         }
    //     } catch (err: any) {
    //         console.log(`getKeyHandler, ERROR: ${err}`);
    //         sweetErrorHandling(err).then();
    //     }
    // };
    //
    // const onSendBtnHandler = () => {
    //     try {
    //         if (!verifyMemberData) {
    //             msgInputRef.current.value = "";
    //             sweetFailureProvider("Please login first", true);
    //             return;
    //         }
    //
    //         msgInputRef.current.value = "";
    //         assert.ok(message, Definer.input_err2);
    //
    //         const mb_image_url = verifyMemberData?.mb_image ?? "/comunity/user1.svg";
    //         socket.emit("createMsg", {
    //             msg: message,
    //             mb_id: verifyMemberData?._id,
    //             mb_nick: verifyMemberData?.mb_nick,
    //             mb_image: mb_image_url,
    //         });
    //         setMessage("");
    //     } catch (err: any) {
    //         console.log(`onSendBtnHandler, ERROR: ${err}`);
    //         sweetErrorHandling(err).then();
    //     }
    // };
    return (
        <Stack className="chat_frame">
            <Box className="chat_top">live chat{onlineUsers}</Box>
            <Box className="chat_content">
                <Stack className="chat_main">
                    <Box
                        flexDirection={"row"}
                        style={{display: "flex"}}
                        sx={{m: "10px 0px"}}
                    >
                        <div className="msg_left">Bu yerda jonli muloqot</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        style={{display: "flex"}}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{m: "10px 0px"}}
                    >
                        <div className="msg_right">Bu sizning habaringiz</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        style={{display: "flex"}}
                        sx={{m: "10px 0px"}}
                    >
                        <Avatar alt="John" src="/community/sunat_nur.png"/>
                        <div className="msg_left">men birinchi habarni yuboryabman</div>
                    </Box>
                </Stack>
            </Box>
            <Box className="chat_bott">
                <input
                    type="text"
                    name="message"
                    className="msg_input"
                    placeholder="Xabar jo'natish"
                />
                <button className="send_msg_btn">{/*checke*/}
                    <Send style={{color: "red"}}/>
                </button>
            </Box>
        </Stack>
    );
}