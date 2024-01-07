import {Button, Pagination, PaginationItem} from "@mui/material";
import {Avatar, Box} from "@mui/material";
import {Stack} from "@mui/system";
import {Dispatch} from "@reduxjs/toolkit";
import {Follower, FollowSearchObj} from "../../../types/follow";
import {setMemberFollowers} from "./slice";
import {createSelector} from "reselect";
import {retrieveMemberFollowers} from "./selector";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import FollowApiService from "../../apiServices/followApiService";
import {serverApi} from "../../../lib/Config";
import {Definer} from "../../../lib/Definer";
import assert from "assert";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowers: (data: Follower[]) =>
        dispatch(setMemberFollowers(data)),
});

/** REDUX SELECTOR  */
const memberFollowersRetriever = createSelector(
    retrieveMemberFollowers,
    (memberFollowers) => ({
        memberFollowers,
    })
);

export function MemberFollowers(props: any) {
    /** INITIALIZATIONS **/
    const {mb_id, followRebuild, setFollowRebuild} = props;
    const {setMemberFollowers,} = actionDispatch(useDispatch());
    const {memberFollowers} = useSelector(memberFollowersRetriever);
    const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
        {page: 1, limit: 5, mb_id: mb_id}
    );

    useEffect(() => {
        const followService = new FollowApiService();
        followService.getMemberFollowers(followersSearchObj)
            .then((data) => setMemberFollowers(data))
            .catch((err) => console.log(err));
    }, [followersSearchObj, followRebuild]);

    /** HANDLERS */
    const handlePaginationChange = (event: any, value: number) => {
        followersSearchObj.page = value
        setFollowersSearchObj({...followersSearchObj});
    };

    const subscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation();
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

            const followService = new FollowApiService();
            await followService.subscribe(id);

            await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
            setFollowRebuild(!followRebuild);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div className={"my_followers_page"}>
            <Stack>
                {memberFollowers.map((follower: Follower) => {
                    const image_url = follower?.subscriber_member_data?.mb_image
                        ? `${serverApi}/${follower?.subscriber_member_data?.mb_image}`
                        : "/auth/default_user.svg";
                    return (
                        <Box className={"follow_box"}>
                            <Stack flexDirection="row">
                                <Avatar alt={""} src={image_url} sx={{width: 89, height: 89,}}/>
                                <div
                                    style={{
                                        width: "400px",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "25px",
                                        height: "85%",
                                    }}
                                >
                                    <span className={"username_text"}>{follower?.subscriber_member_data?.mb_type}</span>
                                    <span className={"name_text"}>{follower?.subscriber_member_data?.mb_nick}</span>
                                </div>
                                <Stack className={"button_follow"}>
                                    {props.actions_enabled &&
                                        (follower?.me_followed && follower.me_followed[0]?.my_following ? (
                                            <Button className={"following_already"}
                                                    style={{
                                                        background: "#68C5CB",
                                                        color: "#ffffff",
                                                        borderRadius: "50px",
                                                        marginTop: "18px",
                                                        width: "160px",
                                                    }}
                                            >
                                                <span>Following</span>
                                            </Button>
                                        ) : (
                                            <Button
                                                className={"follow_back"}
                                                onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                                                style={{
                                                    background: "#30945E",
                                                    borderRadius: "50px",
                                                    marginTop: "18px",
                                                    color: "#ffffff",
                                                }}
                                                startIcon={
                                                    <img src={"/icons/follow_icon.svg"} alt=""/>
                                                }
                                            >
                                                <p> Follow back</p>
                                            </Button>
                                        ))}
                                </Stack>
                            </Stack>
                        </Box>
                    );
                })}
                <Stack
                    sx={{my: "40px"}}
                    direction="row"
                    alignItems="center"
                    justifyContent="a"
                >
                    <Box className={"bottom_box"}>
                        <Pagination
                            count={followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3}
                            page={followersSearchObj.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={handlePaginationChange}
                        />
                    </Box>
                </Stack>
            </Stack>
        </div>
    );
}