import React from "react";
import {Box, Link, Stack} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {BoArticle} from "../../../types/boArticle";
import {serverApi} from "../../../lib/Config";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import {Favorite} from "@mui/icons-material";
import {Definer} from "../../../lib/Definer";
import assert from "assert";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import {verifiedMemberData} from "../../apiServices/verify";

export function TargetArticles(props: any) {
    const {setArticlesRebuild} = props;

    /** HANDLERS **/
    const targetLikeHandler = async (e: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result = await memberService.memberLikeTarget({
                like_ref_id: e.target.id,
                group_type: "community"
            });
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            setArticlesRebuild(new Date); // yuqoridagi props dan qiymat kelyabdi
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Stack>
            {props.targetBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                    ? `${serverApi}/${article.art_image}`
                    : "/community/sunat_nur.png";
                return (
                    <Link className="all_article_box" sx={{textDecoration: "none"}} href={``}>
                        <Box className="all_article_img" sx={{backgroundImage: `url(${art_image_url})`}}></Box>
                        <Box className="all_article_container">
                            <Box alignItems={"center"} display={"flex"}>
                                <img src="/auth/default_user.svg" width={"35px"}
                                     style={{borderRadius: "50%", backgroundSize: "cover"}}/>
                                <span className="all_article_auth_user" style={{marginLeft: "10px", color: "white"}}>
                                    {article?.member_data.mb_nick}
                                </span>
                            </Box>
                            <Box display={"flex"} flexDirection={"column"} sx={{mt: "15px"}}>
                                <span className="all_article_title">{article?.bo_id}</span>
                                <p className="all_article_desc">{article?.art_subject}</p>
                            </Box>
                            <Box>
                                <Box
                                    className="article_share"
                                    style={{width: "100%", height: "auto"}}
                                    sx={{mb: "10px"}}>
                                    <Box className="article_share_main"
                                         style={{
                                             color: "#fff",
                                             marginLeft: "150px",
                                             display: "flex",
                                             alignItems: "center",
                                         }}
                                    >
                                        <span>{moment().format("YY-MM-DD HH:mm")}</span>
                                        <Checkbox
                                            sx={{ml: "40px"}}
                                            icon={<FavoriteBorder/>}
                                            checkedIcon={<Favorite style={{color: "red"}}/>}
                                            id={article?._id}
                                            onClick={targetLikeHandler}
                                            checked={
                                                article?.me_liked && article.me_liked[0]?.my_favorite
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <span style={{margin: "0px 25px 0px 10px"}}>{article?.art_likes}</span>
                                        <RemoveRedEyeIcon/>
                                        <span style={{marginLeft: "10px"}}>{article?.art_views}</span>
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