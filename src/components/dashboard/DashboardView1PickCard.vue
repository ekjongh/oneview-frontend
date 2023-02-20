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
        // case "VOC|월별추이":
        // case "천명당VOC|월별추이":
        //   if (this.scopeChoiceCount == 1) {
        //     component = "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";

        //     recipe = {
        //       presentationFormat: this.wildOne.catPresentationFormat,
        //       indicator: { markKey: "date", trophyKey: "value" },
        //       chart: {
        //         sets: [
        //           {
        //             // datasetLabel: "전주 VOC(‰)",
        //             // datasetLabel: "전주 VOC(건/천명)",
        //             datasetLabel: "전주 VOC(건)",
        //             chartType: "line",
        //             markKey: "date",
        //             trophyKey: "value",
        //           },
        //           {
        //             // datasetLabel: "VOC(‰)",
        //             // datasetLabel: "VOC(건/천명)",
        //             datasetLabel: "VOC(건)",
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
        //             // datasetLabel: "VOC(‰)",
        //             // datasetLabel: "VOC(건/천명)",
        //             datasetLabel: "VOC(건)",
        //             chartType: "line",
        //             markKey: "date",
        //             trophyKey: "value",
        //           },
        //         ],
        //       },
        //     };
        //   }
        //   break;

        case "VOC|일별추이":
        case "천명당VOC|일별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    // datasetLabel: "전주 VOC(‰)",
                    // datasetLabel: "전주 VOC(건/천명)",
                    datasetLabel: "전주 VOC(건)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                  {
                    // datasetLabel: "VOC(‰)",
                    // datasetLabel: "VOC(건/천명)",
                    datasetLabel: "VOC(건)",
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
                    // datasetLabel: "VOC(‰)",
                    // datasetLabel: "VOC(건/천명)",
                    datasetLabel: "VOC(건)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }

          break;

        case "VOC|월별추이":
        case "천명당VOC|월별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    // datasetLabel: "전주 VOC(‰)",
                    datasetLabel: "전주 VOC(건/천명)",
                    // datasetLabel: "전주 VOC(건)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                  {
                    // datasetLabel: "VOC(‰)",
                    datasetLabel: "VOC(건/천명)",
                    // datasetLabel: "VOC(건)",
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
                    // datasetLabel: "VOC(‰)",
                    datasetLabel: "VOC(건/천명)",
                    // datasetLabel: "VOC(건)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }

          break;

        case "오프로딩율|월별추이":
        case "오프로딩율|일별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "전주 오프로드율(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                  {
                    datasetLabel: "오프로드율(%)",
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
                    datasetLabel: "오프로드율(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }
          break;
        case "MDT|월별추이":
        case "MDT|일별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "rsrp_bad_rate" },
              chart: {
                sets: [
                  {
                    datasetLabel: "전주 불량률(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "rsrp_bad_rate",
                  },
                  {
                    datasetLabel: "불량률(%)",
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
                    datasetLabel: "불량률(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "rsrp_bad_rate",
                  },
                ],
              },
            };
          }
          break;
        case "LTE기지국통계|월별추이":
        case "LTE기지국통계|일별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            switch (this.wildOne.catProductService) {
              case "트래픽":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "전주 RRC성공률",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_try",
                      },
                      {
                        datasetLabel: "RRC성공률",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_try",
                      },
                    ],
                  },
                };
                break;
              case "RRC성공률":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "전주 RRC성공률(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                      {
                        datasetLabel: "RRC성공률(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                    ],
                  },
                };
                break;
              case "PRB사용율":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "전주 사용량",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "prbusage_mean",
                      },
                      {
                        datasetLabel: "PRB사용율(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "prbusage_mean",
                      },
                    ],
                  },
                };
                break;
              // case "RRC성공률|PRB부하율":
              //   recipe = {
              //     indicator: { markKey: "date", trophyKey: "rrc_rate" },
              //     chart: {
              //       sets: [
              //         {
              //           datasetLabel: "전주 성공률(%)",
              //           chartType: "line",
              //           markKey: "date",
              //           trophyKey: "rrc_rate",
              //         },
              //         {
              //           datasetLabel: "RRC성공률(%)",
              //           chartType: "line",
              //           markKey: "date",
              //           trophyKey: "rrc_rate",
              //         },
              //         {
              //           datasetLabel: "전주 부하율(%)",
              //           chartType: "bar",
              //           markKey: "date",
              //           trophyKey: "prbusage_mean",
              //         },
              //         {
              //           datasetLabel: "PRB부하율(%)",
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
                        datasetLabel: "전주 RRC성공률(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                      {
                        datasetLabel: "RRC성공률(%)",
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
              case "트래픽":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "RRC성공률",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_try",
                      },
                    ],
                  },
                };
                break;
              case "RRC성공률":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "RRC성공률(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "rrc_rate",
                      },
                    ],
                  },
                };
                break;
              case "PRB사용율":
                recipe = {
                  indicator: { markKey: "date", trophyKey: trophyKey },
                  chart: {
                    sets: [
                      {
                        datasetLabel: "PRB사용율(%)",
                        chartType: "line",
                        markKey: "date",
                        trophyKey: "prbusage_mean",
                      },
                    ],
                  },
                };
                break;
              // case "RRC성공률|PRB부하율":
              //   recipe = {
              //     indicator: { markKey: "date", trophyKey: "rrc_rate" },
              //     chart: {
              //       sets: [
              //         {
              //           datasetLabel: "RRC성공률(%)",
              //           chartType: "line",
              //           markKey: "date",
              //           trophyKey: "rrc_rate",
              //         },
              //         {
              //           datasetLabel: "PRB부하율(%)",
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
                        datasetLabel: "RRC성공률(%)",
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
        case "VoLTE절단율|월별추이":
        case "VoLTE절단율|일별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "cut_rate" },
              chart: {
                sets: [
                  {
                    datasetLabel: "전주 절단률(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "cut_rate",
                  },
                  {
                    datasetLabel: "VoLTE 절단률(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "cut_rate",
                  },
                  {
                    datasetLabel: "전주 FC",
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
                    datasetLabel: "VoLTE 절단률(%)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "cut_rate",
                  },
                ],
              },
            };
          }
          break;
        case "단말별가입자수|_":
        case "단말별가입자수|단말비교":
          component = "DashboardViewCardBarChartWithTwoAxes";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        // case "분석상품별가입자수|_":
        //   component = "DashboardViewCardBarChartWithTwoAxes";
        //   recipe = {
        //     indicator: { markKey: "date", trophyKey: "value" },
        //   };
        //   break;
        case "분석상품별가입자수|_":
        case "분석상품별가입자수|상품비교":
          component = "DashboardViewCardBarChartWithTwoAxes";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "분석상품별가입자수|월별추이":
        case "분석상품별가입자수|일별추이":
          if (this.scopeChoiceCount == 1) {
            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "전주 고객수",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "sum_cnt",
                  },
                  {
                    datasetLabel: "고객수",
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
                    datasetLabel: "고객수",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "sum_cnt",
                  },
                ],
              },
            };
          }

          break;

        // case "데이터사용량|_":
        //   component = "DashboardViewCardBarChartWithTwoAxes";
        //   recipe = {
        //     indicator: { markKey: "date", trophyKey: "value" },
        //   };
        //   break;
        case "데이터사용량|_":
        case "데이터사용량|상품비교":
          component = "DashboardViewCardBarChartWithTwoAxes";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        // case "데이터사용량|일별추이":
        //   component = "DashboardViewCardTrendSubscrDataUsage";
        //   recipe = {
        //     indicator: { markKey: "date", trophyKey: "value" },
        //   };
        //   break;

        case "데이터사용량|일별추이":
          if (this.scopeChoiceCount == 1) {
            // component = "DashboardViewCardTrendSubscrDataUsage";

            component =
              "DashboardViewCardTrendChart4SingleDataSeriesTwoWeeksComparisonIfPossible";
            recipe = {
              indicator: { markKey: "date", trophyKey: "value" },
              chart: {
                sets: [
                  {
                    datasetLabel: "전주 사용량(GB)",
                    chartType: "line",
                    markKey: "date",
                    // trophyKey: "sum_5g_data",
                    trophyKey: "value",
                  },
                  {
                    datasetLabel: "사용량(GB)",
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
                    datasetLabel: "전주 사용량(GB)",
                    chartType: "line",
                    markKey: "date",
                    trophyKey: "value",
                  },
                ],
              },
            };
          }

          break;

        case "VOC|Worst기지국":
        case "천명당VOC|Worst기지국":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;

        case "VOC|Worst단말":
        case "천명당VOC|Worst단말":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "VoLTE절단율|Worst기지국":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "cut_rate" },
          };
          break;
        case "VoLTE절단율|Worst단말":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "cut_rate" },
          };
          break;
        case "오프로딩율|Worst기지국":
        case "오프로딩율|Worst읍면동":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "오프로딩율|Worst단말":
          // case "오프로딩율|주요단말":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "value" },
          };
          break;
        case "MDT|Worst기지국":
          component = "DashboardViewCardWorst";
          recipe = {
            indicator: { markKey: "date", trophyKey: "rsrp_bad_rate" },
          };
          break;
        case "LTE기지국통계|Worst기지국":
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
