<template>
  <v-container
    :style="{
      width: '100vw',
      height: 'calc(100vh - 52px)',
    }"
    fluid
    class="pa-0 overflow-x-hidden overflow-y-auto"
  >
    <v-container
      fluid
      :style="{
        minHeight: 'calc(100vh - 96px)',
      }"
      class="pa-0 py-2"
    >
      <v-row>
        <v-expansion-panels flat v-model="panels" class="ml-5 mr-5 mt-3">
          <v-expansion-panel @click.prevent="onClick()">
            <v-expansion-panel-header
              disable-icon-rotate
              class="justify-self-start mb-n5"
            >
              <template v-slot:actions>
                <v-btn :color="panels === undefined ? 'primary' : ''">
                  {{ panels === undefined ? "열기" : "닫기" }}
                </v-btn>
              </template>
              <v-row align="center">
                <v-col cols="3" sm="2" md="1">
                  <div>
                    <!-- <v-icon left large> mdi-account-alert </v-icon> -->
                    <v-btn
                      color="rgba(133, 217, 255, 1)"
                      class="pa-0 mr-3"
                      min-width="10px"
                      tile
                      elevation="0"
                    ></v-btn>
                    <span class="mr-1" style="font-size: 18px">VOC 목록</span>
                    <v-icon
                      id="voc_excel_btn"
                      :disabled="this.voc_list.length === 0 ? true : false"
                      @click="getVocExcel()"
                      @click.stop="onClick()"
                      color="green"
                    >
                      mdi-microsoft-excel
                    </v-icon>
                  </div>
                </v-col>
                <v-col cols="6" sm="3" md="2">
                  <v-menu
                    ref="date_menu"
                    v-model="date_menu"
                    :close-on-content-click="false"
                    :return-value.sync="date_query"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeText"
                        v-on="on"
                        v-bind="attrs"
                        id="date_query_input"
                        label="조회기간"
                        prepend-icon="mdi-calendar"
                        readonly
                        @click.stop="onClick()"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date_query"
                      no-title
                      scrollable
                      range
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="date_menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.date_menu.save(
                            date_query.length === 2
                              ? date_query
                              : [...date_query, ...date_query]
                          )
                        "
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6" sm="3" md="2">
                  <v-menu
                    ref="group_menu"
                    v-model="group_menu"
                    :close-on-content-click="false"
                    :return-value.sync="group_query"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="group_query"
                        v-on="on"
                        v-bind="attrs"
                        id="group_query_input"
                        label="조회소속"
                        prepend-icon="mdi-account"
                        readonly
                        @click.stop="onClick()"
                      ></v-text-field>
                    </template>
                    <v-card elevation="0">
                      <v-card-text>
                        <v-treeview
                          :items="group_list"
                          item-text="label"
                          rounded
                          dense
                          return-object
                          hoverable
                          activatable
                          @update:active="getGroupQuery"
                        ></v-treeview>
                      </v-card-text>
                      <v-spacer></v-spacer>
                      <v-card-actions>
                        <v-btn
                          text
                          color="primary"
                          @click="group_menu = false"
                          @click.stop="onClick()"
                        >
                          Cancel
                        </v-btn>
                        <!-- <v-btn
                        text
                        color="primary"
                        @click="$refs.group_menu.save(group_query)"
                      >
                        OK
                      </v-btn> -->
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-col>
                <v-col cols="1" class="mr-6">
                  <v-btn
                    id="voc_list_search_input"
                    class="ma-3"
                    color="primary"
                    @click="getVocLists()"
                    @click.stop="onClick()"
                    >VOC 목록 조회</v-btn
                  >
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="7" sm="5" md="3" class="ma-0">
                  <div>
                    <v-text-field
                      v-model="search"
                      id="voc_detail_search_input"
                      append-icon="mdi-close"
                      prepend-icon="mdi-account-alert"
                      label="VOC번호를 입력 또는 클릭해주세요"
                      single-line
                      hide-details
                      class="ma-0 text-red"
                      @click:append="search = ''"
                      @click.stop="onClick()"
                    >
                    </v-text-field>
                  </div>
                </v-col>
                <!-- <v-col md="1" class="red">TEST</v-col> -->
                <v-btn
                  id="voc_detail_search_input"
                  class="mr-6"
                  color="primary"
                  @click="getVocDetail()"
                  @click.stop="onClick()"
                  >GIS 상세분석</v-btn
                >
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-n6">
              <v-card dense elevation="0">
                <v-data-table
                  :headers="voc_header"
                  :items="filtered_voc_list"
                  :search="search_query"
                  :expanded.sync="expanded"
                  :items-per-page="5"
                  item-key="sr_tt_rcp_no"
                  :hide-default-footer="vocFooster"
                  show-expand
                  multi-sort
                  :loading="voc_loading"
                  dense
                  class="elevation-1"
                >
                  <!-- :height="search_query ? '90px' : '250px'" -->
                  <template v-slot:[`item.sr_tt_rcp_no`]="{ item }">
                    <div id="sr_no_item" @click="search = item.sr_tt_rcp_no">
                      {{ item.sr_tt_rcp_no }}
                    </div>
                  </template>
                  <template v-slot:[`header.base_date`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="base_date_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="base_date_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="base_date_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (base_date_input_used = base_date_input),
                              (base_date_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (base_date_input_used = ''),
                              (base_date_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>

                  <template v-slot:[`header.sr_tt_rcp_no`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="sr_tt_rcp_no_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="sr_tt_rcp_no_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="sr_tt_rcp_no_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (sr_tt_rcp_no_input_used = sr_tt_rcp_no_input),
                              (sr_tt_rcp_no_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (sr_tt_rcp_no_input_used = ''),
                              (sr_tt_rcp_no_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>

                  <template v-slot:[`header.voc_type_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="voc_type_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="voc_type_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="voc_type_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (voc_type_nm_input_used = voc_type_nm_input),
                              (voc_type_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (voc_type_nm_input_used = ''),
                              (voc_type_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.voc_all_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="voc_all_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="voc_all_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="voc_all_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (voc_all_nm_input_used = voc_all_nm_input),
                              (voc_all_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (voc_all_nm_input_used = ''),
                              (voc_all_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.voc_wjt_tert_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="voc_wjt_tert_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="voc_wjt_tert_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="voc_wjt_tert_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (voc_wjt_tert_nm_input_used =
                                voc_wjt_tert_nm_input),
                              (voc_wjt_tert_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (voc_wjt_tert_nm_input_used = ''),
                              (voc_wjt_tert_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.voc_wjt_qrtc_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="voc_wjt_qrtc_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="voc_wjt_qrtc_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="voc_wjt_qrtc_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (voc_wjt_qrtc_nm_input_used =
                                voc_wjt_qrtc_nm_input),
                              (voc_wjt_qrtc_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (voc_wjt_qrtc_nm_input_used = ''),
                              (voc_wjt_qrtc_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.svc_cont_id`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="svc_cont_id_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="svc_cont_id_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="svc_cont_id_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (svc_cont_id_input_used = svc_cont_id_input),
                              (svc_cont_id_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (svc_cont_id_input_used = ''),
                              (svc_cont_id_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.area_jo_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="area_jo_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="area_jo_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="area_jo_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (area_jo_nm_input_used = area_jo_nm_input),
                              (area_jo_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (area_jo_nm_input_used = ''),
                              (area_jo_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.hndset_pet_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="hndset_pet_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="hndset_pet_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="hndset_pet_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (hndset_pet_nm_input_used = hndset_pet_nm_input),
                              (hndset_pet_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (hndset_pet_nm_input_used = ''),
                              (hndset_pet_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template
                    v-slot:[`header.anals_3_prod_level_nm`]="{ header }"
                  >
                    {{ header.text }}
                    <v-menu
                      v-model="anals3_prod_level_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="
                              anals_3_prod_level_nm_input_used ? 'primary' : ''
                            "
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="anals_3_prod_level_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (anals_3_prod_level_nm_input_used =
                                anals_3_prod_level_nm_input),
                              (anals_3_prod_level_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (anals_3_prod_level_nm_input_used = ''),
                              (anals_3_prod_level_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.bprod_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="bprod_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="bprod_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="bprod_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (bprod_nm_input_used = bprod_nm_input),
                              (bprod_nmmenu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (bprod_nm_input_used = ''),
                              (bprod_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.equip_cd`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="equip_cd_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="equip_cd_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="equip_cd_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (equip_cd_input_used = equip_cd_input),
                              (equip_cd_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (equip_cd_input_used = ''),
                              (equip_cd_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.equip_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="equip_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="equip_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="equip_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (equip_nm_input_used = equip_nm_input),
                              (equip_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (equip_nm_input_used = ''),
                              (equip_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.biz_hq_nm`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="biz_hq_nm_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="biz_hq_nm_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="biz_hq_nm_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (biz_hq_nm_input_used = biz_hq_nm_input),
                              (biz_hq_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (biz_hq_nm_input_used = ''),
                              (biz_hq_nm_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.juso`]="{ header }">
                    {{ header.text }}
                    <v-menu
                      v-model="juso_menu"
                      offset-y
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="juso_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="juso_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (juso_input_used = juso_input),
                              (juso_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="[(juso_input_used = ''), (juso_menu = false)]"
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template v-slot:[`header.data-table-expand`]="{ header }">
                    {{ header.text }}
                    <v-menu offset-y :close-on-content-click="false">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon
                            small
                            :color="voc_memo_input_used ? 'primary' : ''"
                          >
                            mdi-filter
                          </v-icon>
                        </v-btn>
                      </template>
                      <div style="background-color: white; width: 280px">
                        <v-text-field
                          v-model="voc_memo_input"
                          class="pa-4"
                          type="text"
                          label="Enter the search term"
                          :autofocus="true"
                        ></v-text-field>
                        <v-btn
                          @click="
                            [
                              (voc_memo_input_used = voc_memo_input),
                              (voc_memo_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >OK</v-btn
                        >
                        <v-btn
                          @click="
                            [
                              (voc_memo_input_used = ''),
                              (voc_memo_menu = false),
                            ]
                          "
                          small
                          text
                          color="primary"
                          class="ml-2 mb-2"
                          >Clean</v-btn
                        >
                      </div>
                    </v-menu>
                  </template>
                  <template
                    v-slot:[`item.data-table-expand`]="{ item, isExpanded }"
                  >
                    <v-icon @click="handleExpansion(item, isExpanded)">
                      {{
                        isExpanded ? "mdi-close" : "mdi-book-open-page-variant"
                      }}
                    </v-icon>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                      <table border="1">
                        <tr>
                          <th style="width: 34%">VOC 인입 메모</th>
                          <th style="width: 33%">VOC 처리 메모</th>
                          <th style="width: 33%">TT 처리 메모</th>
                        </tr>
                        <tr>
                          <td>{{ item.voc_rcp_txn }}</td>
                          <td>{{ item.voc_actn_txn }}</td>
                          <td>{{ item.tt_trt_sbst }}</td>
                        </tr>
                      </table>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row align-content="center" justify="center">
          <v-col md="6" sm="12" class="pa-3 mr-n7">
            <v-card elevation="0" style="margin: 5px; padding: 20px">
              <v-row align="center" justify="space-between">
                <v-card-title>
                  <div>
                    <v-btn
                      color="rgba(133, 217, 255, 1)"
                      class="pa-0 mr-3"
                      min-width="10px"
                      tile
                      elevation="0"
                    ></v-btn>
                    <span class="mr-3">GIS분석</span
                    ><span>
                      <v-chip
                        class="mr-3"
                        :color="chip_configs.tt_color ? 'red' : ''"
                        :active="chip_configs.tt"
                        outlined
                        filter
                        small
                        @click="move_tt"
                      >
                        <!-- <v-icon left small> mdi-target </v-icon> -->
                        <v-img
                          src="@/assets/tt-marker-red.png"
                          max-height="20"
                          max-width="20"
                          class="mr-1"
                        ></v-img>
                        TT 발생주소
                      </v-chip>
                      <v-chip
                        class="mr-3"
                        :color="chip_configs.ngt_color ? 'primary' : ''"
                        :active="chip_configs.ngt"
                        outlined
                        filter
                        small
                        @click="move_ngt"
                      >
                        <!-- <v-icon left small> mdi-weather-night </v-icon> -->
                        <v-img
                          src="@/assets/night-marker.png"
                          max-height="20"
                          max-width="20"
                          class="mr-1"
                        ></v-img>
                        야간 대표좌표
                      </v-chip>
                      <v-chip
                        class="mr-3"
                        :color="chip_configs.day_color ? 'primary' : ''"
                        :active="chip_configs.day"
                        outlined
                        filter
                        small
                        @click="move_day"
                      >
                        <!-- <v-icon left small> mdi-weather-sunny </v-icon> -->
                        <v-img
                          src="@/assets/day-marker.png"
                          max-height="20"
                          max-width="20"
                          class="mr-1"
                        ></v-img>
                        주간 대표좌표
                      </v-chip>
                      <v-chip
                        class="mr-3"
                        :color="chip_configs.volte_color ? 'primary' : ''"
                        :active="chip_configs.volte"
                        outlined
                        filter
                        small
                        @click="move_volte"
                      >
                        <!-- <v-icon left small> mdi-phone-missed </v-icon> -->
                        <v-img
                          src="@/assets/volte-marker.png"
                          max-height="20"
                          max-width="20"
                          class="mr-1"
                        ></v-img>
                        음성 주기지국
                      </v-chip>
                      <v-chip
                        class="mr-3"
                        :color="chip_configs.data_color ? 'primary' : ''"
                        :active="chip_configs.data"
                        outlined
                        filter
                        small
                        @click="move_data"
                      >
                        <!-- <v-icon left small> mdi-wifi </v-icon> -->
                        <v-img
                          src="@/assets/data-marker.png"
                          max-height="20"
                          max-width="20"
                          class="mr-1"
                        ></v-img>
                        데이터 주기지국
                      </v-chip></span
                    >
                  </div>
                </v-card-title>
                <v-btn
                  class="mr-3"
                  :color="
                    chip_configs.tt_color ||
                    chip_configs.data_color ||
                    chip_configs.volte_color ||
                    chip_configs.day_color ||
                    chip_configs.ngt_color
                      ? 'primary'
                      : 'gray'
                  "
                  @click="offConfigBts()"
                >
                  CLEAR
                </v-btn>
              </v-row>
              <v-row>
                <kt-map />
              </v-row>
            </v-card>
          </v-col>
          <v-col md="6" sm="12" class="pa-3">
            <v-card elevation="0" style="margin: 5px; padding: 20px">
              <v-row align="center" justify="space-between">
                <v-card-title>
                  <v-btn
                    color="rgba(133, 217, 255, 1)"
                    class="pa-0 mr-3"
                    min-width="10px"
                    tile
                    elevation="0"
                  ></v-btn>
                  VOC발생 고객 사용 기지국 품질요약
                </v-card-title>
                <!-- <v-checkbox
                  v-model="selected"
                  label="전일"
                  value="전일"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="당일"
                  value="당일"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="합계"
                  value="합계"
                ></v-checkbox> -->
                <v-spacer></v-spacer>
                <div>
                  <v-text-field
                    v-model="selected_marker_id"
                    id="selected_marker_id"
                    append-icon="mdi-close"
                    label="기지국을 클릭해주세요"
                    single-line
                    hide-details
                    @click:append="selected_marker_id = ''"
                    class="mr-6 text-blue"
                  >
                  </v-text-field>
                </div>
                <!-- <v-btn :color="panels === undefined ? 'primary' : ''">
                  {{ panels === undefined ? "열기" : "닫기" }}
                </v-btn> -->
                <!-- <v-btn
                  class="mr-3"
                  :color="filter_tt_juso ? 'primary' : ''"
                  @click="filter_tt_juso = !filter_tt_juso"
                >
                  TT주변 기지국
                </v-btn> -->
                <div class="mt-6 mr-3">
                  <v-select
                    v-model="selected_filter_bts"
                    :items="activeConfigBts"
                    label="대표기지국 주변 필터링"
                  ></v-select>
                </div>
                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-top-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on">
                      VOC 상세품질 조회
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="rgba(133, 217, 255, 1)">
                      <!-- <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn> -->
                      <v-toolbar-title>VOC고객 기지국 상세품질</v-toolbar-title>
                      <v-icon
                        v-ripple
                        :disabled="this.bts_list.length === 0 ? true : false"
                        @click="getBtsExcel()"
                        color="green"
                        class="ml-3"
                      >
                        mdi-microsoft-excel
                      </v-icon>
                      <v-spacer></v-spacer>
                      <v-col cols="2">
                        <v-text-field
                          v-model="selected_marker_id"
                          prepend-icon="mdi-magnify"
                          append-icon="mdi-close"
                          @click:append="selected_marker_id = ''"
                          label="통합검색"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2" class="mt-6 mr-3">
                        <v-select
                          v-model="selected_filter_bts"
                          :items="activeConfigBts"
                          label="대표기지국 주변 필터링"
                        ></v-select>
                      </v-col>
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <!-- <v-toolbar-items>
                      <v-btn dark text @click="dialog = false"> Save </v-btn>
                    </v-toolbar-items> -->
                    </v-toolbar>
                    <!-- <v-list three-line subheader>
                    <v-subheader>User Controls</v-subheader>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Content filtering</v-list-item-title>
                        <v-list-item-subtitle
                          >Set the content filtering level to restrict apps that
                          can be downloaded</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Password</v-list-item-title>
                        <v-list-item-subtitle
                          >Require password for purchase or use password to
                          restrict purchase</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-divider></v-divider>
                  <v-list three-line subheader>
                    <v-subheader>General</v-subheader>
                    <v-list-item>
                      <v-list-item-action>
                        <v-checkbox v-model="notifications"></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Notifications</v-list-item-title>
                        <v-list-item-subtitle
                          >Notify me about updates to apps or games that I
                          downloaded</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-checkbox v-model="sound"></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Sound</v-list-item-title>
                        <v-list-item-subtitle
                          >Auto-update apps at any time. Data charges may
                          apply</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-action>
                        <v-checkbox v-model="widgets"></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Auto-add widgets</v-list-item-title>
                        <v-list-item-subtitle
                          >Automatically add home screen
                          widgets</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list> -->
                    <v-data-table
                      v-model="bts_list_view"
                      item-key="key"
                      :headers="bts_headers_detail"
                      :items="filtered_bts_list"
                      :items-per-page="-1"
                      :item-class="itemRowBackground"
                      multi-sort
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :search="selected_marker_id"
                      @update:options="handleOptionsUpdate"
                      show-select
                      fixed-header
                      class="elevation-1"
                      height="800"
                    >
                      <template v-slot:[`header.base_date`]="{ header }">
                        {{ header.text }}
                        <v-menu
                          v-model="base_date_menu_bts_simple"
                          offset-y
                          :close-on-content-click="false"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon
                                small
                                :color="
                                  selected_date.length !== 2 ? 'primary' : ''
                                "
                              >
                                mdi-filter
                              </v-icon>
                            </v-btn>
                          </template>
                          <div style="background-color: white; width: 100px">
                            <v-checkbox
                              v-model="selected_date"
                              label="전일"
                              :value="0"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="selected_date"
                              label="당일"
                              :value="1"
                            ></v-checkbox>
                          </div>
                        </v-menu>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-dialog>
              </v-row>
              <v-row>
                <v-col>
                  <v-data-table
                    v-model="bts_list_view"
                    item-key="key"
                    :headers="bts_headers"
                    :items="filtered_bts_list"
                    :items-per-page="-1"
                    :item-class="itemRowBackground"
                    @dblclick:row="showRowInfo"
                    multi-sort
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :search="selected_marker_id"
                    @update:options="handleOptionsUpdate"
                    show-select
                    fixed-header
                    hide-default-footer
                    class="elevation-1"
                    :height="this.inbldg_list.length > 0 ? '383px' : '668px'"
                  >
                    <template v-slot:[`header.base_date`]="{ header }">
                      {{ header.text }}
                      <v-menu
                        v-model="base_date_menu_bts_detail"
                        offset-y
                        :close-on-content-click="false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon
                              small
                              :color="
                                selected_date.length !== 2 ? 'primary' : ''
                              "
                            >
                              mdi-filter
                            </v-icon>
                          </v-btn>
                        </template>
                        <div style="background-color: white; width: 100px">
                          <v-checkbox
                            v-model="selected_date"
                            label="전일"
                            :value="0"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="selected_date"
                            label="당일"
                            :value="1"
                          ></v-checkbox>
                        </div>
                      </v-menu>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
              <template v-if="this.inbldg_list.length > 0">
                <v-row align="center" justify="space-between">
                  <v-card-title>
                    <v-btn
                      color="rgba(133, 217, 255, 1)"
                      class="pa-0 mr-3"
                      min-width="10px"
                      tile
                      elevation="0"
                    ></v-btn>
                    VOC발생 고객 인빌딩 품질요약
                  </v-card-title>
                </v-row>
                <v-row>
                  <v-col>
                    <v-data-table
                      v-model="inbldg_list_view"
                      item-key="key"
                      :headers="inbldg_headers"
                      :items="filtered_inbldg_list"
                      :items-per-page="-1"
                      :item-class="itemRowBackground"
                      @dblclick:row="showRowInfoInbldg"
                      @update:options="handleOptionsUpdate"
                      show-select
                      fixed-header
                      hide-default-footer
                      class="elevation-1"
                      height="190px"
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <v-footer padless>
      <v-col class="text-center text-caption">
        Copyright© {{ new Date().getFullYear() }} KT Corp. All rights reserved.
      </v-col>
    </v-footer>
  </v-container>
</template>
<script>
import KtMap from "@/components/maps/KtMap.vue";
import { api } from "@/api/api";
import { bus } from "@/event-bus";
import { mapGetters } from "vuex";
export default {
  name: "MapView",
  components: {
    KtMap,
  },
  data: () => ({
    date_query: [],
    sortBy: [],
    sortDesc: [],
    selected_date: [0, 1],
    group_query: "전체",
    // filter_tt_juso: false,
    date_menu: false,
    date_modal: false,
    group_menu: false,
    group_modal: false,
    panels: undefined,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    vocFooster: false,
    selected_marker_id: "",
    search_bts_detail: "",
    base_date_input: "",
    sr_tt_rcp_no_input: "",
    voc_type_nm_input: "",
    voc_memo_input: "",
    voc_all_nm_input: "",
    voc_wjt_tert_nm_input: "",
    voc_wjt_qrtc_nm_input: "",
    svc_cont_id_input: "",
    hndset_pet_nm_input: "",
    anals_3_prod_level_nm_input: "",
    bprod_nm_input: "",
    equip_cd_input: "",
    equip_nm_input: "",
    biz_hq_nm_input: "",
    juso_input: "",
    area_jo_nm_input: "",

    base_date_input_used: "",
    sr_tt_rcp_no_input_used: "",
    voc_type_nm_input_used: "",
    voc_memo_input_used: "",
    voc_all_nm_input_used: "",
    voc_wjt_tert_nm_input_used: "",
    voc_wjt_qrtc_nm_input_used: "",
    svc_cont_id_input_used: "",
    hndset_pet_nm_input_used: "",
    anals_3_prod_level_nm_input_used: "",
    bprod_nm_input_used: "",
    equip_cd_input_used: "",
    equip_nm_input_used: "",
    biz_hq_nm_input_used: "",
    juso_input_used: "",
    area_jo_nm_input_used: "",
    selected_filter_bts: "전체",

    base_date_menu: false,
    base_date_menu_bts_simple: false,
    base_date_menu_bts_detail: false,
    sr_tt_rcp_no_menu: false,
    voc_type_nm_menu: false,
    voc_memo_menu: false,
    voc_all_nm_menu: false,
    voc_wjt_tert_nm_menu: false,
    voc_wjt_qrtc_nm_menu: false,
    svc_cont_id_menu: false,
    hndset_pet_nm_menu: false,
    anals3_prod_level_nm_menu: false,
    bprod_nm_menu: false,
    equip_cd_menu: false,
    equip_nm_menu: false,
    biz_hq_nm_menu: false,
    juso_menu: false,
    area_jo_nm_menu: false,
    voc_loading: false,

    expanded: [],
    worst_quality_value: {},
    group_list: [],
    user_info: {},
    tt_marker: {},
    day_marker: {},
    ngt_marker: {},
    data_marker: {},
    volte_marker: {},

    bts_headers: [
      { text: "날짜", value: "base_date", width: "120px" },
      {
        text: "셀 ID",
        align: "start",
        sortable: true,
        value: "cell_cd",
        width: "80px",
      },
      {
        text: "기지국 명",
        align: "start",
        sortable: true,
        value: "equip_nm",
        width: "100px",
      },
      { text: "분류", value: "special", width: "120px" },
      { text: "RSRP 불량", value: "rsrp_bad_cnt", width: "110px" },
      { text: "RSRP 평균", value: "rsrp_avg", width: "110px" },
      { text: "RIP 불량", value: "rip_bad_cnt", width: "100px" },
      { text: "RIP 평균", value: "rip_avg", width: "100px" },
      { text: "PHR 불량", value: "phr_bad_cnt", width: "110px" },
      { text: "PHR 평균", value: "phr_avg", width: "110px" },
      { text: "RSRQ 불량", value: "rsrq_bad_cnt", width: "110px" },
      { text: "S1AP 발생", value: "s1ap_cnt", width: "110px" },
      { text: "S1AP 불량", value: "s1ap_fail_cnt", width: "110px" },
      { text: "자망 절단", value: "volte_self_fail_cacnt", width: "110px" },
      { text: "총 절단", value: "volte_fail_cacnt", width: "110px" },
    ],
    bts_headers_detail: [
      { text: "날짜", value: "base_date", width: "120px" },
      {
        text: "셀 ID",
        value: "cell_cd",
        width: "120px",
      },
      {
        text: "기지국 ID",
        align: "start",
        sortable: true,
        value: "equip_cd",
        width: "120px",
      },
      { text: "기지국 명", value: "equip_nm", width: "200px" },
      { text: "분류", value: "special", width: "200px" },
      {
        text: "RSRP 불량(-105dBm 이하)",
        value: "rsrp_bad_cnt",
        width: "200px",
      },
      {
        text: "RSRP(-105 ~ -110dBm)",
        value: "rsrp_m105d_cnt",
        width: "200px",
      },
      { text: "RSRP(-110dBm 이하)", value: "rsrp_m110d_cnt", width: "170px" },
      { text: "RSRP 평균", value: "rsrp_avg", width: "110px" },
      { text: "RSRP 총합", value: "rsrp_sum", width: "110px" },
      { text: "RSRP 총 건수", value: "rsrp_cnt", width: "120px" },
      { text: "5G RSRP 평균", value: "nr_rsrp_avg", width: "140px" },
      { text: "5G RSRP 총합", value: "nr_rsrp_sum", width: "140px" },
      { text: "5G RSRP 총 건수", value: "nr_rsrp_cnt", width: "150px" },
      { text: "RIP 불량(-92dBm 이상)", value: "rip_maxd_cnt", width: "180px" },
      { text: "RIP 평균", value: "rip_avg", width: "100px" },
      { text: "RIP 총합", value: "rip_sum", width: "100px" },
      { text: "RIP 총 건수", value: "rip_cnt", width: "120px" },
      { text: "PHR 불량(0.9dB 이하)", value: "phr_bad_cnt", width: "170px" },
      { text: "PHR(0.9 ~ -3dB)", value: "phr_m3d_cnt", width: "140px" },
      { text: "PHR(-3dB 이하)", value: "phr_mind_cnt", width: "140px" },
      { text: "PHR 평균", value: "phr_avg", width: "110px" },
      { text: "PHR 총합", value: "phr_sum", width: "110px" },
      { text: "PHR 총 건수", value: "phr_cnt", width: "120px" },
      { text: "RSRQ 불량(-15dB 이하)", value: "rsrq_bad_cnt", width: "180px" },
      { text: "RSRQ(-15 ~ -17dB)", value: "rsrq_m15d_cnt", width: "180px" },
      { text: "RSRQ(-17dB 이하)", value: "rsrq_m17d_cnt", width: "150px" },
      { text: "RSRQ 평균", value: "rsrq_avg", width: "110px" },
      { text: "RSRQ 총합", value: "rsrq_sum", width: "110px" },
      { text: "RSRQ 총 건수", value: "rsrq_cnt", width: "140px" },
      { text: "S1AP 발생", value: "s1ap_cnt", width: "110px" },
      { text: "S1AP 불량", value: "s1ap_fail_cnt", width: "110px" },
      { text: "자망 절단", value: "volte_self_fail_cacnt", width: "110px" },
      { text: "타망 절단", value: "volte_other_fail_cacnt", width: "110px" },
      { text: "총 절단", value: "volte_fail_cacnt", width: "110px" },
      { text: "총 불완료수", value: "volte_uncomp_cacnt", width: "110px" },
      { text: "총 완료수", value: "volte_comp_cacnt", width: "110px" },
      { text: "총 시도수", value: "volte_try_cacnt", width: "110px" },
    ],
    inbldg_headers: [
      { text: "날짜", value: "base_date", width: "120px" },
      {
        text: "건물정보",
        align: "start",
        sortable: true,
        value: "bldg_info",
        width: "120px",
      },
      { text: "RSRP 불량", value: "bldg_rsrp_bad_cnt", width: "110px" },
      { text: "RSRP 평균", value: "bldg_rsrp_avg", width: "110px" },
      { text: "RIP 불량", value: "bldg_rip_bad_cnt", width: "100px" },
      { text: "RIP 평균", value: "bldg_rip_avg", width: "100px" },
      { text: "PHR 불량", value: "bldg_phr_bad_cnt", width: "110px" },
      { text: "PHR 평균", value: "bldg_phr_avg", width: "110px" },
      { text: "RSCP 불량", value: "bldg_rscp_bad_cnt", width: "110px" },
      { text: "RSCP 평균", value: "bldg_rscp_avg", width: "110px" },
      { text: "NSINR 평균", value: "bldg_nsinr_avg", width: "130px" },
    ],
    voc_header: [
      {
        text: "날짜",
        align: "start",
        width: "5%",
        value: "base_date",
        sortable: false,
      },
      { text: "VOC번호", value: "sr_tt_rcp_no", width: "7%", sortable: false },
      { text: "계약번호", value: "svc_cont_id", width: "7%", sortable: false },
      { text: "관할", value: "area_jo_nm", width: "6%", sortable: false },
      { text: "주기지국cd", value: "equip_cd", width: "7%", sortable: false },
      { text: "주기지국", value: "equip_nm", width: "12%", sortable: false },
      { text: "유형", value: "voc_type_nm", width: "5%", sortable: false },
      { text: "세부유형", value: "voc_all_nm", width: "15%", sortable: false },
      // { text: "3차유형", value: "voc_wjt_tert_nm", width: "10%" },
      // { text: "4차유형", value: "voc_wjt_qrtc_nm", width: "10%" },
      { text: "단말기", value: "hndset_pet_nm", width: "7%", sortable: false },
      {
        text: "망",
        value: "anals_3_prod_level_nm",
        width: "5%",
        sortable: false,
      },
      { text: "요금제", value: "bprod_nm", width: "8%", sortable: false },
      { text: "주소", value: "juso", width: "20%", sortable: false },
      // { text: "센터", value: "biz_hq_nm", width: "7%" },
      {
        text: "메모",
        value: "data-table-expand",
        width: "6%",
      },
    ],
    bts_list: [],
    voc_list: [],
    date_list: [],
    bts_list_view: [],
    config_bts_view: [],
    bts_user_info: [],
    inbldg_list: [],
    inbldg_list_view: [],
    move_map: {},
    search: "",
    search_query: "",
    chip_configs: {
      tt: false,
      tt_color: true,
      day: false,
      day_color: true,
      ngt: false,
      ngt_color: true,
      data: false,
      data_color: true,
      volte: false,
      volte_color: true,
    },
    getBGC4Container: "rgba(235, 237, 237, 1)",
  }),
  computed: {
    activeConfigBts() {
      let tmp = ["전체"];
      if (this.chip_configs.tt) {
        tmp.push(this.config_bts_info.tt);
      }
      if (this.chip_configs.day) {
        tmp.push(this.config_bts_info.day);
      }
      if (this.chip_configs.ngt) {
        tmp.push(this.config_bts_info.ngt);
      }
      if (this.chip_configs.data) {
        tmp.push(this.config_bts_info.data);
      }
      if (this.chip_configs.volte) {
        tmp.push(this.config_bts_info.volte);
      }
      return tmp;
    },
    dateRangeText() {
      return this.date_query.join(" ~ ");
    },
    usedDate() {
      return this.selected_date.map((val) => {
        return this.date_list[val];
      });
    },
    // dateQuerySorted() {
    //   return this.date_query.sort();
    // },
    filtered_bts_list() {
      return this.bts_list.filter((obj) => {
        return this.usedDate.includes(obj.base_date) && obj.near_filter;
      });
    },
    filtered_inbldg_list() {
      return this.inbldg_list.filter((obj) => {
        return this.usedDate.includes(obj.base_date);
      });
    },
    filtered_voc_list() {
      let conditions = [];

      if (this.base_date_input_used) {
        conditions.push(this.filter_base_date_input_used);
      }

      if (this.sr_tt_rcp_no_input_used) {
        conditions.push(this.filter_sr_tt_rcp_no_input_used);
      }

      if (this.voc_type_nm_input_used) {
        conditions.push(this.filter_voc_type_nm_input_used);
      }
      if (this.voc_all_nm_input_used) {
        conditions.push(this.filter_voc_all_nm_input_used);
      }
      if (this.voc_wjt_tert_nm_input_used) {
        conditions.push(this.filter_voc_wjt_tert_nm_input_used);
      }
      if (this.voc_wjt_qrtc_nm_input_used) {
        conditions.push(this.filter_voc_wjt_qrtc_nm_input_used);
      }
      if (this.svc_cont_id_input_used) {
        conditions.push(this.filter_svc_cont_id_input_used);
      }
      if (this.hndset_pet_nm_input_used) {
        conditions.push(this.filter_hndset_pet_nm_input_used);
      }
      if (this.anals_3_prod_level_nm_input_used) {
        conditions.push(this.filter_anals_3_prod_level_nm_input_used);
      }
      if (this.bprod_nm_input_used) {
        conditions.push(this.filter_bprod_nm_input_used);
      }
      if (this.equip_cd_input_used) {
        conditions.push(this.filter_equip_cd_input_used);
      }
      if (this.equip_nm_input_used) {
        conditions.push(this.filter_equip_nm_input_used);
      }
      if (this.biz_hq_nm_input_used) {
        conditions.push(this.filter_biz_hq_nm_input_used);
      }
      if (this.juso_input_used) {
        conditions.push(this.filter_juso_input_used);
      }
      if (this.area_jo_nm_input_used) {
        conditions.push(this.filter_area_jo_nm_input_used);
      }
      if (this.voc_memo_input_used) {
        conditions.push(this.filter_voc_memo_input_used);
      }

      if (conditions.length > 0) {
        return this.voc_list.filter((item) => {
          return conditions.every((condition) => {
            return condition(item);
          });
        });
      }
      return this.voc_list;
    },
    ...mapGetters("auth", ["getIsLogin", "getUserConfig"]),
  },
  methods: {
    clearSort() {
      //     this.sortBy = ''
      //     this.sortDesc = false
      // Or if you are using multi-sort
      this.sortBy = [];
      this.sortDesc = [];
      // this.filter_tt_juso = false;
    },
    handleOptionsUpdate({ sortBy, sortDesc }) {
      if (sortBy[0] === this.sortBy[0] && sortDesc[0] === this.sortDesc[0])
        return;

      if (sortBy[0] && sortDesc[0] === false) {
        this.sortDesc = [true];
        return;
      }

      if (sortBy.length === 0 && sortDesc.length === 0) {
        this.sortBy = [this.sortBy[0]];
        this.sortDesc = [false];
        return;
      }

      if (sortBy[0] && sortDesc[0] === true) {
        this.sortBy = [];
        this.sortDesc = [];
        return;
      }
    },
    handleExpansion(item, state) {
      const itemIndex = this.expanded.indexOf(item);

      state ? this.expanded.splice(itemIndex, 1) : this.expanded.push(item);
    },
    onClick() {
      /*this will toggle only by icon click. at the same time, will prevent toggle 
      by clicking on header. */

      const curr = this.panel;
      this.panel = curr === undefined ? 0 : undefined;
    },
    // scrollEvent() {
    //   console.log(`scroll event`);
    // },
    // alertEvent() {
    //   alert(`alert alert`);
    // },
    dateForm(val) {
      const arr = val.split("-");
      return arr[0] + arr[1] + arr[2];
    },
    async getVocExcel() {
      const xlsx = require("xlsx");
      const book = xlsx.utils.book_new();
      const voc_workbook = xlsx.utils.json_to_sheet(this.voc_list);
      xlsx.utils.book_append_sheet(book, voc_workbook, "VOC정보");
      const today = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      );
      xlsx.writeFile(
        book,
        `${today.toISOString().substr(0, 10)}-voc-ownview.csv`
      );
    },
    async getBtsExcel() {
      const xlsx = require("xlsx");
      const book = xlsx.utils.book_new();
      const bts_workbook = xlsx.utils.json_to_sheet(
        this.bts_list.map((obj) => {
          delete obj.key;
          delete obj.latit_val;
          delete obj.lngit_val;
          return { ...obj };
        })
      );
      xlsx.utils.book_append_sheet(book, bts_workbook, "기지국정보");
      const today = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      );
      xlsx.writeFile(
        book,
        `${today.toISOString().substr(0, 10)}-bts-ownview.csv`
      );
    },
    downloadBtsList() {},
    getGroupQuery(value) {
      console.log("Init group_query: ", this.group_query);
      console.log("getGroupQuery.value: ", value);
      this.group_query = value[0].label;
      this.$refs.group_menu.save(value[0].label);
      console.log("this.group_query: ", this.group_query);
      this.group_menu = false;
    },
    itemWorstCheck(item) {
      // volte_self_fail_cacnt
      let val = "";
      if (
        // S1ap 발생 가장많은 사용기지국 이거나, user_info에서 보내주는 equip_cd가 같으면 데이터 주기지국으로 설정,
        // 추후 s1ap 발생이 많은 사용기지국 조건 삭제 필요
        item.equip_cd == this.user_info.equip_cd_data ||
        (item.s1ap_cnt >= this.worst_quality_value.worst_s1ap_cnt &&
          item.s1ap_cnt &&
          item.s1ap_cnt !== 0 &&
          !this.user_info.equip_cd_data)
      ) {
        val = val === "" ? "데이터 주기지국" : val + ", 데이터 주기지국";
      }
      if (item.equip_cd == this.user_info.equip_cd) {
        val = val === "" ? "음성 주기지국" : val + ", 음성 주기지국";
      }
      if (
        item.volte_self_fail_cacnt >=
          this.worst_quality_value.worst_volte_self_fail_cacnt &&
        item.volte_self_fail_cacnt &&
        item.volte_self_fail_cacnt !== 0
      ) {
        val =
          val === ""
            ? "Worst 자사절단 기지국"
            : val + ", Worst 자사절단 기지국";
      }
      if (
        item.s1ap_fail_cnt >= this.worst_quality_value.worst_s1ap_fail_cnt &&
        item.s1ap_fail_cnt &&
        item.s1ap_fail_cnt !== 0 &&
        item.equip_cd !== "_"
      ) {
        val = val === "" ? "Worst s1ap 기지국" : val + ", Worst s1ap 기지국";
      }
      if (
        item.rsrp_bad_cnt >= this.worst_quality_value.worst_rsrp_bad_cnt &&
        item.rsrp_bad_cnt &&
        item.rsrp_bad_cnt !== 0
      ) {
        val = val === "" ? "Worst rsrp 기지국" : val + ", Worst rsrp 기지국";
      }
      if (
        item.rsrq_bad_cnt >= this.worst_quality_value.worst_rsrq_bad_cnt &&
        item.rsrq_bad_cnt &&
        item.rsrq_bad_cnt !== 0
      ) {
        val = val === "" ? "Worst rsrq 기지국" : val + ", Worst rsrq 기지국";
      }
      if (
        item.rip_bad_cnt >= this.worst_quality_value.worst_rip_bad_cnt &&
        item.rip_bad_cnt &&
        item.rip_bad_cnt !== 0
      ) {
        val = val === "" ? "Worst rip 기지국" : val + ", Worst rip 기지국";
      }
      if (
        item.phr_bad_cnt >= this.worst_quality_value.worst_phr_bad_cnt &&
        item.phr_bad_cnt &&
        item.phr_bad_cnt !== 0
      ) {
        val = val === "" ? "Worst phr 기지국" : val + ", Worst phr 기지국";
      }
      return val;
      // return (
      //   item.s1ap_cnt >= this.worst_quality_value.worst_s1ap_cnt ||
      //   item.s1ap_fail_cnt >= this.worst_quality_value.worst_s1ap_fail_cnt ||
      //   item.rsrp_bad_cnt >= this.worst_quality_value.worst_rsrp_bad_cnt ||
      //   item.rsrq_bad_cnt >= this.worst_quality_value.worst_rsrq_bad_cnt ||
      //   item.rip_cnt >= this.worst_quality_value.worst_rip_bad_cnt ||
      //   item.phr_cnt >= this.worst_quality_value.worst_phr_bad_cnt
      // );
    },
    itemRowBackground(item) {
      return item.s1ap_cnt >= this.worst_quality_value.worst_s1ap_cnt ||
        item.s1ap_fail_cnt >= this.worst_quality_value.worst_s1ap_fail_cnt ||
        item.rsrp_bad_cnt >= this.worst_quality_value.worst_rsrp_bad_cnt ||
        item.rsrq_bad_cnt >= this.worst_quality_value.worst_rsrq_bad_cnt ||
        item.rip_bad_cnt >= this.worst_quality_value.worst_rip_bad_cnt ||
        item.phr_bad_cnt >= this.worst_quality_value.worst_phr_bad_cnt
        ? "style-2"
        : "style-2";
    },
    move_tt() {
      this.move_map = {
        type: "UTMK",
        name: "TT",
        x: parseFloat(this.user_info.utmkx),
        y: parseFloat(this.user_info.utmky),
      };
      this.chip_configs.tt_color = !this.chip_configs.tt_color;
    },
    move_ngt() {
      this.move_map = {
        type: "UTMK",
        name: "NGT",
        x: parseFloat(this.user_info.ngt_utmkx),
        y: parseFloat(this.user_info.ngt_utmky),
      };
      this.chip_configs.ngt_color = !this.chip_configs.ngt_color;
    },
    move_day() {
      this.move_map = {
        type: "UTMK",
        name: "DAY",
        x: parseFloat(this.user_info.day_utmkx),
        y: parseFloat(this.user_info.day_utmky),
      };
      this.chip_configs.day_color = !this.chip_configs.day_color;
    },
    move_volte() {
      this.move_map = {
        type: "LATLNG",
        name: "VOLTE",
        x: this.volte_marker.latit_val,
        y: this.volte_marker.lngit_val,
      };
      this.chip_configs.volte_color = !this.chip_configs.volte_color;
      console.log(this.move_map);
    },
    move_data() {
      if (Object.keys(this.data_marker).length !== 0) {
        this.move_map = {
          type: "LATLNG",
          name: "DATA",
          x: this.data_marker.latit_val,
          y: this.data_marker.lngit_val,
        };
      }
      this.chip_configs.data_color = !this.chip_configs.data_color;
    },
    filter_base_date_input_used(item) {
      return item.base_date
        .toLowerCase()
        .includes(this.base_date_input_used.toLowerCase());
    },
    filter_sr_tt_rcp_no_input_used(item) {
      return item.sr_tt_rcp_no
        .toLowerCase()
        .includes(this.sr_tt_rcp_no_input_used.toLowerCase());
    },
    filter_voc_type_nm_input_used(item) {
      return item.voc_type_nm
        .toLowerCase()
        .includes(this.voc_type_nm_input_used.toLowerCase());
    },
    filter_voc_all_nm_input_used(item) {
      return item.voc_all_nm
        .toLowerCase()
        .includes(this.voc_all_nm_input_used.toLowerCase());
    },
    filter_voc_wjt_tert_nm_input_used(item) {
      return item.voc_wjt_tert_nm
        .toLowerCase()
        .includes(this.voc_wjt_tert_nm_input_used.toLowerCase());
    },
    filter_voc_wjt_qrtc_nm_input_used(item) {
      return item.voc_wjt_qrtc_nm
        .toLowerCase()
        .includes(this.voc_wjt_qrtc_nm_input_used.toLowerCase());
    },
    filter_svc_cont_id_input_used(item) {
      return item.svc_cont_id
        .toLowerCase()
        .includes(this.svc_cont_id_input_used.toLowerCase());
    },
    filter_hndset_pet_nm_input_used(item) {
      return item.hndset_pet_nm
        .toLowerCase()
        .includes(this.hndset_pet_nm_input_used.toLowerCase());
    },
    filter_anals_3_prod_level_nm_input_used(item) {
      return item.anals_3_prod_level_nm
        .toLowerCase()
        .includes(this.anals_3_prod_level_nm_input_used.toLowerCase());
    },
    filter_bprod_nm_input_used(item) {
      return item.bprod_nm
        .toLowerCase()
        .includes(this.bprod_nm_input_used.toLowerCase());
    },
    filter_equip_cd_input_used(item) {
      return item.equip_cd
        .toLowerCase()
        .includes(this.equip_cd_input_used.toLowerCase());
    },
    filter_equip_nm_input_used(item) {
      return item.equip_nm
        .toLowerCase()
        .includes(this.equip_nm_input_used.toLowerCase());
    },
    filter_biz_hq_nm_input_used(item) {
      return item.biz_hq_nm
        .toLowerCase()
        .includes(this.biz_hq_nm_input_used.toLowerCase());
    },
    filter_juso_input_used(item) {
      return item.juso
        .toLowerCase()
        .includes(this.juso_input_used.toLowerCase());
    },
    filter_area_jo_nm_input_used(item) {
      return item.area_jo_nm
        .toLowerCase()
        .includes(this.area_jo_nm_input_used.toLowerCase());
    },
    filter_voc_memo_input_used(item) {
      return (
        item.tt_trt_sbst
          .toLowerCase()
          .includes(this.voc_memo_input_used.toLowerCase()) ||
        item.voc_rcp_txn
          .toLowerCase()
          .includes(this.voc_memo_input_used.toLowerCase()) ||
        item.voc_actn_txn
          .toLowerCase()
          .includes(this.voc_memo_input_used.toLowerCase())
      );
    },
    makeConfigBts() {
      console.log("makeConfigBts method start...");
      this.config_bts_view = [];
      this.chip_configs = {
        tt: false,
        tt_color: true,
        day: false,
        day_color: true,
        ngt: false,
        ngt_color: true,
        data: false,
        data_color: true,
        volte: false,
        volte_color: true,
      };
      if (
        Object.keys(this.data_marker).length !== 0 ||
        !(
          this.user_info.latit_val_data === "_" ||
          this.user_info.latit_val_data === "_" ||
          this.user_info.latit_val_data === "NULL" ||
          this.user_info.latit_val_data === "NULL" ||
          !this.user_info.latit_val_data ||
          !this.user_info.latit_val_data
        )
      ) {
        this.chip_configs.data = true;
        this.config_bts_view.push({
          visuable: this.chip_configs.data,
          type: "LATLNG",
          name: "DATA",
          equip_cd: this.data_marker.equip_cd,
          x: this.data_marker.latit_val,
          y: this.data_marker.lngit_val,
        });
      }
      if (
        !(
          this.user_info.utmkx === "_" ||
          this.user_info.utmkx === "_" ||
          this.user_info.utmkx === "NULL" ||
          this.user_info.utmkx === "NULL" ||
          !this.user_info.utmkx ||
          !this.user_info.utmkx
        )
      ) {
        console.log("TT주소 있음...");
        this.chip_configs.tt = true;
        const obj = {
          visuable: this.chip_configs.tt,
          type: "UTMK",
          name: "TT",
          equip_cd: null,
          x: parseFloat(this.user_info.utmkx),
          y: parseFloat(this.user_info.utmky),
        };
        this.config_bts_view.push(obj);
        console.log("TT MARKER APPEND 완료!");
      }
      if (
        !(
          this.user_info.ngt_utmkx === "0.0" ||
          this.user_info.ngt_utmky === "0.0" ||
          this.user_info.ngt_utmkx === "NULL" ||
          this.user_info.ngt_utmky === "NULL" ||
          !this.user_info.ngt_utmkx ||
          !this.user_info.ngt_utmky
        )
      ) {
        console.log("야간 주기지국 주소 있음...");
        this.chip_configs.ngt = true;
        const obj = {
          visuable: this.chip_configs.ngt,
          type: "UTMK",
          name: "NGT",
          equip_cd: null,
          x: parseFloat(this.user_info.ngt_utmkx),
          y: parseFloat(this.user_info.ngt_utmky),
        };
        this.config_bts_view.push(obj);
        console.log("NGT MARKER APPEND 완료!");
      }
      if (
        !(
          this.user_info.day_utmkx === "0.0" ||
          this.user_info.day_utmky === "0.0" ||
          this.user_info.day_utmkx === "NULL" ||
          this.user_info.day_utmky === "NULL" ||
          !this.user_info.day_utmkx ||
          !this.user_info.day_utmky
        )
      ) {
        console.log("주간 주기지국 주소 있음...");
        this.chip_configs.day = true;
        const obj = {
          visuable: this.chip_configs.day,
          type: "UTMK",
          name: "DAY",
          equip_cd: null,
          x: parseFloat(this.user_info.day_utmkx),
          y: parseFloat(this.user_info.day_utmky),
        };
        this.config_bts_view.push(obj);
        console.log("DAY MARKER APPEND 완료!");
      }
      if (
        !(
          this.user_info.latit_val === "_" ||
          this.user_info.latit_val === "_" ||
          this.user_info.latit_val === "NULL" ||
          this.user_info.latit_val === "NULL" ||
          !this.user_info.latit_val ||
          !this.user_info.latit_val
        )
      ) {
        console.log("음성 주기지국 주소 있음...");
        this.chip_configs.volte = true;
        const obj = {
          visuable: this.chip_configs.volte,
          type: "LATLNG",
          name: "VOLTE",
          equip_cd: this.user_info.equip_cd,
          x: this.volte_marker.latit_val,
          y: this.volte_marker.lngit_val,
        };
        this.config_bts_view.push(obj);
        console.log("VOLTE MARKER APPEND 완료!");
      }
      console.log("config_bts_view 생성 완료! ", this.config_bts_view);
      bus.$emit("config_mark_changed", this.config_bts_view);
    },
    offConfigBts() {
      console.log("offConfigBts Start...");
      this.chip_configs.tt_color = false;
      this.chip_configs.day_color = false;
      this.chip_configs.ngt_color = false;
      this.chip_configs.data_color = false;
      this.chip_configs.volte_color = false;
      bus.$emit("off_config_markers", false);
    },
    getVocDetail() {
      console.log("getVocDetail Start...");
      bus.$emit("clear", true);
      const query = this.search;
      this.clearSort();
      if (query === "") {
        alert("VOC SR번호를 입력해주세요.");
        return;
      }
      this.search_query = query;
      this.data_marker = {};
      this.bts_list = [];
      this.bts_list_view = [];
      this.selected_date = [0, 1];
      this.date_list = [];
      this.user_info = {};
      api
        .getVocDetail(query)
        .then((res) => {
          console.log("res.data: ", res.data);
          if (!res.data.voc_user_info.base_date) {
            alert("SR번호가 없습니다.");
            return;
          }
          this.user_info = res.data.voc_user_info;
          console.log(
            "api.getVocDetail --> this.user_info 설정 완료! ",
            this.user_info
          );
          if (
            this.voc_list.length === 0 ||
            this.voc_list.filter((obj) => obj.sr_tt_rcp_no === this.search)
              .length === 0
          ) {
            console.log("Voc List 정보 없이 Voc detail 조회..., Voc List 조회");
            this.search_query = this.search;
            this.getVocLists(
              100,
              this.user_info.oper_team_nm,
              this.user_info.base_date,
              this.user_info.base_date
            );
            this.$swal.fire({
              text: `해당 VOC목록 조회 완료, GIS분석을 다시 해주세요`,
            });
            return;
          }
          if (!!this.user_info.latit_val && !!this.user_info.lngit_val) {
            const lat_split = this.user_info.latit_val.split("-");
            const lng_split = this.user_info.lngit_val.split("-");
            const latit_val =
              parseFloat(lat_split[0]) +
              parseFloat(lat_split[1]) / 60 +
              parseFloat(lat_split[2]) / 3600;
            const lngit_val =
              parseFloat(lng_split[0]) +
              parseFloat(lng_split[1]) / 60 +
              parseFloat(lng_split[2]) / 3600;
            this.user_info.latit_val = latit_val;
            this.user_info.lngit_val = lngit_val;
          }
          if (
            !!this.user_info.latit_val_data &&
            !!this.user_info.lngit_val_data
          ) {
            const lat_split_data = this.user_info.latit_val_data.split("-");
            const lng_split_data = this.user_info.lngit_val_data.split("-");
            const latit_val_data =
              parseFloat(lat_split_data[0]) +
              parseFloat(lat_split_data[1]) / 60 +
              parseFloat(lat_split_data[2]) / 3600;
            const lngit_val_data =
              parseFloat(lng_split_data[0]) +
              parseFloat(lng_split_data[1]) / 60 +
              parseFloat(lng_split_data[2]) / 3600;
            this.user_info.latit_val_data = latit_val_data;
            this.user_info.lngit_val_data = lngit_val_data;
          }
          this.bts_list = res.data.bts_summary
            .map((obj) => {
              obj.near_filter = true;
              const lat_split = obj.latit_val.split("-");
              const lng_split = obj.lngit_val.split("-");
              obj.latit_val =
                parseFloat(lat_split[0]) +
                parseFloat(lat_split[1]) / 60 +
                parseFloat(lat_split[2]) / 3600;
              obj.lngit_val =
                parseFloat(lng_split[0]) +
                parseFloat(lng_split[1]) / 60 +
                parseFloat(lng_split[2]) / 3600;
              obj.key = obj.cell_cd + obj.equip_cd + obj.base_date;
              obj.rsrp_bad_cnt = obj.rsrp_m105d_cnt + obj.rsrp_m110d_cnt;
              obj.rsrq_bad_cnt = obj.rsrq_m15d_cnt + obj.rsrq_m17d_cnt;
              obj.rip_bad_cnt = obj.rip_maxd_cnt;
              obj.phr_bad_cnt = obj.phr_m3d_cnt + obj.phr_mind_cnt;
              obj.volte_uncomp_cacnt =
                obj.volte_try_cacnt -
                obj.volte_comp_cacnt -
                obj.volte_fail_cacnt;

              obj.phr_avg =
                obj.phr_cnt === 0
                  ? 0
                  : (obj.phr_sum / (obj.phr_cnt + 1e-6)).toFixed(2);
              obj.rip_avg =
                obj.rip_cnt === 0
                  ? 0
                  : (obj.rip_sum / (obj.rip_cnt + 1e-6)).toFixed(2);
              obj.rsrp_avg =
                obj.rsrp_cnt === 0
                  ? 0
                  : (obj.rsrp_sum / (obj.rsrp_cnt + 1e-6)).toFixed(2);
              obj.nr_rsrp_avg =
                obj.nr_rsrp_cnt === 0
                  ? 0
                  : (obj.nr_rsrp_sum / (obj.nr_rsrp_cnt + 1e-6)).toFixed(2);
              obj.rsrq_avg =
                obj.rsrq_cnt === 0
                  ? 0
                  : (obj.rsrq_sum / (obj.rsrq_cnt + 1e-6)).toFixed(2);
              return { ...obj };
            })
            .filter((obj) => {
              return obj.equip_nm !== "기타";
            });
          //인빌딩품질
          this.inbldg_list = res.data.inbldg_summary
            .map((obj) => {
              obj.key = obj.bld_id + obj.base_date;
              obj.bldg_rsrp_bad_cnt =
                obj.bldg_rsrp_m105d_cnt + obj.bldg_rsrp_m110d_cnt;
              obj.bldg_rip_bad_cnt = obj.bldg_rip_maxd_cnt;
              obj.bldg_phr_bad_cnt =
                obj.bldg_phr_m3d_cnt + obj.bldg_phr_mind_cnt;
              obj.bldg_phr_avg =
                obj.bldg_phr_cnt === 0
                  ? 0
                  : (obj.bldg_phr_sum / (obj.bldg_phr_cnt + 1e-6)).toFixed(2);
              obj.bldg_rip_avg =
                obj.bldg_rip_cnt === 0
                  ? 0
                  : (obj.bldg_rip_sum / (obj.bldg_rip_cnt + 1e-6)).toFixed(2);
              obj.bldg_rsrp_avg =
                obj.bldg_rsrp_cnt === 0
                  ? 0
                  : (obj.bldg_rsrp_sum / (obj.bldg_rsrp_cnt + 1e-6)).toFixed(2);
              obj.bldg_nr_rsrp_avg =
                obj.bldg_nr_rsrp_cnt === 0
                  ? 0
                  : (
                      obj.bldg_nr_rsrp_sum /
                      (obj.bldg_nr_rsrp_cnt + 1e-6)
                    ).toFixed(2);
              obj.bldg_nsinr_avg =
                obj.bldg_nsinr_cnt === 0
                  ? 0
                  : (obj.bldg_nsinr_sum / (obj.bldg_nsinr_cnt + 1e-6)).toFixed(
                      2
                    );
              obj.bldg_rscp_avg =
                obj.bldg_rscp_cnt === 0
                  ? 0
                  : (obj.bldg_rscp_sum / (obj.bldg_rscp_cnt + 1e-6)).toFixed(2);
              return { ...obj };
            })
            .filter((obj) => {
              return obj.addr_div !== "기타";
            });
          console.log("user info: ", this.user_info);
          console.log("bts list: ", this.bts_list);
          console.log("inbldg list: ", this.inbldg_list);
          // bts_list 중 worst config를 저장하는 과정 코딩...
          if (this.bts_list.length !== 0) {
            this.worst_quality_value.worst_volte_self_fail_cacnt =
              this.bts_list.sort(
                (a, b) => b.volte_self_fail_cacnt - a.volte_self_fail_cacnt
              )[0].volte_self_fail_cacnt;
            this.worst_quality_value.worst_s1ap_cnt = this.bts_list
              .filter((obj) => obj.equip_cd !== "_")
              .sort((a, b) => b.s1ap_cnt - a.s1ap_cnt)[0].s1ap_cnt;
            this.worst_quality_value.worst_s1ap_fail_cnt = this.bts_list
              .filter((obj) => obj.equip_cd !== "_")
              .sort(
                (a, b) => b.s1ap_fail_cnt - a.s1ap_fail_cnt
              )[0].s1ap_fail_cnt;
            this.worst_quality_value.worst_rsrp_bad_cnt = this.bts_list.sort(
              (a, b) => b.rsrp_bad_cnt - a.rsrp_bad_cnt
            )[0].rsrp_bad_cnt;
            this.worst_quality_value.worst_rsrq_bad_cnt = this.bts_list.sort(
              (a, b) => b.rsrq_bad_cnt - a.rsrq_bad_cnt
            )[0].rsrq_bad_cnt;
            this.worst_quality_value.worst_rip_bad_cnt = this.bts_list.sort(
              (a, b) => b.rip_bad_cnt - a.rip_bad_cnt
            )[0].rip_bad_cnt;
            this.worst_quality_value.worst_phr_bad_cnt = this.bts_list.sort(
              (a, b) => b.phr_bad_cnt - a.phr_bad_cnt
            )[0].phr_bad_cnt;
          }
          console.log("this.worst_queality set !!!", this.worst_quality_value);

          this.bts_list = this.bts_list.map((obj) => {
            obj.special = this.itemWorstCheck(obj);
            return { ...obj };
          });
          const base_date = this.bts_list.map((obj) => {
            return obj.base_date;
          });
          const set_base_date = new Set(base_date);
          this.date_list = [...set_base_date].sort();
          if (this.user_info.equip_cd_data) {
            this.data_marker = {
              equip_cd: this.user_info.equip_cd_data,
              latit_val: this.user_info.latit_val_data,
              lngit_val: this.user_info.lngit_val_data,
            };
          } else {
            this.data_marker =
              this.bts_list.length !== 0
                ? this.bts_list.sort((a, b) => b.s1ap_cnt - a.s1ap_cnt)[0]
                : {};
          }
          // this.data_marker = {
          //   equip_cd: this.user_info.equip_cd_data,
          //   latit_val: this.user_info.latit_val_data,
          //   lngit_val: this.user_info.lngit_val_data,
          // };
          this.volte_marker = {
            equip_cd: this.user_info.equip_cd,
            latit_val: this.user_info.latit_val,
            lngit_val: this.user_info.lngit_val,
          };
          // this.bts_list.length !== 0
          //   ? this.bts_list.sort((a, b) => b.s1ap_cnt - a.s1ap_cnt)[0]
          //   : {};
          console.log("data marker: ", this.data_marker);
          console.log("volte marker: ", this.volte_marker);
          if (this.user_info.utmkx !== "_" && this.user_info.utmky !== "_") {
            console.log("USER TT 주소정보 있음");
            this.move_map = {
              type: "UTMK",
              name: "BTS",
              x: parseFloat(this.user_info.utmkx),
              y: parseFloat(this.user_info.utmky),
            };
          } else {
            if (
              this.user_info.latit_val !== "_" &&
              this.user_info.lngit_val !== "_" &&
              this.user_info.latit_val &&
              this.user_info.lngit_val
            ) {
              console.log("VOLTE 주소정보 있음");
              this.move_map = {
                type: "LATLNG",
                x: this.user_info.latit_val,
                y: this.user_info.lngit_val,
              };
            } else if (
              this.user_info.latit_val_data !== "_" &&
              this.user_info.lngit_val_data !== "_" &&
              this.user_info.latit_val_data &&
              this.user_info.lngit_val_data
            ) {
              console.log("DATA 주소정보 있음");
              this.move_map = {
                type: "LATLNG",
                x: this.user_info.latit_val,
                y: this.user_info.lngit_val,
              };
            } else {
              console.log("주소정보 없음");
            }
          }
          console.log("move_map: ", this.move_map);
          this.makeConfigBts();
          console.log(
            "Get Voc Detail > 조회 완료 > this.bts_list: ",
            this.bts_list
          );
          this.vocFooster = true;
          // alert("조회 완료");
          this.$swal.fire({
            title: "Voc 상세조회 완료",
            text: `실사용 ${this.bts_list.length} 기지국 확인`,
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    getVocLists(
      limit = 2000,
      group = this.group_query === "전체" ? "" : this.group_query,
      start_date = this.dateForm(this.date_query.sort()[0]),
      end_date = this.dateForm(this.date_query.sort()[1])
    ) {
      console.log("get voc list start...");
      bus.$emit("clear", true);
      this.clearSort();
      this.voc_loading = true;
      this.search_query = "";
      this.search = "";
      this.base_date_input_used = "";
      this.sr_tt_rcp_no_input_used = "";
      this.voc_type_nm_input_used = "";
      this.voc_memo_input_used = "";
      this.voc_all_nm_input_used = "";
      this.voc_wjt_tert_nm_input_used = "";
      this.voc_wjt_qrtc_nm_input_used = "";
      this.svc_cont_id_input_used = "";
      this.hndset_pet_nm_input_used = "";
      this.anals_3_prod_level_nm_input_used = "";
      this.bprod_nm_input_used = "";
      this.equip_cd_input_used = "";
      this.equip_nm_input_used = "";
      this.biz_hq_nm_input_used = "";
      this.juso_input_used = "";
      this.area_jo_nm_input_used = "";
      this.bts_list = [];
      this.bts_list_view = [];
      this.selected_date = [0, 1];
      this.date_list = [];
      this.user_info = {};
      this.worst_quality_value = {};
      this.chip_configs = {
        tt: false,
        tt_color: true,
        day: false,
        day_color: true,
        ngt: false,
        ngt_color: true,
        data: false,
        data_color: true,
        volte: false,
        volte_color: true,
      };
      this.vocFooster = false;
      api
        .getVocLists(limit, group, start_date, end_date)
        .then((res) => {
          console.log("res.data: ", res.data);
          this.voc_list = res.data;
          if (!res.data) {
            this.$swal.fire({
              text: "데이터를 불러오지 못했습니다, 조회 기간 또는 소속을 줄여주세요",
            });
            this.voc_loading = false;
            return;
          }
          this.voc_list = this.voc_list.map((obj) => {
            obj.voc_all_nm =
              obj.voc_wjt_scnd_nm +
              " / " +
              obj.voc_wjt_tert_nm +
              " / " +
              obj.voc_wjt_qrtc_nm;
            return { ...obj };
          });
          console.log("voc_list: ", this.voc_list);
          // this.$swal.fire({
          //   title: "Voc 정보 조회 완료",
          //   text: `${group} ${start_date} ~ ${end_date} 조회 완료`,
          // });
          // alert("voc 조회 완료");

          this.panels = 0;
          this.voc_loading = false;
        })
        .catch((err) => {
          this.voc_loading = false;
          console.log(err);
        });
    },
    getVocMemo() {},
    getBtsDetail() {},
    getOrgInfo() {
      console.log(
        "---------------------getOrgInfo Start...---------------------"
      );
      api
        .getCodeOrg()
        .then((res) => {
          console.log("getCodeOrg res.data: ", res.data);
          this.group_list = res.data;
          this.group_list.push({
            id: "전체",
            label: "전체",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showRowInfo(event, { item }) {
      console.log("row info: ", item);
      this.move_map = {
        type: "LATLNG",
        name: "BTS",
        base_date: item.base_date,
        equip_cd: item.equip_cd,
        x: parseFloat(item.latit_val),
        y: parseFloat(item.lngit_val),
      };
    },
    showRowInfoInbldg(event, { item }) {
      console.log("row info inbldg: ", item);
      this.move_map = {
        type: "UTMK",
        name: "INBLDG",
        equip_cd: item.bldg_info,
        x: parseFloat(item.adr_utmkx),
        y: parseFloat(item.adr_utmky),
      };
    },
    initialize() {
      this.search_query = "";
      this.search = "";
      this.base_date_input_used = "";
      this.sr_tt_rcp_no_input_used = "";
      this.voc_type_nm_input_used = "";
      this.voc_memo_input_used = "";
      this.voc_all_nm_input_used = "";
      this.voc_wjt_tert_nm_input_used = "";
      this.voc_wjt_qrtc_nm_input_used = "";
      this.svc_cont_id_input_used = "";
      this.hndset_pet_nm_input_used = "";
      this.anals_3_prod_level_nm_input_used = "";
      this.bprod_nm_input_used = "";
      this.equip_cd_input_used = "";
      this.equip_nm_input_used = "";
      this.biz_hq_nm_input_used = "";
      this.juso_input_used = "";
      this.area_jo_nm_input_used = "";
      this.bts_list = [];
      this.bts_list_view = [];

      this.user_info = {};
      this.worst_quality_value = {};
      this.chip_configs = {
        tt: false,
        tt_color: true,
        day: false,
        day_color: true,
        ngt: false,
        ngt_color: true,
        data: false,
        data_color: true,
        volte: false,
        volte_color: true,
      };
      this.config_bts_info = {
        tt: "TT주소",
        day: "주간 주기지국",
        ngt: "야간 주기지국",
        data: "데이터 주기지국",
        volte: "음성 주기지국",
      };
      if (this.$route.query.catPresentationFormat) {
        if (this.$route.query.catPresentationFormat.includes("기지국")) {
          console.log("query 기지국 params get success!");
          console.log(this.$route.query);
          this.group_query = this.$route.query["관할"];
          this.getVocLists(
            2000,
            this.group_query,
            this.$route.query.yyyyMMddStart,
            this.$route.query.yyyyMMddEnd
          );
          this.equip_nm_input_used = this.$route.query["기지국"];
          this.anals_3_prod_level_nm_input_used =
            this.$route.query["catProductService"];
        } else if (this.$route.query.catPresentationFormat.includes("단말")) {
          console.log("query 단말 params get success!");
          console.log(this.$route.query);
          this.group_query = this.$route.query["group"];
          this.getVocLists(
            2000,
            this.group_query,
            this.$route.query.yyyyMMddStart,
            this.$route.query.yyyyMMddEnd
          );
          this.hndset_pet_nm_input_used = this.$route.query["단말기종"];
          this.anals_3_prod_level_nm_input_used =
            this.$route.query["catProductService"];
        }
      }
    },
  },
  updated() {
    console.log("MayAnalysis updated...");
  },
  watch: {
    bts_list_view() {
      console.log("MayAnalysysView.bts_list_view watch start...");
      bus.$emit("bts_mark_changed", this.bts_list_view);
    },
    inbldg_list_view() {
      console.log("MayAnalysysView.inbldg_list_view watch start...");
      bus.$emit("inbldg_mark_changed", this.inbldg_list_view);
    },
    move_map() {
      console.log("move_map watch start...");
      bus.$emit("map_sight_change", this.move_map);
    },
    chip_configs: {
      handler: function () {
        console.log("chip_configs watch start");
        // bus.$emit("chip_configs_changed", this.chip_configs);
      },
      deep: true,
    },
    selected_filter_bts() {
      console.log(
        "selected_filter_bts watch start...",
        this.selected_filter_bts
      );
      let corrd = [];
      let type = "UTMK";
      if (this.selected_filter_bts === this.config_bts_info.tt) {
        type = "UTMK";
        corrd = [this.user_info.utmkx, this.user_info.utmky];
      } else if (this.selected_filter_bts === this.config_bts_info.day) {
        type = "UTMK";
        corrd = [this.user_info.day_utmkx, this.user_info.day_utmky];
      } else if (this.selected_filter_bts === this.config_bts_info.ngt) {
        type = "UTMK";
        corrd = [this.user_info.ngt_utmkx, this.user_info.ngt_utmky];
      } else if (this.selected_filter_bts === this.config_bts_info.data) {
        type = "LATLNG";
        corrd = [this.user_info.latit_val_data, this.user_info.lngit_val_data];
      } else if (this.selected_filter_bts === this.config_bts_info.volte) {
        type = "LATLNG";
        corrd = [this.user_info.latit_val, this.user_info.lngit_val];
      }
      const obj = {
        type: type,
        corrd: corrd,
        markers: this.bts_list,
      };
      if (this.selected_filter_bts === "전체") {
        this.bts_list.map((obj) => {
          obj.near_filter = true;
          return obj;
        });
      } else {
        bus.$emit("filter_juso_change", obj);
      }
    },
  },
  mounted() {
    this.initialize();
    this.getOrgInfo();
    if (this.getIsLogin) {
      if (!this.$route.query.catPresentationFormat) {
        const today = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        );
        const yesterday = today;
        yesterday.setDate(today.getDate() - 1);
        this.group_query = this.getUserConfig.userGroup4
          ? this.getUserConfig.userGroup4
          : "전체";
        this.date_query = [
          yesterday.toISOString().substr(0, 10),
          yesterday.toISOString().substr(0, 10),
        ];
        this.getVocLists();
      }
    }
  },
  created() {
    bus.$on("selected_marker_id", (payload) => {
      const receive = payload;
      console.log("selected_marker_id recieve success!", receive);
      this.selected_marker_id = receive;
    });
    bus.$on("filtered_bts_list", (payload) => {
      const receive = payload;
      console.log("filtered_bts_list receive success!", receive);
      this.bts_list = receive;
    });
  },
};
</script>
<style scoped>
.v-expansion-panel-header {
  pointer-events: none;
}
:deep(.v-expansion-panel-header__icon) {
  pointer-events: All;
}
:deep(.v-input__append-inner) {
  pointer-events: All;
}
:deep(#voc_detail_search_input) {
  pointer-events: All;
}
:deep(#voc_list_search_input) {
  pointer-events: All;
}
:deep(#date_query_input) {
  pointer-events: All;
}
:deep(#group_query_input) {
  pointer-events: All;
}
:deep(#voc_excel_btn) {
  pointer-events: All;
}
:deep(.style-1) {
  background-color: rgb(235, 107, 52);
}
:deep(.style-2) {
  background-color: null;
}
:deep(.v-data-table) {
  overflow-x: auto;
}
:deep(#sr_no_item) {
  text-decoration: underline;
  color: skyblue;
}
:deep(#sr_no_item:hover) {
  color: blue;
  cursor: pointer;
}
:deep(.text-red input) {
  color: red !important;
}
:deep(.text-blue input) {
  color: blue !important;
}
table.v-table thead th {
  font-size: 26px;
}
</style>
