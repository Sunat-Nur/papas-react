import React, {useState, useEffect} from 'react';
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
import {Member} from "../types/user";
import {serverApi} from "../lib/Config";
import MemberApiService from "./apiServices/memberApiService";
import {sweetFailureProvider, sweetTopSmallSuccessAlert} from "../lib/sweetAlert";
import {Definer} from "../lib/Definer";
import "../app/apiServices/verify";

function App() {
    /** INITIALIZATION **/
    const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null);
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
    const [signUpOpen, setSignUpOpen] = useState(false); // boshlang'ish qiymat false
    const [loginOpen, setLoginOpen] = useState(false); // boshlang'ish qiymat false

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);



    useEffect(() => {
        console.log("===== useEffect: App ===");
        const memberDataJson: any = localStorage.getItem("member_data") // agar localstorage da member_data bolsa
            ? localStorage.getItem("member_data") // member_data ni o'zini ber
            : null; // bolmasa null qiymat ber deyabman

        // agar memberDataJson mavjud bolsa parse json.parse usulida memberDataJson ber, mavjud bolmasa null qiymatni olib
        const member_data = memberDataJson ? JSON.parse(memberDataJson) : null; // member_data object ga tenglab olyabman

        if (member_data) { // agar member_data mavjud bolsa deb mb_image ni check qilib olyabman
            member_data.mb_image = member_data.mb_image // member_data ni ichidan mb_image ni olyabman
                ? `${serverApi}/${member_data.mb_image}`
                : "/auth/odamcha.svg"; // agar mb_image mavjud bolmasa default rasm ber deyabman
            setVerifiedMemberData(member_data);
        }
    }, [signUpOpen, ]);


    /** HANDLERS **/
    const handleSignUpOpen = () => setSignUpOpen(true);
    const handleSignUpClose = () => setSignUpOpen(false);
    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);

    const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
    };
    const handleLogOutRequest = async () => {
        try{
            let member_data: any = null; // nay qiymatni null boshlangich qiymat bn olyabman
            const memberApiService = new MemberApiService();
            await memberApiService.logOutRequest(); // memberApiService ni  logOutRequest methodini chaqirib olyabman
            await sweetTopSmallSuccessAlert('success', 700, true);
            localStorage.removeItem('member_data');
        } catch(err: any) {
            console.log(err);
            sweetFailureProvider(Definer.general_err1);
        }
    };

    return (
        <Router>
            {main_path == "/" ? (
                <NavbarHome
                    setPath={setPath}
                    handleLoginOpen={handleLoginOpen}
                    handleSignUpOpen={handleSignUpOpen}
                    handleLogOutClick={handleLogOutClick}
                    handleCloseLogOut={handleCloseLogOut}
                    handleLogOutRequest={handleLogOutRequest}
                    verifiedMemberData={verifiedMemberData}
                    anchorEl={anchorEl}
                    open={open}
                />
            ) : main_path.includes("/restaurant") ? (
                <NavbarRestaurant
                    setPath={setPath}
                    handleLoginOpen={handleLoginOpen}
                    handleSignUpOpen={handleSignUpOpen}
                    handleLogOutClick={handleLogOutClick}
                    handleCloseLogOut={handleCloseLogOut}
                    handleLogOutRequest={handleLogOutRequest}
                    verifiedMemberData={verifiedMemberData}
                    anchorEl={anchorEl}
                    open={open}
                />
            ) : (
                <NavbarOthers
                    setPath={setPath}
                    handleLoginOpen={handleLoginOpen}
                    handleSignUpOpen={handleSignUpOpen}
                    handleLogOutClick={handleLogOutClick}
                    handleCloseLogOut={handleCloseLogOut}
                    handleLogOutRequest={handleLogOutRequest}
                    verifiedMemberData={verifiedMemberData}
                    anchorEl={anchorEl}
                    open={open}
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
