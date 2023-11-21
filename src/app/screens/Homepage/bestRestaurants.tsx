import {Box, Container, Stack, Button} from "@mui/material";
import {AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link} from "@mui/joy";
import React from "react";
import {Favorite} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";


export function BestRestaurants() {
    return (
        <div className="best_restaurant_frame">
            <img
                src={"icons/best_res.svg"}
                style={{position: "absolute", left: "6%", transform: "rotate(90deg)"}}
            />
            <Container sx={{ paddingTop: "153px"}}>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title">Zo'r Restaurantlar</Box>
                    <Stack sx={{mt: "43px"}} flexDirection={"row"}>
                        <CssVarsProvider>
                            <Card
                                variant="outlined"
                                sx={{minHeight: 483, minWidth: 320, mr: "35px"}}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/burak.jpeg"} alt=""/>
                                    </AspectRatio>
                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 1,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite style={{color: "white"}}/>
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Burak Cevit
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.1, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="black"
                                    >
                                        Tashkent yunusobod 14-Kv
                                    </Link>
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="black"
                                    >
                                        +82 10 0000 0000
                                    </Link>
                                </Typography>
                                <CardOverflow
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",

                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>50</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>

                                </CardOverflow>
                            </Card>

                            <Card
                                variant="outlined"
                                sx={{minHeight: 483, minWidth: 320, mr: "35px"}}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/burak.jpeg"} alt=""/>
                                    </AspectRatio>
                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 1,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite style={{color: "white"}}/>
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Burak Cevit
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.1, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="black"
                                    >
                                        Tashkent yunusobod 14-Kv
                                    </Link>
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="black"
                                    >
                                        +82 10 0000 0000
                                    </Link>
                                </Typography>
                                <CardOverflow
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",

                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>50</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>

                                </CardOverflow>
                            </Card>

                            <Card
                                variant="outlined"
                                sx={{minHeight: 483, minWidth: 320, mr: "35px"}}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/burak.jpeg"} alt=""/>
                                    </AspectRatio>
                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 1,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite style={{color: "white"}}/>
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Burak Cevit
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="black"
                                    >
                                        Tashkent yunusobod 14-Kv
                                    </Link>
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="black"
                                    >
                                        +82 10 0000 0000
                                    </Link>
                                </Typography>
                                <CardOverflow
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",

                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>50</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>

                                </CardOverflow>
                            </Card>

                            <Card
                                variant="outlined"
                                sx={{minHeight: 483, minWidth: 320, mr: "35px"}}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/burak.jpeg"} alt=""/>
                                    </AspectRatio>
                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 1,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite style={{color: "white"}}/>
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Burak Cevit
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.1, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="black"
                                    >
                                        Tashkent yunusobod 14-Kv
                                    </Link>
                                </Typography>
                                <Typography level="body-md" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="black"
                                    >
                                        +82 10 0000 0000
                                    </Link>
                                </Typography>
                                <CardOverflow
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >

                                        100{" "}
                                        <VisibilityIcon sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",

                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>50</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                </CardOverflow>
                            </Card>
                        </CssVarsProvider>
                    </Stack>
                    <Stack
                        flexDirection={"row"}
                        justifyContent={"flex-end"}
                        style={{ width: "100%", marginTop: "16px" }}
                        >
                        <Button style={{ background: "#1976d2", color: "#FFFFFF" }}>
                            Barchasini ko'rish
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}


