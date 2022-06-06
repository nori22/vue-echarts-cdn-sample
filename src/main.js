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
      // if (resData.message !== '正常終了') throw new Error(resData.message)
      
      this.echartsOption = this.transBitResToEchartsSimpleOption(resData)

    } catch (err) {
      // ignore-eslint
      console.log('Error at tide736 , error message: ', err.message)
      if (err instanceof Error) return { isAvailable: false }
      throw err
    }

    this.echartsOption && myChart.setOption(this.echartsOption)
  },
  methods: {
    transBitResToEchartsSimpleOption: function(resData){
      let output = {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }
    
      output.xAxis.data = resData.map(eachDate => eachDate.Date)
      output.series[0].data = resData.map(eachDate => eachDate.Price)

      console.log(output)
    
      return output
    }
  }
})