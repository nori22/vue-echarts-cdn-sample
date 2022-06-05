new Vue({
  el: '#app',
  data: {
    echartsOption: {},
    bitcoinHistorical: []
  },
  created: async function () {
    try {
      const response = await fetch('https://api.sampleapis.com/bitcoin/historical_prices')
      const resData = await response.json()
      // if (resData.message !== '正常終了') throw new Error(resData.message)
      console.log(resData)
    } catch (err) {
      // ignore-eslint
      console.log('Error at tide736 , error message: ', err.message)
      if (err instanceof Error) return { isAvailable: false }
      throw err
    }
  }
})