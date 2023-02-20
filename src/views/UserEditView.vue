<template>
  <v-container class="d-flex justify-center">
    <v-card width="60%" class="">
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <template v-if="item.tab == 'userConfig'">
            <user-config-edit />
          </template>
          <!-- <template v-else-if="item.tab == 'dashboardConfig'">
            <user-dashboard-config-edit />
          </template> -->
          <template v-else> None </template>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import UserConfigEdit from "@/components/user/UserConfigEdit.vue";
// import UserDashboardConfigEdit from "@/components/user/UserDashboardConfigEdit.vue";

export default {
  name: "UserEdit",
  components: {
    UserConfigEdit,
    // UserDashboardConfigEdit,
  },
  data() {
    return {
      valid: true,
      alert: false,
      message: "",
      tab: null,
      // items: [{ tab: "userConfig" }, { tab: "dashboardConfig" }],
      items: [{ tab: "userConfig" }],
    };
  },
  methods: {},
  computed: {},
};
</script>
