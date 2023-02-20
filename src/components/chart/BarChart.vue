<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    title: {
      type: String,
      default: "line-chart",
    },
    labels: {
      type: Array,
      default: () => [],
    },
    datasets: [],
    scales: {},
    yAxes: {
      type: Array,
      default: () => [],
    },
    legendPosition: {
      type: String,
      default: "chartArea",
    },
    usesPointStyle4LegendItem: {
      type: Boolean,
      default: true,
    },
    boxWidth4LegendItem: {
      type: Number,
      default: null,
    },
    boxHeight4LegendItem: {
      type: Number,
      default: null,
    },

    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },

    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 170,
    },

    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    chartData: function () {
      return {
        labels: this.labels,
        datasets: this.datasets,
      };
    },
    chartOptions: function () {
      return {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            // align: "center",
            // display: true,
            // fullWidth: true,
            labels: {
              usePointStyle: this.usesPointStyle4LegendItem,
              // boxWidth: 20,
              // boxHeight: 20,
              boxWidth: 12,
              boxHeight: 12,
              // boxWidth:
              //   this.boxWidth4LegendItem == null
              //     ? 40
              //     : this.boxWidth4LegendItem,
              // boxHeight:
              //   this.boxHeight4LegendItem == null
              //     ? 20
              //     : this.boxHeight4LegendItem,
              // // generateLabels: ƒ(chart),
              // padding: 10,
              // fontSize: 12,
              // fontColor: "rgba(0, 0, 0, 0.6)",
              // pointStyleWidth: 10,
            },
            display: true,

            position: this.legendPosition,
            // position: "top",
            // position: "bottom",

            // position: "chartArea",
            // align: "end",
          },
          title: {
            display: true,
            text: this.title,
          },
        },
        animation: {
          duration: 200,
        },
        // animation: false,
        scales: this.scales,
      };
    },
  },
};
</script>
