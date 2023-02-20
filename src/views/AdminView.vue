<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <template v-if="item.tab == 'User'">
            <user-card />
          </template>
          <template v-else-if="item.tab == 'Token'">
            <token-card />
          </template>
          <template v-else-if="item.tab == 'DashboardConfig'">
            <board-config-card />
          </template>
          <template v-else> None </template>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import UserCard from "@/components/admin/UserCard.vue";
import TokenCard from "@/components/admin/TokenCard.vue";
import BoardConfigCard from "@/components/admin/BoardConfigCard.vue";

export default {
  name: "AdminView",

  components: {
    UserCard,
    TokenCard,
    BoardConfigCard,
  },
  data: () => ({
    tab: null,
    items: [{ tab: "User" }, { tab: "Token" }, { tab: "DashboardConfig" }],
  }),
};
</script>
