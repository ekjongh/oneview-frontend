<template>
  <LoadingSpinner
    v-if="!fetched & true"
    :style="{
      height: wildOne.title !== '' ? cardHight + 'px' : '400px',
    }"
    :allows-slot_="mode2EditCBProfileReg"
    :text="wildOne.title + '...'"
    allowsSlot
  >
    <template v-slot:html>
      <div
        class="d-flex justify-space-between align-end font-weight-black text-no-wrap text-h5 text-left ma-0 pa-0"
        :style="{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: 2,
          borderStyle: 'none',
        }"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-btn
                :disabled="opensDrawer4CellFilter"
                :elevation="hover ? 4 : 0"
                v-bind="attrs"
                v-on="on"
                :color="hover ? 'indigo' : 'rgba(133, 217, 255, 1)'"
                :outlined="hover"
                class="pa-0 mr-2"
                min-width="10px"
                height="32px"
                tile
                @click="
                  () => {
                    hctef(true);
                  }
                "
              ></v-btn>
            </v-hover>
          </template>
          <span> 새로고침 </span>
        </v-tooltip>
        <div>{{ wildOne.title }}</div>
      </div>
      <v-progress-circular
        :size="50"
        :width="2"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </template>
  </LoadingSpinner>

  <v-skeleton-loader
    v-else-if="!fetched"
    boilerplate_
    tile
    :height="wildOne.title !== '' ? cardHight : '400px'"
    type="image, image, image"
    :style="{ color: 'transparent', backgroundColor: 'transparent' }"
  ></v-skeleton-loader>

  <v-card
    v-else
    class="pa-0 ma-0"
    flat
    tile
    :height="wildOne.title !== '' ? cardHight : '400px'"
  >
    <div class="pa-0 ma-0">
      <v-card
        v-if="wildOne.title !== ''"
        v_-if="wildOne.title !== '' && !opensModalWindowToShowCardBigger"
        class="d-flex justify-space-between align-center pa-0 pr-4 ma-0"
        flat
        tile
      >
        <div
          class="d-flex justify-space-between align-end font-weight-black text-no-wrap text-h5 text-left ma-0 pa-0"
        >
          <v-tooltip v-if="!isOnModal" right>
            <template v-slot:activator="{ on, attrs }">
              <v-hover v-slot="{ hover }">
                <v-btn
                  :disabled="opensDrawer4CellFilter"
                  :elevation="hover ? 4 : 0"
                  v-bind="attrs"
                  v-on="on"
                  :color="hover ? 'indigo' : 'rgba(133, 217, 255, 1)'"
                  :outlined="hover"
                  class="pa-0 mr-2"
                  min-width="10px"
                  height="32px"
                  tile
                  @click="
                    () => {
                      hctef(true);
                    }
                  "
                ></v-btn>
              </v-hover>
            </template>
            <span>
              새로고침
              <!-- {{ isOnModal }} -->
            </span>
          </v-tooltip>
          <div :class="isOnModal ? 'mt-n1' : ''">{{ wildOne.title }}</div>
        </div>
      </v-card>
      <!-- <div
        v-else
        class="d-flex justify-start align-end font-weight-black text-no-wrap text-h5 text-left ma-0 pa-0"
      >
        <v-card
          :disabled="opensDrawer4CellFilter"
          :elevation="hover ? 4 : 0"
          v-bind="attrs"
          v-on="on"
          :color="
            opensModalWindowToShowCardBigger
              ? 'white'
              : 'rgba(133, 217, 255, 1)'
          "
          :outlined="hover"
          class="pa-0 mr-2"
          min-width="10px"
          height="32px"
          tile
        ></v-card>
        <div>{{ wildOne.title }}</div>
      </div> -->
      <v-list-item-content class="text-no-wrap pa-0 mt_-n2">
        <div
          v-if="wildOne.caption !== ''"
          class="d-flex justify-space-around align-center pa-0 ma-0"
        >
          <v-slide-x-transition v-if="!opensModalWindowToShowCardBigger">
            <div
              class="yellow_ d-flex flex-nowrap"
              v-show="hoversOnCell"
              :style="{
                opacity:
                  hoversOnCell &&
                  !opensDrawer4CellFilter &&
                  !mode2EditCBProfileReg
                    ? 1
                    : 0,
              }"
            >
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <v-card
                      class="mr-1"
                      :elevation="hover && !opensDrawer4CellFilter ? 4 : 0"
                      :style="{
                        padding: '1px',
                        borderRadius: '50%',
                      }"
                    >
                      <v-icon
                        small_
                        :disabled="opensDrawer4CellFilter"
                        v-bind="attrs"
                        v-on="on"
                        v-ripple
                        @click="
                          () => {
                            downloadDataInExcelFormat();
                          }
                        "
                        color="green"
                      >
                        mdi-microsoft-excel
                      </v-icon>
                    </v-card>
                  </v-hover>
                </template>
                <span>데이터 내려받기</span>
              </v-tooltip>
              <v-tooltip
                v-if="
                  !noTipJustAMoment &&
                  (couldShowCardBigger || opensModalWindowToShowCardBigger)
                "
                right
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <v-card
                      class="mr-1"
                      :elevation="hover && !opensDrawer4CellFilter ? 4 : 0"
                      :style="{
                        padding: '1px',
                        borderRadius: '50%',
                      }"
                    >
                      <v-icon
                        small_
                        :disabled="opensDrawer4CellFilter"
                        v-bind="attrs"
                        v-on="on"
                        v-ripple
                        @click.stop="
                          handleClick2Emit_TOGGLE_WHETHER_opensModalWindowToShowCardBigger
                        "
                        color="light-blue"
                      >
                        mdi-resize
                        <!-- mdi-magnify-expand -->
                        <!-- mdi-fullscreen -->
                      </v-icon>
                    </v-card>
                  </v-hover>
                </template>
                <span>
                  <!-- 모달 창 보기 -->
                  <!-- 창 안에서 차트 크게 -->
                  <!-- 모달창 차트 보기 -->
                  <!-- 모달창에서 차트 보기 -->
                  <!-- 차트를 모달창에 -->
                  모달창에서 차트 보기
                </span>
              </v-tooltip>
              <!-- mdi-fit-to-screen-outline -->
              <!-- mdi-overscan -->
              <!-- mdi-monitor-screenshot -->
              <!-- mdi-fit-to-screen -->
              <!-- mdi-fullscreen -->
              <!-- mdi-monitor -->
              <!-- mdi-monitor-small -->
              <!-- mdi-rectangle-outline -->
              <!-- mdi-resize -->
              <!-- mdi-magnify-expand -->
            </div>
          </v-slide-x-transition>
          <v-list-item-title
            class="text-caption font-weight-bold text-right mr-10"
            :style="{
              paddingTop: '10px',
              whiteSpace: 'nowrap',
              height: '35px',
            }"
          >
            {{ wildOne.caption }}
          </v-list-item-title>

          <div
            class="text-no-wrap text-caption font-italic font-weight-bold text--disabled pt-1 pr-3"
          >
            {{ wildOne.dates }}
            {{
              wildOne.dates.substring(
                wildOne.dates.length - 2,
                wildOne.dates.length
              ) == "주간"
                ? "~ " +
                  this.makeData4StartEndTimeArgs(
                    this.wildOne.dates,
                    this.wildOne.catIndicator
                  ).yyyyMMddHyphenedEnd
                : ""
            }}
            {{
              wildOne.dates == "최근갱신일"
                ? " " +
                  this.makeData4StartEndTimeArgs(
                    this.wildOne.dates,
                    this.wildOne.catIndicator
                  ).yyyyMMddHyphenedEnd
                : ""
            }}
          </div>
        </div>
      </v-list-item-content>

      <BarChart
        v-if="fetched && !isBarChartBased && chartLabelsThroughout.length == 1"
        title=""
        :labels="chartLabelsThroughout"
        :datasets="chartDatasets4SingleDate"
        class="elevation-0 pa-0"
        :style="{
          marginTop: `-30px`,
          height: chartHight,
        }"
        legendPosition="bottom"
        :usesPointStyle4LegendItem="!false"
        :scales="{
          yAxisLeft: {
            type: 'linear',
            position: 'left',
          },
        }"
      />

      <LineChart
        v-if="
          fetched &&
          !isBarChartBased &&
          chartLabelsThroughout.length !== 14 &&
          chartLabelsThroughout.length !== 1
        "
        title=""
        :labels="chartLabelsThroughout"
        :datasets="chartDatasetsThroughout"
        class="elevation-0 pa-0"
        :style="{
          marginTop: `-30px`,
          height: chartHight,
        }"
        legendPosition="bottom"
        :usesPointStyle4LegendItem="!false"
        :scales="
          this.recipe.chart.sets.length == 4
            ? {
                yAxisLeft: {
                  type: 'linear',
                  position: 'left',
                },
                yAxisRight: {
                  type: 'linear',
                  position: 'right',
                  min: chartInputs.min,
                  max: chartInputs.max,
                  ticks: {
                    stepSize: chartInputs.stepSize,
                  },
                },
              }
            : {
                yAxisLeft: {
                  type: 'linear',
                  position: 'left',
                },
              }
        "
      />

      <BarChart
        v-if="
          fetched &&
          isBarChartBased &&
          chartInputs.stepSize > 0 &&
          chartDatasets.length > 0 &&
          chartLabels4LastWeekDates.length > 0 &&
          chartLabelsThroughout.length !== 14
        "
        title=""
        :labels="chartLabelsThroughout"
        :datasets="chartDatasetsThroughout"
        class="elevation-0 pa-0"
        :style="{
          marginTop: `-30px`,
          height: chartHight,
        }"
        legendPosition="bottom"
        :usesPointStyle4LegendItem="!false"
        :scales="{
          yAxisLeft: {
            type: 'linear',
            position: 'left',
          },
          yAxisRight: {
            type: 'linear',
            position: 'right',
            min: chartInputs.min,
            max: chartInputs.max,
            ticks: {
              stepSize: chartInputs.stepSize,
            },
          },
        }"
      />

      <LineChart
        v-if="fetched && !isBarChartBased && chartLabelsThroughout.length == 14"
        title=""
        :labels="chartLabels4LastWeekDates"
        :datasets="chartDatasets"
        class="elevation-0 pa-0"
        :style="{
          marginTop: `-30px`,
          height: chartHight,
        }"
        legendPosition="bottom"
        :usesPointStyle4LegendItem="!false"
        :scales="
          this.recipe.chart.sets.length == 4
            ? {
                yAxisLeft: {
                  type: 'linear',
                  position: 'left',
                },
                yAxisRight: {
                  type: 'linear',
                  position: 'right',
                  min: chartInputs.min,
                  max: chartInputs.max,
                  ticks: {
                    stepSize: chartInputs.stepSize,
                  },
                },
              }
            : {
                yAxisLeft: {
                  type: 'linear',
                  position: 'left',
                },
              }
        "
      />

      <BarChart
        v-if="
          fetched &&
          isBarChartBased &&
          chartInputs.stepSize > 0 &&
          chartDatasets.length > 0 &&
          chartLabels4LastWeekDates.length > 0 &&
          chartLabelsThroughout.length == 14
        "
        title=""
        :labels="chartLabels4LastWeekDates"
        :datasets="chartDatasets"
        class="elevation-0 pa-0"
        :style="{
          marginTop: `-30px`,
          height: chartHight,
        }"
        legendPosition="bottom"
        :usesPointStyle4LegendItem="!false"
        :scales="{
          yAxisLeft: {
            type: 'linear',
            position: 'left',
          },
          yAxisRight: {
            type: 'linear',
            position: 'right',
            min: chartInputs.min,
            max: chartInputs.max,
            ticks: {
              stepSize: chartInputs.stepSize,
            },
          },
        }"
      />
    </div>
  </v-card>
</template>

<script>
import * as XLSX from "xlsx";
import { bus } from "@/event-bus";
import pattern from "patternomaly";
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";

import LoadingSpinner from "@/components/misc/LoadingSpinner.vue";

import LineChart from "@/components/chart/LineChart.vue";
import BarChart from "@/components/chart/BarChart.vue";
export default {
  mixins: [DashboardViewMixin],
  components: {
    LoadingSpinner,

    LineChart,
    BarChart,
  },
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
    recipe: {},
  },

  data: () => ({
    responseMessage: "",
    noTipJustAMoment: false,
    doesNotCloseThisTime: false,

    // opensDrawer4CellFilter: false,
    group: null,
    baseDate: null,
    responseData: null,
  }),

  methods: {
    handleClick2Emit_TOGGLE_WHETHER_opensModalWindowToShowCardBigger() {
      let cardHight4ModalWindow = document.documentElement.clientHeight - 140;
      if (!this.couldShowCardBigger) {
        cardHight4ModalWindow = this.cardHight;
      }

      bus.$emit("TOGGLE_WHETHER_opensModalWindowToShowCardBigger", {
        // activeCellFilterKind: "card",
        cardIndex4ModalWindow: this.cardIndex,
        // cardHight4ModalWindow: (screen.availHeight * 2) / 3,
        // cardHight4ModalWindow: (document.documentElement.clientHeight * 2) / 3,
        cardHight4ModalWindow: cardHight4ModalWindow,
      });
      // alert(screen.availHeight);
      // alert(cardHight4ModalWindow);
      this.noTipJustAMoment = true;
      setTimeout(() => {
        this.noTipJustAMoment = false;
      }, 100);
    },
    downloadDataInExcelFormat() {
      var workBook = XLSX.utils.book_new();
      // var sheetData = XLSX.utils.json_to_sheet(this.api_v1_voc_worst);
      // var sheetData = XLSX.utils.json_to_sheet(this.chartDatasetsThroughout);
      // var sheetData = XLSX.utils.json_to_sheet(this.chartDataThroughout);
      var sheetData = XLSX.utils.json_to_sheet(this.responseData);

      let filename = this.getFilename();

      // XLSX.utils.book_append_sheet(workBook, sheetData, filename); // 시트명 글자 수 제한
      XLSX.utils.book_append_sheet(workBook, sheetData);

      XLSX.writeFile(workBook, filename + ".xlsx");
    },

    // handleClickApply() {
    //   this.opensDrawer4CellFilter = false;
    // },

    // handleClickCancel() {
    //   this.opensDrawer4CellFilter = false;
    // },
    handleSayThisClickIsNotOutside() {
      this.doesNotCloseThisTime = true;
    },

    async hctef(shouldRecache = false) {
      let catIndicator = this.wildOne.catIndicator;
      let catPresentationFormat = this.wildOne.catPresentationFormat;
      let catProductService = this.wildOne.catProductService;
      let catScope = this.wildOne.catScope;
      let limit = null;
      let group = this.wildOne.group;
      let dates = this.wildOne.dates;
      this.baseDate = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      ).end;
      let keyURI = this.makeKeyURI(
        catIndicator,
        catPresentationFormat,
        catProductService,
        catScope,
        limit,
        group,
        dates
      );

      let keyURI2Cache = keyURI; //todo: 여기에 keyURI에 업데이트시각관리테이블에서 읽어온 갱신시각을 붙여 keyURI2Cache를 명명한다

      let res = null;

      if (this.removesCachedItemWithEachBannerOrCardMounted || shouldRecache) {
        localStorage.removeItem(keyURI2Cache);
      }
      let cached = "";
      try {
        cached = JSON.parse(localStorage.getItem(keyURI2Cache)) || "";
      } catch (error) {
        cached = "";
      }
      if (cached !== "") {
        res = cached;
      } else {
        // console.log("request");
        // res = await this.$axios
        // .get(uri)
        res = await this.soixa
          // .get(keyURI, { timeout: 0, baseURL: this.prefixURL })
          .get(keyURI)
          .then(function (response) {
            localStorage.setItem(keyURI2Cache, JSON.stringify(response.data));
            // this.responseMessage = response.message;
            // console.log("response: ", response.message);
            return response.data;
          })
          .catch(function (error) {
            console.log("error: ", error);
            return null;
          });
      }

      if (res.length !== 0 && this.recipe.chart.sets.length == 4) {
        res.forEach((element) => {
          element["fc_373 + fc_9563"] = element.fc_373 + element.fc_9563;
        });
      }

      this.responseData = res;
    },
  },

  watch: {
    wildOne: function () {
      this.hctef();
    },

    // mode2EditCBProfileReg: function (n) {
    //   if (n) {
    //     this.opensDrawer4CellFilter = false;
    //   }
    // },
  },
  computed: {
    multiplier4UnitConversion: function () {
      let multiplier = 1;
      switch (this.wildOne.catIndicator) {
        case "데이터사용량":
          multiplier = 1 / 1000000000;
          break;
        default:
          multiplier = 1;
          break;
      }
      return multiplier;
    },

    chartHight: function () {
      return this.cardHight - 30 + "px";
    },
    fetched: function () {
      return this.responseData !== null;
    },
    isBarChartBased: function () {
      let bingo = false;
      for (let index = 0; index < this.recipe.chart.sets.length; index++) {
        const element = this.recipe.chart.sets[index];
        if (element.chartType == "bar") {
          bingo = true;
          break;
        }
      }
      return bingo;
    },
    chartLabelsThroughout: function () {
      return this.getSequentialDates(
        this.makeData4StartEndTimeArgs(
          this.wildOne.dates,
          this.wildOne.catIndicator
        ).start,
        this.makeData4StartEndTimeArgs(
          this.wildOne.dates,
          this.wildOne.catIndicator
        ).end,
        this.wildOne.catPresentationFormat == "월별추이"
          ? this.date2LabelMonth
          : this.date2Label,
        this.wildOne.catPresentationFormat
      );
    },
    chartDataThroughout: function () {
      return this.hunt(
        this.responseData,
        this.recipe.chart.sets[0].markKey,
        this.recipe.chart.sets[0].trophyKey,
        this.getSequentialDates(
          this.makeData4StartEndTimeArgs(
            this.wildOne.dates,
            this.wildOne.catIndicator
          ).start,
          this.makeData4StartEndTimeArgs(
            this.wildOne.dates,
            this.wildOne.catIndicator
          ).end,
          this.wildOne.catPresentationFormat == "월별추이"
            ? this.date2yyyyMM
            : this.date2yyyyMMdd,
          this.wildOne.catPresentationFormat
        ),
        this.multiplier4UnitConversion
      );
    },
    chartDataThroughout4FCSum: function () {
      return this.hunt(
        this.responseData,
        this.recipe.chart.sets[2].markKey,

        this.recipe.chart.sets[2].trophyKey,
        this.getSequentialDates(
          this.makeData4StartEndTimeArgs(
            this.wildOne.dates,
            this.wildOne.catIndicator
          ).start,
          this.makeData4StartEndTimeArgs(
            this.wildOne.dates,
            this.wildOne.catIndicator
          ).end,
          this.date2yyyyMMdd
        ),
        this.multiplier4UnitConversion
      );
    },
    chartDatasets4SingleDate: function () {
      return [
        {
          yAxisID: "yAxisLeft",
          label: this.recipe.chart.sets[1].datasetLabel,
          data: this.chartDataThroughout,
          type: "bar",

          backgroundColor: "#004F74",
          borderColor: "#004F74",
          pointBackgroundColor: "#004F74",

          pointStyle: "rect",
        },
      ];
    },

    chartDatasetsThroughout: function () {
      let datasets =
        this.recipe.chart.sets.length == 4
          ? [
              {
                yAxisID: "yAxisLeft",
                label: this.recipe.chart.sets[1].datasetLabel,
                data: this.chartDataThroughout,
                type: this.recipe.chart.sets[1].chartType,
                backgroundColor:
                  this.recipe.chart.sets[1].chartType == "line"
                    ? "transparent"
                    : "#004F74",
                borderColor: "#004F74",
                pointBackgroundColor: "#004F74",
                pointStyle: "line",
                hoverRadius: 50,
                rotation: this.chartLabelsThroughout.length == 1 ? 0 : 90,
                pointRadius: this.chartLabelsThroughout.length == 1 ? 50 : 2,
                lineTension: 0,
              },

              {
                yAxisID: "yAxisRight",
                label: this.recipe.chart.sets[3].datasetLabel,
                data: this.chartDataThroughout4FCSum,
                type: this.recipe.chart.sets[3].chartType,

                backgroundColor:
                  this.recipe.chart.sets[3].chartType == "line"
                    ? "transparent"
                    : "#004F74",
                borderColor: "#004F74",
                pointBackgroundColor: "#004F74",

                pointStyle: "rect",
                pointRadius: 2,
                lineTension: 0,
              },
            ]
          : [
              {
                yAxisID: "yAxisLeft",
                label: this.recipe.chart.sets[1].datasetLabel,
                data: this.chartDataThroughout,
                type: this.recipe.chart.sets[1].chartType,
                backgroundColor:
                  this.recipe.chart.sets[1].chartType == "line"
                    ? "transparent"
                    : "#004F74",
                borderColor: "#004F74",
                pointBackgroundColor: "#004F74",
                pointStyle: "line",
                hoverRadius: 50,
                rotation: 90,
                pointRadius: 2,
                lineTension: 0,
              },
            ];

      return datasets;
    },

    chartLabels4LastWeekDates: function () {
      return this.getSequentialDates(
        this.addDays(this.baseDate, -6),
        this.baseDate,
        this.date2Label
      );
    },

    chartData4LastWeekDates: function () {
      return this.hunt(
        this.responseData,
        this.recipe.chart.sets[0].markKey,

        this.recipe.chart.sets[0].trophyKey,
        this.getSequentialDates(
          this.addDays(this.baseDate, -13),
          this.addDays(this.baseDate, -7),
          this.date2yyyyMMdd
        ),
        this.multiplier4UnitConversion
      );
    },
    chartData4ThisWeekDates: function () {
      return this.hunt(
        this.responseData,
        this.recipe.chart.sets[1].markKey,

        this.recipe.chart.sets[1].trophyKey,
        this.getSequentialDates(
          this.addDays(this.baseDate, -6),
          this.baseDate,
          this.date2yyyyMMdd
        ),
        this.multiplier4UnitConversion
      );
    },

    chartData4LastWeekDates4FCSum: function () {
      return this.hunt(
        this.responseData,
        this.recipe.chart.sets[2].markKey,

        this.recipe.chart.sets[2].trophyKey,
        this.getSequentialDates(
          this.addDays(this.baseDate, -13),
          this.addDays(this.baseDate, -7),
          this.date2yyyyMMdd
        ),
        this.multiplier4UnitConversion
      );
    },
    chartData4ThisWeekDates4FCSum: function () {
      return this.hunt(
        this.responseData,
        this.recipe.chart.sets[3].markKey,

        this.recipe.chart.sets[3].trophyKey,
        this.getSequentialDates(
          this.addDays(this.baseDate, -6),
          this.baseDate,
          this.date2yyyyMMdd
        ),
        this.multiplier4UnitConversion
      );
    },
    chartInputs: function () {
      return this.getModerateScale([
        ...this.chartData4LastWeekDates4FCSum,
        ...this.chartData4ThisWeekDates4FCSum,
      ]);
    },
    chartDatasets: function () {
      let datasets =
        this.recipe.chart.sets.length == 4
          ? [
              {
                yAxisID: "yAxisLeft",
                label: this.recipe.chart.sets[0].datasetLabel,
                data: this.chartData4LastWeekDates,
                type: this.recipe.chart.sets[0].chartType,
                backgroundColor:
                  this.recipe.chart.sets[0].chartType == "line"
                    ? "transparent"
                    : pattern.draw("diagonal-right-left", "#0092D6"),
                borderColor: "#0092D6",
                pointBackgroundColor: "#0092D6",
                pointStyle: "dash",
                hoverRadius: 50,
                rotation: 90,
                pointRadius: 2,
                lineTension: 0,
                borderDash: [0, 6],
                borderCapStyle: "round",
              },
              {
                yAxisID: "yAxisLeft",
                label: this.recipe.chart.sets[1].datasetLabel,
                data: this.chartData4ThisWeekDates,
                type: this.recipe.chart.sets[1].chartType,
                backgroundColor:
                  this.recipe.chart.sets[1].chartType == "line"
                    ? "transparent"
                    : "#004F74",
                borderColor: "#004F74",
                pointBackgroundColor: "#004F74",
                pointStyle: "line",
                hoverRadius: 50,
                rotation: 90,
                pointRadius: 2,
                lineTension: 0,
              },
              {
                yAxisID: "yAxisRight",
                label: this.recipe.chart.sets[2].datasetLabel,
                data: this.chartData4LastWeekDates4FCSum,
                type: this.recipe.chart.sets[2].chartType,

                backgroundColor:
                  this.recipe.chart.sets[2].chartType == "line"
                    ? "transparent"
                    : pattern.draw("diagonal-right-left", "#0092D6"),
                borderColor: "#0092D6",
                pointBackgroundColor: "#0092D6",

                pointStyle: "rect",
                pointRadius: 2,
                lineTension: 0,
              },
              {
                yAxisID: "yAxisRight",
                label: this.recipe.chart.sets[3].datasetLabel,
                data: this.chartData4ThisWeekDates4FCSum,
                type: this.recipe.chart.sets[3].chartType,

                backgroundColor:
                  this.recipe.chart.sets[3].chartType == "line"
                    ? "transparent"
                    : "#004F74",
                borderColor: "#004F74",
                pointBackgroundColor: "#004F74",

                pointStyle: "rect",
                pointRadius: 2,
                lineTension: 0,
              },
            ]
          : [
              {
                yAxisID: "yAxisLeft",
                label: this.recipe.chart.sets[0].datasetLabel,
                data: this.chartData4LastWeekDates,
                type: this.recipe.chart.sets[0].chartType,
                backgroundColor:
                  this.recipe.chart.sets[0].chartType == "line"
                    ? "transparent"
                    : pattern.draw("diagonal-right-left", "#0092D6"),
                borderColor: "#0092D6",
                pointBackgroundColor: "#0092D6",
                pointStyle: "dash",
                hoverRadius: 50,
                rotation: 90,
                pointRadius: 2,
                lineTension: 0,
                borderDash: [0, 6],
                borderCapStyle: "round",
              },
              {
                yAxisID: "yAxisLeft",
                label: this.recipe.chart.sets[1].datasetLabel,
                data: this.chartData4ThisWeekDates,
                type: this.recipe.chart.sets[1].chartType,
                backgroundColor:
                  this.recipe.chart.sets[1].chartType == "line"
                    ? "transparent"
                    : "#004F74",
                borderColor: "#004F74",
                pointBackgroundColor: "#004F74",
                pointStyle: "line",
                hoverRadius: 50,
                rotation: 90,
                pointRadius: 2,
                lineTension: 0,
              },
            ];

      return datasets;
    },
  },

  beforeMount() {},
  created() {},
  mounted() {
    if (this.wildOne.catIndicator == "VoLTE절단율") {
      setTimeout(() => {
        this.hctef();
      }, 0);
      return;
    }
    this.hctef();
  },
};
</script>

<style scoped>
.v-btn {
  background-color: rgba(133, 217, 255, 1) !important;
}
/* .v-btn:before {
  opacity: 0 !important;
} */
/* .v-ripple__container {
  opacity: 0 !important;
} */
</style>
