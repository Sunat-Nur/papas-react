import Cookie from "universal-cookie";

const cookie = new Cookie(); // class dan instance qilib olyabman
let member_data: any = null; // nay qiymatni null boshlangich qiymat bn olyabman

if(cookie.get("access_token")) { // cookieni ichida access_token mavjud bulsagina
    const memberDataJson: any = localStorage.getItem("member_data")
        ? localStorage.getItem("member_data")
        : null;
    member_data = memberDataJson ? JSON.parse(memberDataJson) : null; //member_datani qiymatini yangilab olib,
} else {
    // localStorage.removeItem(member_data); //boshqa holatda localStorag ichida emoveItem mavjud uni ichidan member_datani delete qilamn.
    // localStorage.removeItem(member_data);
}
console.log('== verify ==');

// const cookie = new Cookie(); // class dan instance qilib olyabman
// if(!cookie.get("access_token")) {
//     localStorage.removeItem(member_data);
// }

export const verifyMemberData = member_data ? member_data : null; //yangilab olingan member_datani verifyMemberDataga tenglashtirib olayopman.
