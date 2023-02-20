const dashboard = {
  namespaced: true,
  state: {
    menus: [],
    clearsCache4APIResponseDataWithDashboardMounted: false,
    removesCachedItemWithEachBannerOrCardMounted: false,
    verbose: false,
    allowsMultipleChoiceTreeOfCardFilterWhenNecessary: !false,
    // https://medium.com/@syalot005006/브라우저-http-최대-연결수-알아보기-3f7aa1453bc2
    // baseDate: null,
    defaultDelta4BaseDate: -1,
    cacheAPI: {
      "http://10.203.13.204:8241/api/v1/voc/trend-day?group=전남엔지니어링부&start_date=20220831&end_date=20220913":
        [
          { date: "20220831", value: 0.0929 },
          { date: "20220901", value: 0.1078 },
          { date: "20220902", value: 0.0842 },
          { date: "20220903", value: 0.0087 },
          { date: "20220904", value: 0.0029 },
          { date: "20220905", value: 0.0 },
          { date: "20220906", value: 0.0903 },
          { date: "20220907", value: 0.0959 },
          { date: "20220908", value: 0.0959 },
          { date: "20220909", value: 0.0985 },
          { date: "20220910", value: 0.0956 },
          { date: "20220911", value: 0.0057 },
          { date: "20220912", value: 0.0087 },
          { date: "20220913", value: 0.0871 },
        ],
      "http://10.203.13.204:8241/api/v1/voc/worst?limit=10&group=전남엔지니어링부&start_date=20220907&end_date=20220913":
        [
          {
            RANK: 1,
            equip_cd: "RQJN70016T",
            equip_nm: "장성나노산단(LRIU)-T(30M)",
            voc_cnt: 2,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남1조",
          },
          {
            RANK: 1,
            equip_cd: "RRJN02803S",
            equip_nm: "금천오강-T",
            voc_cnt: 2,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남2조",
          },
          {
            RANK: 1,
            equip_cd: "RRJN02095S",
            equip_nm: "고흥호동비아-T",
            voc_cnt: 2,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "순천4조",
          },
          {
            RANK: 1,
            equip_cd: "RQKJ06576T",
            equip_nm: "KJ호남우산(수완1)(LRIU9)-T(30M)",
            voc_cnt: 2,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남1조",
          },
          {
            RANK: 1,
            equip_cd: "RRJN08234S",
            equip_nm: "삼호소방서2-T",
            voc_cnt: 2,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남2조",
          },
          {
            RANK: 6,
            equip_cd: "RRJN02699S",
            equip_nm: "RJN창평유천2-T",
            voc_cnt: 1,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "순천1조",
          },
          {
            RANK: 6,
            equip_cd: "NRJB05942N",
            equip_nm: "익산등기소-T(30M)_32T_B",
            voc_cnt: 1,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전북4조",
          },
          {
            RANK: 6,
            equip_cd: "RQKJ01153T",
            equip_nm: "KJ풍암동1-T2(30M)",
            voc_cnt: 1,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남2조",
          },
          {
            RANK: 6,
            equip_cd: "GA00180504",
            equip_nm: "한은경",
            voc_cnt: 1,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남1조",
          },
          {
            RANK: 6,
            equip_cd: "RRJN02023S",
            equip_nm: "해남구교2-T",
            voc_cnt: 1,
            center: "전남액세스운용센터",
            team: "전남엔지니어링부",
            jo: "전남3조",
          },
        ],
      "http://10.203.13.204:8241/api/v1/voc/worst_hndset?limit=10&group=전남엔지니어링부&start_date=20220907&end_date=20220913":
        [
          { RANK: 1, hndset_pet_nm: "갤럭시ZFLIP3", voc_cnt: 14 },
          { RANK: 1, hndset_pet_nm: "갤럭시S21", voc_cnt: 14 },
          { RANK: 3, hndset_pet_nm: "갤럭시노트20", voc_cnt: 12 },
          { RANK: 4, hndset_pet_nm: "갤럭시S22ULTRA", voc_cnt: 11 },
          { RANK: 4, hndset_pet_nm: "갤럭시노트20울트라", voc_cnt: 11 },
          { RANK: 6, hndset_pet_nm: "갤럭시S21울트라", voc_cnt: 8 },
          { RANK: 7, hndset_pet_nm: "갤럭시노트10+", voc_cnt: 6 },
          { RANK: 7, hndset_pet_nm: "갤럭시ZFOLD4", voc_cnt: 6 },
          { RANK: 7, hndset_pet_nm: "갤럭시A325G", voc_cnt: 6 },
          { RANK: 7, hndset_pet_nm: "갤럭시S22", voc_cnt: 6 },
        ],
      "http://10.203.13.204:8241/api/v1/voc/trend-day?group=전남엔지니어링부&start_date=20220913&end_date=20220913":
        [{ date: "20220913", value: 0.0871 }],
      "http://10.203.13.204:8241/api/v1/voc/trend-day?group=전남엔지니어링부&start_date=20220906&end_date=20220906":
        [{ date: "20220906", value: 0.0903 }],
    },

    example: {
      banners: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "최근갱신일",
          targetValue: 0.05,
          handlesSundayAsBetweenFridayAndSunday: true,
        },
        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2022-10-23",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "LTE",
          catScope: "조별",
          group: "전남1조",
          dates: "2022-10-23",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "2022-10-23",
          targetValue: "",
        },
        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2022-10-23",
          targetValue: "",
        },
        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "최근갱신일",
          targetValue: "",
        },
      ],

      cards: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2주간",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2주간",
        },

        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2주간",
        },
        {
          catIndicator: "단말별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "최근갱신일",
        },

        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2022-10-10~2022-10-23",
        },

        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },
        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "PRB사용율",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },

        {
          catIndicator: "데이터사용량",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
        },
        {
          catIndicator: "분석상품별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "최근갱신일",
        },
        {
          catIndicator: "VOC",
          catPresentationFormat: "Worst기지국",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2주간",
        },
        {
          catIndicator: "오프로딩율",
          // catPresentationFormat: "주요단말",
          catPresentationFormat: "Worst단말",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2주간",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "Worst단말",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          dates: "2022-10-10~2022-10-23",
        },

        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "Worst기지국",
          catProductService: "RRC성공률",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },
      ],

      hands: [],
    },
    masterProfile4Employees: {
      banners: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
          targetValue: "",
          handlesSundayAsBetweenFridayAndSunday: true,
        },
        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "LTE",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
          targetValue: "",
        },
        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
          targetValue: "",
        },
        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
          targetValue: "",
        },
      ],

      cards: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },

        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },
        {
          catIndicator: "단말별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "조별",
          group: "전남1조",
          dates: "최근갱신일",
        },

        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },

        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
        },
      ],
      hands: [],
    },

    masterProfile4Management: {
      banners: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
          handlesSundayAsBetweenFridayAndSunday: true,
        },
        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "LTE",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },
        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },
        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },
      ],

      cards: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "2주간",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "2주간",
        },

        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "2주간",
        },
        {
          catIndicator: "단말별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
        },

        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "2주간",
        },

        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "2주간",
        },
      ],
      hands: [],
    },

    masterProfile4Management_m: {
      banners: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
          handlesSundayAsBetweenFridayAndSunday: true,
        },
        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "LTE",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },
        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },
        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
          targetValue: "",
        },
      ],

      cards: [
        {
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          // group: "전남액세스운용센터",
          group:
            "서울강북액세스운용센터|강원액세스운용센터|경기북부액세스운용센터|서울강남액세스운용센터|경기남부액세스운용센터|경기서부액세스운용센터|부산액세스운용센터|경남액세스운용센터|대구액세스운용센터|경북액세스운용센터|전남액세스운용센터|전북액세스운용센터|충남액세스운용센터|충북액세스운용센터",
          // dates: "2주간",
          dates: "최근갱신일",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          // group: "전남액세스운용센터",
          group:
            "서울강북액세스운용센터|강원액세스운용센터|경기북부액세스운용센터|서울강남액세스운용센터|경기남부액세스운용센터|경기서부액세스운용센터|부산액세스운용센터|경남액세스운용센터|대구액세스운용센터|경북액세스운용센터|전남액세스운용센터|전북액세스운용센터|충남액세스운용센터|충북액세스운용센터",
          // dates: "2주간",
          dates: "최근갱신일",
        },

        {
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "센터별",
          // group: "전남액세스운용센터",
          group:
            "서울강북액세스운용센터|강원액세스운용센터|경기북부액세스운용센터|서울강남액세스운용센터|경기남부액세스운용센터|경기서부액세스운용센터|부산액세스운용센터|경남액세스운용센터|대구액세스운용센터|경북액세스운용센터|전남액세스운용센터|전북액세스운용센터|충남액세스운용센터|충북액세스운용센터",
          // dates: "2주간",
          dates: "최근갱신일",
        },
        {
          catIndicator: "단말별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          dates: "최근갱신일",
        },

        {
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          catScope: "센터별",
          // group: "전남액세스운용센터",
          group:
            "서울강북액세스운용센터|강원액세스운용센터|경기북부액세스운용센터|서울강남액세스운용센터|경기남부액세스운용센터|경기서부액세스운용센터|부산액세스운용센터|경남액세스운용센터|대구액세스운용센터|경북액세스운용센터|전남액세스운용센터|전북액세스운용센터|충남액세스운용센터|충북액세스운용센터",
          // dates: "2주간",
          dates: "최근갱신일",
        },

        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          catScope: "센터별",
          // group: "전남액세스운용센터",
          group:
            "서울강북액세스운용센터|강원액세스운용센터|경기북부액세스운용센터|서울강남액세스운용센터|경기남부액세스운용센터|경기서부액세스운용센터|부산액세스운용센터|경남액세스운용센터|대구액세스운용센터|경북액세스운용센터|전남액세스운용센터|전북액세스운용센터|충남액세스운용센터|충북액세스운용센터",
          // dates: "2주간",
          dates: "최근갱신일",
        },
      ],
      hands: [],
    },

    mode2EditCBProfileReg: false,

    // jMyCBProfileTmp: JSON.stringify(this.myCBProfileTmp),
    // jReserve4MyCBProfileReg: JSON.stringify(this.reserve4MyCBProfileReg),
    // jMyCBProfileReg: JSON.stringify(this.myCBProfileReg),

    jMyCBProfileTmp: JSON.stringify({}),
    jMyCBProfileTmpBeforeEditMode: JSON.stringify({}),

    jReserve4MyCBProfileReg: JSON.stringify({}),
    jMyCBProfileReg: JSON.stringify({
      // etc: {
      //   handlesSundayAsBetweenFridayAndSunday: true, // VOC배너에서 최근갱신일 설정시 일요일 대신 금토일 합산 평균 표시
      // },
      banners: [
        // {
        //   // id: "v-o-c-worst",
        //   // catIndicator: "천명당VOC",
        //   catIndicator: "VOC",
        //   catPresentationFormat: "일별추이",
        //   // catPresentationFormat: "일별추이|목표대비지표",
        //   // catPresentationFormat: "일별추이|전주대비지표",
        //   catProductService: "5G",
        //   catScope: "팀별",
        //   group: "전남엔지니어링부",
        //   // catScope: "조별",
        //   // group: "전남1조",
        //   title: "5G 품질VOC",
        //   // caption: "품질VOC 발생 (전주동일대비)",
        //   // dates: "1주간",
        //   // dates: "2022-10-08~2022-10-08",
        //   // dates: "최근갱신일",
        //   dates: "2022-10-23",
        //   // dates: "2022-10-02~2022-10-02",
        //   targetValue: 0.05,
        //   handlesSundayAsBetweenFridayAndSunday: true,
        // },
        {
          // id: "v-o-c-worst",
          // catIndicator: "천명당VOC",
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "일별추이|목표대비지표",
          // catPresentationFormat: "일별추이|전주대비지표",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          // catScope: "조별",
          // group: "전남1조",
          title: "5G 품질VOC",
          // caption: "품질VOC 발생 (전주동일대비)",
          // dates: "1주간",
          // dates: "2022-10-08~2022-10-08",
          dates: "최근갱신일",
          // dates: "2022-10-23",
          // dates: "2022-10-02~2022-10-02",
          targetValue: 0.05,
          handlesSundayAsBetweenFridayAndSunday: true,
        },
        {
          // catIndicator: "offloading",
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "일별추이|목표대비지표",
          // catPresentationFormat: "일별추이|전주대비지표",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "5G 오프로드율",
          // dates: "1주간",
          dates: "2022-10-23",
          // dates: "최근갱신일",
          // caption: "5G 오프로드율 (전주동일대비)",
          targetValue: "",
        },

        {
          // id: "v-o-c-worst",
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "일별추이|목표대비지표",
          // catPresentationFormat: "일별추이|전주대비지표",
          catProductService: "LTE",
          // catScope: "팀별",
          // group: "전남엔지니어링부",
          catScope: "조별",
          group: "전남1조",
          title: "VoLTE 절단율",
          // caption: "VoLTE 절단율 (전주동일대비)",
          // dates: "1주간",
          // dates: "2022-10-08~2022-10-08",
          // dates: "최근갱신일",
          // dates: "2022-10-02",
          dates: "2022-10-23",
          // dates: "2022-10-02~2022-10-02",
          targetValue: "",
        },

        {
          // id: "v-o-c-worst",
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "일별추이|목표대비지표",
          // catPresentationFormat: "일별추이|전주대비지표",
          catProductService: "5G",
          // catScope: "팀별",
          // group: "전남엔지니어링부",
          catScope: "조별",
          group: "전남1조",
          title: "5G 절단율",
          // caption: "VoLTE 절단율 (전주동일대비)",
          // dates: "1주간",
          // dates: "2022-10-08~2022-10-08",
          // dates: "최근갱신일",
          // dates: "2022-10-02",
          dates: "2022-10-23",
          // dates: "2022-10-02~2022-10-02",
          targetValue: "",
        },
        {
          // id: "v-o-c-worst",
          catIndicator: "MDT",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "일별추이|목표대비지표",
          // catPresentationFormat: "일별추이|전주대비지표",
          catProductService: "_",
          catScope: "팀별",
          group: "전남엔지니어링부",
          // catScope: "조별",
          // group: "전남1조",
          title: "MDT불량률",
          // caption: "품질VOC 발생 (전주동일대비)",
          // dates: "1주간",
          // dates: "2022-10-08~2022-10-08",
          // dates: "최근갱신일",
          dates: "2022-10-23",
          // dates: "2022-10-02~2022-10-02",
          targetValue: "",
        },
        {
          // id: "v-o-c-worst",
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "일별추이|목표대비지표",
          // catPresentationFormat: "일별추이|전주대비지표",
          catProductService: "RRC성공률",
          catScope: "팀별",
          group: "전남엔지니어링부",
          // catScope: "조별",
          // group: "전남1조",
          title: "RRC성공률",
          //RRC성공률
          // caption: "품질VOC 발생 (전주동일대비)",
          // dates: "1주간",
          // dates: "2022-10-08~2022-10-08",
          dates: "최근갱신일",
          // dates: "2022-10-23",
          // dates: "2022-10-02~2022-10-02",
          targetValue: "",
        },
        // {
        //   // id: "v-o-c-worst",
        //   catIndicator: "LTE기지국통계",
        //   // catPresentationFormat: "banner",
        //   catProductService: "PRB부하율",
        //   catScope: "팀별",
        //   group: "전남엔지니어링부",
        //   // catScope: "조별",
        //   // group: "전남1조",
        //   title: "PRB부하율",
        //   //RRC성공률
        //   // caption: "품질VOC 발생 (전주동일대비)",
        //   // dates: "1주간",
        //   // dates: "2022-10-08~2022-10-08",
        //   dates: "최근갱신일",
        //   // dates: "2022-10-23",
        //   // dates: "2022-10-02~2022-10-02",
        // },
      ],

      cards: [
        {
          // id: "v-o-c-trend-day",
          // catIndicator: "천명당VOC",
          catIndicator: "VOC",
          catPresentationFormat: "일별추이",
          // catIndicator: "voc",
          // catPresentationFormat: "trend-day",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "5G 품질VOC",
          caption: "5G 품질VOC (2주간 일별 추이)",
          dates: "2주간",
        },

        {
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "일별추이",
          // catPresentationFormat: "Worst기지국",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "VoLTE 절단율",
          caption: "VoLTE 절단율 (2주간 일별 추이)",
          dates: "2주간",
        },

        // {
        //   catIndicator: "VoLTE절단율",
        //   catPresentationFormat: "일별추이",
        //   catProductService: "LTE",
        //   catScope: "팀별",
        //   group: "전남엔지니어링부",
        //   title: "VoLTE 절단율 LTE",
        //   caption: "VoLTE 절단율 LTE (2주간 일별 추이)",
        //   dates: "2주간",
        // },

        {
          // id: "offloading-trend-day",
          // catIndicator: "offloading",
          // catPresentationFormat: "trend-day",
          catIndicator: "오프로딩율",
          catPresentationFormat: "일별추이",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "5G 오프로드율",
          caption: "5G 오프로드율 (2주간 일별 추이)",
          dates: "2주간",
        },
        {
          // id: "subscr-compare_hndset",
          catIndicator: "단말별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "5G 단말 기종별 고객 수",
          caption: "5G 단말 기종별 고객 수 (전주 대비)",
          dates: "최근갱신일",
        },

        {
          // id: "mdt-trend-day",
          catIndicator: "MDT",
          // catPresentationFormat: "trend-day",
          catPresentationFormat: "일별추이",
          catProductService: "_",
          title: "MDT불량률",
          caption: "MDT불량률 (2022-10-10~2022-10-23)",
          catScope: "팀별",
          group: "전남엔지니어링부",
          // dates: "2주간",
          // dates: "2022-09-12~2022-10-04",
          dates: "2022-10-10~2022-10-23",
        },

        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "RRC성공률",
          title: "RRC성공률",
          caption: "RRC성공률 (2주간 일별 추이)",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
          // dates: "2022-10-10~2022-10-23",
        },
        {
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "일별추이",
          catProductService: "PRB사용율",
          title: "PRB사용율",
          caption: "PRB사용율 (2주간 일별 추이)",
          catScope: "조별",
          group: "전남1조",
          dates: "2주간",
          // dates: "2022-10-10~2022-10-23",
        },

        {
          // id: "subscr-compare_hndset",
          catIndicator: "데이터사용량",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "센터별",
          group: "전남액세스운용센터",
          title: "상품별 데이터사용량",
          caption: "상품별 데이터사용량 전남액세스운용센터(단위: GB)",
          dates: "최근갱신일",
        },
        {
          // id: "subscr-compare_hndset",
          catIndicator: "분석상품별가입자수",
          catPresentationFormat: "_",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "상품별 고객 수",
          caption: "상품별 고객 수 (전주 대비)",
          dates: "최근갱신일",
        },
        {
          // id: "v-o-c-worst",
          // catIndicator: "천명당VOC",
          catIndicator: "VOC",
          catPresentationFormat: "Worst기지국",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "5G 품질VOC",
          caption: "5G 품질VOC (1주간 기지국 순위)",
          // dates: "10주간",
          // dates: "최근갱신일",
          dates: "2주간",
        },
        {
          // catIndicator: "offloading",
          catIndicator: "오프로딩율",
          // catPresentationFormat: "주요단말",
          catPresentationFormat: "Worst단말",
          catProductService: "5G",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "5G 오프로드율 Worst 단말",
          caption: "5G 오프로드율 Worst (1주간 단말기종 순위)",
          dates: "2주간",
        },

        {
          // id: "v-o-l-t-e-worst",
          // catIndicator: "volte",
          catIndicator: "VoLTE절단율",
          catPresentationFormat: "Worst단말",
          catProductService: "5G",
          // catScope: "조별",
          // group: "전남1조",
          catScope: "팀별",
          group: "전남엔지니어링부",
          title: "VoLTE 절단율 Worst 단말",
          caption: "VoLTE 절단율 Worst (1주간 단말기종 순위)",
          dates: "2022-10-10~2022-10-23",
        },

        {
          // id: "r-r-c-worst",
          // catIndicator: "rrc",
          catIndicator: "LTE기지국통계",
          catPresentationFormat: "Worst기지국",
          catProductService: "RRC성공률",
          catScope: "조별",
          group: "전남1조",
          title: "RRC성공률 Worst 기지국",
          caption: "RRC성공률 Worst 기지국 (1주간 기지국 순위)",
          dates: "2주간",
          // dates: "최근갱신일",
        },
        // {
        //   // id: "r-r-c-worst",
        //   // catIndicator: "rrc",
        //   catIndicator: "LTE기지국통계",
        //   catPresentationFormat: "Worst기지국",
        //   catProductService: "PRB부하율",
        //   catScope: "조별",
        //   group: "전남1조",
        //   title: "PRB부하율 Worst 기지국",
        //   caption: "PRB부하율 Worst 기지국 (1주간 기지국 순위)",
        //   dates: "2주간",
        //   // dates: "최근갱신일",
        // },
      ],

      hands: [],
      hands_: [
        {
          title: "justTest",
          cards: [],
        },
        {
          title: "justTest",
          cards: [],
        },
      ],
    }),

    // jMyCBProfileTmp: JSON.stringify({ banners: [], cards: [], hands: [] }),
    // jReserve4MyCBProfileReg: JSON.stringify({
    //   banners: [],
    //   cards: [],
    //   hands: [],
    // }),
    // jMyCBProfileReg: JSON.stringify({ banners: [], cards: [], hands: [] }),
  },

  getters: {
    // getxBaseDate() {
    //   function addDays(date, days) {
    //     var result = new Date(date);
    //     result.setDate(result.getDate() + days);
    //     return result;
    //   }
    //   return addDays(new Date(), -1);
    //   // return new Date(new Date().setDate(new Date().getDate() - 1));
    //   // return new Date("2022-09-07");
    // },
    // getxAddDays: () => (date, days) => {
    //   var result = new Date(date);
    //   result.setDate(result.getDate() + days);
    //   this.baseDate = result;
    //   return result;
    // },
  },
  mutations: {
    // initializeBaseDate(state) {
    //   function addDays(date, days) {
    //     var result = new Date(date);
    //     result.setDate(result.getDate() + days);
    //     return result;
    //   }
    //   state.baseDate = addDays(new Date(), -1);
    //   // state.baseDate = new Date(new Date().setDate(new Date().getDate() - 1));
    //   // state.baseDate = Date("2022-09-07");
    // },
    // setBaseDate(state, baseDate) {
    //   state.baseDate = baseDate;
    // },

    // setxBaseDate(state, dateAndDelta) {
    //   var result = new Date(dateAndDelta.date);
    //   result.setDate(result.getDate() + dateAndDelta.delta);
    //   state.baseDate = result;
    // },
    // setxBaseDate(state, dateAndDelta) {
    //   // let date = dateAndDelta[0];
    //   // let delta = dateAndDelta[1];
    //   let [date, delta] = [...dateAndDelta];
    //   var result = new Date(date);
    //   result.setDate(result.getDate() + delta);
    //   state.baseDate = result;
    // },
    // setxBaseDate(state, dateAndDelta) {
    //   // let date = dateAndDelta[0];
    //   // let delta = dateAndDelta[1];
    //   let { date, delta } = { ...dateAndDelta };
    //   var result = new Date(date);
    //   result.setDate(result.getDate() + delta);
    //   state.baseDate = result;
    // },
    setMode2EditCBProfileReg(state, mode2EditCBProfileReg) {
      // console.log("setMode2EditCBProfileReg", mode2EditCBProfileReg);
      state.mode2EditCBProfileReg = mode2EditCBProfileReg;
    },
    addCacheAPI(state, kv) {
      state.cacheAPI[kv.k] = kv.v;
      // console.log("addCacheAPI", kv.k, kv.v, state.cacheAPI);
    },
    // setMyCBProfileTmp(state, myCBProfileTmp) {
    //   console.log("setMyCBProfileTmp", myCBProfileTmp);
    //   state.myCBProfileTmp = myCBProfileTmp;
    // },
    // setReserve4MyCBProfileReg(state, reserve4MyCBProfileReg) {
    //   console.log("setReserve4MyCBProfileReg", reserve4MyCBProfileReg);
    //   state.reserve4MyCBProfileReg = reserve4MyCBProfileReg;
    // },
    // setMyCBProfileReg(state, myCBProfileReg) {
    //   console.log("setMyCBProfileReg", myCBProfileReg);
    //   state.myCBProfileReg = myCBProfileReg;
    // },
    setJMyCBProfileTmp(state, jMyCBProfileTmp) {
      // console.log("setJMyCBProfileTmp", jMyCBProfileTmp);
      state.jMyCBProfileTmp = jMyCBProfileTmp;
    },
    setJMyCBProfileTmpBeforeEditMode(state, jMyCBProfileTmpBeforeEditMode) {
      // console.log("setJReserve4MyCBProfileReg", jReserve4MyCBProfileReg);
      state.jMyCBProfileTmpBeforeEditMode = jMyCBProfileTmpBeforeEditMode;
    },

    setJReserve4MyCBProfileReg(state, jReserve4MyCBProfileReg) {
      // console.log("setJReserve4MyCBProfileReg", jReserve4MyCBProfileReg);
      state.jReserve4MyCBProfileReg = jReserve4MyCBProfileReg;
    },
    setJMyCBProfileReg(state, jMyCBProfileReg) {
      // console.log("setJMyCBProfileReg", jMyCBProfileReg);
      state.jMyCBProfileReg = jMyCBProfileReg;
    },
    SET_MENUS(state, data) {
      state.menus = data;
    },
  },
  actions: {},
};

export default dashboard;
