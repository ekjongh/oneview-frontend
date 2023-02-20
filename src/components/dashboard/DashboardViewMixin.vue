<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  soixa,
  prefixURL,
  timeOut,
  makeData4StartEndTimeArgs,
  // makeData4StartEndTimeArgs,
  makeKeyURI,
} from "@/api/soixa.js";

const DashboardViewMixin = {
  components: {},
  props: {
    // menuItems4CellFilter: [],
    // options4Organization: {},
  },
  data() {
    return {
      soixa,
      prefixURL,
      timeOut,
      baseDate: null,

      menuItems4CellFilter: [],
      options4Organization: {},

      pointStyleKeys: [
        "line",
        "star",
        "dash",
        "crossRot",
        "cross",
        "rect",
        "circle",
        "triangle",
        "rectRot",
        "rectRounded",
      ],
      patternKeys: [
        "plus",
        "cross",
        "dash",
        "cross-dash",
        "dot",
        "dot-dash",
        "disc",
        "ring",
        "line",
        "line-vertical",
        "weave",
        "zigzag",
        "zigzag-vertical",
        "diagonal",
        "diagonal-right-left",
        "square",
        "box",
        "triangle",
        "triangle-inverted",
        "diamond",
        "diamond-box",
      ],
    };
  },

  computed: {
    ...mapState("auth", ["userConfig"]),
    ...mapState("dashboard", [
      "mode2EditCBProfileReg",
      "clearsCache4APIResponseDataWithDashboardMounted",
      "removesCachedItemWithEachBannerOrCardMounted",
      "verbose",
      "allowsMultipleChoiceTreeOfCardFilterWhenNecessary",
      "cacheAPI",
      // "myCBProfileTmp",
      // "reserve4MyCBProfileReg",
      // "myCBProfileReg",

      "example",
      "masterProfile4Employees",
      "masterProfile4Management",

      "jMyCBProfileTmp",
      "jReserve4MyCBProfileReg",
      "jMyCBProfileReg",
      // "baseDate",
      "defaultDelta4BaseDate",
    ]),
    // ...mapGetters("dashboard", ["getxBaseDate", "getxAddDays"]),
    ...mapGetters("dashboard", ["getxAddDays"]),

    // ...mapGetters("dashboard", ["getxAddDays", "menuItems4CellFilter"]),
  },
  methods: {
    makeData4StartEndTimeArgs,
    // makeData4StartEndTimeArgs,
    makeKeyURI,
    ...mapMutations("dashboard", [
      // "initializeBaseDate",
      // "setBaseDate",
      // "setxBaseDate",
      "setMode2EditCBProfileReg",
      "addCacheAPI",
      // "setMyCBProfileTmp",
      // "setReserve4MyCBProfileReg",
      // "setMyCBProfileReg",
      "setJMyCBProfileTmp",
      "setJReserve4MyCBProfileReg",
      "setJMyCBProfileReg",
    ]),

    removeSpecialCharacters(str, replaceValue = "") {
      let r = str;
      // eslint-disable-next-line no-useless-escape
      let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      if (regExp.test(str)) {
        r = str.replace(regExp, replaceValue);
      }
      return r;
    },

    addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    date2yyyyMMdd(d, delimiter = "") {
      // var mm = d.getMonth() + 1;
      // mm = mm < 10 ? "0" + mm : mm;
      // var dd = d.getDate();
      // dd = dd < 10 ? "0" + dd : dd;
      // return d.getFullYear() + delimiter + mm + delimiter + dd;
      return d.toISOString().substring(0, 10).replace(/-/g, delimiter);
    },
    date2yyyyMM(d, delimiter = "") {
      // var mm = d.getMonth() + 1;
      // mm = mm < 10 ? "0" + mm : mm;
      // var dd = d.getDate();
      // dd = dd < 10 ? "0" + dd : dd;
      // return d.getFullYear() + delimiter + mm + delimiter + dd;
      return d.toISOString().substring(0, 7).replace(/-/g, delimiter);
    },
    date2WeekDayKor(d) {
      const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
      return WEEKDAY[d.getDay()];
    },
    date2Label(d, whetherMMddOrWeekday = true) {
      return whetherMMddOrWeekday
        ? d.toISOString().substring(5, 10).replace(/-/g, ".")
        : this.date2WeekDayKor(d);
    },
    date2LabelMonth(d, withApostrophe = true) {
      return withApostrophe
        ? "'" + d.toISOString().substring(2, 7).replace(/-/g, ".")
        : d.toISOString().substring(0, 7).replace(/-/g, ".");
    },
    getSequentialDates_(
      notLessThan,
      notGreaterThan,
      formatBeforeReturn = (d) => d
    ) {
      var dates = [];
      var curr = new Date(notLessThan);
      var last = new Date(notGreaterThan);
      while (curr.getTime() <= last.getTime()) {
        dates.push(formatBeforeReturn(curr));
        curr.setDate(curr.getDate() + 1);
      }
      return dates;
    },
    getSequentialMonths(
      notLessThan,
      notGreaterThan,
      formatBeforeReturn = (d) => d
    ) {
      var dates = [];
      var curr = new Date(notLessThan);
      var last = new Date(notGreaterThan);
      while (curr.getTime() <= last.getTime()) {
        dates.push(formatBeforeReturn(curr));
        curr.setMonth(curr.getMonth() + 1);
      }
      return dates;
    },

    getSequentialDates(
      notLessThan,
      notGreaterThan,
      formatBeforeReturn = (d) => d,
      presentationFormat = "일별추이"
    ) {
      var dates = [];
      var curr = new Date(notLessThan);
      var last = new Date(notGreaterThan);
      while (curr.getTime() <= last.getTime()) {
        dates.push(formatBeforeReturn(curr));
        switch (presentationFormat) {
          case "월별추이":
            curr.setMonth(curr.getMonth() + 1);
            break;
          case "일별추이":
          default:
            curr.setDate(curr.getDate() + 1);
            break;
        }
      }
      return dates;
    },

    hunt(
      jungle = [
        {
          날짜: "2022-06-01",
          "VOC 건수": 307,
          "VoLTE 절단율(%)": 0.1,
          "5G 오프로드율(%)": 5.5,
        },
        {
          날짜: "2022-06-02",
          "VOC 건수": 200,
          "VoLTE 절단율(%)": 0.2,
          "5G 오프로드율(%)": 10.1,
        },
      ],
      markKey = "날짜",
      trophyKey = "VOC 건수",
      marks = ["2022-06-02", "2022-06-03"],
      multiplier4UnitConversion = 1,
      // substitute4Null = null,
      substitute4Null = 0,
      shouldFFO = true,
      shouldBeSurjective = true
    ) {
      var trophies = [];
      marks.forEach((x) => {
        try {
          if (shouldFFO) {
            trophies.push(
              jungle.find((element) => {
                if (element[markKey] === x) {
                  return true;
                }
              })[trophyKey] * multiplier4UnitConversion
            );
          } else {
            trophies.push(
              jungle.filter((element) => {
                if (element[markKey] === x) {
                  return true;
                }
              })[trophyKey] * multiplier4UnitConversion
            );
          }
        } catch (error) {
          if (shouldBeSurjective) {
            trophies.push(substitute4Null);
          }
        }
      });
      return trophies;
    },
    getModerateScale(numbers) {
      let minNaive = Math.min(...numbers);
      let maxNaive = Math.max(...numbers);
      let digit = Math.floor(Math.abs(maxNaive - minNaive)).toString().length;
      let stepSize = 10 ** digit;
      // let min = Math.floor(minNaive / stepSize) * stepSize - stepSize / 2;
      // let max = Math.ceil(maxNaive / stepSize) * stepSize + stepSize / 2;
      let min = Math.floor(minNaive / stepSize) * stepSize - stepSize / 10;
      let max = Math.ceil(maxNaive / stepSize) * stepSize + stepSize / 10;

      min =
        minNaive - min > stepSize / 2
          ? Math.floor(minNaive / stepSize) * stepSize + (stepSize / 10) * 4
          : min;
      min = min < 0 ? 0 : min;
      max =
        max - maxNaive > stepSize / 2
          ? Math.ceil(maxNaive / stepSize) * stepSize - (stepSize / 10) * 4
          : max;
      stepSize = stepSize / 2;

      // console.log("scale", min, max, stepSize);
      // scales.nationalCounts.ticks.stepSize: 50000000 would result generating up to Infinity ticks. Limiting to 1000.

      return {
        min,
        max,
        stepSize,
      };
    },

    async hctef_organization(shouldRecache = false) {
      // let keyURI = "code/org/"; // 본부별 미제공

      let keyURI = "code/org?bonbu=_";

      let res = null;

      if (this.removesCachedItemWithEachBannerOrCardMounted || shouldRecache) {
        localStorage.removeItem(keyURI);
      }
      let cached = "";
      try {
        cached = JSON.parse(localStorage.getItem(keyURI)) || "";
      } catch (error) {
        cached = "";
      }

      cached = [
        {
          id: "강북/강원NW운용본부",
          label: "강북/강원NW운용본부",
          children: [
            {
              id: "서울강북액세스운용센터",
              label: "서울강북액세스운용센터",
              children: [
                {
                  id: "청량엔지니어링부",
                  label: "청량엔지니어링부",
                  children: [
                    {
                      id: "청량1조",
                      label: "청량1조",
                      children: [],
                    },
                    {
                      id: "청량2조",
                      label: "청량2조",
                      children: [],
                    },
                    {
                      id: "청량3조",
                      label: "청량3조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "충정엔지니어링부",
                  label: "충정엔지니어링부",
                  children: [
                    {
                      id: "충정1조",
                      label: "충정1조",
                      children: [],
                    },
                    {
                      id: "충정2조",
                      label: "충정2조",
                      children: [],
                    },
                    {
                      id: "충정3조",
                      label: "충정3조",
                      children: [],
                    },
                    {
                      id: "충정4조",
                      label: "충정4조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "지하철엔지니어링부",
                  label: "지하철엔지니어링부",
                  children: [
                    // // 지하철엔지니어링부 하위 조 없음
                    // {
                    //   id: "",
                    //   label: "",
                    //   children: [],
                    // },
                  ],
                },
              ],
            },
            {
              id: "강원액세스운용센터",
              label: "강원액세스운용센터",
              children: [
                {
                  id: "영동엔지니어링팀",
                  label: "영동엔지니어링팀",
                  children: [
                    {
                      id: "영동1조",
                      label: "영동1조",
                      children: [],
                    },
                    {
                      id: "영동2조",
                      label: "영동2조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "영서엔지니어링부",
                  label: "영서엔지니어링부",
                  children: [
                    {
                      id: "영서1조",
                      label: "영서1조",
                      children: [],
                    },
                    {
                      id: "영서2조",
                      label: "영서2조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "경기북부액세스운용센터",
              label: "경기북부액세스운용센터",
              children: [
                {
                  id: "고양엔지니어링팀",
                  label: "고양엔지니어링팀",
                  children: [
                    {
                      id: "고양1조",
                      label: "고양1조",
                      children: [],
                    },
                    {
                      id: "고양2조",
                      label: "고양2조",
                      children: [],
                    },
                    {
                      id: "고양3조",
                      label: "고양3조",
                      children: [],
                    },
                    {
                      id: "고양4조",
                      label: "고양4조",
                      children: [],
                    },
                    {
                      id: "고양5조",
                      label: "고양5조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "신내엔지니어링부",
                  label: "신내엔지니어링부",
                  children: [
                    {
                      id: "신내1조",
                      label: "신내1조",
                      children: [],
                    },
                    {
                      id: "신내2조",
                      label: "신내2조",
                      children: [],
                    },
                    {
                      id: "신내3조",
                      label: "신내3조",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "강남/서부NW운용본부",
          label: "강남/서부NW운용본부",
          children: [
            {
              id: "서울강남액세스운용센터",
              label: "서울강남액세스운용센터",
              children: [
                {
                  id: "강남엔지니어링부",
                  label: "강남엔지니어링부",
                  children: [
                    {
                      id: "강남1조",
                      label: "강남1조",
                      children: [],
                    },
                    {
                      id: "강남2조",
                      label: "강남2조",
                      children: [],
                    },
                    {
                      id: "강남3조",
                      label: "강남3조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "강동엔지니어링부",
                  label: "강동엔지니어링부",
                  children: [
                    {
                      id: "강동1조",
                      label: "강동1조",
                      children: [],
                    },
                    {
                      id: "강동2조",
                      label: "강동2조",
                      children: [],
                    },
                    {
                      id: "강동3조",
                      label: "강동3조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "구로엔지니어링부",
                  label: "구로엔지니어링부",
                  children: [
                    {
                      id: "구로1조",
                      label: "구로1조",
                      children: [],
                    },
                    {
                      id: "구로2조",
                      label: "구로2조",
                      children: [],
                    },
                    {
                      id: "구로3조",
                      label: "구로3조",
                      children: [],
                    },
                    {
                      id: "구로4조",
                      label: "구로4조",
                      children: [],
                    },
                    {
                      id: "구로5조",
                      label: "구로5조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "경기남부액세스운용센터",
              label: "경기남부액세스운용센터",
              children: [
                {
                  id: "성남엔지니어링부",
                  label: "성남엔지니어링부",
                  children: [
                    {
                      id: "성남1조",
                      label: "성남1조",
                      children: [],
                    },
                    {
                      id: "성남2조",
                      label: "성남2조",
                      children: [],
                    },
                    {
                      id: "성남3조",
                      label: "성남3조",
                      children: [],
                    },
                    {
                      id: "성남4조",
                      label: "성남4조",
                      children: [],
                    },
                    {
                      id: "성남5조",
                      label: "성남5조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "수원엔지니어링부",
                  label: "수원엔지니어링부",
                  children: [
                    {
                      id: "수원1조",
                      label: "수원1조",
                      children: [],
                    },
                    {
                      id: "수원2조",
                      label: "수원2조",
                      children: [],
                    },
                    {
                      id: "수원3조",
                      label: "수원3조",
                      children: [],
                    },
                    {
                      id: "수원4조",
                      label: "수원4조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "용인엔지니어링팀",
                  label: "용인엔지니어링팀",
                  children: [
                    {
                      id: "용인1조",
                      label: "용인1조",
                      children: [],
                    },
                    {
                      id: "용인2조",
                      label: "용인2조",
                      children: [],
                    },
                    {
                      id: "용인3조",
                      label: "용인3조",
                      children: [],
                    },
                    {
                      id: "용인4조",
                      label: "용인4조",
                      children: [],
                    },
                    {
                      id: "용인5조",
                      label: "용인5조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "경기서부액세스운용센터",
              label: "경기서부액세스운용센터",
              children: [
                {
                  id: "부천엔지니어링팀",
                  label: "부천엔지니어링팀",
                  children: [
                    {
                      id: "부천1조",
                      label: "부천1조",
                      children: [],
                    },
                    {
                      id: "부천2조",
                      label: "부천2조",
                      children: [],
                    },
                    {
                      id: "부천3조",
                      label: "부천3조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "안양엔지니어링부",
                  label: "안양엔지니어링부",
                  children: [
                    {
                      id: "안양1조",
                      label: "안양1조",
                      children: [],
                    },
                    {
                      id: "안양2조",
                      label: "안양2조",
                      children: [],
                    },
                    {
                      id: "안양3조",
                      label: "안양3조",
                      children: [],
                    },
                    {
                      id: "안양4조",
                      label: "안양4조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "인천엔지니어링부",
                  label: "인천엔지니어링부",
                  children: [
                    {
                      id: "인천1조",
                      label: "인천1조",
                      children: [],
                    },
                    {
                      id: "인천2조",
                      label: "인천2조",
                      children: [],
                    },
                    {
                      id: "인천3조",
                      label: "인천3조",
                      children: [],
                    },
                    {
                      id: "인천4조",
                      label: "인천4조",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "부산/경남NW운용본부",
          label: "부산/경남NW운용본부",
          children: [
            {
              id: "부산액세스운용센터",
              label: "부산액세스운용센터",
              children: [
                {
                  id: "동부산엔지니어링부",
                  label: "동부산엔지니어링부",
                  children: [
                    {
                      id: "동부산1조",
                      label: "동부산1조",
                      children: [],
                    },
                    {
                      id: "동부산2조",
                      label: "동부산2조",
                      children: [],
                    },
                    {
                      id: "동부산3조",
                      label: "동부산3조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "서부산엔지니어링부",
                  label: "서부산엔지니어링부",
                  children: [
                    {
                      id: "서부산1조",
                      label: "서부산1조",
                      children: [],
                    },
                    {
                      id: "서부산2조",
                      label: "서부산2조",
                      children: [],
                    },
                    {
                      id: "서부산3조",
                      label: "서부산3조",
                      children: [],
                    },
                    {
                      id: "서부산4조",
                      label: "서부산4조",
                      children: [],
                    },
                    {
                      id: "서부산5조",
                      label: "서부산5조",
                      children: [],
                    },
                    {
                      id: "서부산6조",
                      label: "서부산6조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "경남액세스운용센터",
              label: "경남액세스운용센터",
              children: [
                {
                  id: "경남엔지니어링팀",
                  label: "경남엔지니어링팀",
                  children: [
                    {
                      id: "경남1조",
                      label: "경남1조",
                      children: [],
                    },
                    {
                      id: "경남2조",
                      label: "경남2조",
                      children: [],
                    },
                    {
                      id: "경남3조",
                      label: "경남3조",
                      children: [],
                    },
                    {
                      id: "경남4조",
                      label: "경남4조",
                      children: [],
                    },
                    {
                      id: "경남5조",
                      label: "경남5조",
                      children: [],
                    },
                    {
                      id: "경남6조",
                      label: "경남6조",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "대구/경북NW운용본부",
          label: "대구/경북NW운용본부",
          children: [
            {
              id: "대구액세스운용센터",
              label: "대구액세스운용센터",
              children: [
                {
                  id: "대구엔지니어링부",
                  label: "대구엔지니어링부",
                  children: [
                    {
                      id: "동대구1조",
                      label: "동대구1조",
                      children: [],
                    },
                    {
                      id: "동대구2조",
                      label: "동대구2조",
                      children: [],
                    },
                    {
                      id: "동대구3조",
                      label: "동대구3조",
                      children: [],
                    },
                    {
                      id: "동대구4조",
                      label: "동대구4조",
                      children: [],
                    },
                    {
                      id: "동대구5조",
                      label: "동대구5조",
                      children: [],
                    },
                    {
                      id: "동대구6조",
                      label: "동대구6조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "경북액세스운용센터",
              label: "경북액세스운용센터",
              children: [
                {
                  id: "경북엔지니어링부",
                  label: "경북엔지니어링부",
                  children: [
                    {
                      id: "서대구1조",
                      label: "서대구1조",
                      children: [],
                    },
                    {
                      id: "서대구2조",
                      label: "서대구2조",
                      children: [],
                    },
                    {
                      id: "서대구3조",
                      label: "서대구3조",
                      children: [],
                    },
                    {
                      id: "서대구4조",
                      label: "서대구4조",
                      children: [],
                    },
                    {
                      id: "서대구5조",
                      label: "서대구5조",
                      children: [],
                    },
                    {
                      id: "서대구6조",
                      label: "서대구6조",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "전남/전북NW운용본부",
          label: "전남/전북NW운용본부",
          children: [
            {
              id: "전남액세스운용센터",
              label: "전남액세스운용센터",
              children: [
                {
                  id: "순천엔지니어링팀",
                  label: "순천엔지니어링팀",
                  children: [
                    {
                      id: "순천1조",
                      label: "순천1조",
                      children: [],
                    },
                    {
                      id: "순천2조",
                      label: "순천2조",
                      children: [],
                    },
                    {
                      id: "순천3조",
                      label: "순천3조",
                      children: [],
                    },
                    {
                      id: "순천4조",
                      label: "순천4조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "전남엔지니어링부",
                  label: "전남엔지니어링부",
                  children: [
                    {
                      id: "전남1조",
                      label: "전남1조",
                      children: [],
                    },
                    {
                      id: "전남2조",
                      label: "전남2조",
                      children: [],
                    },
                    {
                      id: "전남3조",
                      label: "전남3조",
                      children: [],
                    },
                    {
                      id: "전남4조",
                      label: "전남4조",
                      children: [],
                    },
                  ],
                },
                {
                  id: "제주엔지니어링팀",
                  label: "제주엔지니어링팀",
                  children: [
                    {
                      id: "제주1조",
                      label: "제주1조",
                      children: [],
                    },
                    {
                      id: "제주2조",
                      label: "제주2조",
                      children: [],
                    },
                    {
                      id: "제주3조",
                      label: "제주3조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "전북액세스운용센터",
              label: "전북액세스운용센터",
              children: [
                {
                  id: "전북엔지니어링부",
                  label: "전북엔지니어링부",
                  children: [
                    {
                      id: "전북1조",
                      label: "전북1조",
                      children: [],
                    },
                    {
                      id: "전북2조",
                      label: "전북2조",
                      children: [],
                    },
                    {
                      id: "전북3조",
                      label: "전북3조",
                      children: [],
                    },
                    {
                      id: "전북4조",
                      label: "전북4조",
                      children: [],
                    },
                    {
                      id: "전북5조",
                      label: "전북5조",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "충남/충북NW운용본부",
          label: "충남/충북NW운용본부",
          children: [
            {
              id: "충남액세스운용센터",
              label: "충남액세스운용센터",
              children: [
                {
                  id: "충남엔지니어링부",
                  label: "충남엔지니어링부",
                  children: [
                    {
                      id: "충남1조",
                      label: "충남1조",
                      children: [],
                    },
                    {
                      id: "충남2조",
                      label: "충남2조",
                      children: [],
                    },
                    {
                      id: "충남3조",
                      label: "충남3조",
                      children: [],
                    },
                    {
                      id: "충남4조",
                      label: "충남4조",
                      children: [],
                    },
                    {
                      id: "충남5조",
                      label: "충남5조",
                      children: [],
                    },
                    {
                      id: "충남6조",
                      label: "충남6조",
                      children: [],
                    },
                    {
                      id: "충남7조",
                      label: "충남7조",
                      children: [],
                    },
                    {
                      id: "충남8조",
                      label: "충남8조",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "충북액세스운용센터",
              label: "충북액세스운용센터",
              children: [
                {
                  id: "충북엔지니어링부",
                  label: "충북엔지니어링부",
                  children: [
                    {
                      id: "충북1조",
                      label: "충북1조",
                      children: [],
                    },
                    {
                      id: "충북2조",
                      label: "충북2조",
                      children: [],
                    },
                    {
                      id: "충북3조",
                      label: "충북3조",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      if (cached !== "") {
        res = cached;
      } else {
        // res = await this.$axios
        // .get(uri)
        res = await this.soixa
          // .get(keyURI, { timeout: 0, baseURL: this.prefixURL })
          .get(keyURI)
          .then(function (response) {
            localStorage.setItem(keyURI, JSON.stringify(response.data));
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
            return null;
          });
      }

      let 본부별 = [...res].map((d) => {
        let dup = { ...d };
        delete dup.children;
        return { ...dup };
      });
      let 센터별 = [...res].map((d) => {
        let dup = { ...d };
        // delete dup.children;
        return {
          ...dup,
          children: dup.children.map((d) => {
            let dup = { ...d };
            delete dup.children;
            return { ...dup };
          }),
        };
      });
      let 팀별 = [...res].map((d) => {
        let dup = { ...d };
        // delete dup.children;
        return {
          ...dup,
          children: dup.children.map((d) => {
            let dup = { ...d };
            // delete dup.children;
            return {
              ...dup,
              children: dup.children.map((d) => {
                let dup = { ...d };
                delete dup.children;
                return { ...dup };
              }),
            };
          }),
        };
      });
      let 조별 = [...res].map((d) => {
        let dup = { ...d };
        // delete dup.children;
        return {
          ...dup,
          children: dup.children.map((d) => {
            let dup = { ...d };
            // delete dup.children;
            return {
              ...dup,
              children: dup.children.map((d) => {
                let dup = { ...d };
                // delete dup.children;
                return {
                  ...dup,
                  children: dup.children.map((d) => {
                    let dup = { ...d };
                    delete dup.children;
                    return { ...dup };
                  }),
                };
              }),
            };
          }),
        };
      });

      let 전국 = [
        {
          id: "전국",
          label: "전국",
        },
      ];
      let 기타 = [
        {
          id: "기타",
          label: "기타",
        },
      ];
      this.options4Organization = {
        전국,
        본부별: [...본부별, ...기타],
        센터별: [...센터별, ...기타],
        팀별,
        조별,
      };
    },

    async hctef_menu(shouldRecache = false) {
      let keyURI = "code/menu";

      let res = null;

      if (this.removesCachedItemWithEachBannerOrCardMounted || shouldRecache) {
        localStorage.removeItem(keyURI);
      }
      let cached = "";
      try {
        cached = JSON.parse(localStorage.getItem(keyURI)) || "";
      } catch (error) {
        cached = "";
      }

      // cached = "";
      cached = [
        // http://10.203.13.204:8241/api/v1/code/menu
        {
          // name: "천명당VOC",
          name: "VOC",
          menus: [
            // 목적 : 감시/통계
            // 시간-유형 히트맵
            // 시간-단말 히트맵
            // 시간-주소 히트맵
            // 시간대별 누적도수 그래프

            // {
            //   name: "감시/요약",
            //   prods: ["5G", "LTE", "3G"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            // {
            //   name: "감시/유형별",
            //   prods: ["5G", "LTE", "3G"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            // {
            //   name: "감시/단말별",
            //   prods: ["5G", "LTE", "3G"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            // {
            //   name: "감시/주소별",
            //   prods: ["5G", "LTE", "3G"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            // {
            //   name: "감시/시간별누적",
            //   prods: ["5G", "LTE", "3G"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            {
              name: "월별추이",
              prods: ["5G", "LTE", "3G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별",   // 가입자 수 조별 미제공으로 제거 (천명당VOC 분모)
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "일별추이",
              prods: ["5G", "LTE", "3G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst기지국",
              prods: ["5G", "LTE", "3G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst단말",
              prods: ["5G", "LTE", "3G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "단말별가입자수",
          menus: [
            // {
            //   name: "_",
            //   // prods: ["5G"],
            //   prods: ["_"], // 상품별 추이그래프는 아직 제공 전이라 제거
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     // "조별", // 가입자 수 조별 미제공으로 제거
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            {
              name: "단말비교",
              // prods: ["5G"],
              prods: ["_"], // 상품별 추이그래프는 아직 제공 전이라 제거
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별", // 가입자 수 조별 미제공으로 제거
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "VoLTE절단율",
          menus: [
            {
              name: "월별추이",
              prods: ["5G", "LTE"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "일별추이",
              prods: ["5G", "LTE"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst기지국",
              prods: ["5G", "LTE"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst단말",
              // prods: ["5G", "5G-SA", "LTE"],
              prods: ["5G", "5G-SA"], // VoLTE절단율 - Worst단말 - LTE 데이터 미제공으로 목록아이템에서 삭제함
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별", // VoLTE절단율 Worst단말 조별 미제공으로 제거,
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "오프로딩율",
          menus: [
            {
              name: "월별추이",
              prods: ["5G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "일별추이",
              prods: ["5G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst읍면동",
              prods: ["5G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            // {
            //   name: "주요단말",
            //   prods: ["5G"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            {
              name: "Worst단말",
              prods: ["5G"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "LTE기지국통계",
          menus: [
            {
              name: "월별추이",
              prods: ["RRC성공률", "PRB사용율"], // prods: ["RRC성공률", "트래픽", "PRB부하율"], // 시도수가 너무 커보인다고... 데이터 검증전, 시연용 예외 추가
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "일별추이",
              prods: ["RRC성공률", "PRB사용율"], // prods: ["RRC성공률", "트래픽", "PRB부하율"], // 시도수가 너무 커보인다고... 데이터 검증전, 시연용 예외 추가
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst기지국",
              prods: ["RRC성공률", "PRB사용율"], // prods: ["RRC성공률", "트래픽", "PRB부하율"], // 시도수가 너무 커보인다고... 데이터 검증전, 시연용 예외 추가
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "MDT",
          menus: [
            // TODO: MDT 월별추이
            // {
            //   name: "월별추이",
            //   prods: ["_"],
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },

            {
              name: "일별추이",
              prods: ["_"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "Worst기지국",
              prods: ["_"],
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "데이터사용량",
          menus: [
            // {
            //   name: "_",
            //   // prods: ["5G"],
            //   prods: ["_"], // 상품별 추이그래프는 아직 제공 전이라 제거
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            {
              name: "상품비교",
              // prods: ["5G"],
              prods: ["_"], // 상품별 추이그래프는 아직 제공 전이라 제거
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별", // 데이러 사용량 조별 미제공으로 제거
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "일별추이",
              prods: ["5G", "LTE", "3G"], // prods: ["RRC성공률", "트래픽", "PRB부하율"], // 시도수가 너무 커보인다고... 데이터 검증전, 시연용 예외 추가
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별", // 데이러 사용량 조별 미제공으로 제거
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
        {
          name: "분석상품별가입자수",
          menus: [
            // {
            //   name: "_",
            //   // prods: ["5G"],
            //   prods: ["_"], // 상품별 추이그래프는 아직 제공 전이라 제거
            //   filters: [
            //     "제조사별",
            //     "본부별",
            //     "센터별",
            //     "팀별",
            //     "조별",
            //     "시도별",
            //     "시군구별",
            //     "읍면동별",
            //     "전국",
            //   ],
            // },
            {
              name: "상품비교",
              // prods: ["5G"],
              prods: ["_"], // 상품별 추이그래프는 아직 제공 전이라 제거
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "월별추이",
              prods: ["5G", "LTE", "3G"], // prods: ["RRC성공률", "트래픽", "PRB부하율"], // 시도수가 너무 커보인다고... 데이터 검증전, 시연용 예외 추가
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
            {
              name: "일별추이",
              prods: ["5G", "LTE", "3G"], // prods: ["RRC성공률", "트래픽", "PRB부하율"], // 시도수가 너무 커보인다고... 데이터 검증전, 시연용 예외 추가
              filters: [
                "제조사별",
                "본부별",
                "센터별",
                "팀별",
                // "조별",
                "시도별",
                "시군구별",
                "읍면동별",
                "전국",
              ],
            },
          ],
        },
      ];

      if (cached !== "") {
        res = cached;
      } else {
        res = await this.soixa
          // .get(keyURI, { timeout: 0, baseURL: this.prefixURL })
          .get(keyURI)
          .then(function (response) {
            localStorage.setItem(keyURI, JSON.stringify(response.data));
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
            return null;
          });
      }

      this.menuItems4CellFilter = res;

      // this.options4Organization = {
      //   센터별: [...res].map((d) => {
      //     let dup = { ...d };
      //     delete dup.children;
      //     return { ...dup };
      //   }),
      //   팀별: [...res].map((d) => {
      //     let dup = { ...d };
      //     return {
      //       ...dup,
      //       children: dup.children.map((d) => {
      //         let dup = { ...d };
      //         delete dup.children;
      //         return { ...dup };
      //       }),
      //     };
      //   }),
      //   조별: res,
      // };
    },

    async fetchProfileListExceptSyncWorkingProfile(userID = "me") {
      await soixa
        .getDashboardConfigs(userID)
        .then((response) => {
          // if (this.verbose) {
          //   console.log("fetchProfileListExceptSyncWorkingProfile", response);
          // }

          let r = [];
          response.data.forEach((element) => {
            if (element.board_id == this.userConfig.boardId) {
              this.mySyncWorkingProfile = element;
            } else {
              r.push(element);
            }
          });
          this.profilesExceptMySyncWorkingProfile = r;

          // this.profiles = response.data;
          // // this.profiles.map((obj) => {
          // //   obj.modules = JSON.stringify(obj.modules);
          // //   return { ...obj };
          // // });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async createProfile(userID, params) {
      await soixa
        .postDashboardConfig(userID, params)
        .then((response) => {
          if (this.verbose) {
            console.log("C: ", response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async fetchProfile(boardId) {
      await soixa
        .getDashboardConfig(boardId)
        .then((response) => {
          // alert("fetch  " + response.data.board_module);
          this.setJMyCBProfileTmp(response.data.board_module);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateProfile(boardId, params) {
      await soixa
        .putDashboardConfig(boardId, params)
        .then((response) => {
          if (this.verbose) {
            console.log("U", response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async deleteProfile(boardId) {
      await soixa
        .deleteDashboardConfig(boardId)
        .then((response) => {
          if (this.verbose) {
            console.log("D", response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 내_운용프로파일을_서버로_올려_동기화
    updateWorkingProfileWithTemp() {
      if (this.verbose) {
        console.log("내_운용프로파일을_서버로_올려_동기화");
      }
      this.updateProfile(this.userConfig.boardId, {
        name: "workingProfile",
        board_module: this.jMyCBProfileTmp,
      });
    },

    titleAndCaptionAsDefault(
      whildOne,
      isForBanner = false,
      somethingMore = ""
    ) {
      let title = "";
      let caption = "";

      title = whildOne.selected4Indicator;

      switch (whildOne.catIndicator) {
        case "VOC":
        case "천명당VOC":
          title =
            whildOne.catProductService == "LTE"
              ? "LTE 품질VOC"
              : whildOne.catProductService == "5G"
              ? "5G 품질VOC"
              : "3G 품질VOC";
          break;
        case "단말별가입자수":
          title = "5G단말 기종별 고객 수";
          break;
        case "VoLTE절단율":
          // title =
          //   whildOne.catProductService == "LTE"
          //     ? "LTE VoLTE 절단율"
          //     : "5G VoLTE 절단율";
          title =
            whildOne.catProductService == "LTE"
              ? "LTE VoLTE절단율"
              : "5G VoLTE절단율";
          break;
        case "오프로딩율":
          title = "5G 오프로드율";
          break;
        case "LTE기지국통계":
          title =
            whildOne.catProductService == "RRC성공률"
              ? "LTE RRC성공률"
              : "LTE PRB사용율";
          break;
        case "MDT":
          title = "MDT RSRP불량률";
          break;
        case "데이터사용량":
          // title = "상품별 데이터사용량"; // 백엔드 왈, 알뜰폰(MVNO 즉 B2B)는 일단 배제했다는데...
          title =
            whildOne.catPresentationFormat == "상품비교"
              ? "상품별 데이터사용량"
              : whildOne.catProductService + " 데이터사용량";
          caption = caption + " (단위: GB)";
          break;
        case "분석상품별가입자수":
          title = "B2C상품별 고객 수";
          title =
            whildOne.catPresentationFormat == "상품비교"
              ? "B2C상품별 고객 수"
              : whildOne.catProductService + " 고객 수";

          break;
        default:
          break;
      }

      let suffix4Title = "";
      if (whildOne.catPresentationFormat.substring(0, 5) == "Worst") {
        suffix4Title =
          " Worst 10 " + whildOne.catPresentationFormat.substring(5);
      }
      // if (whildOne.catPresentationFormat == "주요단말") {
      //   suffix4Title = " Worst 10 " + whildOne.catPresentationFormat;
      // }

      if (!isForBanner && whildOne.catPresentationFormat == "일별추이") {
        suffix4Title = " " + whildOne.catPresentationFormat;
      }
      if (!isForBanner && whildOne.catPresentationFormat == "월별추이") {
        suffix4Title = " " + whildOne.catPresentationFormat;
      }
      title = title + suffix4Title;

      let group = whildOne.group.split("|");
      // group =
      //   group.length > 1
      //     ? `${group[0]} 등 ${group.length}개 대상`
      //     : whildOne.group;
      group =
        group.length > 1 ? `${group[0]} 등 ${group.length}곳` : whildOne.group;

      // caption = isForBanner
      //   ? whildOne.group
      //   : whildOne.catIndicator +
      //     " / " +
      //     whildOne.catPresentationFormat +
      //     " / " +
      //     whildOne.catProductService +
      //     " / " +
      //     whildOne.catScope +
      //     " / " +
      //     // whildOne.group;
      //     group +
      //     somethingMore;

      caption = isForBanner ? whildOne.group : group + somethingMore;

      caption = caption.replace("/ _", "");
      caption = caption.replace("_ /", "");
      switch (whildOne.catIndicator) {
        case "데이터사용량":
          caption = caption + " (단위: GB)";
          break;
        default:
          break;
      }

      return { title, caption };
    },

    convertHSV2RGB(arrHSV, returnsString = false) {
      if (!(arrHSV instanceof Array) || arrHSV.length < 3) return null;
      var i = Math.floor(arrHSV[0] / 60.0) % 6;
      var f = arrHSV[0] / 60.0 - Math.floor(arrHSV[0] / 60.0);
      var m = Math.round(arrHSV[2] * (1.0 - arrHSV[1] / 255.0));
      var n = Math.round(arrHSV[2] * (1.0 - (arrHSV[1] / 255.0) * f));
      var k = Math.round(arrHSV[2] * (1.0 - (arrHSV[1] / 255.0) * (1.0 - f)));
      var v = arrHSV[2];
      var arrRGB = new Array(0, 0, 0);
      switch (i) {
        case 0:
          arrRGB[0] = v;
          arrRGB[1] = k;
          arrRGB[2] = m;
          break;
        case 1:
          arrRGB[0] = n;
          arrRGB[1] = v;
          arrRGB[2] = m;
          break;
        case 2:
          arrRGB[0] = m;
          arrRGB[1] = v;
          arrRGB[2] = k;
          break;
        case 3:
          arrRGB[0] = m;
          arrRGB[1] = n;
          arrRGB[2] = v;
          break;
        case 4:
          arrRGB[0] = k;
          arrRGB[1] = m;
          arrRGB[2] = v;
          break;
        case 5:
          arrRGB[0] = v;
          arrRGB[1] = m;
          arrRGB[2] = n;
          break;
      }

      let strRGB = `rgb(${arrRGB[0]},${arrRGB[1]},${arrRGB[2]})`;

      return returnsString ? strRGB : arrRGB;
    },

    getFilename() {
      let 기간 = this.makeData4StartEndTimeArgs(
        this.wildOne.dates,
        this.wildOne.catIndicator
      );

      let r =
        this.wildOne.title +
        "_" +
        this.wildOne.caption +
        "_" +
        기간.MMddHyphenedStart +
        "~" +
        기간.MMddHyphenedEnd;
      r = r.replace(/ /g, "");

      // r = this.removeSpecialCharacters(r, "_");
      r = r.replace(/\//g, "_");

      return r;
    },
  },

  mounted() {
    this.myCBProfileTmp = JSON.parse(this.jMyCBProfileTmp) || "";

    this.baseDate =
      this.prefixURL == "http://localhost:3000/api/v1/"
        ? new Date("2022-08-17")
        : // : this.date2yyyyMMdd(this.addDays(new Date(), -1));
          this.addDays(new Date(), this.defaultDelta4BaseDate);
  },
};
export default DashboardViewMixin;
</script>
