import React from "react";
import {Box, Button, Container, IconButton, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Badge from "@mui/material/Badge";

export function NavbarRestaurant(props: any) {
    return <div className="format_restaurant home_navbar">
        <Container>
            <Stack
                flexDirection={"row"}
                className="navbar_config"
                justifyContent={"space-between"}
            >
                <Box>
                    <img src={"/icons/Papay..svg"}/>
                </Box>
                <Stack
                    flexDirection={"row"}
                    justifyContent="space-evenly"
                    alignItems={"center"}
                    className="navbar_links"
                >
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to="/" activeClassName="uderline">
                            Bosh Sahifa
                        </NavLink>
                    </Box>
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to="/restaurant" activeClassName="uderline">
                            Oshhona
                        </NavLink>
                    </Box>
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to="/orders">
                            Buyurtma
                        </NavLink>
                    </Box>
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to="/community" activeClassName="uderline">
                            Jamiyat
                        </NavLink>
                    </Box>
                    <Box className="hover-line" onClick={props.setPath}>
                        <NavLink to="/help" activeClassName="uderline">
                            Yordam
                        </NavLink>
                    </Box>

                    <Box className="hover-line">
                        <IconButton
                            aria-label="cart"
                            id="basic-button"
                            aria-controls={undefined}
                            aria-haspopup="true"
                            aria-expanded={undefined}
                        >
                            <Badge badgeContent={3} color="secondary">
                                <img src={"/icons/shopping-cart.svg"}/>
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            style={{color: "#FFFFFF", background: "#1976d2 "}}
                        >
                            Kirish
                        </Button>
                    </Box>
                </Stack>
            </Stack>
            {/*main stack qismi*/}
        </Container>


    </div>;
}