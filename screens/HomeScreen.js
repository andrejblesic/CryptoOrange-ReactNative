import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { WebView, Dimensions, TouchableWithoutFeedback, TouchableOpacity  } from 'react-native';
import { Button, ThemeProvider, Header } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import * as testiranje from './test.js';

const websocketUrl = 'ws://192.168.0.180:8000/charts';

const areaChartHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 mimum-scale=1">
<style>body {margin: 0}</style>
<body>
  <div id="areachartdiv"></div>
</body>
<script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>
`;

const candleChartHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 mimum-scale=1">
<style>body {margin: 0}</style>
<body>
  <div id="candlechartdiv"></div>
</body>
<script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>
`;

export default function HomeScreen() {

  const [scrollEnabled, setScroll] = useState(true);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const areaChartJS = testiranje.areaChart(width);
  const candleChartJS = testiranje.candleChart(width);

  const disableScroll = () => {
    alert('lol')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          BTC/USD
          <Text style={{ color: 'red' }}>10.00000000000</Text>
        </Text>
      </View>
      <View
        onPressIn={disableScroll}
        style={{
          backgroundColor: '#282c34',
          flex: 2,
          width: '50%',
          minWidth: '100%',
          alignSelf: 'stretch',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: 'black',
          borderBottomColor: 'black',
          marginBottom: 10
        }}
      >
        <WebView
          originWhitelist={['*']}
          useWebKit={true}
          source={{ html: areaChartHtml }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={styles.WebViewStyle}
          injectedJavaScript={areaChartJS}
        />
      </View>
      <View
        style={{
          backgroundColor: '#282c34',
          flex: 2,
          width: '50%',
          minWidth: '100%',
          alignSelf: 'stretch',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: 'black',
          borderBottomColor: 'black',
          marginBottom: 10
        }}
      >
        <WebView
          originWhitelist={['*']}
          useWebKit={true}
          source={{ html: candleChartHtml }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={styles.WebViewStyle}
          injectedJavaScript={candleChartJS}
        />
      </View>
      <View style={styles.contentBox}>
        <Text>test1</Text>
        <Text>test1</Text>
        <Text>test1</Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test2</Text>
        <Text>test2</Text>
        <Text>test2</Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test1</Text>
        <Text>test1</Text>
        <Text>test1</Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test2</Text>
        <Text>test2</Text>
        <Text>test2</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.title}>
          The title and onPress handler are required. It is recommended to set
          accessibilityLabel to help make your app usable by everyone.
        </Text>
        <Button
          title="Press me"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
      <View style={{ backgroundColor: 'yellow', flex: 1 }}>
        <Text>test4</Text>
        <Text>test4</Text>
        <Text>test4</Text>
      </View>
      <View style={{ backgroundColor: 'purple', flex: 1 }}>
        <Text>test5</Text>
        <Text>test5</Text>
        <Text>test5</Text>
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#282c34'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white'
  }
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
    flex: 2,
    backgroundColor: '#3f444d',
    height: 300
  },
  container: {
    flex: 1,
    backgroundColor: '#343942',
    marginTop: 0
  },
  contentBox: {
    backgroundColor: '#282c34',
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderBottomColor: 'black',
    marginBottom: 10
  }
});

// <WebView
//   source={{html: html}}
//   domStorageEnabled={true}
//   javaScriptEnabled={true}
//   style={styles.WebViewStyle}
//   injectedJavaScript={injectJS}
// />
