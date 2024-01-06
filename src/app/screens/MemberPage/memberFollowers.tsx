import {Button} from "@mui/material";
import {Avatar, Box} from "@mui/material";
import {Stack} from "@mui/system";
import {Dispatch} from "@reduxjs/toolkit";
import {Follower} from "../../../types/follow";
import {setMemberFollowers} from "./slice";
import {createSelector} from "reselect";
import {retrieveMemberFollowers} from "./selector";
import {useDispatch, useSelector} from "react-redux";

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


const followers = [
    {mb_nick: "usman", following: true},
    {mb_nick: "alen", following: false},
    {mb_nick: "alex", following: true},
];

export function MemberFollowers(props: any) {
    /** INITIALIZATIONS **/
    const {setMemberFollowers,} = actionDispatch(useDispatch());
    const {memberFollowers} = useSelector(memberFollowersRetriever);

    /** HANDLERS */
    // todo: setMemberFollower
    // todo: subs Handler
    return (
        <div className={"my_followers_page"}>
            <Stack>
                {followers.map((follower) => {
                    const image_url = "/community/mitti.jpeg";
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
                                    <span className={"username_text"}>@mitti_vine</span>
                                    <span className={"name_text"}>Ulug'bek</span>
                                </div>
                                <Stack className={"button_follow"}>
                                    {props.actions_enabled &&
                                        (follower.following ? (
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
            </Stack>
        </div>
    );
}