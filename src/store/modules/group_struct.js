const group_struct = {
  namespaced: true,

  state: {
    groups: [
      {
        name: "강북/강원광역본부",
        children: [
          {
            name: "강북액세스운용센터",
            children: [
              {
                name: "충정엔지니어링부",
                children: [
                  { name: "충정1조" },
                  { name: "충정2조" },
                  { name: "충정3조" },
                ],
              },
              { name: "청량엔지니어링부" },
              { name: "지하철엔지니어링부" },
            ],
          },
          {
            name: "강원액세스운용센터",
            children: [
              { name: "영서엔지니어링부" },
              { name: "영동엔지니어링팀" },
            ],
          },
        ],
      },
      {
        name: "강남/서부광역본부",
        children: [
          {
            name: "서울강남액세스운용센터",
            children: [
              { name: "강남엔지니어링부" },
              { name: "강서엔지니어링부" },
              { name: "강동엔지니어링부" },
            ],
          },
          {
            name: "경기남부액세스운용센터",
            children: [
              { name: "성남엔지니어링부" },
              { name: "용인엔지니어링팀" },
            ],
          },
          {
            name: "경기서부액세스운용센터",
            children: [
              { name: "안양엔지니어링부" },
              { name: "인천엔지니어링부" },
              { name: "부천엔지니어링팀" },
            ],
          },
        ],
      },
      {
        name: "부산/경남광역본부",
        children: [
          {
            name: "부산액세스운용센터",
            children: [
              { name: "동부산엔지니어링부" },
              { name: "서부산엔지니어링부" },
            ],
          },
          {
            name: "경남액세스운용센터",
            children: [{ name: "경남엔지니어링팀" }],
          },
        ],
      },
      {
        name: "대구/경북광역본부",
        children: [
          {
            name: "대구액세스운용센터",
            children: [{ name: "대구엔지니어링부" }],
          },
          {
            name: "경북액세스운용센터",
            children: [{ name: "경북엔지니어링부" }],
          },
        ],
      },
      {
        name: "전남/전북광역본부",
        children: [
          {
            name: "전남액세스운용센터",
            children: [
              {
                name: "전남엔지니어링부",
                children: [
                  { name: "전남1조" },
                  { name: "전남2조" },
                  { name: "전남3조" },
                ],
              },
              { name: "제주엔지니어링팀" },
              { name: "순천엔지니어링팀" },
            ],
          },
          {
            name: "전북액세스운용센터",
            children: [{ name: "전북엔지니어링부" }],
          },
        ],
      },
      {
        name: "충남/충북광역본부",
        children: [
          {
            name: "충남액세스운용센터",
            children: [{ name: "충남엔지니어링부" }],
          },
          {
            name: "충북액세스운용센터",
            children: [{ name: "충북엔지니어링부" }],
          },
        ],
      },
    ],
  },

  getters: {},

  mutations: {},

  actions: {},
};

export default group_struct;
