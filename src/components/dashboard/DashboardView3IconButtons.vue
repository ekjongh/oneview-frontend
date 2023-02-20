<template>
  <div
    class="yellow_ d-flex justify-end align-center pt-2 pr-1 mr-n1"
    class__="yellow_ d-flex justify-space-between align-center"
    :style="{
      height: '30px',
      // height: height + 'px',
      // marginTop: marginTop + 'px',
    }"
  >
    <!-- {{ affectsProfile }} -->

    <div
      v-if="mode2EditCBProfileReg"
      v_-show="!opensDrawer4CellFilter"
      class="d-flex flex-column_ justify-space-between align-center ml-10"
      :style="{
        width: '100%',
      }"
    >
      <div>
        <v-tooltip v-if="false" bottom color_="green darken-4">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :disabled="cardIndex < 1"
              class="mt-n1"
              icon
              small
              outlined_
              color="indigo"
              elevation="4"
              @click="
                () => {
                  if (wildOneKind == 'banner') {
                    let left = [
                      ...myCBProfileTmp.banners.slice(cardIndex - 1, cardIndex),
                    ][0];
                    let duplicate = [
                      ...myCBProfileTmp.banners.slice(cardIndex, cardIndex + 1),
                    ][0];
                    let newTmp = {
                      ...myCBProfileTmp,
                      banners: [
                        ...myCBProfileTmp.banners.slice(0, cardIndex - 1),
                        duplicate,
                        left,
                        ...myCBProfileTmp.banners.slice(
                          cardIndex + 1,
                          myCBProfileTmp.banners.length
                        ),
                      ],
                    };
                    setJMyCBProfileTmp(JSON.stringify(newTmp));
                  } else {
                    let left = [
                      ...myCBProfileTmp.cards.slice(cardIndex - 1, cardIndex),
                    ][0];
                    let duplicate = [
                      ...myCBProfileTmp.cards.slice(cardIndex, cardIndex + 1),
                    ][0];
                    let newTmp = {
                      ...myCBProfileTmp,
                      cards: [
                        ...myCBProfileTmp.cards.slice(0, cardIndex - 1),
                        duplicate,
                        left,
                        ...myCBProfileTmp.cards.slice(
                          cardIndex + 1,
                          myCBProfileTmp.cards.length
                        ),
                      ],
                    };
                    setJMyCBProfileTmp(JSON.stringify(newTmp));
                  }
                }
              "
            >
              <!-- <v-icon>mdi-chevron-left</v-icon>    -->
              <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>
          </template>
          <span>앞쪽과 자리바꿈</span>
        </v-tooltip>
      </div>
      <div v-if="!false">
        <!-- 일련번호 -->
        <!-- <v-icon v-if="verbose" class="text-h4 text--disabled mt-n1 mr-5"
          >{{ cardIndex + 1 }}/{{
            wildOneKind == "banner"
              ? myCBProfileTmp.banners.length
              : myCBProfileTmp.cards.length
          }}</v-icon
        > -->
        <!-- 삭제 -->
        <v-tooltip bottom color_="green darken-4">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :disabled_="isUniqueKindredCell"
              class="mt-n1"
              icon
              small
              outlined_
              color="indigo"
              elevation="4"
              @click="
                () => {
                  deleteCell();
                }
              "
            >
              <v-icon>mdi-minus-thick</v-icon>
            </v-btn>
          </template>
          <span>
            {{ wildOneKind == "banner" ? "배너 삭제" : "카드 삭제" }}
          </span>
        </v-tooltip>
        <!-- 추가 -->
        <v-tooltip bottom color_="green darken-4">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="mt-n1"
              icon
              small
              outlined_
              color="indigo"
              elevation="4"
              @click="
                () => {
                  duplicateAndAddCell();
                }
              "
            >
              <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
          </template>
          <span>
            <!-- {{
              wildOneKind == "banner"
                ? "이 배너 복사하여 뒤에 추가"
                : "이 카드 복사하여 뒤에 추가"
            }} -->
            <!-- 이 자리에 {{ wildOneKind == "banner" ? "배너" : "카드" }} 복제 -->
            같은 {{ wildOneKind == "banner" ? "배너" : "카드" }} 추가
          </span>
        </v-tooltip>
        <!-- 필터설정 -->
        <!-- 조건 설정 -->
        <v-tooltip bottom color_="green darken-4" disabled_>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="opensDrawer4CellFilter"
              v-bind="attrs"
              v-on="on"
              class="mt-n1 mr-10"
              icon
              small
              outlined_
              color="indigo"
              elevation="4"
              @click_="
                () => {
                  $emit('TOGGLE_WHETHER_opensDrawer4CellFilter');
                }
              "
              @click="handleClick2Emit_TOGGLE_WHETHER_opensDrawer4CellFilter"
            >
              <v-icon> mdi-image-filter-vintage </v-icon>
            </v-btn>
          </template>
          <span>
            <!-- 필터 -->
            {{ wildOneKind == "banner" ? "배너 설정" : "카드 설정" }}
            <!-- 조건 설정 -->
          </span>
        </v-tooltip>
        <!-- <v-btn>dlg</v-btn> -->

        <!-- 자리바꿈 -->
        <v-tooltip v-if="!false" bottom color_="green darken-4">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              v-show="!isLastKindredCell"
              class_="mt-n2"
              class="mt-n1 ml-n10"
              icon
              small
              outlined_
              color="indigo"
              elevation="4"
              @dblclick_.stop="isOpenDialogWithListDraggable = true"
              @click="
                () => {
                  makeNeighborTransposition();
                }
              "
            >
              <v-icon>mdi-swap-horizontal-bold</v-icon>
            </v-btn>
          </template>
          <!-- <span>자리바꿈</span> -->
          뒤따른 이웃 {{ wildOneKind == "banner" ? "배너" : "카드" }}와 자리바꿈
        </v-tooltip>

        <v-dialog
          v-model="isOpenDialogWithListDraggable"
          scrollable
          persistent_
          max-width="500px"
          max-height_="500px"
        >
          <v-card color_="red" style_="background-color: rgba(0, 0, 0, 0.5)">
            <v-card-title>Select Country</v-card-title>
            <v-card-text style="height: 500px">
              <DashboardViewListDraggable></DashboardViewListDraggable
            ></v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="isOpenDialogWithListDraggable = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="isOpenDialogWithListDraggable = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-card-title>Select Country</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 500px">
              <v-radio-group v-model="dialogm1" column>
                <v-radio label="Bahamas, The" value="bahamas"></v-radio>
                <v-radio label="Bahrain" value="bahrain"></v-radio>
                <v-radio label="Bangladesh" value="bangladesh"></v-radio>
                <v-radio label="Barbados" value="barbados"></v-radio>
                <v-radio label="Belarus" value="belarus"></v-radio>
                <v-radio label="Belgium" value="belgium"></v-radio>
                <v-radio label="Belize" value="belize"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="isOpenDialogWithListDraggable = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="isOpenDialogWithListDraggable = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <v-row class="red_ mr-0" v-else>
      <!-- <v-hover v-if="wildOneKind !== 'banner'" v-slot="{ hover }" disabled_>
        <v-card
          :class="
            !opensDrawer4CellFilter && hover ? 'elevation-4' : 'elevation-0'
          "
          :style="{
            padding: '1px',
            border:
              !opensDrawer4CellFilter && hover
                ? '1px solid AliceBlue'
                : '1px solid transparent',
            borderRadius: '50%',
            backgroundColor:
              !opensDrawer4CellFilter && hover ? 'AliceBlue' : 'transparent',
          }"
        >
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :disabled="opensDrawer4CellFilter"
                v-bind="attrs"
                v-on="on"
                :style_="{
                  opacity: !opensDrawer4CellFilter && hover ? 1 : 0.1,
                }"
                :style="{ opacity: !opensDrawer4CellFilter && hover ? 1 : 0.5 }"
                :color_="
                  wildOneKind == 'banner' && !hover ? 'transparent' : 'indigo'
                "
                color__="indigo"
                :color="wildOneKind == 'banner' && !hover ? 'white' : 'green'"
                elevation="0"
                @click="
                  () => {
                    $emit('TOGGLE_WHETHER_opensDrawer4CellFilter');
                  }
                "
              >
                mdi-microsoft-excel
              </v-icon>
            </template>
            <span>
              {{ wildOneKind == "banner" ? "데이터 내려받기" : "데이터 내려받기" }}
            </span>
          </v-tooltip>
        </v-card>
      </v-hover> -->

      <v-hover v-slot="{ hover }" disabled_>
        <v-card
          :class="
            !opensDrawer4CellFilter && hover ? 'elevation-4' : 'elevation-0'
          "
          :style="{
            // padding: '1px',
            // border:
            //   !opensDrawer4CellFilter && hover
            //     ? '1px solid AliceBlue'
            //     : '1px solid transparent',
            // borderRadius: '50%',
            // backgroundColor:
            //   !opensDrawer4CellFilter && hover ? 'AliceBlue' : 'transparent',
            paddingRight: '2px',
            marginTop: '-4px',
            opacity: !opensDrawer4CellFilter && hover ? 0.8 : 1,
            padding: '1px',
            // border:
            //   !opensDrawer4CellFilter && hover
            //     ? '1px solid indigo'
            //     : '1px solid transparent',
            borderRadius: '50%',
            backgroundColor:
              !opensDrawer4CellFilter && hover ? 'transparent' : 'transparent',
          }"
        >
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :disabled="opensDrawer4CellFilter"
                v-bind="attrs"
                v-on="on"
                :style_="{
                  opacity: !opensDrawer4CellFilter && hover ? 1 : 0.1,
                }"
                :style="{
                  opacity: !opensDrawer4CellFilter && hover ? 1 : 0.5,
                }"
                :color_="
                  wildOneKind == 'banner' && !hover ? 'transparent' : 'indigo'
                "
                color__="indigo"
                :color="wildOneKind == 'banner' ? 'white' : 'indigo'"
                elevation="0"
                @click_="
                  () => {
                    $emit('TOGGLE_WHETHER_opensDrawer4CellFilter');
                  }
                "
                @click="handleClick2Emit_TOGGLE_WHETHER_opensDrawer4CellFilter"
              >
                <!-- mdi-form-dropdown -->
                <!-- mdi-settings-helper -->
                <!-- mdi-dots-vertical -->
                mdi-image-filter-vintage
              </v-icon>
            </template>
            <span>
              <!-- 필터 -->
              <!-- 보기 설정 -->
              {{ wildOneKind == "banner" ? "배너 설정" : "카드 설정" }}
              <!-- 조건 설정 -->
            </span>
          </v-tooltip>
          <!-- </v-btn> -->
        </v-card>
      </v-hover>
    </v-row>
  </div>
</template>

<script>
//
//     <보기모드에서>
//  O 쿠키를 저장소로 사용하지 않고 프로파일 저장소는 서버 하나로 한다. F5(새로고침)때는 서버로부터 프로파일을 다시 가져온다. 채택
//  x 보기모드에서의 필터 변경은, F5(새로고침) 하기 전까지만, 주기적으로 데이터 가져오는 데 적용된다. 채택않음
//  O 보기모드에서의 필터 변경은, F5(새로고침) 하더라도, 다음 로그아웃 때까지 주기적으로 데이터 가져오는 데 계속 적용된다. 채택
//  O 보기모드에서의 필터 변경은, 별도의 편집모드의 행위(저장 및 지정)가 없다면 로그아웃시 폐기된다. 채택
//  O F5(새로고침)에도 현프로파일을 유지하고 싶다면 서버에, 다음 1번도 제공한다. 채택
//      '0-0. 해당계정권한의권장프로파일':
//      '0-1. 내로그인프로파일': 1~5중 지정한다. 없다면 0-0이 지정딘다.
//      '0-1. 현행프로파일': 로그인 이후, 보기모드에서 변경하며 사용중인 프로파일
//      '1~5. 다른이름으로저장된프로파일': 개인에게 5개까지 저장할 수 있도록 한다.
//
//     <편집모드에서>
//  O 프로파일 초기화: 커스텀 프로파일을 지운다. (이후, API서버에는 커스텀 프로파일이 없으므로 해당계정권한의 권장프로파일을 보내준다.)
//  O 로그인 시점의 프로파일로 돌아가기: 기존 내로그인프로파일 가져온다.
//  O 편집한 커스텀프로파일 취소: F5(새로고침)를 누른 것과 같이, 보기모드에서 변경하며 사용중인 현행프로파일 가져온다.
//  O 커스텀프로파일 저장: 기본적으로 현재 사용중인 프로파일(로그인 이후 바꾸지 않았다면 '내로르인프로파일')에 저장, 원할 경우 다른 이름으로 저장.
//  O 저장한 프로파일 불러오기: 향후 제공
//  O 내 로그인 프로파일로 지정: 서버에 저장딘 프로파일 중, 이렇게 지정딘 프로파일이 다음 로그인 할 때 적용된다.
//
// Custom Built Profile에서 myCBProfile로 작명.
// 초기 구현코드에서는 일단 3개(myCBProfileTmp, myCBProfileReg, myCBProfileGvn)만 표현하기로.
// myCBProfileTmp  새 세션과 함께 생성되고 보기모드에서 필터 변경시 함께 변경됨.
//            계정생성직후 최초 로그인한 세션이라면 myCBProfileGvn의 복사본.
//            아니면, 이전 세션들에서 등록해둔 myCBProfileReg의 복사본.
// myCBProfileGvn  DB에 개인별 저장한 것을 사용하는 것이 아니라. 해당 상황(계정/권한 조건)에 맞게 생성해줌.
// myCBProfileReg  편집모드로 들어가 명시적 저장 의사 표현시 등록및 업데이트됨.
//                 다른이름으로 저장하기와 선택적 불러오기를 지원하기로 한다면,
//                 myCBProfileRegs[]의 원소들과 myCBProfileGvn 중 하나에 '로그인할때사용할프로파일로지정' 플래그 지정하여 사용.
//                 더 나아가, sharedCBProfilePool에서 복사본을 myCBProfileRegs[]에 등록할 수 있고 반대도 가능.
//
import { bus } from "@/event-bus";
import { mapState } from "vuex";
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";
import DashboardViewListDraggable from "@/components/dashboard/DashboardViewListDraggable.vue";
export default {
  mixins: [DashboardViewMixin],
  components: { DashboardViewListDraggable },
  props: {
    // opensDrawer4CellFilter: {
    //   type: Boolean,
    //   default: false,
    // },
    cardIndex: {
      type: Number,
      default: null,
    },
    cardCount: {
      type: Number,
      default: null,
    },

    wildOne: {},
    wildOneKind: {
      type: String,
      default: "banner",
    },

    // intoTitleBar: {
    //   type: Boolean,
    //   default: false,
    // },
    opensModalWindowToShowCardBigger: {
      type: Boolean,
      default: false,
    },
    opensDrawer4CellFilter: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isOpenDialogWithListDraggable: false,
    myCBProfileTmp: {},
    reserve4MyCBProfileReg: {},
    myCBProfileReg: {},

    affectsProfile: false,

    // affectsProfile: this.$isMode2EditCBProfileReg,
    dialogm1: false,
  }),

  methods: {
    handleClick2Emit_TOGGLE_WHETHER_opensDrawer4CellFilter() {
      bus.$emit("TOGGLE_WHETHER_opensDrawer4CellFilter", {
        activeCellFilterKind: this.wildOneKind,
        activeCellFilterIndex: this.cardIndex,
      });
    },
    makeNeighborTransposition() {
      if (this.wildOneKind == "banner") {
        let right = [
          ...this.myCBProfileTmp.banners.slice(
            this.cardIndex + 1,
            this.cardIndex + 2
          ),
        ][0];
        let duplicate = [
          ...this.myCBProfileTmp.banners.slice(
            this.cardIndex,
            this.cardIndex + 1
          ),
        ][0];
        let newTmp = {
          ...this.myCBProfileTmp,
          banners: [
            ...this.myCBProfileTmp.banners.slice(0, this.cardIndex),
            right,
            duplicate,
            ...this.myCBProfileTmp.banners.slice(
              this.cardIndex + 2,
              this.myCBProfileTmp.banners.length
            ),
          ],
        };
        this.setJMyCBProfileTmp(JSON.stringify(newTmp));
      } else {
        let right = [
          ...this.myCBProfileTmp.cards.slice(
            this.cardIndex + 1,
            this.cardIndex + 2
          ),
        ][0];
        let duplicate = [
          ...this.myCBProfileTmp.cards.slice(
            this.cardIndex,
            this.cardIndex + 1
          ),
        ][0];
        let newTmp = {
          ...this.myCBProfileTmp,
          cards: [
            ...this.myCBProfileTmp.cards.slice(0, this.cardIndex),
            right,
            duplicate,
            ...this.myCBProfileTmp.cards.slice(
              this.cardIndex + 2,
              this.myCBProfileTmp.cards.length
            ),
          ],
        };
        this.setJMyCBProfileTmp(JSON.stringify(newTmp));
      }
    },
    deleteCell() {
      if (this.wildOneKind == "banner") {
        let newTmp = {
          ...this.myCBProfileTmp,
          banners: [
            ...this.myCBProfileTmp.banners.slice(0, this.cardIndex),
            // this.myCBProfileTmp.cards.slice(this.cardIndex, this.cardIndex + 1),
            ...this.myCBProfileTmp.banners.slice(
              this.cardIndex + 1,
              this.myCBProfileTmp.banners.length
            ),
          ],
          // cards: [],
          // hands: [],
        };
        this.setJMyCBProfileTmp(JSON.stringify(newTmp));
      } else {
        let newTmp = {
          ...this.myCBProfileTmp,
          // banners: [],
          cards: [
            ...this.myCBProfileTmp.cards.slice(0, this.cardIndex),
            // this.myCBProfileTmp.cards.slice(this.cardIndex, this.cardIndex + 1),
            ...this.myCBProfileTmp.cards.slice(
              this.cardIndex + 1,
              this.myCBProfileTmp.cards.length
            ),
          ],
          // hands: [],
        };
        this.setJMyCBProfileTmp(JSON.stringify(newTmp));
      }
    },
    duplicateAndAddCell() {
      if (this.wildOneKind == "banner") {
        let duplicate = [
          ...this.myCBProfileTmp.banners.slice(
            this.cardIndex,
            this.cardIndex + 1
          ),
        ][0];
        let newTmp = {
          ...this.myCBProfileTmp,
          banners: [
            ...this.myCBProfileTmp.banners.slice(0, this.cardIndex),
            // [...myCBProfileTmp.cards.slice(cardIndex, cardIndex + 1)][0],
            // [...myCBProfileTmp.cards.slice(cardIndex, cardIndex + 1)][0],
            duplicate,
            duplicate,
            ...this.myCBProfileTmp.banners.slice(
              this.cardIndex + 1,
              this.myCBProfileTmp.banners.length
            ),
          ],
          // cards: [],
          // hands: [],
        };
        // setMyCBProfileTmp(newTmp);

        this.setJMyCBProfileTmp(JSON.stringify(newTmp));
      } else {
        let duplicate = [
          ...this.myCBProfileTmp.cards.slice(
            this.cardIndex,
            this.cardIndex + 1
          ),
        ][0];
        let newTmp = {
          ...this.myCBProfileTmp,
          // banners: [],
          cards: [
            ...this.myCBProfileTmp.cards.slice(0, this.cardIndex),
            // [...myCBProfileTmp.cards.slice(cardIndex, cardIndex + 1)][0],
            // [...myCBProfileTmp.cards.slice(cardIndex, cardIndex + 1)][0],
            duplicate,
            duplicate,
            ...this.myCBProfileTmp.cards.slice(
              this.cardIndex + 1,
              this.myCBProfileTmp.cards.length
            ),
          ],
          // hands: [],
        };
        // setMyCBProfileTmp(newTmp);

        this.setJMyCBProfileTmp(JSON.stringify(newTmp));
      }
    },
    // ...mapMutations("dashboard", [
    //   "setMode2EditCBProfileReg",
    //   "addCacheAPI",
    //   // "setMyCBProfileTmp",
    //   // "setReserve4MyCBProfileReg",
    //   // "setMyCBProfileReg",
    //   "setJMyCBProfileTmp",
    //   "setJReserve4MyCBProfileReg",
    //   "setJMyCBProfileReg",
    // ]),
    // minus: () => {
    //   this.setMyCBProfileTmp({
    //     ...this.myCBProfileTmp,
    //     // banners: [],
    //     cards: [
    //       ...this.myCBProfileTmp.cards.slice(0, this.cardIndex),
    //       // this.myCBProfileTmp.cards.slice(this.cardIndex, this.cardIndex + 1),
    //       ...this.myCBProfileTmp.cards.slice(
    //         this.cardIndex + 1,
    //         this.myCBProfileTmp.cards.length
    //       ),
    //     ],
    //   });
    // },
    // plus: () => {
    //   // let duplicate = [
    //   //   ...this.myCBProfileTmp.cards.slice(this.cardIndex, this.cardIndex + 1),
    //   // ][0];
    //   this.setMyCBProfileTmp({
    //     ...this.myCBProfileTmp,
    //     // banners: [],
    //     cards: [
    //       ...this.myCBProfileTmp.cards.slice(0, this.cardIndex),
    //       ...this.myCBProfileTmp.cards.slice(this.cardIndex, this.cardIndex + 1),
    //       ...this.myCBProfileTmp.cards.slice(this.cardIndex, this.cardIndex + 1),
    //       ...this.myCBProfileTmp.cards.slice(
    //         this.cardIndex + 1,
    //         this.myCBProfileTmp.cards.length
    //       ),
    //     ],
    //   });
    // },
  },
  computed: {
    ...mapState("dashboard", [
      "mode2EditCBProfileReg",
      "clearsCache4APIResponseDataWithDashboardMounted",
      "removesCachedItemWithEachBannerOrCardMounted",
      "verbose",
      "cacheAPI",
      // "myCBProfileTmp",
      // "reserve4MyCBProfileReg",
      // "myCBProfileReg",
      "jMyCBProfileTmp",
      "jReserve4MyCBProfileReg",
      "jMyCBProfileReg",
      // "baseDate",
      "defaultDelta4BaseDate",
    ]),

    isUniqueKindredCell: function () {
      let r = false;
      try {
        r =
          this.wildOneKind == "banner"
            ? 1 == this.myCBProfileTmp.banners.length
            : 1 == this.myCBProfileTmp.cards.length;
      } catch (error) {
        // console.log(error);
      }
      return r;
    },
    isLastKindredCell: function () {
      let r = false;
      try {
        r =
          this.wildOneKind == "banner"
            ? this.cardIndex == this.myCBProfileTmp.banners.length - 1
            : this.cardIndex == this.myCBProfileTmp.cards.length - 1;
      } catch (error) {
        // console.log(error);
      }
      return r;
    },

    // height: function () {
    //   return this.wildOneKind == "banner" ? 40 : 40;
    // },
    // marginTop: function () {
    //   return this.intoTitleBar ? -2 * this.height : -this.height;
    //   // return "30";
    // },
  },

  watch: {
    jMyCBProfileTmp: function (n) {
      this.myCBProfileTmp = JSON.parse(n) || "{}";
    },
  },

  mounted() {
    this.myCBProfileTmp = JSON.parse(this.jMyCBProfileTmp) || "";

    this.reserve4MyCBProfileReg =
      JSON.parse(this.jReserve4MyCBProfileReg) || "";

    this.myCBProfileReg = JSON.parse(this.jMyCBProfileReg) || "";
  },
};
</script>

<style scoped>
.v-btn {
  background-color: AliceBlue !important;
}
/* .v-btn:before {
  opacity: 0 !important;
} */
/* .v-ripple__container {
  opacity: 0 !important;
} */
</style>
