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
    min-width="600px"
    v-else
    class="pa-0 ma-0"
    flat
    tile
    :height="wildOne.title !== '' ? cardHight : '400px'"
  >
    <div class="pa-0 ma-0">
      <v-card
        v-if="wildOne.title !== ''"
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

          <!-- <v-speed-dial
            v-else
            class="red_"
            v-model="fab"
            direction_="bottom"
            direction="right"
            open-on-hover
            :transition="transition"
          >
            <template v-slot:activator>
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
                    >
                    </v-btn>
                  </v-hover>
                </template>
                <span> 새로고침 </span>
              </v-tooltip>
            </template>

            <div class="pt-16 ml-n6 yellow_">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <v-icon
                      class="ml-n4 pa-1 red_"
                      v-bind="attrs"
                      v-on="on"
                      v-ripple
                      @click="handleClick2Emit_TOGGLE_WHETHER_opensDrawer4CellFilter"
                      :elevation="hover ? 14 : 0"
                      color="indigo"
                    >
                      mdi-image-filter-vintage
                    </v-icon>
                  </v-hover>
                </template>
                <span>
                  {{ wildOneKind == "banner" ? "배너 설정" : "카드 설정" }}
                </span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-hover v-slot="{ hover }">
                    <v-icon
                      class_="pa-1"
                      class="ml-n4_ pa-1 red_"
                      v-bind="attrs"
                      v-on="on"
                      v-ripple
                      @click="() => {}"
                      :elevation="hover ? 14 : 0"
                      color="green"
                    >
                      mdi-microsoft-excel
                    </v-icon>
                  </v-hover>
                </template>
                <span>데이터 내려받기</span>
              </v-tooltip>
            </div>
          </v-speed-dial> -->

          <div :class="isOnModal ? 'mt-n1' : ''">{{ wildOne.title }}</div>
        </div>
      </v-card>

      <v-list-item-content class="text-no-wrap pa-0">
        <div
          v-if="wildOne.caption !== ''"
          class="d-flex justify-space-around align-center pa-0 ma-0"
        >
          <!-- <div
            :style="{
              opacity: hoversOnCell ? 1 : 0,
            }"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-icon
                    class="ml-n1 mr-1"
                    v-bind="attrs"
                    v-on="on"
                    v-ripple
                    @click="() => {}"
                    :elevation="hover ? 14 : 0"
                    color="green"
                  >
                    mdi-microsoft-excel
                  </v-icon>
                </v-hover>
              </template>
              <span>데이터 내려받기</span>
            </v-tooltip>
          </div> -->
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
                            // downloadDataInExcelFormat();
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

              <!-- <v-menu open-on-hover :rounded="0" bottom_ right_>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    small_
                    :disabled="opensDrawer4CellFilter"
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
                </template>

                <v-list class="ma-0 pa-0" dense>
                  <v-list-item class="ma-0 pa-0">
                    <v-icon class="px-2" color="green">
                      mdi-microsoft-excel
                    </v-icon>
                    <v-list-item-title class="pr-2">
                      데이터 내려받기
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="ma-0 pa-0">
                    <v-icon class="px-2" color="green">
                      mdi-microsoft-excel
                    </v-icon>
                    <v-list-item-title class="pr-2">
                      데이터 내려받기 ~300
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> -->

              <v-tooltip
                v-if="
                  false &&
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
              height: this.cardHight == 420 ? '40px' : '36px',
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

      <v-data-table
        disabled
        tile
        no-data-text="데이터가 없습니다"
        v-if="api_v1_voc_worst !== null"
        :caption_="wildOne.caption"
        :headers="tableHeaders"
        :items="tableItems"
        dense
        hide-default-footer
        :class="chartClassName"
        :style="{
          whiteSpace: 'nowrap',
        }"
        @dblclick:row="
          (event, { item }) => {
            event.preventDefault();
            if (!rowClickable) {
              return;
            }
            handleDblclickRow(event, { item });
          }
        "
      />
    </div>
  </v-card>
</template>

<script>
import * as XLSX from "xlsx";
import { bus } from "@/event-bus";
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";

import LoadingSpinner from "@/components/misc/LoadingSpinner.vue";

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
    // defaultBaseDate: {
    //   type: Date,
    //   default: new Date("2022-08-17"),
    // },
  },
  components: {
    LoadingSpinner,

    // DashboardView1PickBanner,
  },
  data: () => ({
    noTipJustAMoment: false,
    doesNotCloseThisTime: false,

    // opensDrawer4CellFilter: false,
    isSwalOpen: false,
    group: null,
    baseDate: null,
    api_v1_voc_worst: null,
    tableItems: [],
    tableHeaders: [],
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
      this.hctef(false, 300); // Worst10이 아니라 Worst300
      // setTimeout(() => {
      //   var workBook = XLSX.utils.book_new();
      //   // var sheetData = XLSX.utils.json_to_sheet(this.api_v1_voc_worst);
      //   var sheetData = XLSX.utils.json_to_sheet(this.tableItems);
      //   let filename = this.getFilename();

      //   filename = filename.replace("Worst10", "Worst"); // Worst10이 아니라 Worst300
      //   // XLSX.utils.book_append_sheet(workBook, sheetData, filename); // 시트명 글자 수 제한
      //   XLSX.utils.book_append_sheet(workBook, sheetData);

      //   XLSX.writeFile(workBook, filename + ".xlsx");
      // }, 1000);
    },

    handleClick2Emit_TOGGLE_WHETHER_opensDrawer4CellFilter() {
      bus.$emit("TOGGLE_WHETHER_opensDrawer4CellFilter", {
        activeCellFilterKind: "card",
        activeCellFilterIndex: this.cardIndex,
      });
    },
    handleDblclickRow(event, { item }) {
      this.isSwalOpen = true;
      // alert("fsd");
      // console.log(item.ID);
      // console.log(this.wildOne.catIndicator);

      // let params = {
      //   ...this.wildOne,
      //   ...item,
      //   ...this.makeData4StartEndTimeArgs(
      //     this.wildOne.dates,
      //     this.wildOne.catIndicator
      //   ),
      // };

      let {
        catPresentationFormat,
        catProductService,
        group,
        관할,
        기지국,
        단말기종,
        yyyyMMddEnd,
        yyyyMMddStart,
      } = {
        ...this.wildOne,
        ...item,
        ...this.makeData4StartEndTimeArgs(
          this.wildOne.dates,
          this.wildOne.catIndicator
        ),
      };

      // delete params.title;
      // delete params.caption;
      // delete params.dates;
      // delete params.start;
      // delete params.end;

      // if (confirm("상세분석 페이지로 이동합니다")) {
      //   this.$router.push({
      //     name: "voc",
      //     params: { ...this.wildOne, ...item },
      //   });
      // } else {
      //   this.isSwalOpen = false;
      // }

      // alert(
      // [
      //   item["단말기종"].trim(),
      //   item["ID"].trim(),
      //   item["기지국"].trim(),
      // ].join("~")
      // );
      // console.log(params);

      this.$swal
        .fire({
          backdrop: false,
          // heightAuto: false,
          // backdrop: "rgba(255,255,255,.5)",
          // html: `<h4>VOC 상세분석 페이지로 이동합니다</h4><p/><p/>${item["단말기종"]} ${item["ID"]} ${item["기지국"]} `,
          // text: [
          //   // item["단말기종"].trim(),
          //   item["ID"].trim(),
          //   item["기지국"].trim(),
          // ].join("\n"),
          html:
            catPresentationFormat == "Worst기지국"
              ? `<h4>VOC 상세분석 페이지로 이동합니다</h4><p/><p/>${item["기지국"]} 기지국(${item["ID"]})`
              : `<h4>VOC 상세분석 페이지로 이동합니다</h4><p/><p/>${item["단말기종"]} 단말`,
          // showDenyButton: true,
          showCancelButton: true,
          cancelButtonText: "취소",
          confirmButtonText: "확인",
          // confirmButtonColor: "indigo",
          reverseButtons: true,
          focusCancel: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          closeOnCancel: true,
          // denyButtonText: `Don't save`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({
              name: "voc",
              // params: { ...this.wildOne, ...item },
              // query: { ...this.wildOne, ...item },
              // query: { ...params },
              query: {
                catPresentationFormat,
                catProductService,
                group,
                관할,
                기지국,
                단말기종,
                yyyyMMddEnd,
                yyyyMMddStart,
              },
            });
          } else if (result.isDenied) {
            //
          }
          this.isSwalOpen = false;
        });
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

    async hctef(shouldRecache = false, limit = 10) {
      // alert(this.makeData4StartEndTimeArgs("2주간").yyyyMMddEnd);

      // let uri =
      //   this.prefixURL +
      //   this.wildOne.catIndicator +
      //   "/" +
      //   // this.wildOne.catPresentationFormat +
      //   "worst" +
      //   "?limit=10&group=" +
      //   this.wildOne.group +
      //   "&start_date=" +
      //   this.makeData4StartEndTimeArgs("2주간").yyyyMMddStart +
      //   "&end_date=" +
      //   this.makeData4StartEndTimeArgs("2주간").yyyyMMddEnd;
      // let keyURI = uri.replace(this.prefixURL, "");

      let catIndicator = this.wildOne.catIndicator;
      let catPresentationFormat = this.wildOne.catPresentationFormat;
      let catProductService = this.wildOne.catProductService;
      let catScope = this.wildOne.catScope;
      // let limit = 10;
      let group = this.wildOne.group;
      let dates = this.wildOne.dates;
      let keyURI = this.makeKeyURI(
        catIndicator,
        catPresentationFormat,
        catProductService,
        catScope,
        limit,
        group,
        dates
      );
      // console.log(
      //   "keyURI"
      //   // catIndicator
      //   // catPresentationFormat,
      //   // catProductService,
      //   // catScope,
      //   // limit,
      //   // group,
      //   // dates
      //   // keyURI
      // );

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
      // let cached = [];

      //!

      if (
        cached !== "" &&
        cached !== undefined &&
        cached !== null &&
        cached !== []
      ) {
        res = cached;
        // res = [];
      } else {
        // res = await this.$axios
        // .get(uri)
        res = await this.soixa
          // .get(keyURI, { timeout: 0, baseURL: this.prefixURL })
          .get(keyURI)
          .then(function (response) {
            if (
              response.data !== "" &&
              response.data !== undefined &&
              response.data !== null &&
              response.data !== []
            ) {
              localStorage.setItem(keyURI2Cache, JSON.stringify(response.data));
            } else {
              localStorage.removeItem(keyURI2Cache);
            }
            // localStorage.setItem(keyURI, JSON.stringify([]));
            // return response.data.slice(0, 10);
            // console.log(response.data);
            return response.data;
          })
          .catch(function (error) {
            // localStorage.setItem(keyURI, "");
            // localStorage.setItem(keyURI, "");
            localStorage.removeItem(keyURI2Cache);
            console.log(error);
            return null;
            // return [];
          });
      }

      if (res == null) {
        this.api_v1_voc_worst = [];
        return;
      } else {
        this.api_v1_voc_worst = res;
      }

      try {
        // res = [...res];

        let undefinedHead = "";
        let items = [];
        // alert(this.wildOne.catPresentationFormat);
        switch (this.wildOne.catPresentationFormat) {
          case "Worst기지국": //worst_BTS: Base Transceiver Station
          case "Worst읍면동":
            // alert(this.wildOne.catPresentationFormat + "-" + this.wildOne.catIndicator);
            switch (this.wildOne.catIndicator) {
              case "VOC":
              case "천명당VOC":
                res.forEach((element) => {
                  items.push({
                    ID: element["equip_cd"],
                    기지국: element["equip_nm"],
                    "발생(건)": element["voc_cnt"],
                    //(‰)이 어닌 (건)이면 인구밀도가 높은 기지국이 불리할 수 있음을 감안해야:
                    // 부, 센터에서는 '순위매김을 공평하게 하려고 '사용자로 나눈 비율'을 택했던 취지는 다소 퇴색.
                    // "발생(‰)": element["voc_cnt"],
                    // "오프로드율(%)": element["g5_off_ratio"],
                    // 주소: element["juso"],
                    // 팀: element["team"],
                    관할: element["jo"],
                  });
                  // items.push({
                  //   ID: element["equip_cd"],
                  //   기지국: element["equip_nm"],
                  //   관할: element["jo"],
                  //   "발생(건)": element["voc_cnt"],
                  // });
                });
                undefinedHead = "발생(건)";
                break;
              case "VoLTE절단율":
                res.forEach((element) => {
                  items.push({
                    ID: element["equip_cd"],
                    기지국: element["equip_nm"],
                    // 발생: element["voc_cnt"],
                    "절단율(%)": element["cut_ratio"].toFixed(2),
                    // 주소: element["juso"],
                    // 팀: element["team"],

                    // 시도: element["sum_try"],
                    성공: element["sum_suc"],
                    절단: element["sum_cut"],

                    관할: element["jo"],
                  });
                });
                undefinedHead = "절단율(%)";
                break;
              case "offloading":
              case "오프로딩율":
                res.forEach((element) => {
                  items.push({
                    // ID: element["equip_cd"],
                    // 기지국: element["equip_nm"],
                    // 발생: element["voc_cnt"],
                    // 팀: element["team"],
                    주소: element["juso"],
                    "오프로드율(%)": element["g5_off_ratio"].toFixed(4),
                    "5G+SRU (MB)": (
                      (element["sum_5g_data"] + element["sum_sru_data"]) /
                      1000000
                    ).toFixed(0),
                    "3G+LTE+5G+SRU (MB)": (
                      element["sum_total_data"] / 1000000
                    ).toFixed(0),
                    관할: element["jo"],
                  });
                });
                undefinedHead = "오프로드율(%)";
                break;
              case "MDT":
                res.forEach((element) => {
                  items.push({
                    ID: element["equip_cd"],
                    기지국: element["equip_nm"],
                    // 발생: element["voc_cnt"],
                    "RSRP불량률(%)": element["rsrp_bad_rate"].toFixed(2),
                    RSRP평균: element["rsrp_mean"].toFixed(2),
                    불량건: element["rsrp_bad_cnt"],
                    발생건: element["rsrp_cnt"],
                    // "RSRQ불량률(%)": element["rsrq_bad_rate"].toFixed(2),
                    // "RIP불량률(%)": element["rip_bad_rate"].toFixed(2),
                    // "PHR불량률(%)": element["phr_bad_rate"].toFixed(2),
                    // "5G RSRP 평균": element["nr_rsrp_mean"].toFixed(2),
                    // 주소: element["juso"],
                    // 팀: element["team"],
                    관할: element["jo"],
                  });
                });
                undefinedHead = "RSRP불량률(%)";
                break;
              case "LTE기지국통계":
                switch (this.wildOne.catProductService) {
                  case "PRB사용율":
                    res.forEach((element) => {
                      items.push({
                        ID: element["equip_cd"],
                        기지국: element["equip_nm"],
                        // 발생: element["voc_cnt"],

                        "PRB사용율(%)": element["prbusage_mean"].toFixed(2),

                        시도: element["rrc_try"],
                        성공: element["rrc_suc"],
                        "RRC성공률(%)": element["rrc_rate"].toFixed(2),

                        // 주소: element["juso"],
                        // 팀: element["team"],
                        관할: element["jo"],
                      });
                    });
                    undefinedHead = "PRB사용율(%)";
                    break;
                  case "RRC성공률":
                  default:
                    res.forEach((element) => {
                      items.push({
                        ID: element["equip_cd"],
                        기지국: element["equip_nm"],
                        // 발생: element["voc_cnt"],
                        "RRC성공률(%)": element["rrc_rate"].toFixed(2),

                        시도: element["rrc_try"],
                        성공: element["rrc_suc"],
                        "PRB사용율(%)": element["prbusage_mean"].toFixed(2),

                        // 주소: element["juso"],
                        // 팀: element["team"],
                        관할: element["jo"],
                      });
                    });
                    undefinedHead = "RRC성공률(%)";
                    break;
                }
                break;
              default:
                break;
              // case "LTE기지국통계":
              //   res.forEach((element) => {
              //     items.push({
              //       ID: element["equip_cd"],
              //       기지국: element["equip_nm"],
              //       // 발생: element["voc_cnt"],
              //       "RRC성공률(%)": element["rrc_rate"].toFixed(2),
              //       "PRB부하율(%)": element["prbusage_mean"].toFixed(2),

              //       성공: element["rrc_suc"],
              //       시도: element["rrc_try"],
              //       // 주소: element["juso"],
              //       // 팀: element["team"],
              //       관할: element["jo"],
              //     });
              //   });
              //   break;
              // default:
              //   break;
            }
            break;

          case "Worst단말":
            // case "주요단말":
            // alert(this.wildOne.catPresentationFormat + "-" + this.wildOne.catIndicator);
            switch (this.wildOne.catIndicator) {
              case "voc":
              case "VOC":
              case "천명당VOC":
                res.forEach((element) => {
                  items.push({
                    // ID: element["equip_cd"],
                    // 기지국: element["equip_nm"],
                    단말기종: element["hndset_pet_nm"],
                    "발생(건)": element["voc_cnt"],
                    // 주소: element["juso"],
                    // 팀: element["team"],
                    // 관할: element["jo"],
                  });
                });
                undefinedHead = "발생(건)";
                break;
              case "VoLTE절단율":
                res.forEach((element) => {
                  items.push({
                    // ID: element["equip_cd"],
                    // 기지국: element["equip_nm"],
                    단말기종: element["hndset_pet_nm"],
                    "절단율(%)": element["cut_ratio"].toFixed(2),
                    // 주소: element["juso"],
                    // 팀: element["team"],
                    // 관할: element["jo"],
                    // 시도: element["sum_try"],
                    성공: element["sum_suc"],
                    절단: element["sum_cut"],
                  });
                });
                undefinedHead = "절단율(%)";
                break;
              case "offloading":
              case "오프로딩율":
                res.forEach((element) => {
                  items.push({
                    // ID: element["equip_cd"],
                    // 기지국: element["equip_nm"],
                    단말기종: element["hndset_pet_nm"],
                    "오프로드율(%)": element["g5_off_ratio"].toFixed(4),
                    "5G+SRU (GB)": (
                      (element["sum_5g_data"] + element["sum_sru_data"]) /
                      1000000000
                    ).toFixed(0),
                    "3G+LTE+5G+SRU (GB)": (
                      element["sum_total_data"] / 1000000000
                    ).toFixed(0),
                    // 주소: element["juso"],
                    // 팀: element["team"],
                    // 관할: element["jo"],
                  });
                });
                undefinedHead = "오프로드율(%)";
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }

        this.tableItems = items;

        var headerClass = "text-decoration-underline";

        var headers = [];
        Object.keys(items[0]).forEach((element) => {
          switch (element) {
            // case "발생(‰)":
            case "발생(건/천명)":
            case "발생(건)":
            case "오프로드율(%)":
            case "5G+SRU (GB)":
            case "3G+LTE+5G+SRU (GB)":
            case "5G+SRU (MB)":
            case "3G+LTE+5G+SRU (MB)":
            case "시도":
            case "성공":
            case "절단":
            case "절단율(%)":
            case "RRC성공률(%)":
            case "PRB사용율(%)":
            case "RSRP불량률(%)":
            case "RSRQ불량률(%)":
            case "RIP불량률(%)":
            case "PHR불량률(%)":
            case "5G RSRP 평균":
              headers.push({
                // class: "light-blue lighten-5",
                class: element == undefinedHead ? headerClass : "",
                text: element,
                align: "end",
                // sortable: false,
                value: element,
              });
              break;
            default:
              headers.push({
                // class: "light-blue lighten-5",
                class: "",
                text: element,
                // align: "start",
                // sortable: false,
                value: element,
              });
              break;
          }
        });
        this.tableHeaders = headers;
      } catch (error) {
        // alert(res == [] || res == undefined);
      }
      if (limit > 10) {
        setTimeout(() => {
          var workBook = XLSX.utils.book_new();
          // var sheetData = XLSX.utils.json_to_sheet(this.api_v1_voc_worst);
          var sheetData = XLSX.utils.json_to_sheet(this.tableItems);
          let filename = this.getFilename();

          filename = filename.replace("Worst10", "Worst"); // Worst10이 아니라 Worst300
          // XLSX.utils.book_append_sheet(workBook, sheetData, filename); // 시트명 글자 수 제한
          XLSX.utils.book_append_sheet(workBook, sheetData);

          XLSX.writeFile(workBook, filename + ".xlsx");
        }, 1000);
      }
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
    rowClickable: function () {
      return (
        this.tableItems.length > 1 &&
        !this.isSwalOpen &&
        !this.opensDrawer4CellFilter &&
        !this.mode2EditCBProfileReg &&
        // this.wildOne.catIndicator == "천명당VOC"
        this.wildOne.catIndicator == "VOC"
      );
    },
    chartClassName: function () {
      let c1 = this.rowClickable
        ? "elevation-0 v-data-table-tr-lavender v-data-table"
        : "elevation-0 v-data-table";
      let c2 =
        this.cardHight > 396 ? "v-data-table-td-30px" : "v-data-table-td-28px";
      c2 = this.cardHight > 420 ? "" : c2;
      return c1 + " " + c2;
    },

    btnClickable: function () {
      return !this.isSwalOpen && !this.opensDrawer4CellFilter;
    },
    fetched: function () {
      return this.api_v1_voc_worst !== null;
    },
    // makeData4StartEndTimeArgs: function () {
    //   let s = this.wildOne.dates;
    //   let l = this.wildOne.dates.split("~");
    //   let r = null;
    //   // if (s.charAt(s.length - 2) == "주") {
    //   if (s.substring(s.length - 2, s.length) == "주간") {
    //     let n = parseInt(s.replace("주간", ""));
    //     if (!isNaN(n)) {
    //       r = {
    //         arg4StartDate: this.date2yyyyMMdd(this.addDays(new Date(), -7 * n)),
    //         arg4EndDate: this.date2yyyyMMdd(this.addDays(new Date(), -1)),
    //       };
    //     } else {
    //       r = {
    //         arg4StartDate: null,
    //         arg4EndDate: null,
    //       };
    //     }
    //   } else {
    //     r = {
    //       arg4StartDate: this.date2yyyyMMdd(new Date(l[0])),
    //       arg4EndDate: this.date2yyyyMMdd(new Date(l[l.length - 1])),
    //     };
    //   }
    //   return r;
    // },
  },

  mounted() {
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

/* .v-data-table::v-deep th {
  font-size: 1px !important;
}
.v-data-table::v-deep td {
  font-size: 6px !important;
} */
/* .v-data-table::v-deep tr {
  height: 3px !important;
} */
/* .v-data-table::v-deep td {
  height: 28px !important;
} */
.v-data-table-td-28px::v-deep td {
  height: 28px !important;
}
.v-data-table-td-30px::v-deep td {
  height: 30px !important;
}
/* .v-data-table::v-deep tr:hover:not(.v-data-table__expanded__content) {
  background: red !important;
  cursor: pointer;
} */
.v-data-table-tr-lavender::v-deep
  tr:hover:not(.v-data-table__expanded__content) {
  /* background: LavenderBlush !important; */
  background: Lavender !important;
  cursor: pointer;
}
.v-data-table-tr-lavender::v-deep td:nth-child(3) {
  text-decoration: underline;
  color: rgba(48, 160, 212, 70);
}
</style>
