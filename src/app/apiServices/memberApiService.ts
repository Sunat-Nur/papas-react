import {serverApi} from "../../lib/Config";
import assert from "assert";
import axios from "axios";
import {Definer} from "../../lib/Definer";
import {Member, MemberUpdateData} from "../../types/user";
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
            assert.ok(result?.data.state !== "fail", result.data.state);
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

    public async logOutRequest(): Promise<Boolean> {
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


    public async memberLikeTarget(data: any): Promise<MemberLiken> {
        try {
            const result = await axios.post(this.path + "/member-liken", data, {
                withCredentials: true,
            });

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", result.data.state);
            console.log("state:::", result.data.state);

            const like_result: MemberLiken = result.data.data;
            console.log("like", like_result);

            return like_result;
        } catch (err: any) {
            console.log(`ERROR ::: memberLikeTarget ${err.message}`);
            throw err;
        }
    };


    async getChosenMember(id: string): Promise<Member> {
        try {
            const url = `/member/${id}`;
            const result = await axios.get(this.path + url, {
                withCredentials: true,
            });

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);

            const member: Member = result.data.data;
            console.log("like", member);

            return member;
        } catch (err: any) {
            console.log(`ERROR ::: memberLikeTarget ${err.message}`);
            throw err;
        }
    };

    public async updateMemberData(data: MemberUpdateData): Promise<Member> {
        try {
            let formData = new FormData();
            formData.append("mb_nick", data?.mb_nick || "");
            formData.append("mb_phone", data?.mb_phone || "");
            formData.append("mb_address", data?.mb_address || "");
            formData.append("mb_description", data?.mb_description || "");
            formData.append("mb_image", data?.mb_image || "");
            console.log(formData);
            const result = await axios(`${this.path}/member/update`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"},
            });
            console.log("result", result);

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data.state !== "fail", Definer.general_err1);
            console.log("state:::", result.data.state);

            const member: Member = result.data.data;
            console.log("member", member);

            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (err: any) {
            console.log(`ERROR ::: updateMemberData ${err.message}`);
            throw err;
        }
    };
}

export default MemberApiService;