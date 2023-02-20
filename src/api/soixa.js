// import { API_URL, API } from "./config";

import { API_URL } from "./config";
// let API_URL = "http://10.220.231.59:8000/api/v1/";
// let API_URL = "http://10.220.230.193:8000/api/v1/";

// API_DOCS: http://10.220.230.193:8000/docs
import service from "./service";
import { api } from "./api";

export const prefixURL = API_URL;
export const timeOut = 0;

export const soixa = {
  ...api,

  get(...options) {
    return service.get(...options, {
      baseURL: prefixURL,
      timeout: timeOut,
    });
  },
  put(...options) {
    return service.put(...options);
  },
  post(...options) {
    return service.put(...options);
  },

  getDashboardConfigs(userId) {
    // userId = all // common
    // userId = me // common + for로그인사원
    // userId = 사번 // common + for해당사원
    return service.get(`${API_URL}users/boardconfigs/${userId}`);
  },

  postDashboardConfig(userId, params) {
    return service.post(`${API_URL}users/boardconfig/${userId}`, params);
  },
  getDashboardConfig(boardId) {
    return service.get(`${API_URL}users/boardconfig/${boardId}`);
  },
  putDashboardConfig(boardId, params) {
    return service.put(`${API_URL}users/boardconfig/${boardId}`, params);
  },
  deleteDashboardConfig(boardId) {
    return service.delete(`${API_URL}users/boardconfig/${boardId}`);
  },
};

export function date2yyyyMMdd(d, delimiter = "") {
  // var mm = d.getMonth() + 1;
  // mm = mm < 10 ? "0" + mm : mm;
  // var dd = d.getDate();
  // dd = dd < 10 ? "0" + dd : dd;
  // return d.getFullYear() + delimiter + mm + delimiter + dd;
  return d.toISOString().substring(0, 10).replace(/-/g, delimiter);
}
export function date2yyyyMM(d, delimiter = "") {
  // var mm = d.getMonth() + 1;
  // mm = mm < 10 ? "0" + mm : mm;
  // var dd = d.getDate();
  // dd = dd < 10 ? "0" + dd : dd;
  // return d.getFullYear() + delimiter + mm + delimiter + dd;
  return d.toISOString().substring(0, 7).replace(/-/g, delimiter);
}

export function makeData4StartEndTimeArgs(selected4Dates, catIndicator = "") {
  // if (this.verbose) {
  //   console.log(selected4Dates);
  // }

  let r = {};
  // if (s.charAt(s.length - 2) == "주") {
  let start = null;
  let end = null;

  // if (selected4Dates == "어제") {
  //   start = this.addDays(new Date(), -1);
  //   end = start;
  // } else if (

  // 한국시간변경
  // let dateOfRecentDataUpdated = new Date();
  let date = new Date();
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOfRecentDataUpdated = new Date(date.getTime() - offset);
  switch (catIndicator) {
    case "LTE기지국통계":
    case "MDT":
      dateOfRecentDataUpdated = this.addDays(dateOfRecentDataUpdated, -2);
      break;
    default:
      dateOfRecentDataUpdated = this.addDays(dateOfRecentDataUpdated, -1);
      break;
  }
  if (selected4Dates == "이달") {
    // end = this.addDays(new Date(), -1);
    end = dateOfRecentDataUpdated;
    start = end;
  } else if (selected4Dates == "지난달") {
    // end = this.addDays(new Date(), -1);
    end = dateOfRecentDataUpdated;
    end.setMonth(dateOfRecentDataUpdated.getMonth() - 1);
    start = end;
  } else if (
    selected4Dates.substring(
      selected4Dates.length - 2,
      selected4Dates.length
    ) == "개월"
    // selected4Dates.substring(
    //   selected4Dates.length - 1,
    //   selected4Dates.length
    // ) == "주"
  ) {
    // let n = parseInt(selected4Dates.replace("주", ""));
    // let n = parseInt(selected4Dates.replace("주간", ""));

    let s = selected4Dates.replace(/개월/gi, "");
    s = s.replace(/최근/gi, "");
    s = s.replace(/ /gi, "");
    let n = parseInt(s);

    if (!isNaN(n)) {
      // end = this.addDays(new Date(), -1);
      // start = this.addDays(new Date(), -7 * n);
      end = dateOfRecentDataUpdated;
      start = new Date(date.getTime() - offset);
      start.setMonth(dateOfRecentDataUpdated.getMonth() - n);
    } else {
      end = null;
      start = null;
    }
  } else if (selected4Dates == "최근갱신일") {
    // end = this.addDays(new Date(), -1);
    end = dateOfRecentDataUpdated;
    start = end;
  } else if (
    selected4Dates.substring(
      selected4Dates.length - 2,
      selected4Dates.length
    ) == "주간" ||
    selected4Dates.substring(
      selected4Dates.length - 3,
      selected4Dates.length
    ) == "주 전"
    // selected4Dates.substring(
    //   selected4Dates.length - 1,
    //   selected4Dates.length
    // ) == "주"
  ) {
    // let n = parseInt(selected4Dates.replace("주", ""));
    // let n = parseInt(selected4Dates.replace("주간", ""));

    let s = selected4Dates.replace(/주간/gi, "");

    s = s.replace(/주 전/gi, "");

    s = s.replace(/최근/gi, "");
    s = s.replace(/ /gi, "");

    let n = parseInt(s);

    if (!isNaN(n)) {
      // end = this.addDays(new Date(), -1);
      // start = this.addDays(new Date(), -7 * n);
      end = dateOfRecentDataUpdated;
      start = this.addDays(dateOfRecentDataUpdated, -7 * n + 1);
    } else {
      end = null;
      start = null;
    }
  } else {
    let l = selected4Dates.split("~");
    end = new Date(l[l.length - 1]);
    start = new Date(l[0]);
  }
  // alert(this.date2WeekDayKor(end));

  // if (this.verbose) {
  //   console.log(start, end);
  // }

  r = {
    start,
    end,
    startISOString: start.toISOString(),
    endISOString: end.toISOString(),
    yyyyMMddStart: this.date2yyyyMMdd(start),
    yyyyMMddEnd: this.date2yyyyMMdd(end),
    yyyyMMStart: this.date2yyyyMM(start),
    yyyyMMEnd: this.date2yyyyMM(end),
    yyyyMMddHyphenedStart: this.date2yyyyMMdd(start, "-"),
    yyyyMMddHyphenedEnd: this.date2yyyyMMdd(end, "-"),
    MMdd요일DottedStart:
      start.toISOString().substring(5, 10).replace(/-/g, ".") +
      " " +
      this.date2WeekDayKor(start),
    MMdd요일DottedEnd:
      end.toISOString().substring(5, 10).replace(/-/g, ".") +
      " " +
      this.date2WeekDayKor(end),
    MMddDottedStart:
      start.toISOString().substring(5, 10).replace(/-/g, ".") + " ",
    MMddDottedEnd: end.toISOString().substring(5, 10).replace(/-/g, ".") + " ",
    MMddHyphenedStart:
      start.toISOString().substring(5, 10).replace(/-/g, "-") + " ",
    MMddHyphenedEnd:
      end.toISOString().substring(5, 10).replace(/-/g, "-") + " ",
  };
  return r;
}

export function makeKeyURI(
  catIndicator = null,
  catPresentationFormat = null,
  catProductService = null,
  catScope = null,
  limit = null,
  group = null,
  dates = null
) {
  let argStart = "";
  let argEnd = "";

  if (catPresentationFormat == "월별추이") {
    let { yyyyMMStart, yyyyMMEnd } = {
      ...this.makeData4StartEndTimeArgs(dates, catIndicator),
    };
    argStart = yyyyMMStart;
    argEnd = yyyyMMEnd;
  } else {
    let { yyyyMMddStart, yyyyMMddEnd } = {
      ...this.makeData4StartEndTimeArgs(dates, catIndicator),
    };
    argStart = yyyyMMddStart;
    argEnd = yyyyMMddEnd;
  }

  // alert(yyyyMMddStart);
  // console.log(yyyyMMddStart);
  let options = [];
  let uriIndicator = "";
  let uriPresentation = "";

  let prod = catProductService;

  // let scope = catScope.replace("별", "");
  // '팀별'만 인식하고 '팀'은 인식않으며, 미인식시 전체 범위에서 쿼리(side effect 발생)하도록 API 작성되어있음. 위 폐기된 줄, 그리고 이 주석마저 뱀발.
  let scope = catScope;
  let scopeChoiceCount = group.split("|").length;

  let uriPresentationFormat = catPresentationFormat.split("|")[0];

  let keyURI = "";

  // let suffixPresentationFormat = "2";

  // 요청주소
  // http://10.220.231.59:8080/api/v1/updated-time

  // 응답데이터
  // {
  //     "updated-time": "2023-02-16T10:05:17.000Z",
  //     "voc/trend-day": "2023-02-16T10:05:12.000Z",
  //     "subscr/compare-hndset": "2023-02-16T10:05:17.000Z",
  //     "rrc/worst": "2023-02-16T10:05:11.000Z",
  // …
  // }

  switch (catIndicator) {
    case "voc":
    case "VOC":
    case "천명당VOC":
      uriIndicator = "voc";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day";
            // http://10.203.13.204:8241/api/v1/voc/trend-day?prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
            // uriPresentation = uriPresentation + suffixPresentationFormat;
            // keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
            // options.push(`${API_URL}${keyURI}`);
          } else {
            uriPresentation = "trend-item-day";
            // http://10.203.13.204:8241/api/v1/voc/trend-item-day?prod=5G&code=팀별&group=전남엔지니어링부&start_date=20221013&end_date=20221026
            // http://10.203.13.204:8241/api/v1/voc/trend-item-day?prod=5G&code=센터별&group=전남액세스운용센터|구로액세스운용센터&start_date=20221001&end_date=20221010
            // http://localhost:8080/api/v1/voc/trend-item-day?prod=5G&code=팀별&group=영동엔지니어링팀|신내엔지니어링부&start_date=20221023&end_date=20221105
            // // uriPresentation = uriPresentation + suffixPresentationFormat;
            // keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
            // options.push(`${API_URL}${keyURI}`);
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst기지국":
          uriPresentation = "worst";
          // http://10.203.13.204:8241/api/v1/voc/worst2?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst단말":
          // case "주요단말":
          uriPresentation = "worst-hndset";
          // http://10.203.13.204:8241/api/v1/voc/worst-hndset?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220921&end_date=20220930
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;

    // case "subscr":
    case "단말별가입자수":
      uriIndicator = "subscr";
      switch (uriPresentationFormat) {
        case "compare-hndset":
        case "_":
        case "단말비교":
          uriPresentation = "compare-hndset";
          // old http://10.203.13.204:8241/api/v1/subscr/compare?group=전남엔지니어링부&start_date=20221005
          // new http://10.203.13.204:8241/api/v1/subscr/compare-hndset?code=팀&group=전남엔지니어링부&start_date=20221005
          // // uriPresentation = uriPresentation + suffixPresentationFormat;
          // keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${argStart}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_date=${argStart}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;
    case "분석상품별가입자수":
      uriIndicator = "subscr";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day";
            // uriPresentation = uriPresentation + suffixPresentationFormat;
          } else {
            uriPresentation = "trend-item-day";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "compare-prod":
        case "_":
        case "상품비교":
          uriPresentation = "compare-prod";
          // http://10.203.13.204:8241/api/v1/subscr/compare-prod?code=팀별&group=전남엔지니어링부&start_date=20221008
          // // uriPresentation = uriPresentation + suffixPresentationFormat;
          // keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${argStart}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_date=${argStart}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;

    case "데이터사용량":
      uriIndicator = "data-usage";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          // http://10.220.230.193:8000/api/v1/data-usage/trend-day?code=센터별&group=서울강북액세스운용센터&start_date=20230105&end_date=20230105
          // http://10.220.231.59:8000/api/v1/data-usage/trend-day?prod=5G&code=센터별&group=서울강북액세스운용센터&start_date=20230113&end_date=20230126
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day"; // API개발측 하이픈 언더스코어 실수, trend-day 로 고쳐야
            // uriPresentation = uriPresentation + suffixPresentationFormat;
          } else {
            uriPresentation = "trend-item-day";
          }
          // keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "compare-prod":
        case "_":
        case "상품비교":
          uriPresentation = "compare-prod";
          // http://10.203.13.204:8241/api/v1/data-usage/compare-prod?code=팀별&group=전남엔지니어링부&start_date=20221005
          // // uriPresentation = uriPresentation + suffixPresentationFormat;
          // keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${argStart}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_date=${argStart}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;

    case "volte":
    case "VoLTE절단율":
      uriIndicator = "volte";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day";
            // http://10.203.13.204:8241/api/v1/voc/trend-day?prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
            // uriPresentation = uriPresentation + suffixPresentationFormat;
          } else {
            uriPresentation = "trend-item-day";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst기지국":
          uriPresentation = "worst";
          // http://10.203.13.204:8241/api/v1/volte/worst2?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst단말":
          //  case "주요단말":
          uriPresentation = "worst-hndset";
          // http://10.203.13.204:8241/api/v1/volte/worst-hndset?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220921&end_date=20220930
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;
    case "offloading":
    case "오프로딩율":
      uriIndicator = "offloading";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day";
            // http://10.203.13.204:8241/api/v1/voc/trend-day?prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
            // uriPresentation = uriPresentation + suffixPresentationFormat;
          } else {
            uriPresentation = "trend-item-day";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst기지국":
        case "Worst읍면동":
          uriPresentation = "worst-dong";
          // http://10.203.13.204:8241/api/v1/offloading/worst2?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
          // uriPresentation = "worst";
          // // http://10.203.13.204:8241/api/v1/offloading/worst?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220920&end_date=20220927
          // // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst단말":
          // case "주요단말":
          uriPresentation = "worst-hndset";
          // http://10.203.13.204:8241/api/v1/offloading/worst-hndset?limit=10&prod=5G&code=팀&group=구로엔지니어링부&start_date=20220921&end_date=20220930
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;
    case "MDT":
      uriIndicator = "mdt";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day";
            // http://10.203.13.204:8241/api/v1/mdt/trend-day?code=팀별&group=전남엔지니어링부&start_date=20221001&end_date=20221009
            // uriPresentation = uriPresentation + suffixPresentationFormat;
            // keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
          } else {
            uriPresentation = "trend-item-day";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst기지국":
          uriPresentation = "worst";
          // http://10.203.13.204:8241/api/v1/mdt/worst2?limit=10&code=팀별&group=전남엔지니어링부&start_date=20221001&end_date=20221009
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          // keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;
    case "LTE기지국통계":
      uriIndicator = "rrc";
      switch (uriPresentationFormat) {
        case "월별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-month";
          } else {
            uriPresentation = "trend-item-month";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_month=${argStart}&end_month=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_month=${argStart}&end_month=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "일별추이":
          if (scopeChoiceCount == 1) {
            uriPresentation = "trend-day";
            // http://10.203.13.204:8241/api/v1/rrc/trend-day?code=조별&group=전남1조&start_date=20220927&end_date=20221004
            // uriPresentation = uriPresentation + suffixPresentationFormat;
            // keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${yyyyMMddStart}&end_date=${yyyyMMddEnd}`;
          } else {
            uriPresentation = "trend-item-day";
          }
          keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        case "Worst기지국":
          uriPresentation = "worst";
          // http://10.203.13.204:8241/api/v1/rrc/worst2?limit=10&code=조별&group=전남1조&prod=트래픽&start_date=20220901&end_date=20221010
          // uriPresentation = uriPresentation + suffixPresentationFormat;
          keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&group=${group}&start_date=${argStart}&end_date=${argEnd}`;
          if (group == "전국") {
            keyURI = `${uriIndicator}/${uriPresentation}?limit=${limit}&prod=${prod}&code=${scope}&start_date=${argStart}&end_date=${argEnd}`;
          }
          options.push(`${API_URL}${keyURI}`);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }

  return keyURI;
}
