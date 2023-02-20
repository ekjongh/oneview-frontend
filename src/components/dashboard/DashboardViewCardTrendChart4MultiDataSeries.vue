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
        <div>
          {{ wildOne.title }}
        </div>
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
        class="red_ d-flex justify-space-between align-center pa-0 pr-4 ma-0"
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

      <v-list-item-content class="blue_ text-no-wrap pa-0 mt_-n2">
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
                        <!-- mdi-magnify-expand  -->
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
        v-if="fetched && !isBarChartBased && chartLabels.length == 1"
        title=""
        :labels="chartLabels"
        :datasets="chartDatasets"
        class="elevation-0 pa-0"
        :style="{
          marginTop: `-30px`,
          height: chartHight,
        }"
        legendPosition="bottom"
        :usesPointStyle4LegendItem="false"
        :scales="{
          yAxisLeft: {
            type: 'linear',
            position: 'left',
          },
        }"
      />
      <!-- <v-card dark class="ma-0 pa-0"> -->
      <LineChart
        v-if="fetched && !isBarChartBased && chartLabels.length !== 1"
        title=""
        :labels="chartLabels"
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
      <!-- </v-card> -->
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

      for (let index = 0; index < this.responseData.length; index++) {
        const element = this.responseData[index];
        var sheetData = XLSX.utils.json_to_sheet(element.data);
        XLSX.utils.book_append_sheet(
          workBook,
          sheetData,
          this.removeSpecialCharacters(element.title, "_")
        );
      }

      let filename = this.getFilename();
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
        // res = await this.$axios
        // .get(uri)
        res = await this.soixa
          // .get(keyURI, { timeout: 0, baseURL: this.prefixURL })
          .get(keyURI)
          .then(function (response) {
            localStorage.setItem(keyURI2Cache, JSON.stringify(response.data));
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
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
    // dataIsOutdated: function () {
    //   // 상대날짜이고,
    //   //     5분감시가 아닌 경우 (일, 월)
    //   //          1안
    //   //          캐시가 가지고 있는 최종일(최종분)이 Date.now()의 현재일과 다르면 (이는, keyURI(캐시이름)이 다른 경우) 기존 캐시지우고 요청 및 새로 캐시
    //   //          매 08분 38분에 무조건 요청하여 기존 캐시가 가지고 있는 데이터가 지금 조회한 데이터와 다른 경우, 캐시갱신
    //   //          2안
    //   //          매 5x+2분에 무조건 업데이트시각관리테이블을 요청하여, 업데이트시각관리테이블 캐시가 가지고 내용과 다르면 업데이트시각관리테이블 갱신
    //   //          캐시 이름 지을 때, keyURI+업데이트시가관리테이블에기록된최근업데이트시각으로 짓기.
    //   //          기존 캐시이름과 업데이트시가관리테이블에기록된최근업데이트시각부분만 이름이 다른지 확인하기 어려우니 24시에 모든 기존 캐시 제거
    //   //          이런식으로 업데이트시가관리테이블확인해 명명하면, 때맞추어 캐시이름이 달라지므로 (기존 캐시데이터가 없으므로) 기존 코드 그대로 배너/카드 현행화도 자동으로 이루어짐
    //   //     5분감시 경우
    //   //          매 5x+2분에 무조건 요청하여, 기존 캐시가 가지고 있는 데이터가 지금 조회한 데이터와 다른 경우, 캐시갱신

    //   return true;
    // },

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

    chartLabels: function () {
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

    chartDatasets: function () {
      let datasets = [];
      let hueOfHSV = 0;
      let saturationOfHSV = 255;
      let valueOfHSV = 255;
      let repetition = 0;

      let chartType =
        this.chartLabels.length == 1
          ? "bar"
          : this.recipe.chart.sets[0].chartType;
      this.responseData.forEach((x) => {
        let chartDataThroughout = this.hunt(
          x.data,
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

        let colorOfDataset = this.convertHSV2RGB(
          [hueOfHSV, saturationOfHSV, valueOfHSV],
          true
        );

        function getBGC4Banner(i, cnt = this.myCBProfileTmp.banners.length) {
          let gap = 128 / (cnt - 1);
          let r = 91 - gap * i;
          let g = 203 - gap * i;
          let b = 255 - gap * i;
          return `rgba(${r}, ${g}, ${b}, 1)`;
        }

        if (chartType == "bar" && this.responseData.length < 7) {
          colorOfDataset = getBGC4Banner(
            this.responseData.length - repetition - 1,
            this.responseData.length
          );
        }
        if (chartType == "line" && this.responseData.length < 3) {
          colorOfDataset = getBGC4Banner(
            this.responseData.length - repetition - 1,
            this.responseData.length
          );
        }

        let ds = {
          barThickness: this.responseData.length < 7 ? 70 : null,
          yAxisID: "yAxisLeft",
          // 이성현 수정- Card 단위표시 삭제를 위해 기존 코드 주석처리 후, "label: x.title"로 변경.
          // label: x.title,
          label:
            repetition < 1
              ? x.title + " " + this.recipe.chart.sets[0].datasetLabel
              : x.title,

          data: chartDataThroughout,
          type: chartType,

          backgroundColor:
            chartType == "line"
              ? "transparent"
              : pattern.draw(
                  this.patternKeys[repetition % this.patternKeys.length],
                  colorOfDataset
                ),
          borderColor: colorOfDataset,
          pointBackgroundColor: colorOfDataset,

          pointStyle:
            this.pointStyleKeys[repetition % this.pointStyleKeys.length],
          hoverRadius: 50,
          rotation: 90,
          pointRadius: 5,
          lineTension: 0,
        };
        datasets.push(ds);
        repetition = repetition + 1;
        hueOfHSV = hueOfHSV + 360 / this.responseData.length;
      });
      return datasets;
    },
  },

  beforeMount() {},
  created() {},
  mounted() {
    this.hctef();
    // setInterval(() => {
    //   console.log("-----------");
    //   this.hctef();
    // }, 10000);
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
