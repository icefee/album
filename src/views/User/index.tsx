import { h, defineComponent, DefineComponent } from 'vue'
// @ts-ignore
import VueApexCharts, { VueApexChartsComponent } from 'vue3-apexcharts'
import { ApexOptions } from 'apexcharts'

declare const VueApexCharts: DefineComponent<VueApexChartsComponent>;

const data: [number, number][] = Array.from({ length: 20 }).map((d, i) => [
  i,
  Math.random() * 3 + 10,
]);

export default defineComponent({
  setup() {
    return {
      series: [
        {
          name: "温度",
          data,
        },
      ],
      options: {
        chart: {
          type: "area",
          stacked: false,
          height: 500,
          zoom: {
            type: "x",
            enabled: true,
            // autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: "历史温度曲线",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: function (val: number) {
              return val.toFixed(0);
            },
          },
          title: {
            text: "Price",
          },
        },
        stroke: {
          width: 2,
          curve: "smooth",
        },
        xaxis: {
          type: "value",
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val: number) {
              return val.toFixed(0);
            },
          },
        },
      },
    };
  },
  render() {
    return (
      <div>
        <VueApexCharts width={800} type="line" options={this.options as ApexOptions} series={this.series} />
      </div>
    )
  }
})
