<template>
  <v-hover v-slot="{ hover }">
    <v-card v-if="!true" elevation="0" color="transparent">
      <div :style="{ height: bannerHight + 'px' }"></div>
    </v-card>

    <LoadingSpinner
      v-else-if="!twoFetched & true"
      :style="{
        height: bannerHight + 'px',
      }"
      :spinnerDiameterbyPixel="50"
      :allows-slot_="mode2EditCBProfileReg"
      :text="wildOne.title + '...'"
      allowsSlot
    >
      <template v-slot:html>
        <div
          class="d-flex justify-space-between align-end font-weight-black text-no-wrap text-h5 text-left ma-0 pt-0 pb-4 pl-0"
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
                  :style="{ opacity: hover || mode2EditCBProfileReg ? 1 : 0 }"
                  :elevation="hover ? 4 : 0"
                  v-if="!false"
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
                      // hctef(true);
                      // hctefRef(true);
                      hctef2compare(true);
                    }
                  "
                ></v-btn>
              </v-hover>
            </template>
            <span> 새로고침 </span>
          </v-tooltip>

          <div
            class="text-no-wrap ma-0 pa-0 text-h6 text-center"
            style="color: white"
          >
            {{ wildOne.title }}
            <!-- {{ titleAndCaptionAsDefault(wildOne, true).title }} -->
          </div>
        </div>

        <v-progress-circular
          :size_="50"
          :width="2"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </template>
    </LoadingSpinner>

    <!-- <div v-else-if="wildOne.indicatesInTitleBar">
      <v-list-item-content class="text-no-wrap pa-0 mt_-n2">
        <div
          class="d-flex flex-nowrap ma-0 pa-0 justify-space-around align-center text-h6 text-center"
          :style="{
            color: 'orange',
            height: '50px',
            backgroundColor: 'transparent',
          }"
        >
          <div class="d-flex flex-nowrap text-h4 text-center ma-0 pa-0">
            {{ scoreFixed }}
            <UpDownArrow
              v-if="twoFetched"
              class="mx-2"
              :value="increment"
              :text="incrementFixed"
            ></UpDownArrow>
          </div>
        </div>
      </v-list-item-content>
    </div> -->

    <div v-else>
      <v-list-item-content
        :style="{
          height: bannerHight + 'px',
        }"
        class="text-no-wrap pa-0 mt_-n2"
      >
        <v-card
          class="d-flex justify-start align-center transparent pa-0 pr-4 ma-0"
          class_="d-flex justify-space-between align-end font-weight-black text-no-wrap text-h5 text-left ma-0 pt-0 pb-0 pl-0"
          flat
          tile
        >
          <div
            :style="{
              // opacity: hover || mode2EditCBProfileReg ? 1 : 0,
              opacity: hover || mode2EditCBProfileReg ? 1 : 0,
            }"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-btn
                    :disabled="opensDrawer4CellFilter"
                    :style="{
                      // opacity: hover || mode2EditCBProfileReg ? 1 : 0,
                      opacity: hover || mode2EditCBProfileReg ? 1 : 0.5,
                    }"
                    :elevation="hover ? 4 : 0"
                    v-if="!false"
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
                        // hctef(true);
                        // hctefRef(true);
                        hctef2compare(true);
                      }
                    "
                  ></v-btn>
                </v-hover>
              </template>
              <span> 새로고침 </span>
            </v-tooltip>
          </div>
          <div
            class="text-no-wrap text-h6 text-center"
            :style="{
              // marginBottom: '-2px',
              // marginLeft: '-3px',
            }"
            style="color: white"
          >
            {{ wildOne.title }}
            <!-- {{ titleAndCaptionAsDefault(wildOne, true).title }} -->
          </div>
        </v-card>
        <!-- <v-hover v-slot="{ hover }"> -->
        <div
          class="text-no-wrap text-body-2_ text-left ma-0 pl-7 mt-n2 mb-n3"
          :style="{
            // marginBottom: '-2px',
            // marginLeft: '-3px',
            // fontSize: 'small',
            // marginTop: '0px',
            fontSize: '12px',
            color: 'white',
            // opacity: hover ? 0.5 : 0.0,
            opacity: 0.6,
            // opacity: 0,
          }"
        >
          {{ wildOne.caption }}
          <!-- {{ titleAndCaptionAsDefault(wildOne, true).caption }} -->
        </div>
        <!-- </v-hover> -->
        <!-- <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer> -->
        <!-- style="color: orange; height: 50px; background-color: gray" -->
        <div
          class="yellow_ d-flex flex-nowrap ma-0 pl-3 pr-3 pb-1 justify-start justify-end_ j_ustify-space-around align-center text-h6 text-center"
          :style="{
            // color: 'orange',
            color: 'white',
            // height: '50px',
            backgroundColor: 'transparent',
          }"
        >
          <!-- {{ wildOne.caption }} -->
          <!-- <div class="d-flex flex-nowrap text-h4 text-center ma-0 pl-5"> -->

          <div
            class="green_ d-flex flex-nowrap font-weight-bold text-h3 text-center ma-0 pa-1 pb-0"
          >
            <!-- {{ scoreFixed }} -->

            <div
              class="d-flex flex-nowrap font-weight-bold align-self-end text-h3 ml-0"
            >
              {{ scoreFixed }}
            </div>
            <div class="align-self-end font-weight-bold_ text-body-2 ml-1 mb-0">
              {{ scoreUnit }}
            </div>

            <!-- <UpDownArrow
            v-if="twoFetched"
            class="mx-2"
            :value="increment"
            :text="incrementFixed"
          ></UpDownArrow> -->

            <!-- <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="align-self-end text-h6 ml-5">
                {{ increment > 0 ? "▲" : "▼" }} {{ incrementFixed }}
              </div>
            </template>
            <span>{{ wildOne.caption }}</span>
          </v-tooltip> -->

            <div
              v-if="!false"
              class="red_ d-flex flex-nowrap align-self-end text-h6 pl-3"
            >
              <v-tooltip v-if="false" top :disabled="mode2EditCBProfileReg">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    color="white"
                    :style="
                      increment > 0
                        ? {
                            // color: 'magenta',
                            // color: 'red',
                          }
                        : {
                            // color: 'cyan',
                            // color: 'navy',
                            transform: 'rotate( 180deg )',
                          }
                    "
                  >
                    <!-- {{ increment > 0 ? "▲" : "▼" }} {{ incrementFixed }} -->
                    mdi-triangle
                  </v-icon>
                </template>
                <span>
                  {{ wildOne.caption }}
                  <!-- {{ titleAndCaptionAsDefault(wildOne, true).caption }} -->
                </span>
                <!-- <span>{{ wildOne.catPresentationFormat }}</span> -->
              </v-tooltip>

              <v-menu
                v-else
                dark_
                open-on-hover
                :close-on-content-click="false || sss"
                right
                offset-y_
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :style_="{
                      opacity: !hover ? 1 : 0,
                    }"
                    :style="
                      increment > 0
                        ? {
                            // color: 'magenta',
                            // color: 'red',
                            // textShadow: '0px 0px 2px indigo',
                          }
                        : {
                            // color: 'cyan',
                            // color: 'navy',
                            // textShadow: '0px 0px 2px indigo',
                            // backgroundColor: 'red',
                            transform: 'rotate( 180deg )',
                          }
                    "
                    :elevation_="hover ? 10 : 0"
                    v-if="!false"
                    v-bind="attrs"
                    v-on="on"
                    :color__="hover ? 'indigo' : 'rgba(133, 217, 255, 1)'"
                    color_="white"
                    color____="rgba(133, 217, 255, 1)"
                    :color="getsWorse ? 'red' : 'rgba(133, 217, 255, 1)'"
                    color___="silver"
                    outlined
                    :outlined_="hover"
                    class="mt-5 pa-0 mr-2"
                    min-width="10px"
                    height="32px"
                    tile
                    @click="() => {}"
                  >
                    mdi-triangle
                    <!-- mdi-triangle-outline -->
                  </v-icon>
                </template>
                <!-- <p> -->
                <!-- <div
                :style="{
                  opacity: 1,
                }"
              > -->
                <v-card
                  v-if="!false"
                  elevation="24"
                  :style="{
                    // backgroundColor: 'blue',
                    // padding: '1px',
                    border: '2px outset gray',
                  }"
                >
                  <v-card
                    width="260px"
                    elevation="0"
                    dark
                    tile
                    class_="d-flex justify-end align-center"
                    :style="{
                      // backgroundColor: 'black',
                      // padding: '1px',
                    }"
                  >
                    <v-text-field
                      shaped
                      hide-details_="auto"
                      filled_
                      solo_
                      light_
                      dark_
                      dense
                      class="mt-0 pt-2 px-1"
                      outlined
                      clearable
                      :style="{
                        // opacity: 1,
                        // backgroundColor: 'white',
                        // backgroundColor: 'black',
                      }"
                      v-model="candTargetValue"
                      :rules="[
                        // rules.required,
                        rules.decimalNumber,
                        // rules.downToThreePlacesOfDecimals,
                      ]"
                      label_="비교 대상"
                      :label="
                        // candTargetValue.length < 1
                        // candTargetValue == undefined || candTargetValue == ''
                        //   ? '비교 대상: 전주 동요일'
                        //   : '비교 대상: 목표값'
                        // candTargetValue == undefined || candTargetValue == ''
                        //   ? '비교: 조회 날짜로부터 일주 전'
                        //   : '비교: 목표값'
                        candTargetValue == undefined || candTargetValue == ''
                          ? '비교: 일주 전 (조회 날짜 기준)'
                          : '비교: 목표값'
                      "
                      placeholder="목표값으로 직접 입력 가능합니다"
                      hint_="비교할 값(목표값)을 직접 입력할 수 있습니다"
                      persistent-hint
                      @click:clear="
                        () => {
                          hndlChange();
                        }
                      "
                      @change="
                        () => {
                          hndlChange();
                        }
                      "
                      counter_
                      maxlength_="20"
                    ></v-text-field>

                    <v-card
                      v-if="false"
                      elevation="0"
                      dark_
                      tile
                      class="d-flex justify-end align-center pa-1"
                      :style="{
                        // backgroundColor: 'transparent',
                        // padding: '1px',
                      }"
                    >
                      <v-spacer></v-spacer>
                      <v-icon
                        :disabled="isNaN(candTargetValue)"
                        class="mt-n8 ml-3"
                        color="indigo lighten-2"
                        @click="
                          () => {
                            targetValue = candTargetValue;
                            // this.displaysDatePicker = false;
                          }
                        "
                      >
                        mdi-check-bold
                      </v-icon>

                      <v-icon
                        class="mt-n8 ml-1"
                        color="blue-grey darken-3"
                        @click="hndlSSS"
                      >
                        mdi-close-outline
                      </v-icon>
                    </v-card>
                  </v-card>
                </v-card>
                <!-- <DashboardViewInputComparison></DashboardViewInputComparison> -->
              </v-menu>

              <div
                :style="{
                  // hight: '10px',
                }"
                class="red_ ma-0 pa-0 mb-n4"
              >
                <div
                  class="ma-0 pa-0 ml-n1 mb-n4"
                  :style="{
                    // color: 'navy',
                    // paddingTop: '0px',
                    // fontSize: 'x-small',

                    fontSize: '12px',
                    color: 'white',
                    // opacity: hover ? 0.5 : 0.0,
                    opacity: 0.6,
                    fontStyle: 'italic',
                  }"
                >
                  {{ targetValue !== "" ? "목표대비" : "전주대비" }}
                  <!-- {{ targetValue }} -->
                </div>

                <div>
                  {{ incrementFixed }}
                </div>
              </div>

              <!-- {{ incrementFixed }}    -->
              <!-- <div class="align-self-end text-h5 ml-1">
                {{ incrementFixed }}
              </div> -->

              <div class="align-self-end text-body-2 ml-1 mb-0">
                {{ incrementUnit }}
              </div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
      </v-list-item-content>
    </div>
  </v-hover>
</template>

<script>
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";

import LoadingSpinner from "@/components/misc/LoadingSpinner.vue";

// import UpDownArrow from "@/components/misc/UpDownArrow.vue";

export default {
  mixins: [DashboardViewMixin],
  components: {
    LoadingSpinner,

    // UpDownArrow,
  },
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
    recipe: {},

    // defaultBaseDate: {
    //   type: Date,
    //   default: new Date("2022-08-17"),
    // },
  },

  data: () => ({
    myCBProfileTmp: {},
    sss: false,
    rules: {
      decimalNumber: (value) =>
        !isNaN(value) ||
        "정수나 십진 소수를 받아, 소수 셋째 자리에서 반올림 합니다",
    },
    targetValue: "",
    candTargetValue: "",

    doesNotCloseThisTime: false,

    opensDrawer4CellFilter: false,
    group: null,
    baseDate: null,
    responseData: null,
    responseDataRef: null,
  }),
  methods: {
    hndlSSS() {
      this.sss = true;
      setTimeout(() => {
        this.sss = false;
      }, 1000);
    },
    hndlChange() {
      if (this.candTargetValue == undefined) {
        this.candTargetValue = "";
        this.targetValue = this.candTargetValue;
      } else if (this.candTargetValue.trim() == "") {
        this.candTargetValue = "";
        this.targetValue = this.candTargetValue;
      } else if (isNaN(this.candTargetValue)) {
        this.candTargetValue = this.targetValue;
      } else {
        this.candTargetValue = Number(this.candTargetValue).toFixed(2);
        this.targetValue = this.candTargetValue;
      }
      this.apply();
    },

    apply() {
      // alert(this.cellIndex);
      // let key4Cells = this.isForBanner ? "banners" : "cards";
      let key4Cells = "banners";
      let duplicate = [
        ...this.myCBProfileTmp[key4Cells].slice(
          this.cellIndex,
          this.cellIndex + 1
        ),
      ][0];

      // alert(this.nodesSelected);
      // // alert(this.nodesSelected.replace(",", "|"));
      // alert(this.nodesSelected.join("|"));

      let changed = {
        ...duplicate,
      };

      changed = {
        ...changed,
        targetValue: this.targetValue,
        ...this.titleAndCaptionAsDefault(changed, true),
      };
      // alert(changed.dates);
      let newTmp = {
        ...this.myCBProfileTmp,
        // banners: [],
        // cards: [],
        // hands: [],
      };
      // delete newTmp[key4Cells];
      newTmp[key4Cells] = [
        ...this.myCBProfileTmp[key4Cells].slice(0, this.cellIndex),
        // [...myCBProfileTmp.cards.slice(cellIndex, cellIndex + 1)][0],
        changed,
        ...this.myCBProfileTmp[key4Cells].slice(
          this.cellIndex + 1,
          this.myCBProfileTmp[key4Cells].length
        ),
      ];

      // alert(JSON.stringify(newTmp));
      this.setJMyCBProfileTmp(JSON.stringify(newTmp));

      // alert(this.cellIndex + " " + this.targetValue);

      // this.$emit("CLICK_APPLY", this.nodesSelected);
    },

    hctef2compare(shouldRecache = false) {
      if (this.shows금토일합산평균) {
        this.hctef2compare_ex금토일합산평균();
        return;
      }

      this.hctef(shouldRecache);
      this.hctefRef(shouldRecache);
    },

    hctef2compare_ex금토일합산평균(shouldRecache = false) {
      // isForBanner &&
      //             selected4Indicator == 'VOC' &&
      //             setsDateRangeRelatively &&
      //             relativeDateRangeText == '최근갱신일'
      // 호출시 이미 위 조건과 일요일인지 확인한 후라고 상정
      this.hctefSum3Days_ex금토일합산평균(shouldRecache);
      this.hctefRefSum3Days_ex금토일합산평균(shouldRecache);
    },

    async hctefSum3Days_ex금토일합산평균(shouldRecache = false) {
      let catIndicator = this.wildOne.catIndicator;
      let catPresentationFormat = this.wildOne.catPresentationFormat;
      let catProductService = this.wildOne.catProductService;
      let catScope = this.wildOne.catScope;
      let limit = 10;
      let group = this.wildOne.group;

      let end = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      ).end;

      let start = this.addDays(end, -2);

      let dates = [
        start.toISOString().substring(0, 10),
        end.toISOString().substring(0, 10),
      ].join("~");

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
      // let keyURI = uri;
      // let keyURI = uri.replace(this.prefixURL, "");
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

      let sum금토일 = 0;
      if (res.length !== 0) {
        res.forEach((element) => {
          sum금토일 = sum금토일 + element[this.recipe.indicator.trophyKey];
        });
      }
      this.responseData =
        res.length === 0
          ? {
              datesConfigured: this.wildOne.dates,
              datesSummed: dates,
            }
          : {
              datesConfigured: this.wildOne.dates,
              datesSummed: dates,
              score: sum금토일 / 3,
            };

      // this.responseData = {
      //   score: res[0][this.recipe.indicator.trophyKey],
      // };

      // console.log(
      //   "---------------------------------",
      //   res,
      //   sum금토일,
      //   this.responseData
      // );
    },
    async hctefRefSum3Days_ex금토일합산평균(shouldRecache = false) {
      if (this.targetValue !== "") {
        this.responseDataRef = {
          score: Number(this.targetValue),
        };
        return;
      }

      let catIndicator = this.wildOne.catIndicator;
      let catPresentationFormat = this.wildOne.catPresentationFormat;
      let catProductService = this.wildOne.catProductService;
      let catScope = this.wildOne.catScope;
      let limit = 10;
      let group = this.wildOne.group;

      let end = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      ).end;
      end = this.addDays(end, -7);
      let start = this.addDays(end, -2);

      let dates = [
        start.toISOString().substring(0, 10),
        end.toISOString().substring(0, 10),
      ].join("~");

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
      // let keyURI = uri;
      // let keyURI = uri.replace(this.prefixURL, "");
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

      let sum금토일 = 0;
      if (res.length !== 0) {
        res.forEach((element) => {
          sum금토일 = sum금토일 + element[this.recipe.indicator.trophyKey];
        });
      }
      this.responseDataRef =
        res.length === 0
          ? {
              datesConfigured: this.wildOne.dates,
              datesSummed: dates,
            }
          : {
              datesConfigured: this.wildOne.dates,
              datesSummed: dates,
              score: sum금토일 / 3,
            };

      // this.responseData = {
      //   score: res[0][this.recipe.indicator.trophyKey],
      // };

      // console.log(
      //   "---------------------------------",
      //   res,
      //   sum금토일,
      //   this.responseDataRef
      // );
    },
    async hctef(shouldRecache = false) {
      // let arg4Group = this.wildOne.group;
      // let arg4Date = this.date2yyyyMMdd(this.baseDate);
      // let arg4DateRef = this.date2yyyyMMdd(this.addDays(this.baseDate, -7));

      // let uri =
      //   this.prefixURL +
      //   this.wildOne.catIndicator +
      //   "/" +
      //   this.wildOne.catPresentationFormat +
      //   "?group=" +
      //   arg4Group +
      //   "&start_date=" +
      //   arg4Date +
      //   "&end_date=" +
      //   arg4Date;

      let catIndicator = this.wildOne.catIndicator;
      let catPresentationFormat = this.wildOne.catPresentationFormat;
      let catProductService = this.wildOne.catProductService;
      let catScope = this.wildOne.catScope;
      let limit = 10;
      let group = this.wildOne.group;

      // let dates = this.wildOne.dates;

      let end = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      ).end;
      let dates = end.toISOString().substring(0, 10);

      let keyURI = this.makeKeyURI(
        catIndicator,
        catPresentationFormat,
        // "일별추이|목표대비지표",
        // "일별추이|전주대비지표",
        catProductService,
        catScope,
        limit,
        group,
        dates
      );

      let keyURI2Cache = keyURI; //todo: 여기에 keyURI에 업데이트시각관리테이블에서 읽어온 갱신시각을 붙여 keyURI2Cache를 명명한다

      // let trophyKey = "value";
      // switch (this.wildOne.catIndicator) {
      //   case "volte":
      //   case "VoLTE절단율":
      //     trophyKey = "cut_rate";
      //     break;
      //   case "MDT":
      //     // alert(this.wildOne.catIndicator);
      //     trophyKey = "rsrp_bad_rate";
      //     break;
      //   default:
      //     trophyKey = "value";
      //     break;
      // }

      let res = null;
      // let keyURI = uri;
      // let keyURI = uri.replace(this.prefixURL, "");
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

      // // res = null;
      // // if (res == null) {
      // //   this.responseData = { score: null };
      // //   return;
      // // }
      try {
        this.responseData =
          res.length === 0
            ? {
                // title: "천 명 중 품질VOC 발생 (전주동일대비)"
              }
            : {
                // title: "천 명 중 품질VOC 발생 (전주동일대비)",

                // score: res[0][trophyKey],
                score: res[0][this.recipe.indicator.trophyKey],
              };
      } catch (error) {
        this.responseData = {};
      }

      // this.responseData = {
      //   score: res[0][this.recipe.indicator.trophyKey],
      // };
    },

    async hctefRef(shouldRecache = false) {
      if (this.targetValue !== "") {
        this.responseDataRef = {
          score: Number(this.targetValue),
        };
        return;
      }

      let catIndicator = this.wildOne.catIndicator;
      let catPresentationFormat = this.wildOne.catPresentationFormat;
      let catProductService = this.wildOne.catProductService;
      let catScope = this.wildOne.catScope;
      let limit = 10;
      let group = this.wildOne.group;

      // let dates = this.wildOne.dates;

      let end = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      ).end;
      // let dates = end.toISOString().substring(0, 10);
      let start = this.addDays(end, -7);
      let dates = start.toISOString().substring(0, 10);

      let keyURI = this.makeKeyURI(
        catIndicator,
        catPresentationFormat,
        // "일별추이|목표대비지표",
        // "일별추이|전주대비지표",
        catProductService,
        catScope,
        limit,
        group,
        dates
      );

      let keyURI2Cache = keyURI; //todo: 여기에 keyURI에 업데이트시각관리테이블에서 읽어온 갱신시각을 붙여 keyURI2Cache를 명명한다

      // let trophyKey = "value";
      // switch (this.wildOne.catIndicator) {
      //   case "volte":
      //   case "VoLTE절단율":
      //     trophyKey = "cut_rate";
      //     break;
      //   case "MDT":
      //     // alert(this.wildOne.catIndicator);
      //     trophyKey = "rsrp_bad_rate";
      //     break;
      //   default:
      //     trophyKey = "value";
      //     break;
      // }

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

      // // if (res == null) {
      // //   this.responseDataRef = { score: null };
      // //   return;
      // // }
      try {
        this.responseDataRef =
          res.length === 0
            ? {
                // title: "천 명 중 품질VOC 발생 (전주동일대비)"
              }
            : {
                // title: "천 명 중 품질VOC 발생 (전주동일대비)",
                // score: res[0][trophyKey],
                score: res[0][this.recipe.indicator.trophyKey],
              };
      } catch (error) {
        this.responseDataRef = {};
      }

      // this.responseDataRef = {
      //   score: res[0][this.recipe.indicator.trophyKey],
      // };
    },
  },
  watch: {
    wildOne: function () {
      this.myCBProfileTmp = JSON.parse(this.jMyCBProfileTmp) || "";
      this.targetValue = this.wildOne.targetValue;
      this.candTargetValue = this.targetValue;

      // this.hctef();
      // this.hctefRef();
      this.hctef2compare();
    },
    // myCBProfileTmp: function () {
    //   this.baseDate = this.makeData4StartEndTimeArgs(
    //     this.wildOne.dates,
    //     this.wildOne.catIndicator
    //   ).end;

    //   this.chartDatasets = [];
    //   this.hctef();
    //   this.hctefRef();
    // },

    // mode2EditCBProfileReg: function (n) {
    //   if (n) {
    //     this.opensDrawer4CellFilter = false;
    //   }
    // },
  },

  computed: {
    shows금토일합산평균: function () {
      let end = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      ).end;
      let weekDayOfEnd = this.date2WeekDayKor(end);

      // let ok =
      //   this.wildOne.handlesSundayAsBetweenFridayAndSunday &&
      //   this.wildOne.catIndicator == "VOC" &&
      //   this.wildOne.dates == "최근갱신일" &&
      //   weekDayOfEnd !== "일";
      // if (ok) {
      //   console.log(weekDayOfEnd);
      // }

      let ok =
        this.wildOne.handlesSundayAsBetweenFridayAndSunday &&
        this.wildOne.catIndicator == "VOC" &&
        this.wildOne.dates == "최근갱신일" &&
        weekDayOfEnd == "일";

      return ok;
    },
    fetched: function () {
      return this.responseData !== null;
    },
    twoFetched: function () {
      return this.responseData !== null && this.responseDataRef !== null;
    },

    // intoTitleBar: function () {
    //   return this.wildOne.caption !== undefined;
    // },

    score: function () {
      return isNaN(this.responseData.score) ? 0 : this.responseData.score;
    },
    scoreRef: function () {
      return isNaN(this.responseDataRef.score) ? 0 : this.responseDataRef.score;
    },
    increment: function () {
      return this.score - this.scoreRef;
    },
    getsWorse: function () {
      let worse = false;
      switch (this.wildOne.catIndicator) {
        case "VOC":
        case "VoLTE절단율":
        case "MDT":
          if (this.increment > 0) {
            worse = true;
          }
          break;
        case "LTE기지국통계":
          switch (this.wildOne.catProductService) {
            case "PRB사용율":
              if (this.increment > 0) {
                worse = true;
              }
              break;
            case "RRC성공률":
            default:
              if (this.increment < 0) {
                worse = true;
              }
              break;
          }
          break;
        case "오프로딩율":
        default:
          if (this.increment < 0) {
            worse = true;
          }
          break;
      }
      return worse;
    },
    scoreFixed: function () {
      // return this.score.toFixed(2);
      let digit = 0;
      switch (this.wildOne.catIndicator) {
        case "voc":
        case "VOC":
        case "천명당VOC":
          // case "MDT":
          // measure = "‰";
          // unit = "건/천명";
          digit = this.shows금토일합산평균 ? 2 : 0;
          break;
        default:
          digit = 2;
          break;
      }
      return this.score.toFixed(digit);
    },
    scoreUnit: function () {
      let unit = "%";
      switch (this.wildOne.catIndicator) {
        case "voc":
        case "VOC":
        case "천명당VOC":
          // case "MDT":
          // measure = "‰";
          // unit = "건/천명";
          unit = "건";
          break;
        default:
          unit = "%";
          break;
      }
      return unit;
    },

    incrementFixed: function () {
      // return (this.score - this.scoreRef).toFixed(2);

      let digit = 0;
      switch (this.wildOne.catIndicator) {
        case "voc":
        case "VOC":
        case "천명당VOC":
          digit = this.shows금토일합산평균 ? 2 : 0;
          break;
        default:
          digit = 2;
          break;
      }

      return (this.score - this.scoreRef).toFixed(digit);
    },
    incrementUnit: function () {
      // // return "%p";
      // // return "‰p";
      // return "p";

      let unit = "p";
      switch (this.wildOne.catIndicator) {
        case "voc":
        case "VOC":
        case "천명당VOC":
          // case "MDT":
          // measure = "‰";
          // unit = "건/천명";
          unit = "건";
          break;
        default:
          unit = "p";
          break;
      }
      return unit;
    },
  },

  mounted() {
    this.myCBProfileTmp = JSON.parse(this.jMyCBProfileTmp) || "";
    this.targetValue = this.wildOne.targetValue;
    this.candTargetValue = this.targetValue;

    // this.hctef();
    // this.hctefRef();
    this.hctef2compare();
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
