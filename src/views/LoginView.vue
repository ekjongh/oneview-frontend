<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1
                      class="text-center display-2 primary--text text--accent-3"
                    >
                      KDAP-OneView
                    </h1>
                    <h4 class="text-center mt-4">
                      Ensure your kate id for registration
                    </h4>
                    <v-form id="login-form" @submit.prevent="login">
                      <v-text-field
                        v-model="loginForm.userID"
                        id="user_name"
                        label="Kate 사번"
                        name="user_name"
                        prepend-icon="mdi-account"
                        type="text"
                        color="primary accent-3"
                      />

                      <v-text-field
                        v-model="loginForm.userPassword"
                        id="password"
                        label="비밀번호"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="primary accent-3"
                      />
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn rounded color="primary accent-3" dark @click="login"
                      >로그인</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="primary accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Welcome to OneView!</h1>
                    <h5 class="text-center">
                      KDAP-OneView 접속 시, 계정권한 신청이 필요합니다.
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++"
                      >권한 신청</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="primary accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Welcome Back!</h1>
                    <h5 class="text-center">
                      계정권한이 있으시면, 로그인 해주세요!
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">
                      로그인 페이지
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1
                      class="text-center display-2 primary--text text--accent-3"
                    >
                      Create Account
                    </h1>
                    <h4 class="text-center mt-4">
                      Ensure your email for registration
                    </h4>
                    <v-form id="register-form">
                      <v-text-field
                        label="사번"
                        v-model="registerForm.userID"
                        name="user_name"
                        prepend-icon="mdi-account-clock"
                        :rules="[(v) => !!v || 'ID is required']"
                        type="text"
                        color="primary accent-3"
                      />
                      <!-- <v-text-field
                        label="이름"
                        v-model="registerForm.user_name"
                        name="first_name"
                        :rules="[(v) => !!v || 'Name is required']"
                        prepend-icon="mdi-account"
                        type="text"
                        color="primary accent-3"
                      /> -->

                      <!-- <v-text-field
                        v-model="registerForm.userEmail"
                        label="이메일"
                        name="email"
                        :rules="[(v) => !!v || 'Email is required']"
                        prepend-icon="mdi-email"
                        color="primary accent-3"
                      /> -->
                      <!-- <v-select
                        v-model="registerForm.userAuth"
                        :items="authList"
                        item-text="name"
                        item-value="value"
                        :rules="[(v) => !!v || 'Auth is required']"
                        label="요청권한"
                        prepend-icon="mdi-account-lock"
                        return-object
                      >
                      </v-select> -->
                      <v-text-field
                        v-model="registerForm.userPassword"
                        label="비밀번호"
                        name="password"
                        :rules="[(v) => !!v || 'Password is required']"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="primary accent-3"
                      />
                      <!-- <v-text-field
                        v-model="registerForm.userPassword2"
                        label="비밀번호 확인"
                        name="password2"
                        :rules="[(v) => !!v || 'Password-confirm is required']"
                        prepend-icon="mdi-lock-plus"
                        type="password"
                        color="primary accent-3"
                      /> -->
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
                    <v-btn
                      rounded
                      color="primary accent-3"
                      dark
                      @click="registerSubmit"
                      >권한 요청</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import { api } from "@/api/api";

export default {
  data: () => ({
    authList: [
      { name: "관리자", value: "ADMIN" },
      { name: "임원", value: "EXECE" },
      { name: "팀장", value: "LEADER" },
      { name: "직원", value: "USER" },
    ],
    step: 1,
    items: ["관리자", "임원", "팀장", "직원"],
    registerForm: {
      userID: "",
      userName: "",
      userEmail: "",
      userAuth: "",
      userPassword: "",
      userPassword2: "",
    },
    loginForm: {
      userID: "",
      userPassword: "",
    },
  }),
  props: {
    source: String,
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},

  methods: {
    ...mapMutations("auth", [
      "setAccess",
      "setRefresh",
      "setIsLogin",
      "setUserContainer",
    ]),
    login() {
      console.log("login() ...");
      // this.$axios.defaults.headers.common["Authorization"] = "";
      sessionStorage.removeItem("userInfo");

      const formData = {
        user_id: this.loginForm.userID,
        password: this.loginForm.userPassword,
      };
      console.log(formData);
      api
        .loginUser(formData)
        .then((res) => {
          console.log(res);

          const access = res.data.access;
          const refresh = res.data.refresh;
          this.setAccess(access);
          this.setRefresh(refresh);
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + access;
          const userInfo = {
            access: access,
            refresh: refresh,
          };
          this.getUserConfig();
          console.log("login Suc! ", userInfo);
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          console.log("session Storage: ", sessionStorage.getItem("userInfo"));
          this.setIsLogin(true);

          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registerSubmit() {
      console.log("register init...");
      const formData = {
        // name: this.registerForm.userName,
        // email: this.registerForm.userEmail,
        // organization: this.registerForm.userAuth.value,
        user_id: this.registerForm.userID,
        password: this.registerForm.userPassword,
        // re_password: this.registerForm.userPassword2,
      };
      console.log(formData);
      api
        .setUser(formData)
        .then((res) => {
          console.log("REGISTER POST RES", res);
          alert(`user ${res.data.user_id} register OK`);
          this.me = res.data;
        })
        .catch((err) => {
          console.log("REGISTER POST ERR.RESPONSE", err.response);
          alert("REGISTER Fail ");
        });
    },
    getUserConfig() {
      console.log("Get User Infomation init...");
      api
        .getMe()
        .then((res) => {
          console.log(res);
          const userContainer = {
            userId: res.data.user_id,
            userName: res.data.user_name,
            auth: res.data.auth,
            userBelong1: res.data.belong_1,
            userBelong2: res.data.belong_2,
            userBelong3: res.data.belong_3,
            userBelong4: res.data.belong_4,
          };
          console.log("GET ME DATA: ", userContainer);
          this.setUserContainer(userContainer);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
