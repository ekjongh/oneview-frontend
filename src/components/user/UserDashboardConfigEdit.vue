<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">Edit User Dashboard Config</h4>
            <v-spacer></v-spacer>
            <v-select
              v-model="formData.config_nm"
              :items="config_list"
              label="Slot"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Banner 1</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.banners[0].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.banners[0].type"
              :items="type_list[formData.banners[0].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.banners[0].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.banners[0].date"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Banner 2</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.banners[1].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.banners[1].type"
              :items="type_list[formData.banners[1].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.banners[1].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.banners[1].date"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Banner 3</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.banners[2].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.banners[2].type"
              :items="type_list[formData.banners[2].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.banners[2].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.banners[2].date"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Card 1</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.cards[0].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.cards[0].type"
              :items="type_list[formData.cards[0].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.cards[0].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.cards[0].date"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Card 2</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.cards[1].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.cards[1].type"
              :items="type_list[formData.cards[1].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.cards[1].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.cards[1].date"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Card 3</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.cards[2].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.cards[2].type"
              :items="type_list[formData.cards[2].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.cards[2].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.cards[2].date"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Card 4</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.cards[3].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.cards[3].type"
              :items="type_list[formData.cards[3].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.cards[3].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.cards[3].date"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Card 5</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.cards[4].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.cards[4].type"
              :items="type_list[formData.cards[4].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.cards[4].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.cards[4].date"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Card 6</p>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="formData.cards[5].kpi"
              :items="Object.keys(type_list)"
              label="Select"
              hint="What are the target regions"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="formData.cards[5].type"
              :items="type_list[formData.cards[5].kpi]"
              item-text="name"
              item-value="value"
              label="Select"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="GROUP"
              v-model="formData.cards[5].group"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="DATE"
              v-model="formData.cards[5].date"
            ></v-text-field>
          </v-col>

          <v-col cols="12 mt-5">
            <v-btn type="submit" color="primary" :loading="loading">
              Save
            </v-btn>

            <v-btn @click="formatData" class="ml-2"> Reset </v-btn>

            <router-link :to="cancelUrl" class="text-decoration-none">
              <v-btn type="button" class="ml-2"> Cancel </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </div>
    </form>
  </v-card>
</template>
<script>
import { api } from "@/api/api";

export default {
  name: "UserDashboardConfigEdit",
  data: () => ({
    valid: true,
    alert: false,
    message: "",
    disabled: false,
    selection: [],
    my_configs: [],
    userId: "",

    type_list: {
      voc: [
        {
          name: "일별 VOC 변경 추이",
          value: "trend-day",
        },
        {
          name: "VOC Worst TOP10",
          value: "worst",
        },
        {
          name: "전일 대비 VOC 변화량",
          value: "kpi-day",
        },
        {
          name: "VOC 발생 목록",
          value: "list",
        },
      ],
      volte: [
        {
          name: "일별 Volte 변경 추이",
          value: "trend-day",
        },
        {
          name: "Volte Worst TOP10",
          value: "worst",
        },
        {
          name: "전일 대비 VOC 변화량",
          value: "kpi-day",
        },
      ],
      offloading: [
        {
          name: "일별 5G 오프로딩 변경 추이",
          value: "trend-day",
        },
        {
          name: "전일 대비 5G 오프로딩 변화량",
          value: "kpi-day",
        },
      ],
      mdt: [
        {
          name: "일별 MDT 변경 추이",
          value: "trend-day",
        },
      ],
    },

    formData: {
      owner_id: "",
      config_nm: "",
      cards: [
        {
          order: 1,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 2,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 3,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 4,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 5,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 6,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
      ],
      banners: [
        {
          order: 1,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 2,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
        {
          order: 3,
          kpi: "",
          type: "",
          group: "",
          date: "",
        },
      ],
    },
  }),

  methods: {
    initialize() {
      api
        .getDashboardConfig(this.userId)
        .then((res) => {
          console.log(res);
          this.my_configs = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
};
</script>
