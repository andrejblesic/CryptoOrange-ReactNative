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
import * as testiranje from './test.js';

const websocketUrl = 'ws://192.168.0.180:8000/charts';

const html = '<div><div id="chartdiv"></div><script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>'

export default function HomeScreen() {

  const width = Dimensions.get('window').width - 16;
  const height = Dimensions.get('window').height;

  const injectJS = testiranje.lol(width);

  return (
    <ScrollView style={styles.container}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'brown', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'lightblue', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'darkblue', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'purple', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'grey', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'lightgrey', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'pink', flex: 2, width: '50%', minWidth: '100%', alignSelf: 'stretch'}}>
        <WebView
          source={{html: html}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={styles.WebViewStyle}
          injectedJavaScript={injectJS}
        />
      </View>
      <View style={{backgroundColor: 'red', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'green', flex: 1}}>
        <Text>test4</Text>
        <Text>test5</Text>
        <Text>test6</Text>
      </View>
      <View style={{backgroundColor: 'blue', flex: 1}}>
        <Text>test7</Text>
        <Text>test8</Text>
        <Text>test9</Text>
      </View>
      <View style={{backgroundColor: 'yellow', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'aqua', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'orange', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
      <View style={{backgroundColor: 'darkgreen', flex: 1}}>
        <Text>test1</Text>
        <Text>test2</Text>
        <Text>test3</Text>
      </View>
    </ScrollView>
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
    flex: 2,
    backgroundColor: 'orange',
    height: 340,
    maxHeight: 340
  },
  container: {
    flex: 1,
    backgroundColor: 'grey',
    marginTop: 30
  },
});

// <WebView
//   source={{html: html}}
//   domStorageEnabled={true}
//   javaScriptEnabled={true}
//   style={styles.WebViewStyle}
//   injectedJavaScript={injectJS}
// />
