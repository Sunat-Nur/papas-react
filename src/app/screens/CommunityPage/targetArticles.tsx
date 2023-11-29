import React from "react";
import {Box, Link, Stack} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import moment from "moment"


export function TargetArticles(props: any) {
    return (
        <Stack>
            {props.targetBoArticle?.map((article: any, index: string) => {
                const art_image_url = "/community/sunat_nur.png";
                return (
                    <Link
                        className="all_article_box"
                        sx={{textDecoration: "none"}}
                        href={``}
                    >
                        <Box
                            className="all_article_img"
                            sx={{backgroundImage: `url(${art_image_url})`}}
                        ></Box>
                        <Box className="all_article_container">
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                    src="/community/sunat_nur.png"
                                    alt=""
                                    width={"35px"}
                                    style={{borderRadius: "50%", backgroundSize: "cover"}}
                                />
                                <span
                                    className="all_article_auth_user"
                                    style={{marginLeft: "10px", color: "white"}}
                                >
                  Sunat_nur
                </span>
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{mt: "15px"}}
                            >
                                <span className="all_article_title">evaluation</span>
                                <p className="all_article_desc">
                                    Texas De Brazil zo'r restarant
                                </p>
                            </Box>
                            <Box>
                                <Box
                                    className="article_share"
                                    style={{width: "100%", height: "auto"}}
                                >
                                    <Box className="article_share_main">
                                        <span style={{marginRight: "35px"}}>23-11-25 23-50</span>
                                        <FavoriteBorder/>
                                        <span style={{margin: "0px 25px 0px 10px"}}>100</span>
                                        <RemoveRedEyeIcon/>
                                        <span style={{marginLeft: "10px"}}>1000</span>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                );
            })}
        </Stack>
    );
}