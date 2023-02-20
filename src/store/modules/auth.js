const auth = {
  namespaced: true,
  state: {
    userConfig: {
      userId: "",
      userName: "",
      userPhone: "",
      userEmail: "",
      isAdmin: "",
      isActive: "",
      userGroup1: "",
      userGroup2: "",
      userGroup3: "",
      userGroup4: "",
      boardId: null,
      startBoardID: null,
      boardModules: "",
      orgLvl: "",
    },
    access: "",
    refresh: "",
    isLogin: false,
    isJustLoggedIn: false,
  },
  getters: {
    getAccess(state) {
      return state.access;
    },
    getRefresh(state) {
      return state.refresh;
    },
    getIsLogin(state) {
      return state.isLogin;
    },
    getIsJustLoggedIn(state) {
      return state.isJustLoggedIn;
    },
    getUserConfig(state) {
      return state.userConfig;
    },
  },
  mutations: {
    initializeStore(state) {
      if (sessionStorage.getItem("userInfo")) {
        const sessionObj = sessionStorage.getItem("userInfo");
        let userInfo = sessionObj ? sessionObj : null;
        state.access = userInfo ? userInfo.access : null;
        state.refresh = userInfo ? userInfo.refresh : null;
        state.isLogin = true;
        // if (JSON.parse(sessionObj).access) {
        //   state.isLogin = true;
        // }
      } else {
        state.access = "";
        state.refresh = "";
        state.isLogin = false;
        state.userConfig = {
          userId: "",
          userName: "",
          userPhone: "",
          userEmail: "",
          isAdmin: "",
          isActive: "",
          userGroup1: "",
          userGroup2: "",
          userGroup3: "",
          userGroup4: "",
          boardId: null,
          startBoardID: null,
          boardModules: "",
          orgLvl: "",
        };
      }
    },
    setAccess(state, access) {
      state.access = access;
    },
    setRefresh(state, refresh) {
      state.refresh = refresh;
    },
    setIsLogin(state, bool) {
      state.isLogin = bool;
    },
    setIsJustLoggedIn(state, bool) {
      state.isJustLoggedIn = bool;
    },
    setUserConfig(state, payload) {
      state.userConfig = {
        userId: payload.userId,
        userName: payload.userName,
        userPhone: payload.userPhone,
        userEmail: payload.userEmail,
        isAdmin: payload.isAdmin,
        isActive: payload.isActive,
        userGroup1: payload.userGroup1,
        userGroup2: payload.userGroup2,
        userGroup3: payload.userGroup3,
        userGroup4: payload.userGroup4,
        boardId: payload.boardId,
        startBoardID: payload.startBoardID,
        boardModules: payload.boardModules,
        orgLvl: payload.orgLvl,
      };
    },
  },
  actions: {},
};

export default auth;
