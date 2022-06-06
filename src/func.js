const transBitResToEchartsSimpleOption = function(resData){
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

  return output
}