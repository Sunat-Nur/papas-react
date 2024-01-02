import {serverApi} from "../../lib/Config";
import assert from "assert";
import axios from "axios";
import {Definer} from "../../lib/Definer";
import {Member} from "../../types/user";
import {MemberLiken} from "../../types/others";

class MemberApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi; // path ni serverApi ga tenglashtirib olyabman

    }

    public async loginRequest(login_data: any): Promise<Member> {
        try {
            const result = await axios.post(this.path + "/login", login_data, //  login_data ni request_body ga beryabman
                {withCredentials: true});

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);


            // member interface orqali hosil qilib olyabman
            const member: Member = result.data.data;

            // localStorage dan member_data objectini hosil qilib member obj ni jsonga ugirib saqla deyabman
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (err: any) {
            console.log(`ERROR ::: loginRequest ${err.message}`);
            throw err;
        }
    };

    public async signupRequest(signup_data: any): Promise<Member> {
        try {
            const result = await axios.post(this.path + "/signup", signup_data, //  login_data ni request_body ga beryabman
                {withCredentials: true});
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);

            // member interface orqali hosil qilib olyabman
            const member: Member = result.data.data;

            // localStorage dan member_data objectini hosil qilib member obj ni jsonga ugirib saqla deyabman
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (err: any) {
            console.log(`ERROR ::: signupRequest ${err.message}`);
            throw err;
        }
    };

    public async logOutRequest(): Promise <Boolean> {
        try {
            const result = await axios.get(this.path + "/logout", {
                withCredentials: true, //withCredentialsni true qilishimiz sababi cookielarni oldi berdisi bn bog'liqdir.
            });
            assert.ok(result?.data, Definer.general_err1); //data mavjud bulsa, bulmasa general_error bergin.
            assert.ok(result?.data?.state !== 'fail', result?.data?.message); //state teng bulmasa failga, xatolik bbulsa, datani messagedan olib bersin.

            const logout_result = result.data.state; // request ni ichidagi data state ni logout_result ga tengalyabman
            return logout_result === 'success';  // logout_result sucess natijani return qilyabdi

        } catch (err: any) {
            console.log(`ERROR ::: logOutRequest ${err.message}`);
            throw err;
        }
    };


    async memberLikeTarget(data: any): Promise<MemberLiken> {
        try {
            const result = await axios.post(this.path + "/member-liken", data, {
                withCredentials: true,
            });

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);

            const like_result: MemberLiken = result.data.data;
            console.log("like", like_result);

            return like_result;
        } catch (err: any) {
            console.log(`ERROR ::: memberLikeTarget ${err.message}`);
            throw err;
        }
    };
}

export default MemberApiService;