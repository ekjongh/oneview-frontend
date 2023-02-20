<template>
  <div id="kmap" class="ollehmap"></div>
</template>

<script>
// test는 KT Olleh Map을 사용하기 위해 import, 사용하지 않더라도 지우면 안됨.
import test from "@/map/ktmap-all-desktop";
import { bus } from "@/event-bus";
import default_marker from "@/assets/default-marker.png";
import default_marker_worst from "@/assets/default-marker-worst.png";
import default_marker_main from "@/assets/default-marker-main.png";
import default_marker_main_worst from "@/assets/default-marker-main-worst.png";
import tt_marker from "@/assets/tt-marker-red.png";
import day_marker from "@/assets/day-marker.png";
import ngt_marker from "@/assets/night-marker.png";
import data_marker from "@/assets/data-marker.png";
import volte_marker from "@/assets/volte-marker.png";
import day_night_marker from "@/assets/day-night-marker.png";
import day_data_marker from "@/assets/day-data-marker.png";
import day_volte_marker from "@/assets/day-volte-marker.png";
import night_data_marker from "@/assets/night-data-marker.png";
import night_volte_marker from "@/assets/night-volte-marker.png";
import data_volte__marker from "@/assets/data-volte-marker.png";
import tt_etc__marker from "@/assets/tt-etc-marker.png";
import multi_marker from "@/assets/multi-marker.png";
import red_circle from "@/assets/red-circle.png";
import blue_circle from "@/assets/blue-circle.png";
import gray_circle from "@/assets/gray-circle.png";

// olleh map 글로벌 변수 선언, 지우면안됨.
/* global olleh */

export default {
  name: "kt-map",
  data: () => ({
    map: null,
    zoom: null,
    tt_toggle: {},
    bts_list_view: [],
    inbldg_list_view: [],
    move_map: {},
    markers: [],
    config_markers: [],
    config_bts_view: [],
    deleted_config_markers: [],
    marker_configs: {
      DEFAULT: default_marker,
      DEFAULT_WORST: default_marker_worst,
      DEFAULT_MAIN: default_marker_main,
      DEFAULT_MAIN_WORST: default_marker_main_worst,
      RED_CIRCLE: red_circle,
      BLUE_CIRCLE: blue_circle,
      GRAY_CIRCLE: gray_circle,
      TT: tt_marker,
      DAY: day_marker,
      NGT: ngt_marker,
      DATA: data_marker,
      VOLTE: volte_marker,
      DAY_NGT: day_night_marker,
      DAY_DATA: day_data_marker,
      DAY_VOLTE: day_volte_marker,
      NIGHT_DATA: night_data_marker,
      NIGHT_VOLTE: night_volte_marker,
      DATA_VOLTE: data_volte__marker,
      TT_ETC: tt_etc__marker,
      MULTI: multi_marker,
    },
    marker_sizes: {
      step1: new olleh.maps.Size(10, 10),
      step2: new olleh.maps.Size(15, 15),
      step3: new olleh.maps.Size(20, 20),
      step4: new olleh.maps.Size(25, 25),
      step5: new olleh.maps.Size(30, 30),
    },
    bts_name_config: {
      TT: "TT주소",
      DAY: "주간 대표좌표",
      NGT: "야간 대표좌표",
      DATA: "데이터 주기지국",
      VOLTE: "음성 주기지국",
    },
  }),
  methods: {
    // Map Mount시 맵 초기화 Method.
    initMap() {
      const container = document.getElementById("kmap");
      console.log("RESOURCE URL: ", olleh.maps.env.RESOURCE_URL);
      const options = {
        center: new olleh.maps.UTMK(958386.063532902, 1941111.5761742294),
        zoom: 6,
        mapTypeId: "ROADMAP",
        disableShadow: true,
      };
      console.log(options);
      console.log("this.map: ", this.map);
      console.log("container: ", container);
      this.map = new olleh.maps.Map(container, options);
      this.map.onEvent("zoom_change", this.getBeforeZoom);
      this.map.onEvent("zoom_changed", this.moveZoom);
      console.log("init Map completed...");
    },
    // 지도에 있는 마커 전부 지우는 Method
    clearMarkers() {
      console.log("-------------------------------");
      console.log("Clear Markers Start...");
      console.log("-------------------------------");
      console.log("KtMap.vue > clearMarkers ...");
      this.config_markers.forEach((obj) => {
        obj.setMap(null);
      });
      this.config_markers = [];
      this.deleted_config_markers = [];

      this.markers.forEach((obj) => {
        obj.setMap(null);
      });
      this.markers = [];
    },
    // GIS 상세분석 시작 후 초기 마커 세팅용 Method.
    initMarkers() {
      console.log("-------------------------------");
      console.log("Init Markers start...");
      console.log("KtMap.this.bts_list_view: ", this.bts_list_view);
      console.log("-------------------------------");
      const currentZoom = this.map.getZoom();
      // Table Selected BTS Marker Setting...
      this.bts_list_view.forEach((obj) => {
        obj.position = new olleh.maps.LatLng(obj.latit_val, obj.lngit_val);
        obj.url = this.marker_configs.DEFAULT;
        obj.zIndex = 1;
        obj.size = this.marker_sizes.step1;
        // 기본 마커는 마커크기 1~3단계 사용, 0~2 Index를 사용하기위해 Default size_step 0 적용
        let size_step = 0;
        // 현재 Zoom 크기가 9 이상일 시 3단계 크기 사용, 5~8단계일 시 2단계 크기 사용
        if (currentZoom > 8) {
          size_step = size_step + 2;
        } else if (currentZoom > 4) {
          size_step = size_step + 1;
        }
        if (obj.special !== "") {
          size_step = size_step + 1;
        }
        // 주기지국/Worst 기지국들일 시 zIndex 변경.(zIndex: 마커들이 맵 위에 표시되는 우선순위)
        if (obj.special.includes("Worst")) {
          obj.url = this.marker_configs.DEFAULT_WORST;
          obj.zIndex = 200;
        }
        if (obj.special.includes("주기지국")) {
          obj.url = this.marker_configs.DEFAULT_MAIN;
          obj.zIndex = 300;
        }
        if (obj.special.includes("주기지국") && obj.special.includes("Worst")) {
          obj.url = this.marker_configs.DEFAULT_MAIN_WORST;
          obj.zIndex = 400;
        }
        obj.size = Object.values(this.marker_sizes)[size_step];
        let selected_marker = new olleh.maps.overlay.Marker({
          position: obj.position,
          title: obj.cell_cd + " " + obj.equip_nm + " " + obj.equip_cd,
          zIndex: obj.zIndex,
          flat: true,
          // Icon Setting
          icon: {
            url: obj.url,
            size: obj.size,
          },
        });

        //마커 클릭 시, 마커 정보 "VOC발생 고객 사용 기지국 품질요약" 테이블 필터링값으로 이동.
        selected_marker.onEvent("click", function () {
          const title_array = selected_marker._title.split(" ");
          let title = title_array[0];
          console.log("this.marker: ", title);
          bus.$emit("selected_marker_id", title);
        });
        selected_marker.setMap(this.map);
        this.markers.push(selected_marker);
      });
      console.log("-------------------------------");
      console.log("Init Markers end...");
      console.log("-------------------------------");
    },
    // 인빌딩 마커
    initMarkersInbldg() {
      console.log("-------------------------------");
      console.log("Init Markers start...");
      console.log("KtMap.this.inbldg_list_view: ", this.inbldg_list_view);
      console.log("-------------------------------");
      const currentZoom = this.map.getZoom();
      // Table Selected BTS Marker Setting...
      this.inbldg_list_view.forEach((obj) => {
        obj.position = new olleh.maps.UTMK(obj.adr_utmkx, obj.adr_utmky);
        obj.url = this.marker_configs.RED_CIRCLE;
        obj.zIndex = 1;
        obj.size = this.marker_sizes.step1;
        // 기본 마커는 마커크기 1~3단계 사용, 0~2 Index를 사용하기위해 Default size_step 0 적용
        let size_step = 0;
        // 현재 Zoom 크기가 9 이상일 시 3단계 크기 사용, 5~8단계일 시 2단계 크기 사용
        if (currentZoom > 8) {
          size_step = size_step + 2;
        } else if (currentZoom > 4) {
          size_step = size_step + 1;
        }
        obj.size = Object.values(this.marker_sizes)[size_step];
        let selected_marker = new olleh.maps.overlay.Marker({
          position: obj.position,
          title: obj.bldg_info,
          zIndex: obj.zIndex,
          flat: true,
          // Icon Setting
          icon: {
            url: obj.url,
            size: obj.size,
          },
        });
        selected_marker.setMap(this.map);
        this.markers.push(selected_marker);
      });
      console.log("-------------------------------");
      console.log("Init Markers Inbldg end...");
      console.log("-------------------------------");
    },
    // VOC상세 CLEAR버튼 클릭 시 모든 Config Markers 삭제.
    clearConfigMarkers() {
      console.log("KtMap.vue > clearConfigMarkers ...", this.config_markers);
      this.config_markers.forEach((obj) => {
        obj.setMap(null);
      });
      this.config_markers = [];
      this.deleted_config_markers = [];
    },
    // Config Markers 초기세팅
    initConfigMarkers() {
      console.log("-------------------------------");
      console.log("Init Config Marker start...");
      console.log("-------------------------------");
      console.log("this.config_bts_view: ", this.config_bts_view);
      this.config_markers.forEach((obj) => {
        obj.setMap(null);
      });
      this.config_markers = [];
      this.deleted_config_markers = [];
      // Marker Position 비교 실행
      const marker_positions = this.config_bts_view.map((obj) => {
        return obj.position;
      });
      console.log("init Config Marker -> marker positions: ", marker_positions);
      // Config Markers는 마커크기 3~5단계 사용, Default size_step 2 적용
      let size_step = 2;
      let obj_size = this.marker_sizes.step4;
      const currentZoom = this.map.getZoom();
      if (currentZoom > 8) {
        size_step = size_step + 2;
      } else if (currentZoom > 4) {
        size_step = size_step + 1;
      }
      obj_size = Object.values(this.marker_sizes)[size_step];
      this.config_bts_view
        .filter((element) => element.visuable)
        .forEach((obj) => {
          let obj_title = "";
          let obj_url = this.marker_configs[obj.name];
          let obj_zIndex = 10;
          if (this.isOverlap(obj, this.config_markers)) {
            const oldMarker = this.isOverlap(obj, this.config_markers)[0];
            obj_title =
              oldMarker._title + " / " + this.bts_name_config[obj.name];
            obj_url = this.marker_configs.MULTI;
            if (
              obj_title.includes(this.bts_name_config["DATA"]) &&
              obj_title.includes(this.bts_name_config["VOLTE"])
            ) {
              obj_url = this.marker_configs.DATA_VOLTE;
              obj_zIndex = 20;
            }
            if (
              obj_title.includes(this.bts_name_config["DAY"]) &&
              obj_title.includes(this.bts_name_config["NGT"])
            ) {
              obj_url = this.marker_configs.DAY_NGT;
              obj_zIndex = 20;
            }
            if (
              obj_title.includes(this.bts_name_config["DAY"]) &&
              obj_title.includes(this.bts_name_config["DATA"])
            ) {
              obj_url = this.marker_configs.DAY_DATA;
              obj_zIndex = 20;
            }
            if (
              obj_title.includes(this.bts_name_config["DAY"]) &&
              obj_title.includes(this.bts_name_config["VOLTE"])
            ) {
              obj_url = this.marker_configs.DAY_VOLTE;
              obj_zIndex = 20;
            }
            if (
              obj_title.includes(this.bts_name_config["NGT"]) &&
              obj_title.includes(this.bts_name_config["DATA"])
            ) {
              obj_url = this.marker_configs.NIGHT_DATA;
              obj_zIndex = 20;
            }
            if (
              obj_title.includes(this.bts_name_config["NGT"]) &&
              obj_title.includes(this.bts_name_config["VOLTE"])
            ) {
              obj_url = this.marker_configs.NIGHT_VOLTE;
              obj_zIndex = 20;
            }
            if (obj_title.includes(this.bts_name_config["TT"])) {
              obj_url = this.marker_configs.TT_ETC;
              obj_zIndex = 1100;
            }
            const overlapCnt = obj_title.split("/").length;
            if (overlapCnt > 2) {
              obj_url = this.marker_configs.MULTI;
              obj_zIndex = 30;
            }
            this.deleteConfigMarkers(oldMarker);
            this.config_markers = this.config_markers.filter(
              (obj) => obj._title !== oldMarker._title
            );
            this.deleted_config_markers.push(oldMarker);
          } else {
            obj_title = this.bts_name_config[obj.name];
            obj_url = this.marker_configs[obj.name];
            if (obj_title === this.bts_name_config["TT"]) {
              obj_zIndex = 1000;
            }
          }
          // 주기지국 데이터 들만 object에 equip_cd attr 전달, 기지국ID title에 추가.
          if (obj.equip_cd) {
            obj_title = `${obj_title}(${obj.equip_cd})`;
          }
          let marker = new olleh.maps.overlay.Marker({
            position: obj.position,
            title: obj_title,
            zIndex: obj_zIndex,
            flat: true,

            icon: {
              url: obj_url,
              size: obj_size,
            },
          });

          marker.setMap(this.map);
          this.config_markers.push(marker);
        });
    },
    addUsedMarkers(obj) {
      obj.position = new olleh.maps.LatLng(obj.latit_val, obj.lngit_val);
      obj.url = this.marker_configs.DEFAULT;
      let obj_size = this.marker_sizes.step2;
      let size_step = 0;
      const currentZoom = this.map.getZoom();
      if (currentZoom > 8) {
        size_step = size_step + 2;
      } else if (currentZoom > 4) {
        size_step = size_step + 1;
      }
      // 빨강 기지국(주기지국/Worst기지국) 크기 1단계 추가 및 이미지 변경.
      if (obj.special) {
        obj.url = this.marker_configs.DEFAULT_WORST;
        size_step = size_step + 1;
      }
      obj_size = Object.values(this.marker_sizes)[size_step];
      let add_marker = new olleh.maps.overlay.Marker({
        position: obj.position,
        title: obj.cell_cd + " " + obj.equip_nm + " " + obj.equip_cd,
        flat: true,
        zIndex: 10,
        // Icon Setting
        icon: {
          url: obj.url,
          size: obj_size,
        },
      });

      //마커 마우스 클릭 시 테이블 필터링
      add_marker.onEvent("click", function () {
        // title_array 에 [cell_cd, equip_nm, equip_cd] 등록, 0번 Index인 cell_cd로 필터링.
        const title_array = add_marker._title.split(" ");
        let title = title_array[0];
        console.log("this.marker: ", title);
        bus.$emit("selected_marker_id", title);
      });
      add_marker.setMap(this.map);
      this.markers.push(add_marker);
    },
    addUsedMarkersInbldg(obj) {
      obj.position = new olleh.maps.UTMK(obj.adr_utmkx, obj.adr_utmky);
      obj.url = this.marker_configs.DEFAULT;
      let obj_size = this.marker_sizes.step2;
      let size_step = 0;
      const currentZoom = this.map.getZoom();
      if (currentZoom > 8) {
        size_step = size_step + 2;
      } else if (currentZoom > 4) {
        size_step = size_step + 1;
      }
      obj_size = Object.values(this.marker_sizes)[size_step];
      let add_marker = new olleh.maps.overlay.Marker({
        position: obj.position,
        title: obj.bldg_info,
        flat: true,
        zIndex: 10,
        // Icon Setting
        icon: {
          url: obj.url,
          size: obj_size,
        },
      });

      add_marker.setMap(this.map);
      this.markers.push(add_marker);
    },
    addConfigMarkers(obj) {
      console.log("-------------------------------");
      console.log("Add Markers start...", obj);
      console.log("-------------------------------");
      let size_step = 2;
      let obj_size = this.marker_sizes.step3;
      const currentZoom = this.map.getZoom();
      if (currentZoom > 8) {
        size_step = size_step + 2;
      } else if (currentZoom > 4) {
        size_step = size_step + 1;
      }
      obj_size = Object.values(this.marker_sizes)[size_step];
      let obj_title = this.bts_name_config[obj.name];
      if (obj.equip_cd) {
        obj_title = `${obj_title}(${obj.equip_cd})`;
      }
      const obj_url = this.marker_configs[obj.name];
      let obj_zIndex = 10;
      if (obj_title.includes(this.bts_name_config["TT"])) {
        obj_zIndex = 1100;
      }
      let marker = new olleh.maps.overlay.Marker({
        position: obj.position,
        title: obj_title,
        zIndex: obj_zIndex,
        flat: true,

        icon: {
          url: obj_url,
          size: obj_size,
        },
      });
      console.log("marker: ", marker);

      marker.setMap(this.map);
      this.config_markers.push(marker);
      console.log("this.config_markers: ", this.config_markers);
    },
    // title 값을 보고 마커 삭제.
    deleteUsedMarkers(obj) {
      let deleteMarker = this.markers.filter(
        (x) =>
          x._title === obj.cell_cd + " " + obj.equip_nm + " " + obj.equip_cd
      );
      const newMarkers = this.markers.filter(
        (x) =>
          x._title !== obj.cell_cd + " " + obj.equip_nm + " " + obj.equip_cd
      );
      this.markers = newMarkers;
      deleteMarker.forEach((obj) => {
        obj.setMap(null);
      });
    },
    // title 값을 보고 마커 삭제.
    deleteUsedMarkersInbldg(obj) {
      console.log("delete inbldg marker", obj._title);
      let deleteMarker = this.markers.filter((x) => x._title === obj.bldg_info);
      const newMarkers = this.markers.filter((x) => x._title !== obj.bldg_info);
      this.markers = newMarkers;
      deleteMarker.forEach((obj) => {
        obj.setMap(null);
      });
    },
    deleteConfigMarkers(obj) {
      obj.setMap(null);
      console.log("delete success!", obj);
    },
    updateConfigMarker(type) {
      console.log("updateMarker Start..., type: ", type);
      console.log("this.config_bts_view: ", this.config_bts_view);
      const configObj = this.config_bts_view.filter(
        (obj) => obj.name === type
      )[0];
      console.log("update marker obj: ", configObj);
      const typeCheck = this.config_markers.filter((obj) =>
        obj._title.includes(this.bts_name_config[type])
      );
      if (typeCheck.length === 1) {
        console.log(
          "기지국 삭제..., Type Obj Delete > Overlap Check > Type Obj Add..."
        );
        const markerObj = typeCheck[0];
        if (markerObj._title.split("/").length === 1) {
          console.log("중복기지국 없음, 바로 삭제");
          this.deleteConfigMarkers(markerObj);
          this.config_markers = this.config_markers.filter(
            (obj) => !obj._title.includes(this.bts_name_config[type])
          );
          this.deleted_config_markers.push(markerObj);
        } else {
          console.log("중복기지국 있음, 업데이트 필요...");
          this.deleteOverlapMarker(markerObj, configObj);
          // this.config_markers = this.config_markers.filter((obj) =>
          //   obj._title.includes(this.bts_name_config[type])
          // );
          // this.deleted_config_markers.push(markerObj);
        }
      } else {
        console.log("기지국 추가..., Overlap Check > Type Obj Add ...");
        const oldMarker = this.isOverlap(configObj, this.config_markers)[0];
        if (!oldMarker) {
          console.log("Overlap 없음, 새로추가...");
          this.addConfigMarkers(configObj);
        } else {
          console.log("Overlap 있음, 중복추가...");
          this.addOverlapMarker(configObj);
        }
      }
    },
    deleteOverlapMarker(oldMarker, obj) {
      console.log("deleteOverlapMarker Start...", obj);
      let size_step = 2;
      let obj_size = this.marker_sizes.step3;
      const currentZoom = this.map.getZoom();
      if (currentZoom > 8) {
        size_step = size_step + 2;
      } else if (currentZoom > 4) {
        size_step = size_step + 1;
      }
      obj_size = Object.values(this.marker_sizes)[size_step];
      const obj_title = oldMarker._title
        .split("/")
        .map((str) => {
          str = str.trim();
          return str;
        })
        .filter((str) => !str.includes(this.bts_name_config[obj.name]))
        .join(" / ");
      console.log("deleteOverlapMarker => obj_title: ", obj_title);
      let obj_url = this.marker_configs.MULTI;
      let obj_zIndex = 10;
      if (
        obj_title.includes(this.bts_name_config["DATA"]) &&
        obj_title.split("/").length === 1
      ) {
        obj_url = this.marker_configs.DATA;
        obj_zIndex = 10;
      }
      if (
        obj_title.includes(this.bts_name_config["VOLTE"]) &&
        obj_title.split("/").length === 1
      ) {
        obj_url = this.marker_configs.VOLTE;
        obj_zIndex = 10;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.split("/").length === 1
      ) {
        obj_url = this.marker_configs.DAY;
        obj_zIndex = 10;
      }
      if (
        obj_title.includes(this.bts_name_config["NGT"]) &&
        obj_title.split("/").length === 1
      ) {
        obj_url = this.marker_configs.NGT;
        obj_zIndex = 10;
      }
      if (
        obj_title.includes(this.bts_name_config["DATA"]) &&
        obj_title.includes(this.bts_name_config["VOLTE"])
      ) {
        obj_url = this.marker_configs.DATA_VOLTE;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.includes(this.bts_name_config["NGT"])
      ) {
        obj_url = this.marker_configs.DAY_NGT;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.includes(this.bts_name_config["DATA"])
      ) {
        obj_url = this.marker_configs.DAY_DATA;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.includes(this.bts_name_config["VOLTE"])
      ) {
        obj_url = this.marker_configs.DAY_VOLTE;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["NGT"]) &&
        obj_title.includes(this.bts_name_config["DATA"])
      ) {
        obj_url = this.marker_configs.NIGHT_DATA;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["NGT"]) &&
        obj_title.includes(this.bts_name_config["VOLTE"])
      ) {
        obj_url = this.marker_configs.NIGHT_VOLTE;
        obj_zIndex = 20;
      }
      if (obj_title.includes(this.bts_name_config["TT"])) {
        obj_url = this.marker_configs.TT_ETC;
        obj_zIndex = 1000;
      }
      if (obj_title === this.bts_name_config["TT"]) {
        obj_url = this.marker_configs.TT;
        obj_zIndex = 1100;
      }
      if (obj_title === this.bts_name_config["DATA"]) {
        obj_url = this.marker_configs.DATA;
      }
      if (obj_title === this.bts_name_config["VOLTE"]) {
        obj_url = this.marker_configs.VOLTE;
      }
      if (obj_title === this.bts_name_config["DAY"]) {
        obj_url = this.marker_configs.DAY;
      }
      if (obj_title === this.bts_name_config["NGT"]) {
        obj_url = this.marker_configs.NGT;
      }
      const overlapCnt = obj_title.split("/").length;
      console.log("deleteOVerlapMarker > overlapCnt: ", overlapCnt);
      console.log("deleteOVerlapMarker > obj_title: ", obj_title);
      if (overlapCnt > 2) {
        obj_url = this.marker_configs.MULTI;
        obj_zIndex = 30;
      }
      this.deleteConfigMarkers(oldMarker);
      this.config_markers = this.config_markers.filter(
        (obj) => obj._title !== oldMarker._title
      );
      this.deleted_config_markers.push(oldMarker);
      let marker = new olleh.maps.overlay.Marker({
        position: obj.position,
        title: obj_title,
        zIndex: obj_zIndex,
        flat: true,
        icon: {
          url: obj_url,
          size: obj_size,
        },
      });
      console.log("marker: ", marker);

      marker.setMap(this.map);
      this.config_markers.push(marker);
      console.log("this.config_markers: ", this.config_markers);
    },
    addOverlapMarker(obj) {
      console.log("addOverlapMarker Start...", obj);
      const oldMarker = this.isOverlap(obj, this.config_markers)[0];
      console.log("isOverlap 확인...", oldMarker);
      let obj_size = this.marker_sizes.step3;
      let size_step = 2;
      const currentZoom = this.map.getZoom();
      if (currentZoom > 8) {
        size_step = size_step + 2;
      } else if (currentZoom > 4) {
        size_step = size_step + 1;
      }
      obj_size = Object.values(this.marker_sizes)[size_step];
      let add_obj_title = this.bts_name_config[obj.name];
      if (obj.equip_cd) {
        add_obj_title = `${add_obj_title}(${obj.equip_cd})`;
      }
      let obj_title = oldMarker._title + " / " + add_obj_title;
      let obj_url = this.marker_configs.MULTI;
      let obj_zIndex = 10;

      if (
        obj_title.includes(this.bts_name_config["DATA"]) &&
        obj_title.includes(this.bts_name_config["VOLTE"])
      ) {
        obj_url = this.marker_configs.DATA_VOLTE;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.includes(this.bts_name_config["NGT"])
      ) {
        obj_url = this.marker_configs.DAY_NGT;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.includes(this.bts_name_config["DATA"])
      ) {
        obj_url = this.marker_configs.DAY_DATA;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["DAY"]) &&
        obj_title.includes(this.bts_name_config["VOLTE"])
      ) {
        obj_url = this.marker_configs.DAY_VOLTE;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["NGT"]) &&
        obj_title.includes(this.bts_name_config["DATA"])
      ) {
        obj_url = this.marker_configs.NIGHT_DATA;
        obj_zIndex = 20;
      }
      if (
        obj_title.includes(this.bts_name_config["NGT"]) &&
        obj_title.includes(this.bts_name_config["VOLTE"])
      ) {
        obj_url = this.marker_configs.NIGHT_VOLTE;
        obj_zIndex = 20;
      }
      if (obj_title.includes(this.bts_name_config["TT"])) {
        obj_url = this.marker_configs.TT_ETC;
        obj_zIndex = 1000;
      }
      const overlapCnt = obj_title.split("/").length;
      console.log("AddOverlapMarker > overlapCnt: ", overlapCnt);
      console.log("AddOverlapMarker > obj_title: ", obj_title);
      if (overlapCnt > 2) {
        obj_url = this.marker_configs.MULTI;
        obj_zIndex = 30;
      }
      this.deleteConfigMarkers(oldMarker);
      this.config_markers = this.config_markers.filter(
        (obj) => obj.obj_title !== oldMarker.obj_title
      );
      this.deleted_config_markers.push(oldMarker);
      let marker = new olleh.maps.overlay.Marker({
        position: obj.position,
        title: obj_title,
        zIndex: obj_zIndex,
        flat: true,

        icon: {
          url: obj_url,
          size: obj_size,
        },
      });
      console.log("marker: ", marker);

      marker.setMap(this.map);
      this.config_markers.push(marker);
      console.log("this.config_markers: ", this.config_markers);
    },
    moveZoom() {
      console.log("Map On Event > Zoom Range Changed...");

      const currentZoom = this.map.getZoom();
      if (currentZoom > this.zoom) {
        console.log("Zoom 확대!");
        if (currentZoom < 5) {
          this.setMarkerSize(currentZoom, 2);
        } else if (currentZoom < 9) {
          this.setMarkerSize(currentZoom, 3);
        } else {
          this.setMarkerSize(currentZoom, 4);
        }
      } else {
        console.log("Zoom 축소!");
        if (currentZoom >= 9) {
          this.setMarkerSize(currentZoom, 4);
        } else if (currentZoom >= 5) {
          this.setMarkerSize(currentZoom, 3);
        } else {
          this.setMarkerSize(currentZoom, 2);
        }
      }
      console.log("map zoom level: ", this.map.getZoom());
    },
    getBeforeZoom() {
      this.zoom = this.map.getZoom();
      console.log("get before zoom success!", this.zoom);
    },
    isOverlap(marker, arr) {
      console.log("isOverlap Method Start...", marker, arr);
      const tmpArray = arr.filter((x) =>
        x._position.almostEquals(marker.position, 6)
      );
      if (tmpArray.length > 0) {
        return tmpArray;
      } else {
        return false;
      }
    },
    isNear(position, arr, range = 500) {
      console.log("isNear Method Start...", position, arr);
      const tmpArray = arr.map((obj) => {
        obj.near_filter = obj.position.almostEquals(position, range);
        return { ...obj };
      });
      return tmpArray;
      // const tmpArray = arr.filter((x) =>
      //   x.position.almostEquals(position, range)
      // );
      // if (tmpArray.length > 0) {
      //   return tmpArray;
      // } else {
      //   return false;
      // }
    },
    setMarkersCluster() {
      console.log("Set Markers Cluster Start...", this.bts_list_view);
    },
    setMarkerSize(zoom, size) {
      if (this.markers.length > 0) {
        this.markers.forEach((obj) => {
          let oldObj = obj.getIcon();
          let objSize = Object.values(this.marker_sizes)[size - 2];
          if (
            oldObj.url !== this.marker_configs.DEFAULT &&
            oldObj.url !== this.marker_configs.GRAY_CIRCLE
          ) {
            objSize = Object.values(this.marker_sizes)[size - 1];
          }
          // if (
          //   (oldObj.url === this.marker_configs.DEFAULT ||
          //     oldObj.url === this.marker_configs.GRAY_CIRCLE) &&
          //   zoom < 7
          // ) {
          //   oldObj.url = this.marker_configs.GRAY_CIRCLE;
          //   objSize = this.marker_sizes.step1;
          // }else if (
          //   (oldObj.url === this.marker_configs.DEFAULT ||
          //     oldObj.url === this.marker_configs.GRAY_CIRCLE) &&
          //   zoom >= 7
          // ) {
          //   oldObj.url = this.marker_configs.DEFAULT;
          //   // objSize = Object.values(this.marker_sizes)[size - 1];
          // }
          // if (oldObj.url !== this.marker_configs.DEFAULT) {
          //   objSize.height = objSize.height * 1.5;
          //   objSize.width = objSize.width * 1.5;
          // }
          let newObj = {
            url: oldObj.url,
            size: objSize,
          };
          obj.setIcon(newObj);
          return obj;
        });
      }
      if (this.config_markers.length > 0) {
        this.config_markers.forEach((obj) => {
          let oldObj = obj.getIcon();
          let objSize = Object.values(this.marker_sizes)[size];
          let newObj = {
            url: oldObj.url,
            size: objSize,
          };
          obj.setIcon(newObj);
          return obj;
        });
      }

      // this.markers: VOC고객 사용 실 기지국
      // this.config_markers: 사용자 Config 기지국
    },
    setIconCaption() {},
    setZoomIn() {},
    getCenter() {},
    getLargestDistance() {},
  },
  created() {
    bus.$on("clear", (payload) => {
      console.log(payload);
      this.clearMarkers();
    });
    bus.$on("off_config_markers", (payload) => {
      console.log("KtMap.vue > receive success!", payload);
      this.clearConfigMarkers();
    });
    bus.$on("bts_mark_changed", (payload) => {
      const receive = payload.map((obj) => {
        return { ...obj };
      });
      console.log("bts_list_view recieve success!", receive);
      this.bts_list_view = receive;
    });
    bus.$on("inbldg_mark_changed", (payload) => {
      const receive = payload.map((obj) => {
        return { ...obj };
      });
      console.log("inbldg_list_view recieve success!", receive);
      this.inbldg_list_view = receive;
      console.log(this.inbldg_list_view);
    });
    bus.$on("config_mark_changed", (payload) => {
      const receive = payload.map((obj) => {
        const newObj = {};
        newObj.visuable = obj.visuable;
        if (obj.type === "UTMK") {
          newObj.position = new olleh.maps.UTMK(obj.x, obj.y);
        } else {
          newObj.position = new olleh.maps.LatLng(obj.x, obj.y);
        }

        switch (obj.name) {
          case "TT":
            newObj.name = obj.name;
            newObj.url = "@/assets/map-marker.png";
            newObj.size = this.marker_sizes.step3;
            newObj.anchor = new olleh.maps.Point(4, 66);
            newObj.equip_cd = obj.equip_cd;
            break;
          case "DATA":
            newObj.name = obj.name;
            newObj.url = "@/assets/map-marker.png";
            newObj.size = this.marker_sizes.step3;
            newObj.anchor = new olleh.maps.Point(4, 66);
            newObj.equip_cd = obj.equip_cd;
            break;
          case "VOLTE":
            newObj.name = obj.name;
            newObj.url = "@/assets/map-marker.png";
            newObj.size = this.marker_sizes.step3;
            newObj.anchor = new olleh.maps.Point(4, 66);
            newObj.equip_cd = obj.equip_cd;
            break;
          case "DAY":
            newObj.name = obj.name;
            newObj.url = "@/assets/map-marker.png";
            newObj.size = this.marker_sizes.step3;
            newObj.anchor = new olleh.maps.Point(4, 66);
            newObj.equip_cd = obj.equip_cd;
            break;
          case "NGT":
            newObj.name = obj.name;
            newObj.url = "@/assets/map-marker.png";
            newObj.size = this.marker_sizes.step3;
            newObj.anchor = new olleh.maps.Point(4, 66);
            newObj.equip_cd = obj.equip_cd;
            break;
        }
        console.log("newObj: ", newObj);
        return { ...newObj };
      });
      this.config_bts_view = receive;
      console.log("config_bts_view recieve success!", this.config_bts_view);
    });
    bus.$on("map_sight_change", (payload) => {
      const receive = payload;
      console.log("map_sight_change recieve success!", receive);
      this.move_map = receive;
    });
    bus.$on("chip_configs_changed", (payload) => {
      const receive = payload;
      console.log("chip_configs recieve success!", receive);
      this.chip_configs = receive;
    });
    bus.$on("filter_juso_change", (payload) => {
      const receive = payload;
      console.log("filter_juso_change recieve success!", receive);
      this.tt_toggle = receive;
    });
  },
  mounted() {
    // test, olleh는 vue에서 olleh map을 사용하기 위해 사용, 이 변수들을 사용하진 않지만 Lint설정 때문에 console.log 한번 사용.
    console.log("test: ", test);
    console.log(olleh);
    console.log("KtMap Component Mounted...");
    this.initMap();
    this.initMarkers();
  },
  updated() {
    console.log("KTMAP Data updated...");
  },
  watch: {
    move_map() {
      console.log("watch move_map start...", this.move_map);
      console.log("KtMap.this.config_markers: ", this.config_markers);
      if (this.move_map.type === "UTMK") {
        this.map.setCenter(
          new olleh.maps.UTMK(this.move_map.x, this.move_map.y)
        );
      } else {
        console.log("LatLng: ", this.move_map);
        this.map.setCenter(
          new olleh.maps.LatLng(this.move_map.x, this.move_map.y)
        );
      }
      if (this.move_map.name === "TT") {
        console.log("TT MARKER 변경...");
        console.log(this.config_markers);
        this.updateConfigMarker("TT");
      } else if (this.move_map.name === "DAY") {
        console.log("DAY MARKER 변경...");
        console.log(this.config_markers);
        this.updateConfigMarker("DAY");
      } else if (this.move_map.name === "NGT") {
        console.log("NGT MARKER 변경...");
        console.log(this.config_markers);
        this.updateConfigMarker("NGT");
      } else if (this.move_map.name === "DATA") {
        console.log("DATA MARKER 변경...");
        console.log(this.config_markers);
        this.updateConfigMarker("DATA");
      } else if (this.move_map.name === "VOLTE") {
        console.log("VOLTE MARKER 변경...");
        console.log(this.config_markers);
        this.updateConfigMarker("VOLTE");
      } else if (this.move_map.name === "INBLDG") {
        console.log("INBLDG MARKER 변경...");
        console.log(this.config_markers);
        // this.updateConfigMarker("INBLDG");
      }
      if (this.move_map.equip_cd) {
        const bounce_markers = this.markers.filter((obj) =>
          obj._title.includes(this.move_map.equip_cd)
        );
        bounce_markers.forEach((obj) => {
          obj.setAnimation(olleh.maps.overlay.Marker.BOUNCE);
          setTimeout(() => obj.setAnimation(null), 3000);
        });
      }
    },
    bts_list_view(newVal, oldVal) {
      console.log("KtMap.bts_list_view watch start...");
      console.log("KtMap.bts_list_view New Data: ", newVal);
      console.log("KtMap.bts_list_view Old Data: ", oldVal);
      if (oldVal.length === 0) {
        this.initMarkers();
      } else {
        console.log("newVal.length: ", newVal.length);
        console.log("oldVal.length: ", oldVal.length);
        if (newVal.length > oldVal.length) {
          console.log("Marker Add Start...", newVal);
          let difference = newVal.filter(
            (x) => !oldVal.map((obj) => obj.equip_cd).includes(x.equip_cd)
          );
          console.log("newVal: ", newVal);
          console.log("oldVal: ", oldVal);
          console.log("difference: ", difference);
          difference.forEach((obj) => {
            this.addUsedMarkers(obj);
          });
        } else if (newVal.length < oldVal.length) {
          console.log("Marker Delete Start...", newVal);
          let difference = oldVal.filter(
            (x) => !newVal.map((obj) => obj.equip_cd).includes(x.equip_cd)
          );
          console.log("newVal: ", newVal);
          console.log("oldVal: ", oldVal);
          console.log("difference: ", difference);
          difference.forEach((obj) => {
            this.deleteUsedMarkers(obj);
          });
        } else {
          console.log("pass...");
        }
      }
    },
    inbldg_list_view(newVal, oldVal) {
      console.log("KtMap.inbldg_list_view watch start...");
      console.log("KtMap.inbldg_list_view New Data: ", newVal);
      console.log("KtMap.inbldg_list_view Old Data: ", oldVal);
      if (oldVal.length === 0) {
        this.initMarkersInbldg();
      } else {
        console.log("newVal.length: ", newVal.length);
        console.log("oldVal.length: ", oldVal.length);
        if (newVal.length > oldVal.length) {
          console.log("Marker Add Start...", newVal);
          let difference = newVal.filter(
            (x) => !oldVal.map((obj) => obj.bld_id).includes(x.bld_id)
          );
          console.log("newVal: ", newVal);
          console.log("oldVal: ", oldVal);
          console.log("difference: ", difference);
          difference.forEach((obj) => {
            this.addUsedMarkersInbldg(obj);
          });
        } else if (newVal.length < oldVal.length) {
          console.log("Marker Delete Start...", newVal);
          let difference = oldVal.filter(
            (x) => !newVal.map((obj) => obj.bld_id).includes(x.bld_id)
          );
          console.log("newVal: ", newVal);
          console.log("oldVal: ", oldVal);
          console.log("difference: ", difference);
          difference.forEach((obj) => {
            this.deleteUsedMarkersInbldg(obj);
          });
        } else {
          console.log("pass...");
        }
      }
    },
    config_bts_view() {
      console.log("config_bts_view watch start...");
      this.initConfigMarkers();
    },
    tt_toggle() {
      console.log("watch filter_juso_change start...", this.tt_toggle);
      if (
        !parseFloat(this.tt_toggle.corrd[0]) ||
        !parseFloat(this.tt_toggle.corrd[1])
      ) {
        console.log("대표기지국 좌표 오류...");
      } else {
        console.log("대표기지국 좌표 정상...");
        let position = null;
        if (this.tt_toggle.type === "UTMK") {
          let utmkX = parseFloat(this.tt_toggle.corrd[0]);
          let utmkY = parseFloat(this.tt_toggle.corrd[1]);
          position = new olleh.maps.UTMK(utmkX, utmkY);
        } else {
          let lntlngX = parseFloat(this.tt_toggle.corrd[0]);
          let lntlngY = parseFloat(this.tt_toggle.corrd[1]);
          position = new olleh.maps.LatLng(lntlngX, lntlngY);
        }
        const btsList = this.tt_toggle.markers.map((obj) => {
          const position = new olleh.maps.LatLng(obj.latit_val, obj.lngit_val);
          obj.position = position;
          obj.near_filter = true;
          return { ...obj };
        });
        console.log("btsList: ", btsList);
        const filteredBts = this.isNear(position, btsList);
        console.log("this.isNear: ", filteredBts);
        bus.$emit("filtered_bts_list", filteredBts);
      }
    },
  },
};
</script>
<style>
@import "@/map/ktmap.css";
#kmap {
  /* margin-left: 8px; */
  border-color: cornflowerblue;
  border-radius: 1%;
  width: 100%;
  height: 690px;
}
#center {
  margin-left: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
