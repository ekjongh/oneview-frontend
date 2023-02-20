<template lang="">
  <v-card
    tile
    elevation="0"
    class="pa-0 mx-0"
    style="background-color: transparent"
  >
    <component
      :is="onePick.component"
      :wildOne="wildOneTitledAndCaptionedUniformly"
      :cellIndex="cellIndex"
      :cellCount="cellCount"
      :recipe="onePick.recipe"
      :bannerHight="bannerHight"
    ></component>
  </v-card>
</template>

<script>
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";
export default {
  mixins: [DashboardViewMixin],
  props: {
    bannerHight: {
      type: Number,
      default: 98,
    },
    cellIndex: {
      type: Number,
      default: null,
    },
    cellCount: {
      type: Number,
      default: null,
    },

    wildOne: {},
  },
  components: {
    DashboardViewBanner4VOC: () =>
      import("@/components/dashboard/DashboardViewBanner.vue"),
    DashboardViewBanner4VoLTE: () =>
      import("@/components/dashboard/DashboardViewBanner.vue"),
    DashboardViewBanner4Offloading: () =>
      import("@/components/dashboard/DashboardViewBanner.vue"),
    DashboardViewBanner4MDT: () =>
      import("@/components/dashboard/DashboardViewBanner.vue"),
    DashboardViewBanner4RRC: () =>
      import("@/components/dashboard/DashboardViewBanner.vue"),
  },

  computed: {
    wildOneTitledAndCaptionedUniformly: function () {
      // let somethingMore =
      //   this.wildOne.catPresentationFormat == "일별추이|목표대비지표" ? 100 : "";

      return {
        ...this.wildOne,
        // ...this.titleAndCaptionAsDefault(this.wildOne, somethingMore),
        ...this.titleAndCaptionAsDefault(this.wildOne, true),
      };
    },
    wildOne4Indicator: function () {
      // let d = this.makeData4StartEndTimeArgs(
      //   this.wildOne.dates,
      //   this.wildOne.catIndicator
      // );
      //   .end.toISOString()
      //   .substring(0, 10);
      // return { ...this.wildOne, dates: d };
      return { ...this.wildOne, caption: null };
    },
    onePick: function () {
      // https://www.chartjs.org/docs/latest/general/data-structures.html
      let component = "";
      let recipe = {
        indicator: { markKey: "date", trophyKey: "value" },
        chart: [],
      };
      switch (this.wildOne.catIndicator) {
        case "VOC":
        case "천명당VOC":
          component = "DashboardViewBanner4VOC";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "VoLTE절단율":
          component = "DashboardViewBanner4Offloading";
          recipe = {
            indicator: { markKey: "date", trophyKey: "cut_rate" },
          };
          break;
        case "오프로딩율":
          component = "DashboardViewBanner4Offloading";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "MDT":
          component = "DashboardViewBanner4MDT";

          recipe = {
            indicator: { markKey: "date", trophyKey: "rsrp_bad_rate" },
          };
          break;
        case "LTE기지국통계":
          switch (this.wildOne.catProductService) {
            case "PRB사용율":
              component = "DashboardViewBanner4RRC";
              recipe = {
                indicator: { markKey: "date", trophyKey: "prbusage_mean" },
              };
              break;
            case "RRC성공률":
            default:
              component = "DashboardViewBanner4RRC";
              recipe = {
                indicator: { markKey: "date", trophyKey: "rrc_rate" },
              };
              break;
          }
          break;
        default:
          break;
      }
      return {
        component,
        recipe,
      };
    },
  },
};
</script>
<style lang=""></style>
