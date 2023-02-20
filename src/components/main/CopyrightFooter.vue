<template>
  <v-footer v-if="!hasOwnFooter" padless :style="{ height: '52px' }">
    <v-col class="text-center text-caption">
      Copyright© {{ new Date().getFullYear() }} KT Corp. All rights reserved.
    </v-col>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    // hasOwnFooter:
    //   this.$route.path.includes("dashboard") ||
    //   this.$route.path.includes("map"),
  }),
  computed: {
    hasOwnFooter: function () {
      // alert(window.location.href);
      // alert(window.location.pathname);
      let bingo =
        this.$route.path.includes("dashboard") ||
        this.$route.path.includes("map");
      return bingo;
    },
  },
};
</script>
