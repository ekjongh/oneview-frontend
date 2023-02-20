<template>
  <v-app-bar
    dense
    height_="0px"
    app
    color="primary"
    dark
    elevate-on-scroll
    :style="{
      // height: '52px',
      // width: `100vw`,
      // whiteSpace: 'nowrap',
    }"
  >
    <v-app-bar-nav-icon
      @click.stop="drawerClick"
      v-if="!$route.path.includes('error')"
    ></v-app-bar-nav-icon>
    <v-app-bar-title
      class="grow text-h5 mr-16 text-center font-weight-bold"
      :style="{
        fontFamily: 'NEXONFootballGothic',
      }"
    >
      KT 네트워크품질 OwnView
    </v-app-bar-title>

    <!-- <v-spacer></v-spacer> -->
    <!-- <v-divider vertical></v-divider> -->
    <!-- <template v-slot:extension> -->
    <v-tabs class="ml-16" center>
      <v-tab v-for="(item, index) in tabItems" :key="index" link :to="item.to">
        {{ item.name }}
      </v-tab>
      <!-- <v-tab link to="/user">
        <v-icon> mdi-account </v-icon>
        <div class="grow">{{ getUserOrg }}</div>
      </v-tab> -->
    </v-tabs>
    <!-- </template> -->

    <v-btn to="/user" plain>
      <v-icon>mdi-account</v-icon>
      {{ getUserOrg }}
    </v-btn>
    <!-- <v-btn @click="logout" x-small color="#0072A7" dark> logout </v-btn> -->

    <v-btn
      v-if="$route.path.includes('dashboard')"
      class="mt-1"
      icon
      @click.stop="ViewFilterDrawerClick"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    <!-- <v-icon @click.stop="ViewFilterDrawerClick">mdi-filter</v-icon> -->

    <!-- <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-1" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in appItems"
          :key="i"
          @click="
            () => {
              // 편집모드전환();
            }
          "
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </v-app-bar>
</template>

<script>
import { bus } from "@/event-bus";
import { mapState, mapMutations, mapGetters } from "vuex";

// import { api } from "@/api/api";
export default {
  name: "AppBar",
  data: () => ({
    drawer: false,
    opensViewFilterDrawer: false,
    // appItems: [{ title: "로그아웃" }],
    // appItems: [
    //   {
    //     title:
    //       "편집모드전환: 새로 로그인 할 경우, 보기모드에서 바꾼 설정은 사라지고, 편집모드에서 저장한 프로파일이 적용됨",
    //   },
    // ],
    userInfo: {},
    tabItems: [
      {
        name: "대시보드",
        to: "/dashboard",
      },
      {
        name: "VOC 상세분석",
        to: "/voc",
      },
      // {
      //   name: "기지국품질 상세분석",
      //   to: "/bts",
      // },
      // {
      //   name: "게시판",
      //   to: "/home",
      // },
      // {
      //   name: "관리자",
      //   to: "/admin",
      // },
    ],
  }),
  mounted() {
    console.log("Appbar > mounted hook...");
    // this.userInfo = this.getUserConfig;
    console.log("Appbar > userInfo: ");
  },
  methods: {
    ...mapMutations("auth", ["setIsLogin", "initializeStore", "setUserConfig"]),
    ...mapMutations("dashboard", [
      "setMode2EditCBProfileReg",
      "addCacheAPI",
      // "setMyCBProfileTmp",
      // "setReserve4MyCBProfileReg",
      // "setMyCBProfileReg",
      "setJMyCBProfileTmp",
      "setJReserve4MyCBProfileReg",
      "setJMyCBProfileReg",
    ]),

    drawerClick() {
      bus.$emit("DRAWER_CLICK", this.drawer);
    },
    // 편집모드전환() {
    //   // // console.log("logout init...");
    //   // console.log(this.mode2EditCBProfileReg);
    //   // console.log(this.getUserConfig);
    //   this.setMode2EditCBProfileReg(!this.mode2EditCBProfileReg);
    // },
    ViewFilterDrawerClick() {
      bus.$emit(
        "TOGGLE_WHETHER_opensViewFilterDrawer",
        !this.opensViewFilterDrawer
      );
    },
    logout() {
      console.log("logout init...");
      this.$swal
        .fire({
          backdrop: false,
          html: `로그아웃 하시겠습니까?`,
          // showDenyButton: true,
          showCancelButton: true,
          cancelButtonText: "취소",
          confirmButtonText: "확인",
          // confirmButtonColor: "indigo",
          reverseButtons: true,
          focusCancel: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          closeOnCancel: true,
          // denyButtonText: `Don't save`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            sessionStorage.removeItem("userInfo");
            this.initializeStore();
            this.setIsLogin(false);
            // this.setIsLogin(false);
            // this.setUserConfig({});
            this.setJMyCBProfileReg({});
            this.$cookies.remove("access_token");
            this.$cookies.remove("refresh_token");
            this.$router.push("/error");
            console.log("logout complete");
          } else if (result.isDenied) {
            //
          }
          this.isSwalOpen = false;
        });
      // sessionStorage.removeItem("userInfo");
      // this.initializeStore();
      // // this.setIsLogin(false);
      // // this.setUserConfig({});
      // this.setJMyCBProfileReg({});
      // this.$cookies.remove("access_token");
      // this.$cookies.remove("refresh_token");
      // this.$router.push("/error");
      // console.log("logout complete");
      // const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // const access = userInfo.access;
      // const refresh = userInfo.refresh;
      // this.$axios.defaults.headers.common["Authorization"] =
      //   "Bearer " + userInfo.access;
      // api
      //   .logoutAccessToken(access)
      //   .then((res) => {
      //     console.log("access token revoke completed...", res);
      //     console.log("logout refresh token...", refresh);
      //     // this.$axios.defaults.headers.common["Authorization"] =
      //     //   "Bearer " + userInfo.refresh;
      //     api
      //       .logoutRefreshToken(refresh)
      //       .then((res) => {
      //         console.log("refresh token revoke completed...", res);
      //         sessionStorage.removeItem("userInfo");
      //         this.$axios.defaults.headers.common["Authorization"] = "";
      //         this.setIsLogin(false);
      //         this.setUserConfig({});
      //         this.setJMyCBProfileReg({});
      //         this.$cookies.remove("access_token");
      //         this.$cookies.remove("refresh_token");
      //         this.$router.push("/error");
      //         console.log("logout complete");
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         console.log("err config: ", err.config);
      //       });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  computed: {
    ...mapState("auth", ["access", "refresh"]),
    ...mapState("dashboard", [
      "mode2EditCBProfileReg",
      "clearsCache4APIResponseDataWithDashboardMounted",
      "removesCachedItemWithEachBannerOrCardMounted",
      "verbose",
      "cacheAPI",
      // "myCBProfileTmp",
      // "reserve4MyCBProfileReg",
      // "myCBProfileReg",
      "jMyCBProfileTmp",
      "jReserve4MyCBProfileReg",
      "jMyCBProfileReg",
      // "baseDate",
      "defaultDelta4BaseDate",
    ]),
    ...mapGetters("auth", ["getIsLogin", "getUserConfig"]),
    getUserOrg() {
      let userOrg = "";
      if (this.getUserConfig.userGroup2)
        userOrg += this.getUserConfig.userGroup2 + "/";
      if (this.getUserConfig.userGroup3)
        userOrg += this.getUserConfig.userGroup3 + "/";
      if (this.getUserConfig.userGroup4)
        userOrg += this.getUserConfig.userGroup4 + "/";
      if (this.getUserConfig.userName) userOrg += this.getUserConfig.userName;
      // let userOrg =
      //   this.getUserConfig.userGroup2 +
      //   "/" +
      //   this.getUserConfig.userGroup3 +
      //   "/" +
      //   this.getUserConfig.userGroup4 +
      //   "/" +
      //   this.getUserConfig.userName;
      // userOrg = userOrg.replace("//", "/");
      return userOrg;
    },
  },
};
</script>
