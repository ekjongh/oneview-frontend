<template>
  <div class="spinner-container d-flex justify-space-around align-center pt-2">
    <!-- {{ allowsSlot }} -->
    <slot v-if="allowsSlot" name="html" />
    <div v-else>
      <div
        class="spinner"
        :style="{
          width: spinnerDiameterbyPixel + 'px',
          height: spinnerDiameterbyPixel + 'px',
        }"
      ></div>
      <!-- <v-container class="text-caption mt-n10">{{ text }}</v-container> -->
      <div
        class="text-caption"
        :style="{
          height: spinnerDiameterbyPixel + 'px',
          marginTop: '-' + spinnerDiameterbyPixel / 1.5 + 'px',
          // zIndex: 100,
        }"
      >
        {{ text }}
        <!-- {{ spinnerDiameterbyPixel }} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    spinnerDiameterbyPixel: {
      type: Number,
      default: 50,
    },
    allowsSlot: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "loading...",
    },
  },
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}
.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* border: 5px solid #e0e0e0; */
  border: 5px solid whitesmoke;
  /* border: 5px solid lightgray; */
  /* border: 5px solid snow; */
  /* border-bottom: 5px solid #fe9616; */
  /* border-bottom: 5px solid lightgray; */
  /* border-bottom: 5px solid whitesmoke; */
  /* border-bottom: 5px solid snow; */
  border-bottom: 5px solid rgb(151, 250, 121);
  animation: spin 1s linear infinite;
  position: relative;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
