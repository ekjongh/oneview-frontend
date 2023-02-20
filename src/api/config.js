// Proxy 서버 (개발서버: vue.config.js / 배포서버: nginx)에서 "/api" url 포함 시 WAS 서버로 proxy 처리
export const API_URL = "/api/v1/";
// WAS API서버에서 사용하는 api 대분류 정리.
export const API = {
  auth: "jwt",
  users: "users/", // API list의 구조를 나열해주세요.
  user: (userId) => `users/${userId}`,
  boardconfigs: "users/boardconfig/all",
  boardconfig: (userId) => `users/boardconfig/${userId}`,
  blacklists: "blacklists",
  me: "users/me",
  vocs: "voc",
  volte: "volte",
  vocdetail: "voc/spec",
  codeOrg: "code/org",
};

// TEST용 api, 삭제해도 무관
export const ETC_API = {
  tests: "tests",
  test: (args) =>
    `users/${args.args1}/depth1/${args.args2}/depth2/${args.args3}`,
};

/*
EX)
BackEnd URL: localhost:8000
Endpoints:  /api/v1/...
API_URL + API ...
*/
