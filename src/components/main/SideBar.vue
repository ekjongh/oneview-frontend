<template>
  <v-navigation-drawer dark app v-model="drawer" temporary>
    <v-list-item
      class="blue"
      :style="{
        // height: `52px`,
      }"
    >
      <v-list-item-content>
        Profile:
        {{ getUserOrg }}
        <!-- <v-list-item-title class="text-h6">
          사용자ID: {{ userContainer.userId }}
        </v-list-item-title> -->
        <!-- <v-list-item-subtitle>
          사용자이름: {{ userContainer.userName }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          사용자소속: {{ userContainer.userBelong3 }}
        </v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <!-- <v-divider></v-divider> -->

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-subtitle-1">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { bus } from "@/event-bus";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      {
        title: "대시보드",
        icon: "mdi-view-dashboard",
        name: "대시보드",
        to: "/dashboard",
      },
      {
        title: "VOC 상세분석",
        icon: "mdi-account-voice",
        name: "VOC 상세분석",
        to: "/voc",
      },
      // {
      //   title: "기지국품질 상세분석",
      //   icon: "mdi-transmission-tower",
      //   name: "기지국품질 상세분석",
      //   to: "/bts",
      // },
      // {
      //   title: "게시판",
      //   icon: "mdi-bulletin-board",
      //   name: "게시판",
      //   to: "/home",
      // },
      // {
      //   title: "관리자",
      //   icon: "mdi-cog",
      //   name: "관리자",
      //   to: "/admin",
      // },
    ],
    right: null,
    drawer: false,
  }),
  created() {
    bus.$on("DRAWER_CLICK", (drawer) => {
      this.drawer = !drawer;
    });
    if (this.getUserConfig.isAdmin) {
      this.items.push({
        title: "관리자",
        icon: "mdi-cog",
        name: "관리자",
        to: "/admin",
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["getUserConfig"]),
    getUserOrg() {
      let userOrg = "";
      if (this.getUserConfig.userGroup4)
        userOrg += this.getUserConfig.userGroup4 + "/";
      if (this.getUserConfig.userName) userOrg += this.getUserConfig.userName;
      return userOrg;
    },
  },
};
</script>
