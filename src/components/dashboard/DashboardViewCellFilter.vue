<!-- 

{"catIndicator":"VOC","catPresentationFormat":"월별추이","catProductService":"5G","catScope":"조별","group":"청량1조|청량2조","dates":"2023-01-01~2023-08-01","targetValue":"","title":"5G 품질VOC","caption":"청량1조 등 2곳"},  
http://10.220.230.193:8000/api/v1/voc/trend-month?prod=5G&code=조별&group=청량1조|청량2조&start_month=202101&end_month=202102
[
  {
    "date": "202101",
    "value": 1.9859,
    "voc_cnt": 7792,
    "sbscr_cnt": 3923718
  },
  {
    "date": "202102",
    "value": 1.644,
    "voc_cnt": 6837,
    "sbscr_cnt": 4158845
  }
]
http://10.220.230.193:8000/api/v1/voc/trend-item-month?prod=5G&code=조별&group=청량1조|청량2조&start_month=202101&end_month=202101
{
  "status": 500,
  "msg": "이 에러는 서버측 에러 입니다. 자동으로 리포팅 되며, 빠르게 수정하겠습니다.",
  "detail": "Internal Server Error",
  "code": "5000002"
}
http://10.220.230.193:8000/api/v1/voc/trend-item-month?prod=5G&code=팀별&group=강남엔지니어링부|전남엔지니어링부&start_month=202101&end_month=202101
[
  {
    "title": "전남엔지니어링부",
    "data": [
      {
        "date": "202101",
        "value": 1.9482,
        "voc_cnt": 356,
        "sbscr_cnt": 182736
      }
    ]
  },
  {
    "title": "강남엔지니어링부",
    "data": [
      {
        "date": "202101",
        "value": 1.7192,
        "voc_cnt": 249,
        "sbscr_cnt": 144835
      }
    ]
  }
]

 -->

<template>
  <v-card
    @mousedown="closeDatePicker"
    class="d-flex justify-space-around align-center pa-0 ma-0"
    elevation="0"
    :style="{
      backgroundColor: 'transparent',
    }"
  >
    <div>
      <v-card
        v-if="!false"
        elevation="24"
        :style="{
          // backgroundColor: 'blue',
          padding: '1px',
          border: '2px outset gray',
        }"
      >
        <v-card
          elevation="0"
          :style="{
            // backgroundColor: 'green',
            padding: '1px',
          }"
        >
          <v-card
            elevation="0"
            v-if="displaysDatePicker"
            light
            :style="{
              padding: '1px',
              // backgroundColor: 'red',
              marginLeft: isForBanner ? '0px' : '158px',
              marginTop: isForBanner ? '40px' : '40px',
            }"
            @mousedown="stopPropagation"
          >
            <v-date-picker
              v-if="!picksDateOnly1"
              :style="{
                height: '340px',
              }"
              v-model="candDates"
              no-title
              scrollable
              range
              locale="ko-KR"
              @input="
                () => {
                  candDates.sort();
                }
              "
              :type="
                selected4PresentationFormat == '월별추이' ? 'month' : 'date'
              "
            >
              <div
                class="text-no-wrap text-body-2 font-italic text--disabled"
                style="margin-left: 10px; margin-top: -30px; z-index: 1"
              >
                {{ candDateRangeText }}
              </div>
              <v-spacer></v-spacer>

              <v-btn
                class="mt-n8 ml-3"
                icon
                color="indigo lighten-2"
                @click="
                  () => {
                    dates = candDates;
                    this.displaysDatePicker = false;
                  }
                "
              >
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
              <v-btn
                light
                v-if="!false"
                class="mt-n8"
                icon
                color="blue-grey darken-3"
                @click="displaysDatePicker = false"
              >
                <v-icon>mdi-close-outline</v-icon>
              </v-btn>
            </v-date-picker>
            <v-date-picker
              v-else
              :style="{
                height: '340px',
              }"
              v-model="candDateOnly1"
              no-title
              scrollable
              locale="ko-KR"
              @input="
                () => {
                  candDates = [candDateOnly1, candDateOnly1];
                }
              "
            >
              <div
                class="text-no-wrap text-body-2 font-italic text--disabled"
                style="margin-left: 10px; margin-top: -30px; z-index: 1"
              >
                {{ candDateOnly1Text }}
              </div>
              <v-spacer></v-spacer>

              <v-btn
                class="mt-n8 ml-3"
                icon
                color="indigo lighten-2"
                @click="
                  () => {
                    dates = candDates;
                    this.displaysDatePicker = false;
                  }
                "
              >
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
              <v-btn
                light
                v-if="!false"
                class="mt-n8"
                icon
                color="blue-grey darken-3"
                @click="displaysDatePicker = false"
              >
                <v-icon>mdi-close-outline</v-icon>
              </v-btn>
            </v-date-picker>
          </v-card>
          <v-card
            class="d-flex flex-column justify-space-between align-center"
            flat
            tile
            :width="isForBanner ? '292px' : '450px'"
            height="156px"
            v-else
          >
            <v-card
              class="flat tile dark d-flex justify-space-between align-center"
              width="500px"
              flat
              tile
            >
              <v-tooltip
                v-if="
                  isForBanner &&
                  selected4Indicator == 'VOC' &&
                  setsDateRangeRelatively &&
                  relativeDateRangeText == '최근갱신일'
                "
                right
                color="green darken-4"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="mt-n2" dark v-bind="attrs" v-on="on">
                    <v-btn-toggle
                      shaped_
                      :style="{
                        borderRadius: '5px 5px 30px 5px',
                      }"
                    >
                      <v-btn
                        small
                        :class="
                          handlesSundayAsBetweenFridayAndSunday
                            ? 'pl-2 pr-5 text-overline'
                            : 'pl-2 pr-5 text-overline text-decoration-line-through'
                        "
                        @click="
                          handlesSundayAsBetweenFridayAndSunday =
                            !handlesSundayAsBetweenFridayAndSunday
                        "
                        color_="red"
                      >
                        <!-- 금토일 합산 평균 -->
                        <!-- 금토일 합산 -->
                        금토일 평균
                      </v-btn>
                    </v-btn-toggle>
                  </div>
                </template>

                <!-- 최근갱신일 설정에서, 주말 이후 월요일 아침에 금토일 합산 평균 보기 -->
                <!-- 주말 이후 월요일 아침에 금토일 합산 평균 보기 -->
                <!-- 최근갱신일 지정했을 때, 일요일 대신 금토일 합산 평균 보기 -->
                <!-- 최근갱신일 일요일 대신 금토일 합산 평균 보기 -->
                <!-- 최근갱신일이 일요일이면, 일요일 대신 금토일 합산 평균 보기   -->
                <!-- {{
                    handlesSundayAsBetweenFridayAndSunday
                      ? "상대날짜로 설정한 최근갱신일이 일요일이면, 금토일 합산 평균 보기"
                      : "금토일 합산 않음"
                  }} -->
                <!-- {{
                    handlesSundayAsBetweenFridayAndSunday
                      ? "(최근갱신일 상대날짜 설정시) 일요일 대신 금토일 합산 평균 보기"
                      : "금토일 합산 않음"
                  }} -->
                <!-- <span></span> -->

                <div v-if="handlesSundayAsBetweenFridayAndSunday">
                  <div class="text-caption">(최근갱신일 상대날짜 설정시)</div>
                  일요일 대신 금토일 합산 평균 보기
                </div>
                <div v-else>금토일 합산 않음</div>
              </v-tooltip>

              <!-- <v-text-field
                v-if="isForBanner && !false"
                v-model="candTargetValue"
                :rules="[
                  rules.required,
                  rules.decimalNumber,
                  // rules.downToThreePlacesOfDecimals,
                ]"
                label="목표값"
                @change-="
                  () => {
                    if (candTargetValue == '00') {
                      candTargetValue = '0';
                    }
                  }
                "
                counter_
                maxlength_="20"
              ></v-text-field> -->

              <v-spacer></v-spacer>

              <v-btn
                :disabled="
                  nodesSelected == null ||
                  nodesSelected.length < 1 ||
                  selected4Scope == null ||
                  selected4ProductService == null ||
                  selected4PresentationFormat == null ||
                  selected4Indicator == null ||
                  (setsDateRangeRelatively && relativeDateRangeText == null) ||
                  (!setsDateRangeRelatively && dates.length < 1)
                "
                dark
                color="indigo"
                :style="{ marginTop: '1px' }"
                @click="apply"
              >
                적용
              </v-btn>
              <v-btn
                text
                outlined
                color="blue-grey lighten-2"
                :style="{ marginTop: '1px' }"
                class="ml-1"
                @click="cancel"
              >
                취소
              </v-btn>
            </v-card>

            <v-card class="d-flex nowrap">
              <v-tooltip left color="green darken-4">
                <template v-slot:activator="{ on, attrs }">
                  <div class="지표" dark v-bind="attrs" v-on="on">
                    <v-menu
                      :close-on-content-click="!false"
                      :close-on-click="!false"
                      offset-y
                      rounded
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          tile
                          :style="{
                            height: '38px',
                            border:
                              selected4Indicator == null
                                ? '1px solid red'
                                : '1px solid snow',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                            textTransform: 'none',
                          }"
                          class="pl-2"
                          :width="isForBanner ? '146px' : '226px'"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div>{{ selected4Indicator }}</div>
                          <v-spacer></v-spacer>
                        </v-btn>
                      </template>

                      <v-list dense class="py-0">
                        <v-list-item
                          selected
                          class="py-0"
                          dense
                          :style="{
                            height: '5px',
                            backgroundColor:
                              selected4Indicator == item ? 'azure' : 'snow',
                          }"
                          @mousedown="
                            () => {
                              hndlMousedownOverflow(selected4Indicator);
                            }
                          "
                          @click="
                            () => {
                              selected4Indicator = item;
                              cleanUpSideEffects();
                            }
                          "
                          v-for="(item, index) in options4Indicator"
                          :key="index"
                        >
                          <v-list-item-title
                            :style="{
                              color: 'navy',
                              paddingTop: '0px',
                              fontSize: 'small',
                            }"
                            >{{ item }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
                <span>지표 분류</span>
              </v-tooltip>

              <v-card
                width="500px"
                class="flat tile dark d-flex justify-start align-center"
              >
                <v-spacer></v-spacer>
                <v-card
                  height="38px"
                  class="d-flex nowrap ma-0 pa-0 flat tile dark justify-space-between align-center"
                  flat
                  outlined
                  :style="{
                    border:
                      (setsDateRangeRelatively &&
                        relativeDateRangeText == null) ||
                      (!setsDateRangeRelatively && dates.length < 1)
                        ? '1px solid red'
                        : '1px solid snow',
                    borderRadius: '5px',
                    backgroundColor: 'black',
                  }"
                >
                  <v-tooltip
                    v-if="!setsDateRangeRelatively"
                    right
                    color="green darken-4"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <div class="기간선택" dark v-bind="attrs" v-on="on">
                        <v-btn
                          text
                          @click="
                            () => {
                              displaysDatePicker = !displaysDatePicker;
                              candDates = dates.sort();
                            }
                          "
                          class_="pl-0 pr-1 ma-0"
                          :style="{
                            paddingLeft: '8px',
                            paddingRight: '0px',
                            textAlign: 'left',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                          }"
                          :width="isForBanner ? '108px' : '186px'"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div
                            :style="{
                              paddingleft: '0px',
                            }"
                          >
                            {{ dateRangeText }}
                          </div>
                          <v-spacer></v-spacer>
                        </v-btn>
                      </div>
                    </template>
                    <span>기간 선택</span>
                  </v-tooltip>
                  <v-tooltip v-else right color="green darken-4">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="기간선택" dark v-bind="attrs" v-on="on">
                        <v-menu
                          :close-on-content-click="!false"
                          :close-on-click="!false"
                          offset-y
                          rounded
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-card class="d-flex justify-start align-center">
                              <v-btn
                                text
                                :style="{
                                  paddingLeft: '8px',
                                  textAlign: 'left',
                                  borderRadius: '5px',
                                  backgroundColor: 'black',
                                }"
                                :width="isForBanner ? '108px' : '186px'"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                <div
                                  :style="{
                                    paddingleft: '0px',
                                  }"
                                >
                                  {{ relativeDateRangeText }}
                                </div>
                                <v-spacer></v-spacer>
                              </v-btn>
                              <v-spacer></v-spacer>
                            </v-card>
                          </template>
                          <v-list dense class="py-0">
                            <v-list-item
                              class="py-0"
                              dense
                              :style="{
                                height: '5px',
                                backgroundColor:
                                  relativeDateRangeText == item
                                    ? 'azure'
                                    : 'snow',
                              }"
                              @mousedown="
                                () => {
                                  hndlMousedownOverflow(relativeDateRangeText);
                                }
                              "
                              @click="
                                () => {
                                  relativeDateRangeText = item;
                                }
                              "
                              v-for="(item, index) in options4RelativeDateRange"
                              :key="index"
                            >
                              <v-list-item-title
                                class="text-right_"
                                :style="{
                                  color: 'navy',
                                  paddingTop: '0px',
                                  fontSize: 'small',
                                }"
                              >
                                {{ item }}
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </template>
                    <span>기간 선택</span>
                  </v-tooltip>
                  <v-tooltip right color="green darken-4">
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        class="기간"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        :style="{
                          margin: '0px',
                          border: null,
                        }"
                      >
                        <v-btn
                          @click="
                            () => {
                              setsDateRangeRelatively =
                                !setsDateRangeRelatively;
                              if (setsDateRangeRelatively && isForBanner) {
                                relativeDateRangeText = '최근갱신일';
                              }
                            }
                          "
                          icon
                        >
                          <v-icon v-if="setsDateRangeRelatively">
                            mdi-calendar-minus-outline
                          </v-icon>
                          <v-icon v-else> mdi-calendar-month-outline</v-icon>
                        </v-btn>
                      </div>
                    </template>
                    <span>
                      {{ setsDateRangeRelatively ? "상대 날짜" : "고정 날짜" }}
                    </span>
                  </v-tooltip>
                </v-card>
              </v-card>
            </v-card>
            <v-card
              class_="d-flex nowrap"
              height="38px"
              class="d-flex nowrap ma-0 pa-0 flat tile dark justify-space-between align-center"
            >
              <v-tooltip left color="green darken-4">
                <template v-slot:activator="{ on, attrs }">
                  <div class="양식" dark v-bind="attrs" v-on="on">
                    <v-menu
                      :close-on-content-click="!false"
                      :close-on-click="!false"
                      offset-y
                      rounded
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-if="!isForBanner"
                          text
                          tile
                          :style="{
                            border:
                              selected4PresentationFormat == null
                                ? '1px solid red'
                                : '1px solid snow',
                            borderRadius: '5px',
                            backgroundColor: 'black',
                          }"
                          class="pl-2"
                          :width="isForBanner ? '146px' : '226px'"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ selected4PresentationFormat }}

                          <v-spacer></v-spacer>
                        </v-btn>
                      </template>
                      <v-list dense class="py-0">
                        <v-list-item
                          class="py-0"
                          dense
                          :style="{
                            height: '5px',
                            backgroundColor:
                              selected4PresentationFormat == item
                                ? 'azure'
                                : 'snow',
                            textTransform: 'none',
                          }"
                          @mousedown="
                            () => {
                              hndlMousedownOverflow(
                                selected4PresentationFormat
                              );
                            }
                          "
                          @click="
                            () => {
                              selected4PresentationFormat = item;
                              cleanUpSideEffects();
                            }
                          "
                          v-for="(item, index) in options4PresentationFormat"
                          :key="index"
                        >
                          <v-list-item-title
                            :style="{
                              color: 'navy',
                              paddingTop: '0px',
                              fontSize: 'small',
                            }"
                            >{{ item }}</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
                <span>표현 양식</span>
              </v-tooltip>
              <!-- </v-card>
            <v-card
              class_="d-flex nowrap"
              height="38px"
              class="d-flex nowrap ma-0 pa-0 flat tile dark justify-space-between align-center"
            > -->
              <v-tooltip
                :disabled="selected4PresentationFormat == null"
                left
                color="green darken-4"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="상품" dark v-bind="attrs" v-on="on">
                    <v-menu
                      :close-on-content-click="!false"
                      :close-on-click="!false"
                      offset-y
                      rounded
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          tile
                          :disabled="selected4PresentationFormat == null"
                          :style="{
                            border:
                              selected4ProductService == null
                                ? selected4PresentationFormat == null
                                  ? '1px solid indianred'
                                  : '1px solid red'
                                : '1px solid snow',
                            borderRadius: '5px',
                            backgroundColor:
                              selected4ProductService == null
                                ? selected4PresentationFormat == null
                                  ? 'darkgray'
                                  : 'black'
                                : 'black',
                            textTransform: 'none',
                          }"
                          class="pl-2"
                          outlined
                          widt_h="112px"
                          :width="isForBanner ? '146px' : '112px'"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div>{{ selected4ProductService }}</div>
                          <v-spacer></v-spacer>
                        </v-btn>
                      </template>
                      <v-list dense class="py-0">
                        <v-list-item
                          class="py-0"
                          dense
                          :style="{
                            height: '5px',
                            backgroundColor:
                              selected4ProductService == item
                                ? 'azure'
                                : 'snow',
                          }"
                          @mousedown="
                            () => {
                              hndlMousedownOverflow(selected4ProductService);
                            }
                          "
                          @click="
                            () => {
                              selected4ProductService = item;
                            }
                          "
                          v-for="(item, index) in options4Product"
                          :key="index"
                        >
                          <v-list-item-title
                            :style="{
                              color: 'navy',
                              paddingTop: '0px',
                              fontSize: 'small',
                            }"
                            >{{ item }}</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
                <span>상품, 서비스 통계</span>
              </v-tooltip>

              <v-tooltip
                :disabled="selected4PresentationFormat == null"
                right
                color="green darken-4"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="범위" dark v-bind="attrs" v-on="on">
                    <v-menu
                      :close-on-content-click="!false"
                      :close-on-click="!false"
                      offset-y
                      rounded
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          tile
                          :disabled="selected4PresentationFormat == null"
                          :style="{
                            border:
                              selected4Scope == null
                                ? selected4PresentationFormat == null
                                  ? '1px solid indianred'
                                  : '1px solid red'
                                : '1px solid snow',
                            borderRadius: '5px',
                            backgroundColor:
                              selected4Scope == null
                                ? selected4PresentationFormat == null
                                  ? 'darkgray'
                                  : 'black'
                                : 'black',
                            textTransform: 'none',
                          }"
                          class="pl-2"
                          outlined
                          :width="isForBanner ? '146px' : '112px'"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div>{{ selected4Scope }}</div>
                          <v-spacer></v-spacer>
                        </v-btn>
                      </template>
                      <v-list dense class="py-0">
                        <v-list-item
                          class="py-0"
                          dense
                          :style="{
                            height: '5px',
                            backgroundColor:
                              selected4Scope == item ? 'azure' : 'snow',
                          }"
                          @mousedown="
                            () => {
                              hndlMousedownOverflow(selected4Scope);
                            }
                          "
                          @click="
                            () => {
                              if (selected4Scope !== item) {
                                nodesSelected = null;
                              }
                              selected4Scope = item;

                              followScopeWithNode();
                            }
                          "
                          v-for="(item, index) in options4Scope"
                          :key="index"
                        >
                          <v-list-item-title
                            :style="{
                              color: 'navy',
                              paddingTop: '0px',
                              fontSize: 'small',
                            }"
                            >{{ item }}</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>

                <!-- <span>지역 기타</span> -->
                <span>조직, 지역</span>
              </v-tooltip>
            </v-card>
            <div
              :style="{
                border:
                  nodesSelected == null || nodesSelected.length < 1
                    ? '1px solid red'
                    : '1px solid snow',
                borderRadius: '5px',
                height: '38px',
              }"
            >
              <!-- <treeselect
                :disabled="selected4Scope == null"
                noOptionsText="데이터 없음"
                noResultsText="검색된 내용 없음"
                v-if="!false"
                :default-expand-level="defaultExpandLevel"
                placeholder_="검색어를 입력하거나 항목을 선택합니다"
                placeholder=""
                :style="{
                  color: 'navy',
                  fontSize: 'small',
                  innerHeight: '200px',
                }"
                v-model="nodesSelected"
                :multiple="enablesMultipleChoiceTree"
                :disable-branch-nodes="true"
                :valueConsistsOf_="LEAF_PRIORITY"
                :valueConsistsOf__="BRANCH_PRIORITY"
                :valueConsistsOf="ALL_WITH_INDETERMINATE"
                :options="optionsLeft"
                :clearable="true"
                :searchable="true"
                :clear-on-select="true"
                :rules_="rules4NodesSelected"
                :error="nodesSelected == null"
                sort-value-by="LEVEL"
                required_
              /> -->

              <treeselect
                :disabled_="selected4Scope == null || selected4Scope == '전국'"
                :disabled="selected4Scope == null"
                noOptionsText="데이터 없음"
                noResultsText="검색된 내용 없음"
                v-if="!false"
                :default-expand-level="defaultExpandLevel"
                placeholder_="검색어를 입력하거나 항목을 선택합니다"
                placeholder=""
                :style="{
                  color: 'navy',
                  fontSize: 'small',
                  innerHeight: '200px',
                }"
                v-model="nodesSelected"
                :multiple="enablesMultipleChoiceTree"
                :disable-branch-nodes="true"
                :options="optionsLeft"
                :clearable="true"
                :searchable="true"
                :clear-on-select="true"
                :error="nodesSelected == null"
                sort-value-by="LEVEL"
                :load-options_="() => {}"
                loadingText_=""
                noChildrenText=""
              />
            </div>
          </v-card>
        </v-card>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";

// import HierarchicalSelect from "vue-hierarchical-select";
import Treeselect from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import "@/views/vue-treeselect.css";
import "@/components/dashboard/vue-treeselect.css";

export default {
  mixins: [DashboardViewMixin],
  props: {
    menuItems: [],
    optionsByLevel: {},

    isOnModal: {
      type: Boolean,
      default: false,
    },
    isForBanner: {
      type: Boolean,
      default: false,
    },
    cellIndex: {
      type: Number,
      default: null,
    },
    wildOne: {},
  },
  components: {
    Treeselect,
  },

  data: () => ({
    // menuItems: [],
    // optionsByLevel: {},

    handlesSundayAsBetweenFridayAndSunday: false,
    toggle_exclusive: 0,
    candTargetValue: "",
    afterMounting: false,
    relativeDateRangeText: null,
    selected4Indicator: null,

    // selected4PresentationFormat: "일별추이",
    selected4PresentationFormat: null,

    selected4ProductService: "5G",

    selected4Scope: "조별",

    myCBProfileTmp: {},
    reserve4MyCBProfileReg: {},
    myCBProfileReg: {},
    dates: [],
    candDates: [],
    candDateOnly1: null,
    displaysDatePicker: false,

    nodesSelected: null,

    opensDrawer4CellFilter: false,
    setsDateRangeRelatively: false,

    rules: {
      required: (value) => !!value || "필수 입력",
      decimalNumber: (value) => !isNaN(value) || "십진소수 입력 가능",
      downToThreePlacesOfDecimals: (value) =>
        value.split(".")[1].length < 4 || "소수점 셋째 자리까지 입력 가능",
    },
  }),

  methods: {
    followScopeWithNode() {
      if (this.selected4Scope == "전국") {
        this.nodesSelected = ["전국"];
      }
    },

    cleanUpSideEffects() {
      if (
        !new Set(this.options4RelativeDateRange).has(this.relativeDateRangeText)
      ) {
        if (this.options4RelativeDateRange.length == 1) {
          this.relativeDateRangeText = this.options4RelativeDateRange[0];
        } else {
          this.relativeDateRangeText = null;
        }
      }

      if (
        !new Set(this.options4PresentationFormat).has(
          this.selected4PresentationFormat
        )
      ) {
        if (this.options4PresentationFormat.length == 1) {
          this.selected4PresentationFormat = this.options4PresentationFormat[0];
        } else {
          this.selected4PresentationFormat = null;
        }
      }

      if (!new Set(this.options4Product).has(this.selected4ProductService)) {
        if (this.options4Product.length == 1) {
          this.selected4ProductService = this.options4Product[0];
        } else {
          this.selected4ProductService = null;
        }
      }

      if (!new Set(this.options4Scope).has(this.selected4Scope)) {
        if (this.options4Scope.length == 1) {
          this.selected4Scope = this.options4Scope[0];
        } else {
          this.selected4Scope = null;
          this.nodesSelected = null;
        }
      }

      // this.nodesSelected = null;
      // if (!new Set(this.optionsLeft).has(this.nodesSelected)) {
      //   if (this.optionsLeft.length == 1) {
      //     this.nodesSelected = this.optionsLeft[0];
      //   } else {
      //     this.nodesSelected = null;
      //   }
      // }
    },

    stopPropagation(event) {
      event.stopPropagation();
    },
    closeDatePicker() {
      this.displaysDatePicker = false;
    },
    hndlMousedownOverflow(mouseWhere) {
      if (mouseWhere == "in-date-picker-canvas") {
        // console.log(mouseWhere);
      }
      // this.nodesSelected = null;
      this.$emit("SAYS_THIS_CLICK_IS_NOT_OUTSIDE");
    },
    apply() {
      // alert(this.cellIndex);
      let key4Cells = this.isForBanner ? "banners" : "cards";
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
        // dates: this.dateRangeText,
        dates: this.setsDateRangeRelatively
          ? this.relativeDateRangeText
          : this.dateRangeText,
        catIndicator: this.selected4Indicator,

        // catPresentationFormat: this.selected4PresentationFormat,

        catPresentationFormat: this.isForBanner
          ? "일별추이"
          : this.selected4PresentationFormat,

        // catPresentationFormat: this.isForBanner
        //   ? "일별추이|전주대비지표"
        //   : this.selected4PresentationFormat,
        // // catPresentationFormat: this.isForBanner
        // //   ? this.wildOne.catPresentationFormat == "일별추이|전주대비지표"
        // //     ? "일별추이|목표대비지표"
        // //     : "일별추이|전주대비지표"
        // //   : this.selected4PresentationFormat,
        // // // todo. 드롭다운선택박스에서 선택하지 않고 체크박스붙은텍스트필드에 체크되었을 때 "일별추이|전주대비지표" 대신 "일별추이|목표대비지표"를 catPresentationFormat로 삼는다

        catProductService: this.selected4ProductService,
        catScope: this.selected4Scope,

        // group: this.nodesSelected,
        // group: this.nodesSelected.join("|"),
        group: this.enablesMultipleChoiceTree
          ? this.nodesSelected.join("|")
          : this.nodesSelected,

        // caption: duplicate.title + " / " + this.nodesSelected,
        targetValue: this.candTargetValue,

        handlesSundayAsBetweenFridayAndSunday:
          this.handlesSundayAsBetweenFridayAndSunday,
      };

      changed = { ...changed, ...this.titleAndCaptionAsDefault(changed) };
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
      this.$emit("CLICK_APPLY", this.nodesSelected);
    },
    cancel() {
      this.$emit("CLICK_CANCEL", this.nodesSelected);
    },
  },

  watch: {
    mode2EditCBProfileReg: function (n) {
      if (n) {
        this.opensDrawer4CellFilter = false;
      }
    },
    selected4PresentationFormat: function (n) {
      if (n) {
        if (n == "월별추이" && this.dates[0].length > 7) {
          this.dates = [];
          this.candDates = [];
        } else if (n == "일별추이" && this.dates[0].length < 10) {
          this.dates = [];
          this.candDates = [];
        }
      }
    },
  },
  computed: {
    enablesMultipleChoiceTree: function () {
      return (
        !this.isForBanner &&
        // this.wildOne.catPresentationFormat == "일별추이" && // TODO: 모든 카드에 대해 '조직다중선택기능' 구현시 이 제약 제거
        this.allowsMultipleChoiceTreeOfCardFilterWhenNecessary
      );
    },

    picksDateOnly1: function () {
      let bingo = false;
      switch (this.selected4Indicator) {
        case "단말별가입자수":
          // bingo = this.selected4PresentationFormat == "단말비교";
          // bingo = this.selected4PresentationFormat == "_";
          bingo = true;
          break;
        case "데이터사용량":
        case "분석상품별가입자수":
          bingo = this.selected4PresentationFormat == "상품비교";
          // bingo = true;
          break;
        default:
          bingo = false;
          break;
      }
      return this.isForBanner || bingo;
    },

    dateRangeText() {
      if (this.dates.length == 2) {
        if (this.dates[0] == this.dates[1]) {
          return this.dates[0];
        }
      }
      return this.dates.join("~");
    },
    candDateRangeText() {
      return this.candDates.join("~");
    },
    candDateOnly1Text() {
      return this.candDates[this.candDates.length - 1];
    },
    options4Indicator() {
      let items = [];
      this.menuItems.forEach((x) => {
        if (this.isForBanner) {
          if (
            !new Set([
              "단말별가입자수",
              "데이터사용량",
              "분석상품별가입자수",
            ]).has(x.name)
          ) {
            items.push(x.name);
          }
        } else {
          items.push(x.name);
        }
      });

      return items;
      // return [
      //   "VOC",
      // //   "천명당VOC",
      //   "단말별가입자수",
      //   "VoLTE절단율",
      //   "오프로딩율",
      //   "LTE기지국통계",
      //   "MDT",
      //   "데이터사용량",
      //   "분석상품별가입자수",
      // ];
    },
    options4RelativeDateRange() {
      let items = [];
      let weekUnitKr_ForBefore =
        this.selected4PresentationFormat == "상품비교" ||
        this.selected4PresentationFormat == "단말비교"
          ? "주 전"
          : "주간";

      switch (this.selected4PresentationFormat) {
        // case "상품비교":
        //   items.push("최근갱신일");
        //   return items;
        case "월별추이":
          items.push("이달");
          items.push("지난달");
          //카드에도최근갱신일추가
          [12, 24, 36].forEach((x) => {
            items.push(`${x}개월`);
          });
          break;
        case "일별추이":
        default:
          if (this.isForBanner) {
            items.push("최근갱신일");
            return items;
          }

          switch (this.selected4Indicator) {
            case "단말별가입자수":
            case "데이터사용량":
            case "분석상품별가입자수":
              items.push("최근갱신일");
              [1, 2, 3, 4, 8, 12].forEach((x) => {
                // items.push(`${x}주간`);
                items.push(`${x}${weekUnitKr_ForBefore}`);
              });
              break;
            default:
              items.push("최근갱신일");
              //카드에도최근갱신일추가
              [1, 2, 3, 4, 8, 12].forEach((x) => {
                items.push(`${x}주간`);
              });
              break;
          }
          break;
      }

      // this.cleanUpSideEffects();
      return items;
    },
    options4PresentationFormat() {
      let items = [...[]];

      if (this.isForBanner) {
        items.push("일별추이");
        // items.push("일별추이|전주대비지표");
        // items.push("일별추이|목표대비지표|95");
        // items.push(
        //   "todo: 여기는 codemenu연동 및 사이드이펙트 문제로 '일별추이'선택해 두며, wildOne.PresentationFormat4Banner 추가하고 체크박스붙은텍스트필드로 역할 위임"
        // );
        return items;
      }

      this.menuItems.forEach((x) => {
        if (x.name == this.selected4Indicator) {
          x.menus.forEach((y) => {
            items.push(y.name);
          });
        }
      });

      // this.cleanUpSideEffects();
      return [...items];
    },
    options4Product() {
      let items = [];
      this.menuItems.forEach((x) => {
        if (x.name == this.selected4Indicator) {
          x.menus.forEach((y) => {
            if (y.name == this.selected4PresentationFormat) {
              y.prods.forEach((z) => {
                items.push(z);
              });
            }
          });
        }
      });

      return items;
    },
    options4Scope() {
      let items = [];

      this.menuItems.forEach((x) => {
        if (x.name == this.selected4Indicator) {
          x.menus.forEach((y) => {
            if (y.name == this.selected4PresentationFormat) {
              y.filters.forEach((z) => {
                if (
                  new Set(["전국", "본부별", "센터별", "팀별", "조별"]).has(z)
                ) {
                  items.push(z);
                }
              });
            }
          });
        }
      });

      return items;
    },
    defaultExpandLevel() {
      switch (this.selected4Scope) {
        case "본부별":
          return 1;
        case "센터별":
          return 2;
        case "팀별":
          return 3;
        case "조별":
          return 4;
        case "전국":
          return 3;
        default:
          return 3;
      }
    },
    optionsLeft() {
      switch (this.selected4Scope) {
        case "전국":
          return this.optionsByLevel.전국;
        case "본부별": // 본부별
          return this.optionsByLevel.본부별;
        case "센터별":
          return this.optionsByLevel.센터별;
        case "팀별":
          return this.optionsByLevel.팀별;
        case "조별":
          return this.optionsByLevel.조별;
        default:
          return [];
      }
    },
  },

  mounted() {
    this.myCBProfileTmp = JSON.parse(this.jMyCBProfileTmp) || "";
    this.reserve4MyCBProfileReg =
      JSON.parse(this.jReserve4MyCBProfileReg) || "";
    this.myCBProfileReg = JSON.parse(this.jMyCBProfileReg) || "";
    this.selected4Indicator = this.wildOne.catIndicator;
    this.selected4PresentationFormat = this.isForBanner
      ? "일별추이"
      : this.wildOne.catPresentationFormat;
    // this.selected4PresentationFormat = this.wildOne.catPresentationFormat;
    this.targetValue = this.wildOne.targetValue;

    this.selected4ProductService = this.wildOne.catProductService;
    this.selected4Scope = this.wildOne.catScope;

    // this.nodesSelected = this.wildOne.group;
    this.nodesSelected = this.enablesMultipleChoiceTree
      ? this.wildOne.group.split("|")
      : this.wildOne.group;

    this.setsDateRangeRelatively = new Set(this.options4RelativeDateRange).has(
      this.wildOne.dates
    );
    if (this.setsDateRangeRelatively) {
      this.relativeDateRangeText = this.wildOne.dates;
    } else {
      //
    }
    // let { start, end } = {
    //   ...this.makeData4StartEndTimeArgs(this.wildOne.dates, this.wildOne.catIndicator),
    // };
    // this.candDates = [
    //   this.date2yyyyMMdd(start, "-"),
    //   this.date2yyyyMMdd(end, "-"),
    // ];

    let { start, end } =
      this.selected4PresentationFormat == "월별추이"
        ? {
            ...this.makeData4StartEndTimeArgs(
              this.wildOne.dates,
              this.wildOne.catIndicator
            ),
          }
        : {
            ...this.makeData4StartEndTimeArgs(
              this.wildOne.dates,
              this.wildOne.catIndicator
            ),
          };

    this.candDates =
      this.selected4PresentationFormat == "월별추이"
        ? [this.date2yyyyMM(start, "-"), this.date2yyyyMM(end, "-")]
        : [this.date2yyyyMMdd(start, "-"), this.date2yyyyMMdd(end, "-")];

    this.candDateOnly1 = this.candDates[this.candDates.length - 1];

    this.dates = [...this.candDates];
    this.handlesSundayAsBetweenFridayAndSunday =
      this.wildOne.handlesSundayAsBetweenFridayAndSunday;
  },
};
</script>

<style scoped>
.theme--light.v-list {
  background: white;
}
</style>
