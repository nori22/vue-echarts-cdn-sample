new Vue({
  el: '#app',
  data: {
    bitcoinHistorical: [],
    echartsOption: {},

  },
  mounted: async function () {
    let myChart = echarts.init(document.getElementById("bitFig"))

    try {
      const response = await fetch('https://api.sampleapis.com/bitcoin/historical_prices')
      const resData = await response.json()
      if (!resData) throw new Error(resData.message)
      this.echartsOption = this.transBitResToEchartsSimpleOption(resData)

    } catch (err) {
      if (err instanceof Error) return { isAvailable: false }
      throw err
    }

    this.echartsOption && myChart.setOption(this.echartsOption)
  },
  methods: {
    transBitResToEchartsSimpleOption: function(resData){
      return {
        xAxis: {
          type: 'category',
          data: resData.map(eachDate => eachDate.Date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: resData.map(eachDate => eachDate.Price),
            type: 'line'
          }
        ]
      }
    }
  }
})