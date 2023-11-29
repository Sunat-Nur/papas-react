import Button from "@mui/material/Button";
import {Avatar, Box} from "@mui/material";
import {Stack} from "@mui/system";


const followings = [
    {mb_nick: "abbos"},
    {mb_nick: "latif"},
    {mb_nick: "saidamir"},
];

export function MemberFollowing(props: any) {
    return (
        <Stack>
            {followings.map((following) => {
                const image_url = "/community/ulug_bek.jpeg";
                return (
                    <Box className={"follow_box"}>
                        <Stack
                            flexDirection="row"
                        >
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
                                <span className={"username_text"}>Ulug'bek</span>
                                <span className={"name_text"}>@ulu_2023</span>
                            </div>

                            <Stack
                                className={"button_follow"}
                            >
                                {props.actions_enabled && (
                                    <Button
                                        className={"follow_back"}
                                        style={{
                                            background: "red",
                                            color: "#ffffff",
                                            borderRadius: "50px",
                                            marginTop: "18px"
                                        }}
                                        startIcon={
                                            <img
                                                src={"/icons/follow_icon.svg"}
                                            />
                                        }
                                    >
                                        UnFollowing
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </Box>
                );
            })}
        </Stack>

    );
}