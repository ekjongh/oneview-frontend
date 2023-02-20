<template>
  <v-container
    :style="{
      width: '100vw',
      height: 'calc(100vh - 52px)',
      backgroundColor: getBGC4Dashboard(),
    }"
    fluid
    class="pa-0 overflow-x-hidden overflow-y-auto"
  >
    <v-container
      fluid
      :style="{
        minHeight: 'calc(100vh - 96px)',
      }"
      class="pa-0"
    >
      <apexChart
        v-if="false"
        width="500"
        type="bar"
        :options="options"
        :series="series"
      ></apexChart>
      <v-card
        id="CanvasUnderBanners"
        :color="getBGC4CanvasUnderBanners()"
        elevation="0"
        tile
        :class="
          gutterOption.eachPadding +
          ' d-flex flex-wrap flex-shrink-0 justify-start pb-0'
        "
      >
        <v-card
          v-for="(myBanner, i) in myCBProfileTmp.banners"
          :key="i"
          :style="{}"
          tile
          id="canvasUnderBanner"
          :color="getBGC4CanvasUnderBanner()"
          elevation="0"
          width="300px"
          :max-width="gutterOption.bannerMaxWidth"
          :class="
            gutterOption.eachPadding + ' d-flex ma-0 flex-shrink-1 flex-grow-1'
          "
        >
          <v-hover v-slot="{ hover }">
            <v-card
              tile
              elevation="0"
              class="pa-1 ma-0 flex-shrink-1 flex-grow-1"
              width="100%"
              :color="getBGC4Banner(i)"
            >
              <DashboardView1PickBanner
                :cellIndex="i"
                :cellCount="countOfBanners"
                :wildOne="myBanner"
                :bannerHight="gutterOption.bannerHight"
              ></DashboardView1PickBanner>
              <v-icon
                v-if="mode2EditCBProfileReg"
                class="text-h3 text--disabled"
                :style="{
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: '-5px',

                  right: '150px',

                  zIndex: 2,
                  borderStyle: 'none',
                }"
              >
                {{ i + 1 }}/{{ countOfBanners }}</v-icon
              >
              <div
                class="text-no-wrap pr-1"
                :style="{
                  backgroundColor: 'transparent',
                  position: 'absolute',

                  top: '0px',
                  right: '0px',
                  zIndex: 2,
                  borderStyle: 'none',
                }"
              >
                <DashboardView3IconButtons
                  :style="{
                    opacity: mode2EditCBProfileReg || hover ? 1 : 0,
                  }"
                  :opensDrawer4CellFilter="opensDrawer4CellFilter"
                  :opensModalWindowToShowCardBigger="
                    opensModalWindowToShowCardBigger
                  "
                  :wildOne="myBanner"
                  :cardIndex="i"
                  :cardCount="countOfBanners"
                  wildOneKind="banner"
                ></DashboardView3IconButtons>
              </div>
              <v-slide-x-reverse-transition>
                <v-card
                  flat
                  tile
                  dark
                  v-ripple="false"
                  v-if="
                    opensDrawer4CellFilter &&
                    activeCellFilterKind == 'banner' &&
                    i == activeCellFilterIndex
                  "
                  class="d-flex justify-space-around align-center"
                  :style="{
                    backgroundColor: 'transparent',
                    position: 'absolute',

                    top: '50px',
                    right: '0px',
                    zIndex: 3,
                    borderStyle: 'none',
                  }"
                  v-click-outside="
                    () => {
                      if (doesNotCloseThisTime) {
                        opensDrawer4CellFilter = true;
                        doesNotCloseThisTime = false;
                      } else {
                        opensDrawer4CellFilter = false;
                      }
                    }
                  "
                >
                  <DashboardViewCellFilter
                    :isForBanner="true"
                    v-if="!false"
                    :wildOne="myBanner"
                    :cellIndex="i"
                    :cardCount="countOfBanners"
                    @CLICK_APPLY="handleClickApply"
                    @CLICK_CANCEL="handleClickCancel"
                    @SAYS_THIS_CLICK_IS_NOT_OUTSIDE="
                      handleSayThisClickIsNotOutside
                    "
                    :menuItems="menuItems4CellFilter"
                    :optionsByLevel="options4Organization"
                  ></DashboardViewCellFilter>
                </v-card>
              </v-slide-x-reverse-transition>
            </v-card>
          </v-hover>
        </v-card>
      </v-card>

      <v-card
        id="CanvasUnderCards"
        :color="getBGC4CanvasUnderCards()"
        elevation="0"
        tile
        :class="
          gutterOption.eachPadding +
          ' d-flex flex-wrap flex-shrink-0 justify-start pt-0'
        "
      >
        <v-card
          v-for="(myCard, i) in myCBProfileTmp.cards"
          :key="i"
          :style="{}"
          tile
          id="canvasUnderCard"
          :color="getBGC4CanvasUnderCard()"
          elevation="0"
          width="600px"
          :max-width="gutterOption.cardMaxWidth"
          :class="
            gutterOption.eachPadding + ' d-flex ma-0 flex-shrink-1 flex-grow-1'
          "
        >
          <v-hover v-slot="{ hover }">
            <v-card
              dark_
              tile
              elevation="0"
              class="pa-1 ma-0 flex-shrink-1 flex-grow-1"
              width="100%"
              :color="getBGC4Card()"
            >
              <DashboardView1PickCard
                v-if="!false"
                :hoversOnCell="hover"
                :cardIndex="i"
                :cardCount="countOfCards"
                :wildOne="myCard"
                :cardHight="gutterOption.cardHight"
                :opensDrawer4CellFilter="opensDrawer4CellFilter"
                :opensModalWindowToShowCardBigger="
                  opensModalWindowToShowCardBigger
                "
                :couldShowCardBigger="couldShowCardBigger"
              ></DashboardView1PickCard>
              <v-icon
                v-if="mode2EditCBProfileReg"
                class="text-h3 text--disabled"
                :style="{
                  // textShadow: '3px 3px 3px lightgray',
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: '-5px',

                  right: '150px',

                  zIndex: 2,
                  borderStyle: 'none',
                }"
              >
                {{ i + 1 }}/{{ countOfCards }}</v-icon
              >
              <div
                class="text-no-wrap pr-1"
                :style="{
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  // top: '35px',
                  top: '0px',
                  right: '0px',
                  zIndex: 2,
                  borderStyle: 'none',
                }"
              >
                <DashboardView3IconButtons
                  :style="{
                    opacity: mode2EditCBProfileReg || hover ? 1 : 0,
                  }"
                  :opensDrawer4CellFilter="opensDrawer4CellFilter"
                  :opensModalWindowToShowCardBigger="
                    opensModalWindowToShowCardBigger
                  "
                  :wildOne="myCard"
                  :cardIndex="i"
                  :cardCount="countOfCards"
                  wildOneKind="card"
                ></DashboardView3IconButtons>
              </div>
              <!-- </v-slide-y-transition> -->
              <v-slide-x-reverse-transition>
                <v-card
                  flat
                  tile
                  dark
                  v-ripple="false"
                  v-if="
                    opensDrawer4CellFilter &&
                    activeCellFilterKind == 'card' &&
                    i == activeCellFilterIndex
                  "
                  class="d-flex justify-space-around align-center"
                  :style="{
                    backgroundColor: 'transparent',
                    position: 'absolute',

                    top: '50px',
                    right: '0px',
                    zIndex: 3,
                    borderStyle: 'none',
                  }"
                  v-click-outside="
                    () => {
                      if (doesNotCloseThisTime) {
                        opensDrawer4CellFilter = true;
                        doesNotCloseThisTime = false;
                      } else {
                        opensDrawer4CellFilter = false;
                      }
                    }
                  "
                >
                  <DashboardViewCellFilter
                    :isForBanner="false"
                    v-if="!false"
                    :wildOne="myCard"
                    :cellIndex="i"
                    :cardCount="countOfCards"
                    @CLICK_APPLY="handleClickApply"
                    @CLICK_CANCEL="handleClickCancel"
                    @SAYS_THIS_CLICK_IS_NOT_OUTSIDE="
                      handleSayThisClickIsNotOutside
                    "
                    :menuItems="menuItems4CellFilter"
                    :optionsByLevel="options4Organization"
                  ></DashboardViewCellFilter>
                </v-card>
              </v-slide-x-reverse-transition>
            </v-card>
          </v-hover>
        </v-card>
      </v-card>
    </v-container>

    <v-dialog
      v-model="opensModalWindowToShowCardBigger"
      max-width_="100vw"
      min-height_="800px"
      width="90vw"
      height="100%"
      fullscreen_
      hide-overlay_
      transition_="dialog-bottom-transition"
      transition="scale-transition"
    >
      <v-card class="pa-4" width="90vw" height="100%">
        <v-btn
          @click="opensModalWindowToShowCardBigger = false"
          icon
          :style="{
            position: 'absolute',
            top: '10px',
            right: '12px',
            zIndex: 1,
            borderStyle: 'none',
          }"
        >
          <v-icon color="indigo">mdi-close</v-icon>
        </v-btn>
        <DashboardView1PickCard
          :isOnModal="true"
          v-if="cardIndex4ModalWindow !== null"
          :hoversOnCell="true"
          :cardIndex="cardIndex4ModalWindow"
          :cardCount="countOfCards"
          :wildOne="myCBProfileTmp.cards[cardIndex4ModalWindow]"
          :cardHight="cardHight4ModalWindow"
          :opensDrawer4CellFilter="opensDrawer4CellFilter"
          :opensModalWindowToShowCardBigger="opensModalWindowToShowCardBigger"
          :couldShowCardBigger="true"
        ></DashboardView1PickCard>
      </v-card>

      <div v-if="false" class="todo">
        <v-icon
          v-if="!mode2EditCBProfileReg"
          class="text-h3 text--disabled"
          :style="{
            // textShadow: '3px 3px 3px lightgray',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '-5px',

            right: '150px',

            zIndex: 2,
            borderStyle: 'none',
          }"
        >
          {{ cardIndex4ModalWindow + 1 }}/{{ countOfCards }}</v-icon
        >

        <div
          class="text-no-wrap pr-1"
          :style="{
            backgroundColor: 'transparent',
            position: 'absolute',

            top: '0px',
            right: '0px',
            zIndex: 2,
            borderStyle: 'none',
          }"
        >
          <DashboardView3IconButtons
            :style="{
              opacity: !mode2EditCBProfileReg || hover ? 1 : 0,
            }"
            :opensDrawer4CellFilter="opensDrawer4CellFilter"
            :opensModalWindowToShowCardBigger="opensModalWindowToShowCardBigger"
            :wildOne="myCBProfileTmp.cards[cardIndex4ModalWindow]"
            :cardIndex="cardIndex4ModalWindow"
            :cardCount="countOfCards"
            wildOneKind="card"
          ></DashboardView3IconButtons>
        </div>
        <!-- </v-slide-y-transition> -->
        <v-slide-x-reverse-transition>
          <!-- <v-scale-transition> -->
          <v-card
            flat
            tile
            dark
            v-ripple="false"
            v-if="
              true ||
              (opensModalWindowToShowCardBigger &&
                opensDrawer4CellFilter &&
                activeCellFilterKind == 'card' &&
                cardIndex4ModalWindow == activeCellFilterIndex)
            "
            class="d-flex justify-space-around align-center"
            :style="{
              backgroundColor: 'transparent',
              position: 'absolute',

              top: '50px',
              right: '0px',
              zIndex: 3,
              borderStyle: 'none',
            }"
            v-click-outside_="
              () => {
                if (doesNotCloseThisTime) {
                  opensDrawer4CellFilter = true;
                  doesNotCloseThisTime = false;
                } else {
                  opensDrawer4CellFilter = false;
                }
              }
            "
          >
            <DashboardViewCellFilter
              :isForBanner="false"
              v-if="!false"
              :wildOne="myCBProfileTmp.cards[cardIndex4ModalWindow]"
              :cellIndex="cardIndex4ModalWindow"
              :cardCount="countOfCards"
              @CLICK_APPLY="handleClickApply"
              @CLICK_CANCEL="handleClickCancel"
              @SAYS_THIS_CLICK_IS_NOT_OUTSIDE="handleSayThisClickIsNotOutside"
              :menuItems="menuItems4CellFilter"
              :optionsByLevel="options4Organization"
            ></DashboardViewCellFilter>
          </v-card>
        </v-slide-x-reverse-transition>
        <!-- </v-scale-transition> -->
      </div>
    </v-dialog>

    <v-footer padless>
      <v-col class="text-center text-caption">
        Copyright© {{ new Date().getFullYear() }} KT Corp. All rights reserved.
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
import { bus } from "@/event-bus";

import DashboardViewCellFilter from "@/components/dashboard/DashboardViewCellFilter.vue";
import DashboardView3IconButtons from "@/components/dashboard/DashboardView3IconButtons.vue";

import { mapState, mapMutations, mapGetters } from "vuex";

import DashboardView1PickBanner from "@/components/dashboard/DashboardView1PickBanner.vue";
import DashboardView1PickCard from "@/components/dashboard/DashboardView1PickCard.vue";

import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";
export default {
  mixins: [DashboardViewMixin],

  props: {},
  components: {
    DashboardViewCellFilter,
    DashboardView3IconButtons,

    // vSelect,
    // HierarchicalSelect,
    DashboardView1PickBanner,
    DashboardView1PickCard,
    // DashboardViewVOCTable,
  },
  data: function () {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],

      dd: true,
      cardHight4ModalWindow: 800,
      cardIndex4ModalWindow: null,
      opensModalWindowToShowCardBigger: false,

      opensDrawer4CellFilter: false,
      activeCellFilterIndex: null,
      activeCellFilterKind: "",
      doesNotCloseThisTime: false,

      myCBProfileTmp: {},
      reserve4MyCBProfileReg: {},
      myCBProfileReg: {},

      panel: 0,
      couldShowCardBigger: true,
      windowInnerWidth: window.innerWidth,
      windowInnerHeight: window.innerHeight,

      bkupBeforeModeChange: {},

      today: new Date(),

      //http://10.203.13.204:8241/api/v1/code/addr?sido=부산광역시&gungu=사하구
      api_v1_code_addr: [
        {
          cd: "부산광역시_사하구_감천동",
          val: "감천동",
        },
        {
          cd: "부산광역시_사하구_구평동",
          val: "구평동",
        },
        {
          cd: "부산광역시_사하구_다대동",
          val: "다대동",
        },
        {
          cd: "부산광역시_사하구_당리동",
          val: "당리동",
        },
        {
          cd: "부산광역시_사하구_괴정동",
          val: "괴정동",
        },
        {
          cd: "부산광역시_사하구_신평동",
          val: "신평동",
        },
        {
          cd: "부산광역시_사하구_장림동",
          val: "장림동",
        },
        {
          cd: "부산광역시_사하구_하단동",
          val: "하단동",
        },
      ],
      // 향후 주소 코드(예:우편번호, 동코드) 도입 후 구현하기로.
      // http://10.203.13.204:8241/api/v1/voc/trend-day?code=시도별&group=광주광역시&start_date=20220901&end_date=20220911
      //http://10.203.13.204:8241/api/v1/voc/trend-day?code=시군구별&group=사하구&start_date=20220901&end_date=20220911
    };
  },

  methods: {
    handleClickApply() {
      this.opensDrawer4CellFilter = false;
    },
    handleClickCancel() {
      this.opensDrawer4CellFilter = false;
    },
    handleSayThisClickIsNotOutside() {
      this.doesNotCloseThisTime = true;
    },

    getBGC4Dashboard() {
      if (this.mode2EditCBProfileReg) {
        return "rgba(255, 250, 250, 1)";
      }
      return "rgba(235, 237, 237, 1)";
    },
    getBGC4CanvasUnderBanners() {
      // return "red";
      return this.getBGC4Dashboard();
    },
    getBGC4CanvasUnderCards() {
      // return "green";
      return this.getBGC4Dashboard();
    },

    getBGC4CanvasUnderBanner() {
      // return "blue";
      return this.getBGC4Dashboard();
    },
    getBGC4CanvasUnderCard() {
      // return "pink";
      return this.getBGC4Dashboard();
    },

    getBGC4Banner(i, cnt = this.countOfBanners) {
      let gap = 128 / cnt;
      let r = 91 - gap * i;
      let g = 203 - gap * i;
      let b = 255 - gap * i;
      return `rgba(${r}, ${g}, ${b}, 1)`;
    },

    getBGC4Card() {
      return "white";
    },
    ...mapMutations("dashboard", [
      "setMode2EditCBProfileReg",
      "addCacheAPI",

      "setJMyCBProfileTmp",
      "setJReserve4MyCBProfileReg",
      "setJMyCBProfileReg",
    ]),
    ...mapMutations("auth", ["setIsJustLoggedIn"]),
    onResize() {
      this.windowInnerWidth = window.innerWidth;
      this.windowInnerHeight = window.innerHeight;

      let w =
        this.gutterOption.cardHight <
        document.documentElement.clientWidth - 280;
      let h =
        this.gutterOption.cardHight <
        document.documentElement.clientHeight - 140;

      // console.log(
      //   this.couldShowCardBigger,
      //   this.gutterOption.cardHight,
      //   document.documentElement.clientWidth,
      //   document.documentElement.clientHeight
      // );

      this.couldShowCardBigger = w && h;
      this.opensModalWindowToShowCardBigger = false;
    },
    async hctef_myCBProfileTmp() {
      this.myCBProfileTmp = await this.$axios
        .get(this.prefixURL + "users/me/custom/dashboard")
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return [];
        });
    },
  },

  created() {
    bus.$on("TOGGLE_WHETHER_opensDrawer4CellFilter", (v) => {
      this.opensDrawer4CellFilter = !this.opensDrawer4CellFilter;
      if (!this.opensDrawer4CellFilter) {
        this.activeCellFilterKind = "";
        this.activeCellFilterIndex = null;
      } else {
        this.activeCellFilterKind = v.activeCellFilterKind;
        // "card";
        this.activeCellFilterIndex = v.activeCellFilterIndex;
        //  i;
      }
    });
    bus.$on("TOGGLE_WHETHER_opensModalWindowToShowCardBigger", (v) => {
      this.opensModalWindowToShowCardBigger =
        !this.opensModalWindowToShowCardBigger;
      this.cardIndex4ModalWindow = v.cardIndex4ModalWindow;
      this.cardHight4ModalWindow = v.cardHight4ModalWindow;
    });
  },
  computed: {
    ...mapState("dashboard", [
      "mode2EditCBProfileReg",
      "clearsCache4APIResponseDataWithDashboardMounted",
      "removesCachedItemWithEachBannerOrCardMounted",
      "verbose",
      "cacheAPI",

      "example",
      "masterProfile4Employees",

      "jMyCBProfileTmp",
      "jReserve4MyCBProfileReg",
      "jMyCBProfileReg",

      "defaultDelta4BaseDate",
    ]),

    ...mapGetters("auth", ["getIsJustLoggedIn", "getUserConfig"]),

    countOfBanners: function () {
      let count = 0;
      try {
        count = this.myCBProfileTmp.banners.length;
      } catch (error) {
        // throw new Error(error);
        error.clear;
      }
      return count;
    },
    countOfCards: function () {
      let count = 0;
      try {
        count = this.myCBProfileTmp.cards.length;
      } catch (error) {
        // throw new Error(error);
        error.clear;
      }
      return count;
    },

    gutterOption: function () {
      let gutterOptions = [
        {
          bannerHight: 98,
          cardHight: 438,
          cardMaxWidth: 1264,
          bannerMaxWidth: 632,
          eachPadding: "pa-1",
        },

        {
          bannerHight: 103,
          cardHight: 420,
          cardMaxWidth: 1258,
          bannerMaxWidth: 629,
          eachPadding: "pa-2",
        },
        {
          bannerHight: 103,
          cardHight: 396,
          cardMaxWidth: 1258,
          bannerMaxWidth: 629,
          eachPadding: "pa-2",
        },
      ];

      return gutterOptions[0];
    },
  },
  watch: {
    jMyCBProfileTmp: function (n) {
      this.myCBProfileTmp = JSON.parse(n) || "{}";

      if (!this.mode2EditCBProfileReg) {
        this.updateWorkingProfileWithTemp(); // 내_운용프로파일을_서버로_올려_동기화
      }
    },

    jMyCBProfileReg: function (n) {
      this.setJMyCBProfileTmp(n);
    },
  },

  mounted() {
    if (this.getIsJustLoggedIn) {
      localStorage.clear(); // 매 인증 직후 캐시 초기화하도록 함
      setTimeout(() => {
        localStorage.setItem("isJustLoggedIn", true);
      }, 0);
      this.setIsJustLoggedIn(false);
    }
    let isJustLoggedIn = localStorage.getItem("isJustLoggedIn") || "";
    // if (isJustLoggedIn !== "" && this.userConfig.startBoardID !== null) {
    if (isJustLoggedIn && this.userConfig.startBoardID !== null) {
      this.fetchProfile(this.userConfig.startBoardID);
      localStorage.removeItem("isJustLoggedIn");
    } else {
      this.fetchProfile(this.userConfig.boardId); // 내_운용프로파일_가져오기
    }
    this.setMode2EditCBProfileReg(false);
    //마운트시 저장된 기본프로파일 읽어오고 편집모드 해제

    this.hctef_menu(!false); //http://10.203.13.204:8241/api/v1/code/menu
    this.hctef_organization(!false); //http://10.203.13.204:8241/api/v1/code/org

    this.myCBProfileTmp = JSON.parse(this.jMyCBProfileTmp) || "";

    if (this.clearsCache4APIResponseDataWithDashboardMounted) {
      localStorage.clear();
    }
    let date = new Date();
    let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    let dateISOString = new Date(date.getTime() - offset)
      .toISOString()
      .substring(0, 10);
    // let dateISOString = new Date().toISOString().substring(0, 10);
    let dateCached = localStorage.getItem("dateCached") || "";

    if (dateCached !== dateISOString) {
      localStorage.clear();
      localStorage.setItem("dateCached", dateISOString);
    }

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<!-- <style scoped>
::v-deep .v-expansion-panel--active > .v-expansion-panel-header {
  color: white !important;
  font-size: x-large !important;
  /* font-weight: bolder !important; */
  background-color: #03a9f4 !important;
}
::v-deep .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style> -->
<style scoped>
:deep(.v-expansion-panel--active > .v-expansion-panel-header) {
  color: white !important;
  font-size: x-large !important;
  /* font-weight: bolder !important; */
  background-color: #03a9f4 !important;
}
:deep(.v-expansion-panel-content__wrap) {
  padding: 0 !important;
}
/* html {
  overflow-y: scroll;
} */
/* .dsbd {
  overflow-y: scroll;
} */
/* html {
  overflow-y: hidden;
} */
</style>
