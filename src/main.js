new Vue({
  el: '#app',
  data: {
    echartsOption: {},
    selectedPort: "伊東",
    portList: [
      {
        prefecturesCode: "22",
        portCode: "2",
        prefecturesName: "静岡県",
        portName: "伊東",
      },
      {
        prefecturesCode: "17",
        portCode: "4",
        prefecturesName: "石川県",
        portName: "輪島",
      },
      {
        prefecturesCode: "47",
        portCode: "5",
        prefecturesName: "沖縄県",
        portName: "那覇",
      }
    ]
  },
  created: async function () {
    const params = {
      pc: this.portList.find(port => port.portName == this.selectedPort).prefecturesCode,
      hc: this.portList.find(port => port.portName == this.selectedPort).portCode,
      yr: 2022,
      mn: 5,
      dy: 29,
      rg: 'day',
    }

    const query = new URLSearchParams(params)
    try {
      // TODO:original backend化 or 他のサンプルAPIに目星をつける Echartsまでできそうな
      // tide736がCORSでnullとかlocalhostをはじいている、、ので本Repositoryのファイルシステムからのブラウザではfetchできず
      const response = await fetch(`https://api.tide736.net/get_tide.php?${query}`)
      const resData = await response.json()
      if (resData.message !== '正常終了') throw new Error(resData.message)
      console.log(resData)
    } catch (err) {
      // ignore-eslint
      console.log('Error at tide736 , error message: ', err.message)
      if (err instanceof Error) return { isAvailable: false }
      throw err
    }
  }
})