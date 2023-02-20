<template>
  <v-card class="mt-2 py-0">
    <form @submit.prevent="submitHandler">
      <div class="pa-2">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">Edit User Config</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">User ID</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="First Name"
              v-model="editedItem.user_id"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">User Name</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Last Name"
              v-model="editedItem.user_name"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Phone Number</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Phone Number"
              v-model="editedItem.phone"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">E-Mail</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="E-Mail"
              v-model="editedItem.email"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col> -->
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">조직레벨 1(본부)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="조직레벨 1(본부)"
              v-model="editedItem.group_1"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">조직레벨 2(센터)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="조직레벨 2(센터)"
              v-model="editedItem.group_2"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">조직레벨 3(부/팀)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="조직레벨 3(부/팀)"
              v-model="editedItem.group_3"
              readonly
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">조직레벨 4(팀/조)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="조직레벨 4(팀/조)"
              v-model="editedItem.group_4"
              :readonly="editedItem.org_lvl > 1"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">board_modules</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="board_modules"
              v-model="editedItem.board_modules"
              hide-details="auto"
            ></v-text-field>
          </v-col> -->
          <v-col cols="12 mt-5">
            <v-btn type="submit" color="primary"> Save </v-btn>
            <v-btn @click="exit" class="ml-2"> Exit </v-btn>
            <router-link :to="cancelUrl" class="text-decoration-none">
              <v-btn type="button" class="ml-2"> Cancel </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </div>
    </form>
  </v-card>
</template>
<script>
import { api } from "@/api/api";
import { mapState, mapMutations } from "vuex";

export default {
  name: "UserConfigEdit",
  data: () => ({
    editedItem: {
      id: "",
      user_id: 0,
      user_name: "",
      email: "",
      phone: "",
      group_1: "",
      group_2: "",
      group_3: "",
      group_4: "",
      board_modules: "",
      org_lvl: "",
    },
    //   valid: true,
    //   alert: false,
    //   message: "",
    //   firstName: "",
    //   lastName: "",
    //   phoneNumber: "",
    //   email: "",
    //   role: false,
    //   disabled: false,
    //   avatar: [],
    //   password: "",
    //   formData: {
    //     user_id: "",
    //     user_name: "",
    //   },
  }),

  // methods: {
  //   created() {
  //   this.initialize();
  // },
  created() {
    this.initialize();
  },
  computed: {
    ...mapState("auth", ["access", "refresh"]),
    ...mapState("dashboard", ["jMyCBProfileTmp", "cacheAPI"]),
  },
  methods: {
    ...mapMutations("auth", ["setUserConfig"]),
    exit() {
      this.$router.push("/");
    },
    initialize() {
      api
        .getMe()
        .then((res) => {
          console.log(res);
          this.editedItem = Object.assign({}, res.data);
          // this.users.map((obj) => {
          //   obj.board_modules = JSON.stringify(obj.board_modules);
          //   return { ...obj };
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMyConfig() {
      api
        .getMe()
        .then((res) => {
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
          };
          this.setUserConfig(userContainer);
        })
        .catch((err) => {
          // session storage에 token이 정상적으로 없거나, token이 비정상 일 때 err 발생
          console.log(err);
          console.log("Login Fail, 인증실패");
          this.setIsLogin(false);
          this.$router.push("/error");
        });
    },
    submitHandler: function () {
      const formData = {
        // user_id: this.editedItem.user_id,
        user_name: this.editedItem.user_name,
        email: this.editedItem.email,
        phone: this.editedItem.phone,
        // auth: this.editedItem.auth,
        group_1: this.editedItem.group_1,
        group_2: this.editedItem.group_2,
        group_3: this.editedItem.group_3,
        group_4: this.editedItem.group_4,
        // is_active: this.editedItem.is_active,
        // is_superuser: this.editedItem.is_superuser,
        board_modules: this.editedItem.board_modules,
        // board_modules: JSON.parse(this.editedItem.board_modules),
      };
      api
        .updateUser(this.editedItem.user_id, formData)
        .then((res) => {
          console.log("updateuser", res);
          alert("completed.");
          this.getMyConfig();
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
