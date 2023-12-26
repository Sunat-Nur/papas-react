import {serverApi} from "../../lib/Config";
import assert from "assert";
import axios from "axios";
import {Definer} from "../../lib/Definer";
import {Member} from "../../types/user";

class MemberApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi; // path ni serverApi ga tenglashtirib olyabman

    }

    public async loginRequest(login_data: any) {
        try {
            const result = await axios.post(this.path + "/login", login_data, //  login_data ni request_body ga beryabman
                {withCredentials: true});
            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data.message);

            // member interface orqali hosil qilib olyabman
            const member: Member = result.data.data;

            // localStorage dan member_data objectini hosil qilib member obj ni jsonga ugirib saqla deyabman
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (err: any) {
            console.log(`ERROR ::: loginRequest ${err.message}`);
        }
    };

    public async signupRequest(signup_data: any) {
        try {
            const result = await axios.post(this.path + "/signup", signup_data, //  login_data ni request_body ga beryabman
                {withCredentials: true});
            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data.message);

            // member interface orqali hosil qilib olyabman
            const member: Member = result.data.data;

            // localStorage dan member_data objectini hosil qilib member obj ni jsonga ugirib saqla deyabman
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (err: any) {
            console.log(`ERROR ::: signupRequest ${err.message}`);
        }
    };



}

export default MemberApiService;