# git에서 파일명 대소문자 구분 설정(예: DashBoardView.vue를 DashboardView.vue로 변경)

git config core.ignorecase false

# 줄바꿈 crlf 대신 lf로 설정

- 1
  .eslintrc.js 파일에서 linebreak-style을 unix로 설정.

  rules: {
  "linebreak-style": [
  "error",
  // require("os").EOL === "\r\n" ? "windows" : "unix",
  "unix",
  ],

- 2
  vs.code 설정에서 eol로 검색하여,

  Fiels: Eol
  옵션을
  \n
  로 선택.

  Prettier: End Of Line
  옵션을
  lf
  로 선택.

- 3
  명령줄에서 fix 실행

  eslint --fix --ext .js,.vue src

# oneview-frontend

- DEVELOP BRANCH 사용확인
- 허재 수정확인
- test

# develop env

```
"node": v16.15.0
"npm": 8.5.5
"vuecli": 5.0.4
"core-js": "^3.8.3",
"vue": "^2.6.14",
"vue-router": "^3.5.1",
"vuetify": "^2.6.0",
"vuex": "^3.6.2"
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Docker + Nginx Deploy

```
1. docker build . -t test
2. docker run -d -p 8080:80 test
3. localhost:8080 접속확인
```
