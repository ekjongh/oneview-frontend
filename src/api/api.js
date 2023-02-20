import service from "./service";
import { API_URL, API } from "./config";

export const api = {
  // redirection test
  test(param) {
    return service.post(`${API_URL}users/test`, param);
  },
  // Login User
  loginUser(params) {
    return service.post(`${API_URL}${API.auth}/login`, params);
  },
  logoutAccessToken(token) {
    return service.logout(`${API_URL}${API.auth}/logout/access`, token);
  },
  logoutRefreshToken(token) {
    return service.logout(`${API_URL}${API.auth}/logout/refresh`, token);
  },
  refreshToken() {
    return service.post(`${API_URL}${API.auth}/refresh`);
  },
  // User Registerd
  getUser(userId) {
    return service.get(`${API_URL}${API.user(userId)}`);
  },
  // Get All Users
  getUsers() {
    return service.get(`${API_URL}${API.users}`);
  },
  // Get My Config
  getMe() {
    return service.get(`${API_URL}${API.me}`);
  },
  // Update My Config
  updateMe(params) {
    return service.put(`${API_URL}${API.me}`, params);
  },
  //  Register User
  setUser(params) {
    return service.post(`${API_URL}${API.users}`, params);
  },
  // Update User
  updateUser(userId, params) {
    return service.put(`${API_URL}${API.user(userId)}`, params);
  },
  //  Delete User
  deleteUser(userId) {
    return service.delete(`${API_URL}${API.user(userId)}`);
  },
  // Get All Dashboard Configs
  getDashboardConfigs() {
    return service.get(`${API_URL}${API.boardconfigs}`);
  },
  // get Dashboard Config
  getDashboardConfig(userId) {
    return service.get(`${API_URL}${API.boardconfig(userId)}`);
  },
  // Update Dashboard Config
  updateDashboardConfig(boardId, params) {
    return service.put(`${API_URL}${API.boardconfig(boardId)}`, params);
  },
  deleteDashboardConfig(userId) {
    return service.delete(`${API_URL}${API.boardconfig(userId)}`);
  },

  // Get VocLists
  getVocLists(limit, group, start_date, end_date) {
    let groupCond = "";
    if (group !== "") {
      groupCond = `&group=${group}`;
    }
    return service.get(
      `${API_URL}${API.vocs}/list?limit=${limit}&start_date=${start_date}&end_date=${end_date}${groupCond}`
    );
  },
  // Get Voc Worst TOP10 BTS
  getVocBts(limit, team, start_date, end_date) {
    return service.get(
      `${API_URL}${API.vocs}/bts/list?limit=${limit}&?team=${team}&?start_date=${start_date}&?end_date=${end_date}`
    );
  },
  // Get Daily Voc Trend
  getVocTrendDay(team, start_date, end_date) {
    return service.get(
      `${API_URL}${API.vocs}/trend/day?team=${team}&?start_date=${start_date}&?end_date=${end_date}`
    );
  },
  // Get Daily Voc Event
  getVocEventDay(team, date) {
    return service.get(
      `${API_URL}${API.vocs}/kpi/day?team=${team}&?date=${date}`
    );
  },
  // Get Volte Worst TOP10 BTS
  getVolteBts(limit, team, start_date, end_date) {
    return service.get(
      `${API_URL}${API.volte}/bts/list?limit=${limit}&?team=${team}&?start_date=${start_date}&?end_date=${end_date}`
    );
  },
  // Get Daily Volte Trend
  getVolteTrendDay(team, start_date, end_date) {
    return service.get(
      `${API_URL}${API.volte}/trend/day?team=${team}&?start_date=${start_date}&?end_date=${end_date}`
    );
  },
  // Get Daily Volte Event
  getVolteEventDay(team, date) {
    return service.get(
      `${API_URL}${API.volte}/kpi/day?team=${team}&?date=${date}`
    );
  },
  // -------------------------------VOC 상세분석 페이지-------------------------------
  getVocDetail(sr_tt_rcp_no) {
    return service.get(
      `${API_URL}${API.vocdetail}?limit=1000&sr_tt_rcp_no=${sr_tt_rcp_no}`
    );
  },
  getCodeOrg() {
    return service.get(`${API_URL}${API.codeOrg}`);
  },
};

export const testApi = {
  getTests() {
    return service.get(`${API_URL}${API.tests}`);
  },
  /* test 등록하기
   * @param { Object } args
   * @param { string } args.args1 - 이것
   * @param { string } args.args2 - 저것
   * @param { string } args.args3 - 그것
   */
  setTest(args) {
    return service.post(`${API_URL}${API.test(args)}`);
  },
};
