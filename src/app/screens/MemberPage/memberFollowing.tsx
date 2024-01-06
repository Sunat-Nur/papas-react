import Button from "@mui/material/Button";
import {Avatar, Box, Pagination, PaginationItem} from "@mui/material";
import {Stack} from "@mui/system";
import {Dispatch} from "@reduxjs/toolkit";
import {Following, FollowSearchObj} from "../../../types/follow";
import {setMemberFollowings} from "./slice";
import {createSelector} from "reselect";
import {retrieveMemberFollowings} from "./selector";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import FollowApiService from "../../apiServices/followApiService";
import assert from "assert";
import {Definer} from "../../../lib/Definer";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import {serverApi} from "../../../lib/Config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowings: (data: Following[]) =>
        dispatch(setMemberFollowings(data)),
});

/** REDUX SELECTOR  */
const memberFollowingsRetriever = createSelector(
    retrieveMemberFollowings,
    (memberFollowings) => ({
        memberFollowings,
    })
);

export function MemberFollowing(props: any) {
    /** INITIALIZATIONS **/
    const {mb_id, followRebuild, setFollowRebuild} = props;
    const {setMemberFollowings} = actionDispatch(useDispatch());
    const {memberFollowings} = useSelector(memberFollowingsRetriever);
    const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>(
        {page: 1, limit: 5, mb_id: mb_id});

    useEffect(() => {
        const followService = new FollowApiService();
        followService.getMemberFollowings(followingsSearchObj)
            .then((data) => setMemberFollowings(data))
            .catch((err) => console.log(err));
    }, [followingsSearchObj, followRebuild]);

    /** HANDLERS */
    const handlePaginationChange = (event: any, value: number) => {
        followingsSearchObj.page = value
        setFollowingsSearchObj({...followingsSearchObj});
    };

    const unsubscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation();
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

            const followService = new FollowApiService();
            await followService.unsubscribe(id);

            await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
            setFollowRebuild(!followRebuild);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Stack className={"my_following_page"}>
            {memberFollowings.map((following: Following) => {
                const image_url = following?.follow_member_data?.mb_image
                    ? `${serverApi}/${following?.follow_member_data?.mb_image}`
                    : "/auth/default_user.svg";
                return (
                    <Box className={"follow_box"}>
                        <Stack flexDirection="row">
                            <Avatar alt={""} src={image_url} sx={{width: 89, height: 89}}/>
                            <div
                                style={{
                                    width: "400px",
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "25px",
                                    height: "85%",
                                }}
                            >
                                <span className={"username_text"}>{following?.follow_member_data?.mb_type}</span>
                                <span className={"name_text"}>{following?.follow_member_data?.mb_nick}</span>
                            </div>
                            <Stack className={"button_follow"}>
                                {props.actions_enabled && (
                                    <Button
                                        className={"follow_back"}
                                        style={{
                                            background: "red",
                                            color: "#ffffff",
                                            borderRadius: "50px",
                                            marginTop: "18px"
                                        }}
                                        startIcon={<img src={"/icons/follow_icon.svg"}/>}
                                        onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                                    >
                                        UnFollowing
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </Box>
                );
            })}
            <Stack
                sx={{my: "40px"}}
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <Box className={"bottom_box"}>
                    <Pagination
                        count={followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3}
                        page={followingsSearchObj.page}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{previous: ArrowBackIcon, next: ArrowForwardIcon,}}
                                {...item}
                                color={"secondary"}
                            />
                        )}
                        onChange={handlePaginationChange}
                    />
                </Box>
            </Stack>
        </Stack>

    );
}