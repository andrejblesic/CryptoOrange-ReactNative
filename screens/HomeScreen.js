import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView, Dimensions } from 'react-native';
import { MonoText } from '../components/StyledText';

const websocketUrl = 'ws://192.168.0.180:8000/charts';

// const chartHtml = require('../assets/chart.html');
// console.log(chartHtml);
console.log('benez');

const html = '<div><div id="chartdiv"></div><script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>'

export default function HomeScreen() {

  const width = Dimensions.get('window').width - 16;
  const height = Dimensions.get('window').height;

  const injectJS = `const websocketUrl = 'ws://192.168.0.180:8000/charts';const ws = new WebSocket(websocketUrl);const chart = LightweightCharts.createChart(document.getElementById('chartdiv'), { width: ${width}, height: 300 });const areaSeries = chart.addAreaSeries();chart.applyOptions({timeScale: {rightOffset: 12,barSpacing: 3,fixLeftEdge: false,lockVisibleTimeRangeOnResize: true,rightBarStaysOnScroll: true,borderVisible: false,borderColor: '#fff000',visible: true,timeVisible: true,secondsVisible: true,},layout: {backgroundColor: '#282c34',textColor: '#696969',fontSize: 12,fontFamily: 'Calibri',},});ws.onmessage = event => {const chartData = JSON.parse(event.data);if (chartData.chart) {for (const item in chartData.chart) {chartData.chart[item].time = Math.floor(chartData.chart[item].time / 1000)}areaSeries.setData(chartData.chart);} else if (!chartData.chart) {chartData.time = Math.floor(chartData.time / 1000);areaSeries.update(chartData);}};`

  return (
    <View style={styles.container}>
      <WebView
        source={{html: html}}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        style={styles.WebViewStyle}
        injectedJavaScript={injectJS}
      />
      <Text style={{marginTop: -50}}>BENEZ</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  WebViewStyle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    height: 0
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
