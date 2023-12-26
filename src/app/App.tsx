import React, {useState} from 'react';
// useStateni REACT dan import qilib olamz.
// bizning path imiz uzgarganda viewimizni qayta qurub beradi.

import {Box, Button, Container, Stack, Typography} from "@mui/material";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {RestaurantPage} from "./screens/RestaurantPage";
import {CommunityPage} from "./screens/CommunityPage";
import {OrdersPage} from "./screens/OrdersPage";
import {MemberPage} from "./screens/MemberPage";
import {HelpPage} from "./screens/HelpPage";
import {LoginPage} from "./screens/LoginPage";
import {Homepage} from "./screens/Homepage";
import {NavbarHome} from "./components/header";
import {NavbarRestaurant} from "./components/header/restaurant";
import {NavbarOthers} from "./components/header/others";
import {Footer} from "./components/footer";
import AuthenticationModal from "./components/auth";

function App() {
    /** INITIALIZATION **/
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
    const [signUpOpen, setSignUpOpen] = useState(false); // boshlang'ish qiymat false
    const [loginOpen, setLoginOpen] = useState(false); // boshlang'ish qiymat false


    /** HANDLERS **/
    const handleSignUpOpen = () => setSignUpOpen(true);
    const handleSignUpClose = () => setSignUpOpen(false);

    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);

    return (
        <Router>
            {main_path == "/" ? (
                <NavbarHome
                    setPath={setPath}
                    handleLoginOpen={handleLoginOpen}
                    handleSignUpOpen={handleSignUpOpen}
                />
            ) : main_path.includes("/restaurant") ? (
                <NavbarRestaurant
                    setPath={setPath}
                    handleLoginOpen={handleLoginOpen}
                    handleSignUpOpen={handleSignUpOpen}
                />
            ) : (
                <NavbarOthers
                    setPath={setPath}
                    handleLoginOpen={handleLoginOpen}
                    handleSignUpOpen={handleSignUpOpen}
                />
            )}

            {/*buyerdan swich routerlar boshlandi*/}
            <Switch>
                <Route path="/restaurant">
                    < RestaurantPage/>
                </Route>
                <Route path="/community">
                    < CommunityPage/>
                </Route>
                <Route path="/orders">
                    < OrdersPage/>
                </Route>
                <Route path="/member-page">
                    < MemberPage/>
                </Route>
                <Route path="/help">
                    < HelpPage/>
                </Route>
                <Route path="/login">
                    < LoginPage/>
                </Route>
                <Route path="/">
                    < Homepage/>
                </Route>
            </Switch>

            <Footer/>
            <AuthenticationModal
                loginOpen={loginOpen}
                handleLoginOpen={handleLoginOpen}
                handleLoginClose={handleLoginClose}
                signUpOpen={signUpOpen}
                handleSignUpOpen={handleSignUpOpen}
                handleSignUpClose={handleSignUpClose}
            />
        </Router>
    );
}

export default App;
