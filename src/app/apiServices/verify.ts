import Cookie from "universal-cookie";
import {serverApi} from "../../lib/Config";

const cookies = new Cookie(); // class dan instance qilib olyabman
let member_data: any = null; // nay qiymatni null boshlangich qiymat bn olyabman

if(cookies.get("access_token")) { // cookieni ichida access_token mavjud bulsagina
    const memberDataJson: any = localStorage.getItem("member_data")
        ? localStorage.getItem("member_data")
        : null;
    member_data = memberDataJson ? JSON.parse(memberDataJson) : null; //member_datani qiymatini yangilab olib,

    if (member_data) { // agar member_data mavjud bolsa deb mb_image ni check qilib olyabman
        member_data.mb_image = member_data.mb_image // member_data ni ichidan mb_image ni olyabman
            ? `${serverApi}/${member_data.mb_image}`
            : "/auth/odamcha.svg"; // agar mb_image mavjud bolmasa default rasm ber deyabman
    }
} else {
    localStorage.removeItem("member_data"); //boshqa holatda localStorag ichida emoveItem mavjud uni ichidan member_datani delete qilamn.
}
console.log('== verify ==');

// const cookie = new Cookie(); // class dan instance qilib olyabman
// if(!cookie.get("access_token")) {
//     localStorage.removeItem(member_data);
// }

export const verifiedMemberData = member_data ? member_data : null; //yangilab olingan member_datani verifyMemberDataga tenglashtirib olayopman.
