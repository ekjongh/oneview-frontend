<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { api } from "@/api/api";
import axios from "axios";

export default {
  name: "TokenAuth",

  data: () => ({
    sample: [],
    token: "",
    access: "",
  }),
  created() {
    console.log("ToeknAuth Created...");
  },
  mounted() {
    console.log("TokenAuthView.vue > Mounted Init...");
    this.initializeStore();
    if (this.$route.query.token) {
      console.log("TokenAuthView.vue > Mounted > Query Toekn Check OK...");
      this.token = this.$route.query.token;
      console.log("TOKEN: ", this.token);
      console.log("INIT DEFAULT HEADER: ", axios.defaults.headers);
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      console.log("AFTER DEFAULT HEADER: ", axios.defaults.headers);
      axios
        .post(`/api/v1/jwt/refresh`)
        .then((res) => {
          const access_token = res.data.access;
          console.log("NEW ACCESS TOKEN: ", access_token);
          const userInfo = {
            access: access_token,
            refresh: this.token,
          };
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          console.log(
            "Session Storage Setting Success!",
            sessionStorage.getItem("userInfo")
          );
          this.setIsLogin(true);
          this.setIsJustLoggedIn(true);

          // alert("BI/DW 인증 정상 로그인 확인(token 인증 성공)");
          this.$router.push("/dashboard");
          // this.getMyConfig();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          this.$router.push("/error");
        });
    } else {
      this.$router.push("/error");
    }
    // if (this.getIsLogin) {
    //   console.log(
    //     "TokenAuthView.vue > Mounted > Query Toekn Check OK > getIsLogin True..."
    //   );
    //   this.$router.push("/dashboard");
    // }
    // else {
    //   console.log(
    //     "TokenAuthView.vue > Mounted > Query Toekn Check OK > getIsLogin False..."
    //   );
    //   this.$router.push("/error");
    // }
    // this.initializeStore();
    // this.getAuth();
  },
  beforeDestroy() {
    console.log("TokenAuthView.vue > BeforeDestroy Init...");
    this.$router.go("");
  },
  computed: {
    ...mapState("auth", ["access", "refresh"]),
    ...mapGetters("auth", ["getIsLogin", "getUserConfig"]),
  },
  methods: {
    ...mapMutations("dashboard", ["setJMyCBProfileReg", "setJMyCBProfileTmp"]),
    ...mapMutations("auth", [
      "setAccess",
      "setRefresh",
      "initializeStore",
      "setIsLogin",
      "setIsJustLoggedIn",
      "setUserConfig",
    ]),
    getAccessToken() {
      // console.log("Get Access Token Start...");
      // api
      //   .refreshToken()
    },
    getMyConfig() {
      // 시나리오 1,2 정상 접속: 로그인 인증 후 setIsLogin=true 할당 필요
      // cookies에 access / refresh token 세팅여부 확인 완료
      // session storage에 token 정보를 담은 userInfo 할당 완료
      console.log("Get User Infomation init...");
      api
        .getMe()
        .then((res) => {
          // session storage에 token이 정상적으로 할당 시, api header에 access token 할당 후 api 처리 가능
          console.log("getMyConfig Data: ", res);
          const userContainer = {
            userId: res.data.user_id,
            userName: res.data.user_name,
            userPhone: res.data.phone,
            userEmail: res.data.email,
            isAdmin: res.data.is_superuser,
            isActive: res.data.is_active,
            userGroup1: res.data.group_1,
            userGroup2: res.data.group_2,
            userGroup3: res.data.group_3,
            userGroup4: res.data.group_4,
            boardId: res.data.board_id,
            startBoardID: res.data.start_board_id,
            boardModules: res.data.board_modules,
            orgLvl: res.data.org_lvl,
          };
          console.log("GET ME DATA: ", userContainer);
          this.setUserConfig(userContainer);
          this.setIsLogin(true);
          console.log("User Config Save Success! ", this.getUserConfig);
          console.log("Is Login: ", this.getIsLogin);

          this.setJMyCBProfileReg(userContainer.boardModules);
          this.setJMyCBProfileTmp(userContainer.boardModules);
          this.$router.push("dashboard");
          // this.$router.go();
        })
        .catch((err) => {
          console.log(err);
          console.log("Login Fail, 인증실패");
          alert("Login Fail, 인증실패");
          // this.setIsLogin(false);
          // this.$router.push("/error");
        });
    },
    // getAuth() {
    //   // 추후 cookies.get --> cookies 인증으로 변경
    //   // 시나리오 1: BIDW > 정상 링크접속: 정상 로그인 인증 후 setIsLogin=true 할당
    //   // 시나리오 2: 정상링크 접속 후 새로고침: 정상 로그인 인증 후 setIsLogin=true 할당
    //   // 시나리오 3: 비정상 접속: 비정상 로그인 후 setIsLogin=false 할당
    //   const access = this.$cookies.get("access_token");
    //   const refresh = this.$cookies.get("refresh_token");
    //   const userInfo = {
    //     access: access,
    //     refresh: refresh,
    //   };
    //   if (access && refresh) {
    //     // 시나리오 1,2 정상 접속: 로그인 인증 후 setIsLogin=false 할당
    //     alert(
    //       "BI/DW 인증 정상 로그인 확인(cookie access/refresh token 존재 확인)"
    //     );
    //     if (!sessionStorage.getItem("userInfo")) {
    //       sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     }
    //     // sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    //     this.getMyConfig();
    //   } else {
    //     alert(
    //       "BI/DW 인증 비정상 접근 확인(cookie access/refresh token 미존재 확인"
    //     );
    //     this.setIsLogin(false);
    //     this.$router.push("/error");
    //   }
    // },
  },
};
</script>
