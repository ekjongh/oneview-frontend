<template>
  <v-navigation-drawer
    width="500px"
    v-model="opensViewFilterDrawer"
    color__="transparent"
    dark_
    color="white"
    right
    app
    temporary
  >
    <v-list-item
      class="blue"
      :style="{
        // height: `52px`,
      }"
    >
      <v-list-item-title style="color: white">
        {{ onePick.title }}
      </v-list-item-title>
      <v-btn
        @click="handleClick2Emit_TOGGLE_WHETHER_opensViewFilterDrawer"
        icon
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-list-item>
    <v-list-item-content>
      <component
        :is="onePick.component"
        :opensViewFilterDrawer="opensViewFilterDrawer"
      ></component>
    </v-list-item-content>
  </v-navigation-drawer>
</template>
<script>
import { bus } from "@/event-bus";
import { mapGetters } from "vuex";
export default {
  components: {
    ViewFilter4Dashboard: () =>
      import("@/components/dashboard/ViewFilter4Dashboard.vue"),
  },
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
        to: "/map",
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
      {
        title: "관리자",
        icon: "mdi-cog",
        name: "관리자",
        to: "/admin",
      },
    ],
    right: null,
    drawer: false,
    opensViewFilterDrawer: false,
  }),
  methods: {
    handleClick2Emit_TOGGLE_WHETHER_opensViewFilterDrawer() {
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },
  },
  created() {
    bus.$on("TOGGLE_WHETHER_opensViewFilterDrawer", (opens) => {
      this.opensViewFilterDrawer = opens;
    });
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

    onePick: function () {
      // https://www.chartjs.org/docs/latest/general/data-structures.html
      let title = "";
      let component = "";

      if (this.$route.path.includes("dashboard")) {
        title = "대시보드 설정";
        component = "ViewFilter4Dashboard";
        return {
          title,
          component,
        };
      } else {
        //
        return {
          title,
          component,
        };
      }
    },
  },
};
</script>
