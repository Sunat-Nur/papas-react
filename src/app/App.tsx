import React, {useState, useEffect} from 'react';
// useStateni REACT dan import qilib olamz.
// bizning path imiz uzgarganda viewimizni qayta qurub beradi.

import {Box, Button, Container, Stack, Typography} from "@mui/material";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom";

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
import {CartItem} from "../types/others";
import {Product} from "../types/product";

function App() {
    /** INITIALIZATION **/
    const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null);
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
    const [signUpOpen, setSignUpOpen] = useState(false); // boshlang'ish qiymat false
    const [loginOpen, setLoginOpen] = useState(false); // boshlang'ish qiymat false

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const cartJson: any = localStorage.getItem("cart_data");
    const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
    const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);


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
    }, [signUpOpen,]);


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
        try {
            let member_data: any = null; // nay qiymatni null boshlangich qiymat bn olyabman
            const memberApiService = new MemberApiService();
            await memberApiService.logOutRequest(); // memberApiService ni  logOutRequest methodini chaqirib olyabman
            await sweetTopSmallSuccessAlert('success', 700, true);
            // localStorage.removeItem('member_data');
        } catch (err: any) {
            console.log(err);
            sweetFailureProvider(Definer.general_err1);
        }
    };

    const onAdd = (product: Product) => {
        const exist: any = cartItems?.find(
            (item: CartItem) => item._id === product._id
        );
        if (exist) {
            const cart_updated = cartItems.map((item: CartItem) =>
                item._id === product._id  // item ni idisi product_id isiga teng bolgan holda
                    ? {...exist, quantity: exist.quantity + 1} // teng bolsa  exist ni o'zidan olib quantity ni bitta ga oshirib qaytar
                    : item // teng bolmaganda o'zini qaytar deyabman
            );
            setCartItems(cart_updated);
            localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        } else {
            const new_item: CartItem = {
                _id: product._id,
                quantity: 1,
                price: product.product_price,
                image: product.product_images[0],
                name: product.product_name,
            };
            // new_item ni hozirgi card_item ga qo'shib yangi qiymat hosil qib ber deyabmiz
            const cart_updated = [{...new_item}];
            console.log("new", cart_updated);

            // localStorage da cart_data ni json formatda o'tkazib data ni yarngilab olaman
            setCartItems(cart_updated);
            localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        }
    };
    const onRemove = (item: CartItem) => {
        const item_data: any = cartItems?.find(
            (ele: CartItem) => ele._id === item._id
        );
        if (item_data.quantity === 1) {
            const filter_items: CartItem[] = cartItems.filter(
                (ele) => ele._id !== item._id // ele ni id isi item_id ga teng bolmagada ele ni tushurib qoldir deyabman
            );
            setCartItems(filter_items);
            localStorage.setItem("cart_data", JSON.stringify(filter_items));
        } else {
            const cart_updated = cartItems?.map((ele: CartItem) =>
                ele._id === item_data._id
                    ? {...item_data, quantity: item_data.quantity - 1} // bu yerda item_data ni ichidan quantity ni yengilab -1 ga tenglayabman
                    : item // va item ni qaytar deyabman
            );
            console.log("rem", cart_updated);
            setCartItems(cart_updated);
            localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        }
    };
    const onDelete = (item: CartItem) => {
        const deleted_items: CartItem[] = cartItems?.filter(
            (ele) => ele._id !== item._id
        );
        setCartItems(deleted_items);
        localStorage.setItem("cart_data", JSON.stringify(deleted_items));
    };
    const onDeleteAll = () => {
        setCartItems([]);
        localStorage.removeItem("cart_data");
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
                    cartItems={cartItems}
                    anchorEl={anchorEl}
                    onRemove={onRemove}
                    onDelete={onDelete}
                    onAdd={onAdd}
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
                    < RestaurantPage onAdd={onAdd}/>
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
