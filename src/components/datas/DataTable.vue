<template>
  <v-card>
    <v-card-title>
      중복 VOC 발생 주기지국
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-actions> SELECT </v-card-actions>
    <v-data-table
      :headers="headers"
      :items="vocs"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
import { api } from "@/api/api";
export default {
  data() {
    return {
      vocs: [],
      search: "",
      headers: [
        {
          text: "순위",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "주기지국ID", value: "sbt_bts_cd" },
        { text: "주기지국명", value: "equip_nm" },
        { text: "VOC건수", value: "sr_tt_crp_no" },
        { text: "주소", value: "addr_dtl" },
        { text: "지번", value: "bld_flor" },
        { text: "센터", value: "biz_hq_nm" },
      ],
    };
  },
  methods: {
    initialize() {
      api
        .getVocs()
        .then((res) => {
          console.log(res);
          this.vocs = res.data;
          console.log("vocs: ", this.vocs);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
