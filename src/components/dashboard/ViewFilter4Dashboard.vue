<template>
  <div class="white ma-0 pa-0 mt-n3">
    <v-card elevation="0">
      <v-toolbar dense class="ma-0 pa-0 blue-grey lighten-5 elevation-0" flat>
        <v-card-title class="ma-0 pa-0">
          {{
            mode2EditCBProfileReg
              ? "대시보드 화면 재구성, 편집 모드"
              : "대시보드 화면 재구성, 일반 모드"
          }}
        </v-card-title>
      </v-toolbar>

      <v-btn-toggle
        class="pl-1 pt-3"
        rounded
        background-color="deep-purple accent-3"
        color="red"
        group
      >
        <v-btn
          :disabled="mode2EditCBProfileReg"
          value="left"
          @click="
            () => {
              beginEditMode(); // 편집모드_진입
            }
          "
          color="indigo"
        >
          편집 모드 진입
          <v-icon large_ top color="indigo" class="ml-1">
            mdi-view-dashboard-edit-outline
          </v-icon>
        </v-btn>

        <v-btn
          :disabled="!mode2EditCBProfileReg"
          value="justify"
          @click="
            () => {
              cancelEditMode(); // 저장하지_않고_편집모드_나가기
            }
          "
          color="indigo"
        >
          모든 편집 취소
          <v-icon large_ top color="indigo" class="ml-1"> mdi-restore</v-icon>
        </v-btn>

        <v-btn
          :disabled="!mode2EditCBProfileReg"
          value="right"
          @click="
            () => {
              exitFromEditModeAfterSaving(); // 저장하고_편집모드_나가기
            }
          "
          color="indigo"
        >
          편집 내용 반영
          <v-icon large_ top color="indigo" class="ml-1">
            mdi-check-outline
          </v-icon>
        </v-btn>
      </v-btn-toggle>

      <v-card
        v-if="!mode2EditCBProfileReg"
        class="d-flex flex-column pl-2 pr-4"
        class_="red_ elevation-0 ma-0 pa-0 pl-2 pr-4"
        elevation="0"
        tile
        width="500px"
        :style="{
          // paddingBottom: '60px',
        }"
      >
        <v-divider inset class="mt-3 mb-3"></v-divider>

        <div
          class="d-flex flex-row justify-space-between align-center text-body-2 font-italic"
        >
          <div>
            현재 작업환경은 일반 모드입니다. 화면 구성요소(배너, 카드 등) 각각에
            대하여 개별적으로 조건을 설정하여 다양한 네트워크 품질을 확인할 수
            있습니다.
          </div>
          <v-spacer> </v-spacer>
        </div>
      </v-card>
    </v-card>

    <v-card
      elevation="0"
      v-if="!mode2EditCBProfileReg"
      :style="{
        backgroundColor: 'transparent',
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        // left: '0px',
        zIndex: 2,
        borderStyle: 'none',
      }"
    >
      <v-toolbar dense class="ma-0 pa-0 blue-grey lighten-5 elevation-0" flat>
        <v-card-title class="ma-0 pa-0"> 대시보드 프로파일 관리 </v-card-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card
        class="red_ elevation-0 ma-0 pa-0 pl-2 pr-4"
        elevation="0"
        tile
        width="500px"
      >
        <v-data-table
          height_="400px"
          :items-per-page="300"
          tile
          caption_="대시보드 프로파일 관리"
          v-model="selected"
          :headers="headers"
          :items="profilesExceptMySyncWorkingProfile"
          sort-by_="board_id"
          :sort-by="['owner_id', 'name']"
          :sort-desc="[true, false]"
          class_="ma-0 pa-0 blue-grey lighten-5 elevation-0"
          class__="ma-0 pa-0 blue-grey lighten-5 elevation-0"
          show-select_
          single-select_
          item-key="name"
          dense
          hide-default-header_
          hide-default-footer
          no-data-text="데이터가 없습니다"
          :style="{
            whiteSpace: 'nowrap',
          }"
        >
          <template v-slot:[`item.name`]="props">
            <v-edit-dialog
              v-if="
                props.item.owner_id !== 'admin' && props.item.owner_id !== null
              "
              :save-text="newName !== '' ? '적용' : ''"
              cancel-text=""
              eager
              :return-value.sync="candName"
              @save="
                {
                  if (newName !== '' && !hasSameName) {
                    renameProfile(props.item.board_id, newName); // 이름만_바꾸기
                  }
                }
              "
              @open="handleOpenTheRenameProfileDialog(props.item.name)"
              @close="handleCloseTheRenameProfileDialog()"
              @cancel="handleCloseTheRenameProfileDialog()"
            >
              <div
                class="red_ ma-0 pa-2"
                :style="{
                  whiteSpace: 'normal',
                }"
              >
                {{ props.item.name }}
              </div>
              <template v-if="props.item.owner_id !== 'admin'" v-slot:input>
                <div>
                  <v-text-field
                    class="ma-0 pa-0 pt-4 px-0"
                    v-model="candName"
                    :rules="[max20chars]"
                    label="프로파일 이름 변경"
                    outlined_
                    single-line_
                    counter_
                    autofocus
                    clearable
                    @click.stop=""
                    hint="입력시 특수문자는 제거되며, Enter Key로 변경을 적용합니다"
                    persistent-hint
                  ></v-text-field>
                  <div v-if="newName !== ''" class="mt-4 text-body-2"></div>
                  <div class="my-4">
                    <div
                      :style="{
                        color: 'navy',
                        fontSize: 'small',
                      }"
                    >
                      {{ "기존 이름: " + props.item.name }}
                    </div>
                    <div
                      :style="{
                        color: 'navy',
                        fontSize: 'small',
                        textDecoration:
                          newName == '' || hasSameName ? 'line-through' : '',
                      }"
                    >
                      {{ "바뀔 이름: " + newName }}
                    </div>

                    <div
                      class="ma-0 pa-0"
                      :style="{
                        color: 'darkred',
                        fontSize: '12px',
                        fontStyle: 'italic',
                      }"
                    >
                      {{
                        hasSameName ? "기존 프로파일과 겹치는 이름입니다" : ""
                      }}
                    </div>
                  </div>
                </div>
              </template>
            </v-edit-dialog>
            <div v-else class="red_ ma-0 pa-2">
              {{ props.item.name }}
            </div>
          </template>
          <template v-slot:[`item.actionFetch`]="{ item }">
            <v-menu
              v-if="item.owner_id !== null"
              :close-on-content-click="false"
              :nudge-width="320"
              :offset-x="doseOffsetXWhenMenuPopping"
              open-on-click
              :open-delay="doseOffsetXWhenMenuPopping ? 0 : 300"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="indigo" dark v-bind="attrs" v-on="on">
                  <v-tooltip v-if="!false" left color_="green darken-4">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        :style="{
                          // transform: 'rotateY( 180deg )',
                          fontSize: '20px',
                        }"
                      >
                        mdi-monitor-arrow-down-variant
                      </v-icon>
                    </template>
                    <span> 프로파일을 내려받아 내 화면에 반영</span>
                  </v-tooltip>
                </v-btn>
              </template>

              <v-card v-if="opensViewFilterDrawer" dark_>
                <v-card-title
                  class="ma-0 pa-0 pl-3"
                  :style="{
                    color: 'red',
                    fontSize: 'medium',
                  }"
                >
                  프로파일을 내려받아 내 화면에 반영
                </v-card-title>

                <v-card-text
                  class="ma-0 pa-0 pl-3"
                  :style="{
                    color: 'gray',
                    fontSize: 'small',
                    fontStyle: 'italic',
                  }"
                >
                  이 프로파일을 불러와 현재 대시보드에 반영합니다
                </v-card-text>

                <v-card-text
                  :style="{
                    color: 'navy',
                    fontSize: 'small',
                  }"
                >
                  {{ item.name }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    dark
                    color="indigo"
                    @click="
                      () => {
                        fetchAndApplyProfileToTemp(item.board_id); // 선택한_프로파일을_내_운용프로파일에_덮어쓰기
                      }
                    "
                  >
                    적용
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
          <template v-slot:[`item.actionSave`]="{ item }">
            <v-menu
              v-if="item.owner_id !== 'admin' && item.owner_id !== null"
              :close-on-content-click="false"
              :nudge-width="320"
              :offset-x="doseOffsetXWhenMenuPopping"
              open-on-click
              :open-delay="doseOffsetXWhenMenuPopping ? 0 : 300"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="indigo" dark v-bind="attrs" v-on="on">
                  <v-tooltip v-if="!false" left color_="green darken-4">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        :style="{
                          // transform: 'rotateY( 180deg )',
                          fontSize: '25px',
                        }"
                      >
                        mdi-cloud-upload-outline
                      </v-icon>
                    </template>
                    <span> 기존 프로파일에 백업</span>
                  </v-tooltip>
                </v-btn>
              </template>

              <v-card v-if="opensViewFilterDrawer" dark_>
                <v-card-title
                  class="ma-0 pa-0 pl-3"
                  :style="{
                    color: 'red',
                    fontSize: 'medium',
                  }"
                >
                  기존 프로파일에 백업
                </v-card-title>

                <v-card-text
                  class="ma-0 pa-0 pl-3"
                  :style="{
                    color: 'gray',
                    fontSize: 'small',
                    fontStyle: 'italic',
                  }"
                >
                  현재 대시보드 설정을 기존 프로파일 이름으로 백업합니다
                </v-card-text>

                <v-card-text
                  :style="{
                    color: 'navy',
                    fontSize: 'small',
                  }"
                >
                  {{ item.name }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    dark
                    color="indigo"
                    @click="
                      () => {
                        updateSelectedProfileWithTemp(item.board_id); // 선택한_프로파일에_내_운용프로파일을_덮어쓰기
                      }
                    "
                  >
                    적용
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
          <template v-slot:[`item.actionDeleteItem`]="{ item }">
            <v-menu
              v-if="item.owner_id !== 'admin' && item.owner_id !== null"
              :close-on-content-click="false"
              :nudge-width="250"
              left
              :offset-x="doseOffsetXWhenMenuPopping"
              open-on-click
              :open-delay="doseOffsetXWhenMenuPopping ? 0 : 300"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon color="indigo" dark v-bind="attrs" v-on="on">
                  <v-icon
                    class="mr-4"
                    :style="{
                      // transform: 'rotateY( 180deg )',
                      fontSize: '25px',
                    }"
                  >
                    mdi-cloud-outline
                  </v-icon>
                  <!-- <v-icon
                    class="ml-n10"
                    :style="{
                      // transform: 'rotateY( 180deg )',
                      marginTop: '4px',
                      fontSize: '14px',
                    }"
                  >
                    mdi-minus-thick
                  </v-icon> -->

                  <v-tooltip v-if="!false" left color_="green darken-4">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        class="ml-n10"
                        :style="{
                          // transform: 'rotateY( 180deg )',
                          marginTop: '4px',
                          fontSize: '14px',
                        }"
                      >
                        mdi-minus-thick
                      </v-icon>
                    </template>
                    <span> 삭제 </span>
                  </v-tooltip>
                </v-btn>
              </template>

              <v-card v-if="opensViewFilterDrawer" dark_>
                <v-card-title
                  class="ma-0 pa-0 pl-3"
                  :style="{
                    color: 'red',
                    fontSize: 'medium',
                  }"
                >
                  삭제
                </v-card-title>

                <v-card-text
                  class="ma-0 pa-0 pl-3"
                  :style="{
                    color: 'gray',
                    fontSize: 'small',
                    fontStyle: 'italic',
                  }"
                >
                  이 프로파일을 지웁니다
                </v-card-text>

                <v-card-text
                  :style="{
                    color: 'navy',
                    fontSize: 'small',
                  }"
                >
                  {{ item.name }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer v-if="!doseOffsetXWhenMenuPopping"></v-spacer>
                  <v-btn
                    dark
                    color="indigo"
                    @click="deleteProfileAfterUpdateStartBoardID(item.board_id)"
                  >
                    적용
                  </v-btn>
                  <v-spacer v-if="doseOffsetXWhenMenuPopping"></v-spacer>
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
          <template v-slot:no-data>
            <v-btn @click="initialize"> 목록 불러오기 </v-btn>
          </template>
        </v-data-table>

        <v-toolbar
          dense
          class_="ma-0 pa-0 blue-grey lighten-5 elevation-0"
          flat
        >
          <v-spacer></v-spacer>
          <v-tooltip v-if="!hasVacancy" left color_="green darken-4">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-btn
                  :disabled="!hasVacancy"
                  icon
                  color="indigo"
                  dark_
                  style="margin-right: -6px"
                >
                  <v-icon
                    class="mr-4"
                    :style="{
                      // transform: 'rotateY( 180deg )',
                      fontSize: '25px',
                    }"
                  >
                    mdi-cloud-outline
                  </v-icon>
                  <v-icon
                    class="ml-n10"
                    :style="{
                      // transform: 'rotateY( 180deg )',
                      marginTop: '4px',
                      fontSize: '14px',
                    }"
                  >
                    mdi-plus-thick
                  </v-icon>
                </v-btn>
              </div>
            </template>

            <div
              dark_
              :style="{
                // color: 'gray',
                fontSize: 'small',
                // fontStyle: 'italic',
                whiteSpace: 'nowrap',
              }"
            >
              기존 프로파일을 지운 후에 생성할 수 있습니다
              <div class="text-caption">
                (개인화설정 최대 개수 제한:
                {{ maximumOwnerProfileCountAllowed }}개까지)
              </div>
            </div>
          </v-tooltip>

          <v-menu
            v-else
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="300"
            right
            :offset-x="doseOffsetXWhenMenuPopping"
            open-on-click
            :open-delay="doseOffsetXWhenMenuPopping ? 0 : 300"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!hasVacancy"
                icon
                color="indigo"
                dark_
                v-bind="attrs"
                v-on="on"
                style="margin-right: -6px"
              >
                <v-icon
                  class="mr-4"
                  :style="{
                    // transform: 'rotateY( 180deg )',
                    fontSize: '25px',
                  }"
                >
                  mdi-cloud-outline
                </v-icon>
                <!-- <v-icon
                  class="ml-n10"
                  :style="{
                    // transform: 'rotateY( 180deg )',
                    marginTop: '4px',
                    fontSize: '14px',
                  }"
                >
                  mdi-plus-thick
                </v-icon> -->

                <v-tooltip v-if="!false" left color_="green darken-4">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      class="ml-n10"
                      :style="{
                        // transform: 'rotateY( 180deg )',
                        marginTop: '4px',
                        fontSize: '14px',
                      }"
                    >
                      mdi-plus-thick
                    </v-icon>
                  </template>
                  <span> 새 백업 프로파일 생성 </span>
                </v-tooltip>
              </v-btn>
            </template>

            <v-card v-if="opensViewFilterDrawer" dark_>
              <v-card-title
                class="ma-0 pa-0 pl-3"
                :style="{
                  color: 'red',
                  fontSize: 'medium',
                }"
              >
                새 백업 프로파일 생성
              </v-card-title>

              <v-card-text
                class="ma-0 pa-0 pl-3"
                :style="{
                  color: 'gray',
                  fontSize: 'small',
                  fontStyle: 'italic',
                }"
              >
                현재 대시보드 설정을 새로운 이름으로 백업합니다
              </v-card-text>

              <v-card-text>
                <v-text-field
                  class="ma-0 pa-0 pt-4 px-0"
                  v-model="candName"
                  :rules="[max20chars]"
                  label_="새 이름"
                  outlined_
                  single-line_
                  counter_
                  autofocus
                  clearable
                  @click.stop=""
                  hint="입력시 특수문자는 제거됩니다"
                  persistent-hint
                ></v-text-field>
                <div class="my-4">
                  <div
                    class="ma-0 pa-0"
                    :style="{
                      color: 'navy',
                      fontSize: 'small',
                      textDecoration:
                        newName == '' || hasSameName ? 'line-through' : '',
                    }"
                  >
                    {{ "저장할 이름: " + newName }}
                  </div>
                  <div
                    class="ma-0 pa-0"
                    :style="{
                      color: 'darkred',
                      fontSize: '12px',
                      fontStyle: 'italic',
                    }"
                  >
                    {{ hasSameName ? "기존 프로파일과 겹치는 이름입니다" : "" }}
                  </div>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-spacer v-if="!doseOffsetXWhenMenuPopping"></v-spacer>
                <v-btn
                  :disabled="newName.trim() == '' || hasSameName"
                  :dark="newName.trim() !== '' && !hasSameName"
                  color="indigo"
                  @click="
                    () => {
                      addNewProfileWithTemp(); // 새_프로파일_생성
                    }
                  "
                >
                  적용
                </v-btn>
                <v-spacer v-if="doseOffsetXWhenMenuPopping"></v-spacer>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-toolbar>
      </v-card>

      <v-card
        class="d-flex flex-column pl-2 pr-4"
        class_="red_ elevation-0 ma-0 pa-0 pl-2 pr-4"
        elevation="0"
        tile
        width="500px"
      >
        <v-divider inset class="mt-0 mb-3"></v-divider>
        <div
          class="d-flex flex-row align-center text-body-2 font-italic"
          :style="{
            whiteSpace: 'nowrap',
          }"
        >
          다음 로그인할 때,
        </div>
        <v-menu
          v-if="opensViewFilterDrawer"
          open-on-click
          :close-on-content-click="!false"
          :close-on-click="!false"
          top
          offset-y_
          right_
          left
          offset-x
          rounded
          close-delay="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class_="d-flex flex-row_ flex-nowrap justify-space-between align-top text-body-2 font-italic flex-shrink-1"
              class="font-italic"
              :style="{
                // textTransform: 'none',
                // paddingBottom: '2px',
                width: '0px',
              }"
            >
              <v-btn
                outlined
                small
                tile_
                text
                color="primary"
                :style="{
                  textTransform: 'none',
                  paddingBottom: '2px',
                }"
              >
                {{ selectedItem4Options4StartBoardID.name4MenuListItem }}
              </v-btn>
            </div>
          </template>
          <v-list
            dense
            class="py-0"
            :style="{
              // width: '100px',
            }"
          >
            <v-list-item
              selected
              class="py-0"
              dense
              :style="{
                backgroundColor:
                  selectedItem4Options4StartBoardID.board_id == item.board_id
                    ? 'azure'
                    : 'snow',
              }"
              @mousedown="
                () => {
                  // hndlMousedownOverflow(selectedItem4Options4StartBoardID);
                }
              "
              @click="
                () => {
                  if (
                    selectedItem4Options4StartBoardID.board_id !== item.board_id
                  ) {
                    selectedItem4Options4StartBoardID = item;
                    updateStartBoardID(
                      selectedItem4Options4StartBoardID.user_id,
                      selectedItem4Options4StartBoardID.board_id
                    );
                  }
                  // cleanUpSideEffects();
                }
              "
              v-for="(item, index) in options4StartBoardID"
              :key="index"
            >
              <v-list-item-title
                :style="{
                  color: 'navy',
                  paddingTop: '0px',
                  fontSize: 'small',
                }"
              >
                {{ item.name4MenuListItem }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div
          class="d-flex flex-row align-center text-body-2 font-italic mb-3"
          :style="{
            whiteSpace: 'nowrap',
          }"
        >
          구성을 반영하여 대시보드를 시작합니다.
        </div>
      </v-card>
    </v-card>

    <div v-else>
      <v-card
        class="d-flex flex-column pl-2 pr-4"
        class_="red_ elevation-0 ma-0 pa-0 pl-2 pr-4"
        elevation="0"
        tile
        width="500px"
      >
        <v-divider inset class="mt-3 mb-3"></v-divider>
        <div
          class="d-flex flex-row justify-space-between align-center text-body-2 font-italic mb-3"
        >
          <div>
            현재 작업환경은 편집 모드입니다. 개별 구성요소의 설정과 함께
            추가/삭제/이동이 가능합니다. 편집 모드에서 다시 일반 모드로 전환할
            때, 일괄적으로 모든 편집 내용을 내 화면에 반영하거나, 취소(편집 모드
            진입 전으로 원복)할 수 있습니다.
          </div>

          <v-spacer> </v-spacer>
        </div>

        <div
          v-if="showsBtnAddAnyBanner"
          class="d-flex flex-row justify-space-between align-center text-body-2 font-italic"
        >
          <div>화면을 구성하는 배너가 없습니다.</div>
          <v-btn
            outlined
            small
            tile_
            text
            color="primary"
            :style="{
              textTransform: 'none',
              paddingBottom: '2px',
            }"
            @click="
              () => {
                addAnyBanner(); // 임의_배너_하나_추가
              }
            "
          >
            임의 배너 하나 추가
          </v-btn>
        </div>
        <div
          v-if="showsBtnAddAnyCard"
          class="d-flex flex-row justify-space-between align-center text-body-2 font-italic mt-1"
        >
          <div>화면을 구성하는 카드가 없습니다.</div>
          <v-btn
            outlined
            small
            tile_
            text
            color="primary"
            :style="{
              textTransform: 'none',
              paddingBottom: '2px',
            }"
            @click="
              () => {
                addAnyCard(); // 임의_카드_하나_추가
              }
            "
          >
            임의 카드 하나 추가
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- <v-btn
      v-if="false"
      class_="ma-4"
      v-show="!false"
      @click="
        () => {
          테스트환경으로초기화_연동테스트후폐기();
        }
      "
    >
      테스트환경으로초기화_연동테스트후폐기
    </v-btn> -->
  </div>
</template>

<script>
import { bus } from "@/event-bus";
import { mapState, mapMutations } from "vuex";

import DashboardViewMixin from "@/components/dashboard/DashboardViewMixin.vue";
export default {
  mixins: [DashboardViewMixin],
  components: {},

  props: {
    opensViewFilterDrawer: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selectedItem4Options4StartBoardID: {},

    doseOffsetXWhenMenuPopping: !true,
    maximumOwnerProfileCountAllowed: 5,
    menu: false,
    max20chars: (v) => v.length <= 20 || "입력 제한 20자",

    selected: [],
    title: "",

    enabled: true,

    dragging: false,
    api_v1_voc_worst: "대시보드 프로파일 목록",
    tableItems: [],
    tableHeaders: [],

    headers: [
      {
        text: "반영",
        align: "center",
        value: "actionFetch",
        sortable: false,
      },
      {
        text: "백업",
        align: "center",
        value: "actionSave",
        sortable: false,
      },

      // {
      //   text: "board_id",
      //   sortable: true,
      //   value: "board_id",
      // },
      {
        text: "저장된 프로파일 이름",
        align: "start",
        // align: "center",
        // align: "end",
        sortable: false,
        // sortable: true,
        value: "name",
      },
      // {
      //   text: "owner_id",
      //   align: "start",
      //   sortable: true,
      //   value: "owner_id",
      // },
      // {
      //   text: "update_yn",
      //   align: "update_yn",
      //   sortable: true,
      //   value: "update_yn",
      // },

      {
        text: "추가/삭제",
        align: "end",
        value: "actionDeleteItem",
        sortable: false,
      },
    ],
    profilesExceptMySyncWorkingProfile: [],
    mySyncWorkingProfile: [],
    editedIndex: -1,
    candName: "",
  }),
  watch: {
    menu: function () {
      this.candName = "";
    },
    opensViewFilterDrawer: function () {
      this.candName = "";
      this.selected = [];
      this.fetchProfileListExceptSyncWorkingProfile();
      this.selectedItem4Options4StartBoardID =
        this.getProfileFromUserConfigStartBoardID();
    },
  },
  computed: {
    ...mapState("auth", ["userConfig"]),
    ...mapState("dashboard", [
      "mode2EditCBProfileReg",
      "clearsCache4APIResponseDataWithDashboardMounted",
      "removesCachedItemWithEachBannerOrCardMounted",
      "verbose",
      "cacheAPI",
      "example",
      "masterProfile4Employees",
      "masterProfile4Management",

      "jMyCBProfileTmp",
      "jMyCBProfileTmpBeforeEditMode",
      "jReserve4MyCBProfileReg",
      "jMyCBProfileReg",
      "defaultDelta4BaseDate",
    ]),

    defaultItem4Options4StartBoardID() {
      return {
        owner_id: this.userConfig.userId,
        board_id: this.userConfig.boardId,
        // name4MenuListItem: "지난 로그아웃 시점까지 동기화된 화면",
        name4MenuListItem: "지난 로그아웃 시점 화면",
      };
    },
    options4StartBoardID() {
      let items = [];
      items.push(this.defaultItem4Options4StartBoardID);
      this.profilesExceptMySyncWorkingProfile.forEach((x) => {
        let appoggiatura =
          x.owner_id == "admin" ? "공유 프로파일 - " : "내 프로파일 - ";
        items.push({
          ...x,
          name4MenuListItem: appoggiatura + x.name,
        });
      });
      // console.log("this.options4StartBoardID", items);
      return items;
    },

    showsBtnAddAnyBanner() {
      let tmp = JSON.parse(this.jMyCBProfileTmp) || "{}";
      return tmp.banners.length < 1;
    },
    showsBtnAddAnyCard() {
      let tmp = JSON.parse(this.jMyCBProfileTmp) || "{}";
      return tmp.cards.length < 1;
    },
    newName() {
      let r = "";
      try {
        r = this.candName.trim();
        r = this.removeSpecialCharacters(r).substring(0, 20);
      } catch (error) {
        // throw new Error(error);
        r = "";
        error.clear;
      }
      return r;
    },

    userOwnedProfilesExceptMySyncWorkingProfile() {
      let markKey = "owner_id";
      let r = [...this.profilesExceptMySyncWorkingProfile].filter((element) => {
        if (element[markKey] !== "admin") {
          return true;
        }
      });
      return r;
    },

    hasSameName() {
      let bingo = false;
      for (
        let index = 0;
        index < this.userOwnedProfilesExceptMySyncWorkingProfile.length;
        index++
      ) {
        const element = this.userOwnedProfilesExceptMySyncWorkingProfile[index];
        if (element.name == this.newName) {
          bingo = true;
          return bingo;
        }
      }
      return bingo;
    },

    hasVacancy() {
      let isListLoaded = this.profilesExceptMySyncWorkingProfile.length > 0;

      return (
        isListLoaded &&
        this.userOwnedProfilesExceptMySyncWorkingProfile.length <
          this.maximumOwnerProfileCountAllowed
      );
      //사용자에게 profile 6개까지 쓰기 허용. 그중 1개는 동기화용(workingProfile)으로 쓰므로 최대 5개까지 생성 가능
      // return this.profiles.length < 6;
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.candName = "";
    this.selected = [];
    this.fetchProfileListExceptSyncWorkingProfile();
    setTimeout(() => {
      this.selectedItem4Options4StartBoardID =
        this.getProfileFromUserConfigStartBoardID();
    }, 2000);
  },

  methods: {
    ...mapMutations("auth", ["setUserConfig"]),
    ...mapMutations("dashboard", [
      "setMode2EditCBProfileReg",
      "addCacheAPI",
      "setJMyCBProfileTmp",
      "setJMyCBProfileTmpBeforeEditMode",
      "setJReserve4MyCBProfileReg",
      "setJMyCBProfileReg",
    ]),
    async updateStartBoardID(u, s) {
      await this.soixa.updateMe({
        user_id: this.userConfig.userId,
        start_board_id: Number(s),
      });

      this.updateUserConfigStartBoardID();
    },

    async updateUserConfigStartBoardID() {
      await this.soixa
        .getMe()
        .then((response) => {
          const userContainer = {
            userId: response.data.user_id,
            userName: response.data.user_name,
            userPhone: response.data.phone,
            userEmail: response.data.email,
            isAdmin: response.data.is_superuser,
            isActive: response.data.is_active,
            userGroup1: response.data.group_1,
            userGroup2: response.data.group_2,
            userGroup3: response.data.group_3,
            userGroup4: response.data.group_4,
            boardId: response.data.board_id,
            startBoardID: response.data.start_board_id,
            boardModules: response.data.board_modules,
          };
          this.setUserConfig(userContainer);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    localStorageClear() {
      localStorage.clear();
    },

    // // // 테스트환경으로초기화_연동테스트후폐기() {
    // // //   this.updateProfile(107, {
    // // //     name: "예시1)",
    // // //     board_module: JSON.stringify(this.masterProfile4Employees),
    // // //   });
    // // //   this.updateProfile(108, {
    // // //     name: "예시2)",
    // // //     board_module: JSON.stringify(this.masterProfile4Management),
    // // //   });
    // // //   this.updateProfile(this.userConfig.boardId, {
    // // //     name: "workingProfile",
    // // //     board_module: JSON.stringify(this.example),
    // // //   });
    // // //   this.createProfile(this.userConfig.userId, {
    // // //     name: "exampleProfile",
    // // //     board_module: JSON.stringify(this.example),
    // // //   });
    // // //   this.createProfile(this.userConfig.userId, {
    // // //     name: "backupProfile0",
    // // //     board_module: JSON.stringify(this.example),
    // // //   });
    // // //   this.createProfile(this.userConfig.userId, {
    // // //     name: "backupProfile1",
    // // //     board_module: JSON.stringify(this.example),
    // // //   });
    // // //   this.createProfile(this.userConfig.userId, {
    // // //     name: "backupProfile2",
    // // //     board_module: JSON.stringify(this.example),
    // // //   });
    // // //   bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    // // // },
    // // // 직원용마스터프로파일로부터내운용프로파일만들어사용하기_연동테스트후폐기() {
    // // //   this.fetchProfile(4);
    // // //   // setTimeout(() => {
    // // //   //   this.updateWorkingProfileWithTemp();
    // // //   // }, 0);
    // // // },
    // // // 경영진용마스터프로파일로부터내운용프로파일만들어사용하기_연동테스트후폐기() {
    // // //   this.fetchProfile(5);
    // // //   // setTimeout(() => {
    // // //   //   this.updateWorkingProfileWithTemp();
    // // //   // }, 300);
    // // // },

    // 선택한_프로파일을_내_운용프로파일에_덮어쓰기
    fetchAndApplyProfileToTemp(boardId) {
      this.fetchProfile(boardId);
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },

    // 선택한_프로파일에_내_운용프로파일을_덮어쓰기
    updateSelectedProfileWithTemp(boardId) {
      this.updateProfile(boardId, {
        // name: "workingProfile",
        board_module: this.jMyCBProfileTmp,
      });
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },

    // 이름만_바꾸기
    renameProfile(boardId, newName) {
      if (newName.trim() == "") {
        this.candName = "";
        return;
      }
      let n = newName;
      n = this.removeSpecialCharacters(n);
      this.updateProfile(boardId, {
        name: n,
      });
      this.candName = "";
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },

    // 프로파일이름바꾸기입력상자_닫힐_때
    handleCloseTheRenameProfileDialog() {
      // alert();
      this.candName = "";
    },

    // 프로파일이름바꾸기입력상자_열_때
    handleOpenTheRenameProfileDialog(n) {
      if (this.verbose) {
        console.log("rename-box opening: " + n);
      }
      this.candName = "";
    },

    // 시작프로파일인_지_확인_및_필요시_업데이트하며_프로파일_삭제
    deleteProfileAfterUpdateStartBoardID(boardId) {
      if (this.userConfig.startBoardID == boardId) {
        this.updateStartBoardID(
          this.defaultItem4Options4StartBoardID.owner_id,
          this.defaultItem4Options4StartBoardID.board_id
        );
      }

      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
      this.deleteProfile(boardId);
    },

    // 편집모드_진입
    beginEditMode() {
      this.setJMyCBProfileTmpBeforeEditMode(this.jMyCBProfileTmp);
      this.setMode2EditCBProfileReg(true);
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },

    // 저장하지_않고_편집모드_나가기
    cancelEditMode() {
      this.fetchProfile(this.userConfig.boardId); // 내_운용프로파일_가져오기

      this.setMode2EditCBProfileReg(false);
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },

    // 임의_배너_하나_추가
    addAnyBanner() {
      let tmp = JSON.parse(this.jMyCBProfileTmp) || "{}";
      tmp = {
        ...tmp,
        banners: [
          {
            catIndicator: "VOC",
            catPresentationFormat: "일별추이",
            catProductService: "5G",
            catScope: "팀별",
            group: "전남엔지니어링부",
            dates: "최근갱신일",
          },
        ],
      };
      this.setJMyCBProfileTmp(JSON.stringify(tmp));
    },

    // 임의_카드_하나_추가
    addAnyCard() {
      let tmp = JSON.parse(this.jMyCBProfileTmp) || "{}";
      tmp = {
        ...tmp,
        cards: [
          {
            catIndicator: "VOC",
            catPresentationFormat: "일별추이",
            catProductService: "5G",
            catScope: "팀별",
            group: "전남엔지니어링부",
            dates: "2주간",
          },
        ],
      };
      this.setJMyCBProfileTmp(JSON.stringify(tmp));
    },

    // 저장하고_편집모드_나가기
    exitFromEditModeAfterSaving() {
      this.updateWorkingProfileWithTemp(); // 내_운용프로파일을_서버로_올려_동기화
      this.setMode2EditCBProfileReg(false);
      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },

    initialize() {
      this.fetchProfileListExceptSyncWorkingProfile();
    },
    RecoverWhenInvalidStartBoardID() {
      // // 예외 복구 테스트
      // // 0. mounted()할 때는, getProfileFromUserConfigStartBoardID()을 options4StartBoardID를 준비한 후에 실행한다
      // // 1. getProfileFromUserConfigStartBoardID 안에 r.length < 1 즉, 유효값을 찾지 못했을 때 RecoverWhenInvalidStartBoardID()를 실행하며 다음 과정으로 테스트한다
      // // 2. userConfig.startBoardID으로 options4StartBoardID목록에 없는 board_Id를 지정한다
      // // this.updateStartBoardID(this.userConfig.userId, -10000);
      // // 3. 이때는, 디폴트 값(workingProfile)으로 복구한다
      // // this.updateStartBoardID(
      // //   this.userConfig.userId,
      // //   this.userConfig.boardId
      // // );
      this.updateStartBoardID(this.userConfig.userId, this.userConfig.boardId);
      this.$swal.fire({
        text: "대시보드에 반영할 구성을 초기화 합니다",
        showConfirmButton: false,
      });
      console.log(
        "userConfig.startBoardID is invalid, set to userConfig.boardId as workingProfile\n",
        this.userConfig.startBoardID,
        this.userConfig.boardId
      );
      this.updateStartBoardID(this.userConfig.userId, this.userConfig.boardId);
      setTimeout(() => {
        this.$router.go(this.$router.currentRoute);
      }, 1000);
    },

    // 시작프로파일_확인_및_필요시_예외_복구
    getProfileFromUserConfigStartBoardID() {
      let markKey = "board_id";
      let r = [...this.options4StartBoardID].filter((element) => {
        if (element[markKey] == this.userConfig.startBoardID) {
          return true;
        }
        // return element[markKey] == this.userConfig.startBoardID;
      });

      if (r.length < 1) {
        this.RecoverWhenInvalidStartBoardID();
        return this.defaultItem4Options4StartBoardID;
      }

      return r[0];
    },

    // 새_프로파일_생성
    addNewProfileWithTemp() {
      this.createProfile(this.userConfig.userId, {
        name: this.newName.trim(),
        board_module: this.jMyCBProfileTmp,
      });
      this.profilesExceptMySyncWorkingProfile.push(this.editedItem);

      this.candName = "";

      bus.$emit("TOGGLE_WHETHER_opensViewFilterDrawer", false);
    },
  },
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
