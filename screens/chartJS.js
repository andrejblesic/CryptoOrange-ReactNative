export function areaChart(width, timeScale) {
  return `
  const websocketUrl = 'ws://192.168.0.11:8000/charts';
  const areaWs = new WebSocket(websocketUrl);
  const chart = LightweightCharts.createChart(document.getElementById('areachartdiv'), { width: ${width}, height: 300 });
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
      secondsVisible: true,
    },
      layout: {
        backgroundColor: '#282c34',
        textColor: '#696969',
        fontSize: 12,
        fontFamily: 'Calibri',
      },
    });
    areaWs.onmessage = event => {const chartData = JSON.parse(event.data);
      if (chartData.chart) {
        for (const item in chartData.chart) {
          chartData.chart[item].time = Math.floor(chartData.chart[item].time / 1000);
        }
        areaSeries.setData(chartData.chart);
      } else if (!chartData.chart) {
        chartData.time = Math.floor(chartData.time / 1000);
        areaSeries.update(chartData);
      }
    };
  `;
}

export function candleChart(width, timeScale) {
  return `
  let candlestickUrl = '';
  switch ('${timeScale}') {
    case '1m':
      candlestickUrl = 'ws://192.168.0.11:8000/candela';
      break;
    case '5m':
      candlestickUrl = 'ws://192.168.0.11:8000/candela/5-minutes';
      break;
    case '15m':
      candlestickUrl = 'ws://192.168.0.11:8000/candela/15-minutes';
      break;
    case '1h':
      candlestickUrl = 'ws://192.168.0.11:8000/candela/1-hour';
      break;
    case '3h':
      candlestickUrl = 'ws://192.168.0.11:8000/candela/3-hour';
      break;
    case '1D':
      candlestickUrl = 'ws://192.168.0.11:8000/candela/1-day';
      break;
    case '1W':
      candlestickUrl = 'ws://192.168.0.11:8000/candela/1-week';
      break;
  }
  // const candlestickUrl = 'ws://192.168.0.11:8000/candela/1-hour';
  const candleWs = new WebSocket(candlestickUrl);
  const chart = LightweightCharts.createChart(document.getElementById('candlechartdiv'), { width: ${width}, height: 300 });
  const candlestickSeries = chart.addCandlestickSeries();
  chart.applyOptions({
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: '#fff000',
      visible: true,
      timeVisible: true,
      secondsVisible: true,
    },
    layout: {
      backgroundColor: '#282c34',
      textColor: '#696969',
      fontSize: 12,
      fontFamily: 'Calibri',
    }
  });
    candleWs.onmessage = event => {
      const chartData = JSON.parse(event.data).candela;
      if (chartData.length > 1) {
        for (const item of chartData) {
          item.time = parseInt(parseInt(item.time) / 1000);
        }
        candlestickSeries.setData(chartData)
      } else if (!chartData.length) {
        chartData.time = parseInt(parseInt(chartData.time) / 1000);
        candlestickSeries.update(chartData);
      }
    };
  `;
}
