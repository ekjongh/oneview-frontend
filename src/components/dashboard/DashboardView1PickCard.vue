<template lang="">
  <v-card
    tile
    elevation="0"
    class="pa-0 mx-0"
    style="background-color: transparent"
  >
    <component
      :is="onePick.component"
      :recipe="onePick.recipe"
      :isOnModal="isOnModal"
      :wildOne="wildOneTitledAndCaptionedUniformly"
      :cardIndex="cardIndex"
      :cardCount="cardCount"
      :cardHight="cardHight"
      :hoversOnCell="hoversOnCell"
      :opensDrawer4CellFilter="opensDrawer4CellFilter"
      :opensModalWindowToShowCardBigger="opensModalWindowToShowCardBigger"
      :couldShowCardBigger="couldShowCardBigger"
    ></component>
  </v-card>
</template>

<script>
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";
export default {
  mixins: [DashboardViewMixin],
  props: {
    isOnModal: {
      type: Boolean,
      default: false,
    },
    couldShowCardBigger: {
      type: Boolean,
      default: false,
    },
    opensModalWindowToShowCardBigger: {
      type: Boolean,
      default: false,
    },
    opensDrawer4CellFilter: {
      type: Boolean,
      default: false,
    },
    hoversOnCell: {
      type: Boolean,
      default: false,
    },
    cardHight: {
      type: Number,
      default: 438,
    },
    cardIndex: {
      type: Number,
      default: null,
    },
    cardCount: {
      type: Number,
      default: null,
    },

    wildOne: {},
  },

  components: {
    DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible:
      () =>
        import(
          "@/components/dashboard/DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible.vue"
        ),
    DashboardViewCardTrendChart4MultiDataSeries: () =>
      import(
        "@/components/dashboard/DashboardViewCardTrendChart4MultiDataSeries.vue"
      ),
    DashboardViewCardTrendMonthMultiselection: () =>
      import(
        "@/components/dashboard/DashboardViewCardTrendChart4MultiDataSeries.vue"
      ),
    DashboardViewCardBarChartWithTwoAxes: () =>
      import("@/components/dashboard/DashboardViewCardBarChartWithTwoAxes.vue"),
    DashboardViewCardWorst: () =>
      import("@/components/dashboard/DashboardViewCardWorst.vue"),
  },

  computed: {
    scopeChoiceCount: function () {
      return this.wildOne.group.split("|").length;
    },
    onePick: function () {
      // https://www.chartjs.org/docs/latest/general/data-structures.html
      let component = "";
      let recipe = {
        indicator: { markKey: "date", trophyKey: "value" },
        chart: { sets: [] },
      };
      let trophyKey = "";
      switch (
        `${this.wildOne.catIndicator}|${this.wildOne.catPresentationFormat}`
      ) {
        // case "VOC|????????????":
        // case "?????????VOC|????????????":
        //   if (this.scopeChoiceCount == 1) {
        //     component = "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";

        //     recipe = {
        //       presentationFormat: this.wildOne.catPresentationFormat,
        //       indicator: { markKey: "date", trophyKey: "value" },
        //       chart: {
        //         sets: [
        //           {
        //             // datasetLabel: "?????? VOC(???)",
        //             // datasetLabel: "?????? VOC(???/??????)",
        //             datasetLabel: "?????? VOC(???)",
        //             chartType: "line",
        //             markKey: "date",
        //             trophyKey: "value",
        //           },
        //           {
        //             // datasetLabel: "VOC(???)",
        //             // datasetLabel: "VOC(???/??????)",
        //             datasetLabel: "VOC(???)",
        //             chartType: "line",
        //             markKey: "date",
        //             trophyKey: "value",
        //           },
        //         ],
        //       },
        //     };
        //   } else {
        //     component = "DashboardViewCardTrendMonthMultiselection";
        //     recipe = {
        //       indicator: { markKey: "date", trophyKey: "value" },
        //       chart: {
        //         sets: [
        //           {
        //             // datasetLabel: "VOC(???)",
        //             // datasetLabel: "VOC(???/??????)",
        //             datasetLabel: "VOC(???)",
        //             chartType: "line",
        //             markKey: "date",
        //             trophyKey: "value",
        //           },
        //         ],
        //       },
        //     };
        //   }
        //   break;

        case "VOC|????????????":
        case "?????????VOC|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    // datasetLabel: "?????? VOC(???)",
                    // datasetLabel: "?????? VOC(???/??????)",
                    datasetLabel: "?????? VOC(???)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                  {
                    // datasetLabel: "VOC(???)",
                    // datasetLabel: "VOC(???/??????)",
                    datasetLabel: "VOC(???)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    // datasetLabel: "VOC(???)",
                    // datasetLabel: "VOC(???/??????)",
                    datasetLabel: "VOC(???)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }

          break;

        case "VOC|????????????":
        case "?????????VOC|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    // datasetLabel: "?????? VOC(???)",
                    datasetLabel: "?????? VOC(???/??????)",
                    // datasetLabel: "?????? VOC(???)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                  {
                    // datasetLabel: "VOC(???)",
                    datasetLabel: "VOC(???/??????)",
                    // datasetLabel: "VOC(???)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    // datasetLabel: "VOC(???)",
                    datasetLabel: "VOC(???/??????)",
                    // datasetLabel: "VOC(???)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }

          break;

        case "???????????????|????????????":
        case "???????????????|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????? ???????????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                  {
                    datasetLabel: "???????????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "???????????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }
          break;
        case "MDT|????????????":
        case "MDT|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "rsrp_bad_rate" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????? ?????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "rsrp_bad_rate",
                  },
                  {
                    datasetLabel: "?????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "rsrp_bad_rate",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "rsrp_bad_rate",
                  },
                ],
              },
            };
          }
          break;
        case "LTE???????????????|????????????":
        case "LTE???????????????|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            switch (this.wildOne.catProductService) {
              case "?????????":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "?????? RRC?????????",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_try",
                      },
                      {
                        datasetLabel: "RRC?????????",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_try",
                      },
                    ],
                  },
                };
                break;
              case "RRC?????????":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "?????? RRC?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                      {
                        datasetLabel: "RRC?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                    ],
                  },
                };
                break;
              case "PRB?????????":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "?????? ?????????",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "prbusage_mean",
                      },
                      {
                        datasetLabel: "PRB?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "prbusage_mean",
                      },
                    ],
                  },
                };
                break;
              // case "RRC?????????|PRB?????????":
              //   recipe = {
              //     indicator: { markKey: "date", trophyKey: "rrc_rate" },
              //     chart: {
              //       sets: [
              //         {
              //           datasetLabel: "?????? ?????????(%)",
              //           chartType: "line",
              //           markKey: "date",
              //           trophyKey: "rrc_rate",
              //         },
              //         {
              //           datasetLabel: "RRC?????????(%)",
              //           chartType: "line",
              //           markKey: "date",
              //           trophyKey: "rrc_rate",
              //         },
              //         {
              //           datasetLabel: "?????? ?????????(%)",
              //           chartType: "bar",
              //           markKey: "date",
              //           trophyKey: "prbusage_mean",
              //         },
              //         {
              //           datasetLabel: "PRB?????????(%)",
              //           chartType: "bar",
              //           markKey: "date",
              //           trophyKey: "prbusage_mean",
              //         },
              //       ],
              //     },
              //   };
              //   break;
              default:
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "?????? RRC?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                      {
                        datasetLabel: "RRC?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                    ],
                  },
                };
                break;
            }
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            switch (this.wildOne.catProductService) {
              case "?????????":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "RRC?????????",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_try",
                      },
                    ],
                  },
                };
                break;
              case "RRC?????????":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "RRC?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                    ],
                  },
                };
                break;
              case "PRB?????????":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "PRB?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "prbusage_mean",
                      },
                    ],
                  },
                };
                break;
              // case "RRC?????????|PRB?????????":
              //   recipe = {
              //     indicator: { markKey: "date", trophyKey: "rrc_rate" },
              //     chart: {
              //       sets: [
              //         {
              //           datasetLabel: "RRC?????????(%)",
              //           chartType: "line",
              //           markKey: "date",
              //           trophyKey: "rrc_rate",
              //         },
              //         {
              //           datasetLabel: "PRB?????????(%)",
              //           chartType: "bar",
              //           markKey: "date",
              //           trophyKey: "prbusage_mean",
              //         },
              //       ],
              //     },
              //   };
              //   break;
              default:
                recipe = {
                  indicator: { markKey: "date", trophyKey: "rrc_rate" },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "RRC?????????(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                    ],
                  },
                };
                break;
            }
          }
          break;
        case "VoLTE?????????|????????????":
        case "VoLTE?????????|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "cut_rate" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????? ?????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "cut_rate",
                  },
                  {
                    datasetLabel: "VoLTE ?????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "cut_rate",
                  },
                  {
                    datasetLabel: "?????? FC",
                    chartType: "bar",
                    markKey: "date",
                    trophyKey: "fc_373 + fc_9563",
                  },
                  {
                    datasetLabel: "FC373&9563",
                    chartType: "bar",
                    markKey: "date",
                    trophyKey: "fc_373 + fc_9563",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "VoLTE ?????????(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "cut_rate",
                  },
                ],
              },
            };
          }
          break;
        case "?????????????????????|_":
        case "?????????????????????|????????????":
          component = "DashboardViewCardBarChartWithTwoAxes";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        // case "???????????????????????????|_":
        //   component = "DashboardViewCardBarChartWithTwoAxes";
        //   recipe = {
        //     indicator: { markKey: "date", trophyKey: "value" },
        //   };
        //   break;
        case "???????????????????????????|_":
        case "???????????????????????????|????????????":
          component = "DashboardViewCardBarChartWithTwoAxes";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "???????????????????????????|????????????":
        case "???????????????????????????|????????????":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????? ?????????",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "sum_cnt",
                  },
                  {
                    datasetLabel: "?????????",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "sum_cnt",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????????",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "sum_cnt",
                  },
                ],
              },
            };
          }

          break;

        // case "??????????????????|_":
        //   component = "DashboardViewCardBarChartWithTwoAxes";
        //   recipe = {
        //     indicator: { markKey: "date", trophyKey: "value" },
        //   };
        //   break;
        case "??????????????????|_":
        case "??????????????????|????????????":
          component = "DashboardViewCardBarChartWithTwoAxes";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        // case "??????????????????|????????????":
        //   component = "DashboardViewCardTrendSubscrDataUsage";
        //   recipe = {
        //     indicator: { markKey: "date", trophyKey: "value" },
        //   };
        //   break;

        case "??????????????????|????????????":
          if (this.scopeChoiceCount == 1) {
            // component = "DashboardViewCardTrendSubscrDataUsage";

            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????? ?????????(GB)",
                    chartType: "line",
                    markKey: "date",
                    // trophyKey: "sum_5g_data",
                    trophyKey: "value",
                  },
                  {
                    datasetLabel: "?????????(GB)",
                    chartType: "line",
                    markKey: "date",
                    // trophyKey: "sum_5g_data",
                    trophyKey: "value",
                  },
                ],
              },
            };
          } else {
            component = "DashboardViewCardTrendChart4MultiDataSeries";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "?????? ?????????(GB)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }

          break;

        case "VOC|Worst?????????":
        case "?????????VOC|Worst?????????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;

        case "VOC|Worst??????":
        case "?????????VOC|Worst??????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "VoLTE?????????|Worst?????????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "cut_rate" },
          };
          break;
        case "VoLTE?????????|Worst??????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "cut_rate" },
          };
          break;
        case "???????????????|Worst?????????":
        case "???????????????|Worst?????????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "???????????????|Worst??????":
          // case "???????????????|????????????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "MDT|Worst?????????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "rsrp_bad_rate" },
          };
          break;
        case "LTE???????????????|Worst?????????":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "rrc_rate" },
          };
          break;
        default:
          break;
      }
      return {
        component,
        recipe,
      };
    },
    wildOneTitledAndCaptionedUniformly: function () {
      // let somethingMore =
      //   this.scopeChoiceCount == 1
      //     ? ""
      //     : ", " + this.onePick.recipe.chart.sets[0].datasetLabel;

      return {
        ...this.wildOne,
        // ...this.titleAndCaptionAsDefault(this.wildOne, somethingMore),
        ...this.titleAndCaptionAsDefault(
          this.wildOne
          // false
          // 'this.onepick.recipe.chart.sets[0].datasetLabel'
        ),
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
  },
};
</script>
<style lang=""></style>
