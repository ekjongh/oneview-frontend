<template>
  <div v-if="value == 0" class="quiver">
    <div
      class="plume"
      style="
        /* background-color: lightgray;  top: 5px */
        background-color: lightgray;
        top: 5px;
      "
    >
      {{ text }}
    </div>
  </div>
  <div v-else-if="value > 0" class="quiver">
    <div
      class="arrowhead"
      style="top: 0px; border-top: 0; border-bottom: 10px solid red"
    ></div>
    <div class="arrowshaft" style="background-color: red; top: 10px">
      {{ text }}
    </div>
  </div>
  <div v-else-if="value < 0" class="quiver">
    <div class="arrowshaft" style="background-color: blue; top: 0px">
      {{ text }}
    </div>
    <div
      class="arrowhead"
      style="top: 25px; border-top: 10px solid blue; border-bottom: 0"
    ></div>
  </div>

  <div v-else></div>
  <!-- <v-badge
    class="ml-1 mb-5"
    :content="text"
    :value="text"
    color="red"
    overlap
    bottom
    tile
  >
    <v-icon class="mr-n4" color="red" x-large> mdi-arrow-up-bold</v-icon>
  </v-badge> -->
</template>

<script>
export default {
  name: "UpDownArrow",
  props: {
    value: Number,
    text: String,
    w: {
      type: [String, Number],
      default: "75px",
    },
  },
};
</script>

<style scoped>
.quiver {
  position: relative;
  width: 75px;
  height: 25px;
  margin-bottom: 10px;
}
.plume {
  position: absolute;
  left: calc((75px- (75px - 10px)) / 2);
  left: 5px;
  width: calc(75px - 10px);
  height: 100%;
  color: lightgrey;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: inset 0px 0px 5px 5px lightgrey; */
  /* box-shadow: 0px 0px 5px 5px lightgray; */
}
.arrowshaft {
  position: absolute;
  left: calc((75px- (75px - 10px)) / 2);
  left: 5px;
  width: calc(75px - 10px);
  height: 100%;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrowhead {
  position: absolute;
  left: 0px;
  width: 0px;
  height: 0px;
  border: calc(75px / 2) solid transparent;
}

.ani-fadein {
  animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
