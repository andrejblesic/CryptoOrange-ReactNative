// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   header: { height: 50, backgroundColor: '#537791' },
//   text: { textAlign: 'center', fontWeight: '100' },
//   dataWrapper: { marginTop: -1 },
//   row: { height: 40, backgroundColor: '#E7E6E1' }
// });

// const websocketUrl = 'ws://192.168.0.180:8000/charts';
// const ws = new WebSocket(websocketUrl);
// const chart = LightweightCharts.createChart(document.getElementById('chartdiv'), {
//   width: 400,
//   height: 300
// });
// const areaSeries = chart.addAreaSeries();
// chart.applyOptions({
//   timeScale: {
//     rightOffset: 12,
//     barSpacing: 3,
//     fixLeftEdge: false,
//     lockVisibleTimeRangeOnResize: true,
//     rightBarStaysOnScroll: true,
//     borderVisible: false,
//     borderColor: '#fff000',
//     visible: true,
//     timeVisible: true,
//     secondsVisible: true,
//   },
//   layout: {
//     backgroundColor: '#282c34',
//     textColor: '#696969',
//     fontSize: 12,
//     fontFamily: 'Calibri',
//   },
// });
// ws.onmessage = event => {
//   const chartData = JSON.parse(event.data);
//   if (chartData.chart) {
//     for (const item in chartData.chart) {
//       chartData.chart[item].time = Math.floor(chartData.chart[item].time / 1000)
//     }
//     areaSeries.setData(chartData.chart);
//   } else if (!chartData.chart) {
//     chartData.time = Math.floor(chartData.time / 1000);
//     areaSeries.update(chartData);
//   }
// };

// export function lol(width) {
//   return `const websocketUrl = 'ws://192.168.0.180:8000/charts';const ws = new WebSocket(websocketUrl);const chart = LightweightCharts.createChart(document.getElementById('chartdiv'), { width: ${width}, height: 300 });const areaSeries = chart.addAreaSeries();chart.applyOptions({timeScale: {rightOffset: 12,barSpacing: 3,fixLeftEdge: false,lockVisibleTimeRangeOnResize: true,rightBarStaysOnScroll: true,borderVisible: false,borderColor: '#fff000',visible: true,timeVisible: true,secondsVisible: true,},layout: {backgroundColor: '#282c34',textColor: '#696969',fontSize: 12,fontFamily: 'Calibri',},});ws.onmessage = event => {const chartData = JSON.parse(event.data);if (chartData.chart) {for (const item in chartData.chart) {chartData.chart[item].time = Math.floor(chartData.chart[item].time / 1000)}areaSeries.setData(chartData.chart);} else if (!chartData.chart) {chartData.time = Math.floor(chartData.time / 1000);areaSeries.update(chartData);}};`;
// }
export function areaChart(width) {
  return `
  const websocketUrl = 'ws://192.168.0.180:8000/charts';
  const ws = new WebSocket(websocketUrl);
  const chart = LightweightCharts.createChart(document.getElementById('chartdiv'), { width: ${width}, height: 300 });
  const areaSeries = chart.addAreaSeries();
  chart.applyOptions({
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: '#fff000',
      visible: true,timeVisible: true,
      secondsVisible: true,},
      layout: {
        backgroundColor: '#282c34',
        textColor: '#696969',
        fontSize: 12,
        fontFamily: 'Calibri',
      },
    });
    ws.onmessage = event => {const chartData = JSON.parse(event.data);
    if (chartData.chart) {
      for (const item in chartData.chart) {
        chartData.chart[item].time = Math.floor(chartData.chart[item].time / 1000);
      }
      areaSeries.setData(chartData.chart);
    } else if (!chartData.chart) {
      chartData.time = Math.floor(chartData.time / 1000);
      areaSeries.update(chartData);}
    };
  `;
}
