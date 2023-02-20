<template>
  <v-app
    class="overflow-y-hidden_"
    :style="{
      backgroundColor: 'rgba(235, 237, 237, 1)',
    }"
  >
    <app-bar> </app-bar>

    <side-bar v-if="!$route.path.includes('error')"></side-bar>
    <ViewFilterDrawer v-if="!$route.path.includes('error')"></ViewFilterDrawer>
    <v-main class_="mt-n15">
      <router-view />
    </v-main>
    <!-- <fooster-bar /> -->
    <CopyrightFooter />
  </v-app>
</template>

<script>
import AppBar from "@/components/main/AppBar.vue";
import SideBar from "@/components/main/SideBar.vue";
import ViewFilterDrawer from "@/components/main/ViewFilterDrawer.vue";
import CopyrightFooter from "@/components/main/CopyrightFooter.vue";

import { mapState, mapMutations, mapGetters } from "vuex";
import { api } from "./api/api";
export default {
  name: "App",
  components: {
    AppBar,
    SideBar,
    ViewFilterDrawer,
    CopyrightFooter,
  },
  data: () => ({
    refreshToken: true,
  }),
  beforeCreate() {
    // console.log("App.vue --> beforeCreated hook start...");
    // this.$store.commit("auth/initializeStore");
    // this.initializeStore();
    // this.getAuth();
  },
  created() {
    console.log("App.vue --> Created hook start...");
    // this.$store.commit("auth/initializeStore");
    // this.initializeStore();
    // this.getAuth();
  },
  beforeMount() {
    // console.log("App.vue --> beforeMount hook start...");
    // this.initializeStore();
    // this.getAuth();
  },
  mounted() {
    console.log("App.vue > Mounted Init...");
    console.log("App.vue > Mounted > getIsLogin: ", this.getIsLogin);
    if (sessionStorage.getItem("userInfo")) {
      this.setIsLogin("true");
      this.initializeStore();
      this.getAuth();
    }
    // const user_id = "10151032";
    // const body = {
    //   board_id: 7,
    // };
    // this.updateMe(user_id, body);
    // if (this.$route.path !== "/") {
    //   alert("root 아님");
    //   this.initializeStore();
    //   this.getAuth();
    // }
    // this.initializeStore();
    // this.getAuth();
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
      "setUserConfig",
    ]),
    updateMe(user_id, body) {
      console.log("update Me Test...", body);
      api
        .updateUser(user_id, body)
        .then((res) => console.log("update me success!", res))
        .catch((err) => console.log("Update Me Error!", err));
    },
    getMyConfig() {
      console.log("Refresh User Infomation init...");
      api
        .getMe()
        .then((res) => {
          console.log("App.vue > GetMyConfig > api.getMe Success, Init...");
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
            orgLvl: res.data.org_lvl,
            boardModules: res.data.board_modules,
          };
          console.log("GET ME DATA: ", userContainer);
          this.setUserConfig(userContainer);
          this.setIsLogin(true);
          console.log("User Config Save Success! ", this.getUserConfig);
          console.log("Is Login: ", this.getIsLogin);
          this.refreshToken = true;
          // this.setJMyCBProfileReg(userContainer.boardModules);
          // this.setJMyCBProfileTmp(userContainer.boardModules);
          if (!this.$route.path.includes("dashboard")) {
            this.$router.push("/dashboard");
          }
        })
        .catch((err) => {
          // session storage에 token이 정상적으로 없거나, token이 비정상 일 때 err 발생
          console.log("App.vue > getMe > .catch");
          console.log(err);
          if (this.refreshToken) {
            this.refreshToken = false;
            this.$router.go("/dashboard");
          } else {
            console.log("Login Fail, 인증실패");
            alert("Login Fail, 인증실패");
            this.setIsLogin(false);
            this.$router.push("/error");
          }
        });
    },
    getAuth() {
      // 추후 cookies.get --> cookies 인증으로 변경
      // 시나리오 1: BIDW > 정상 링크접속: 정상 로그인 인증 후 setIsLogin=true 할당
      // 시나리오 2: 정상링크 접속 후 새로고침: 정상 로그인 인증 후 setIsLogin=true 할당
      // 시나리오 3: 비정상 접속: 비정상 로그인 후 setIsLogin=false 할당
      console.log("App.vue > getAuth Method Init...");
      console.log("App.vue > getAuth > this.getIsLogin: ", this.getIsLogin);
      console.log(this.$route.path);
      console.log("/ 아님");
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (userInfo) {
        this.getMyConfig();
      }
      // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // // const access = this.$cookies.get("access_token");
      // // const refresh = this.$cookies.get("refresh_token");
      // // const userInfo = {
      // //   access: access,
      // //   refresh: refresh,
      // // };
      // if (userInfo) {
      //   // 시나리오 1,2 정상 접속: 로그인 인증 후 setIsLogin=false 할당
      //   // alert(
      //   //   "BI/DW 인증 정상 로그인 확인(cookie access/refresh token 존재 확인)"
      //   // );
      //   // if (!sessionStorage.getItem("userInfo")) {
      //   //   sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      //   // }
      //   // sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      //   this.getMyConfig();
      // }
      // else {
      //   alert(
      //     "BI/DW 인증 비정상 접근 확인(cookie access/refresh token 미존재 확인"
      //   );
      //   this.setIsLogin(false);
      //   this.$router.push("/error");
      // }
    },
  },
};
</script>
<style>
/* html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
} */

/* html {
  overflow-y: auto;
} */
/* html {
  overflow-y: scroll;
} */
html {
  overflow-y: hidden;
}
html {
  overflow-y: hidden;
}
</style>
