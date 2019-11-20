import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Easing,
  Animated
} from 'react-native';
import { WebView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import * as chartJS from './chartJS.js';
import {
  Ionicons,
  AntDesign,
  Zocial,
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome
} from '@expo/vector-icons';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;
const coinbaseWS = 'wss://ws-feed.pro.coinbase.com';
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

function AreaChart(timeScale) {
  const width = Dimensions.get('window').width;
  const [areaChartJS, setAreaChartJS] = useState(
    chartJS.areaChart(width, timeScale.timeScale)
  );
  const [currTimeScale, setCurrTimeScale] = useState('1h');

  // console.log(Constants.statusBarHeight);

  useEffect(() => {
    setAreaChartJS(chartJS.areaChart(width, timeScale.timeScale));
    if (currTimeScale !== timeScale.timeScale) {
      AreaWebViewRef.reload();
      setCurrTimeScale(timeScale.timeScale);
    }
  }, [timeScale]);

  return (
    <View style={{ flex: 1, height: 300, zIndex: -1 }}>
      <WebView
        ref={AreaWVRef => (AreaWebViewRef = AreaWVRef)}
        originWhitelist={['*']}
        useWebKit={true}
        source={{ html: areaChartHtml }}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        style={styles.WebViewStyle}
        injectedJavaScript={areaChartJS}
      />
    </View>
  );
}

function CandleChart(timeScale) {
  const width = Dimensions.get('window').width;
  const [candleChartJS, setCandleChartJS] = useState(
    chartJS.candleChart(width, timeScale.timeScale)
  );
  const [currTimeScale, setCurrTimeScale] = useState('1h');
  const [isReloadWebView, setReloadWebView] = useState(false);

  useEffect(() => {
    setCandleChartJS(chartJS.candleChart(width, timeScale.timeScale));
    if (currTimeScale !== timeScale.timeScale) {
      // CandleWebViewRef.reload();
      setReloadWebView(!isReloadWebView);
      setCurrTimeScale(timeScale.timeScale);
    }
  }, [timeScale]);

  return (
    <View style={{ flex: 1, height: 300, zIndex: -1 }}>
      <WebView
        ref={CandleWVref => (CandleWebViewRef = CandleWVref)}
        key={isReloadWebView}
        originWhitelist={['*']}
        useWebKit={true}
        source={{ html: candleChartHtml }}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        style={styles.WebViewStyle}
        injectedJavaScript={candleChartJS}
      />
    </View>
  );
}

function Header({ navigation, toggleUserDrawer, userDrawerOpen }) {
  return (
    <View
      style={{
        backgroundColor: '#1e222a',
        flex: 1,
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        boxShadow: '10px 10px 10px rgba(0,0,0,1)'
      }}
    >
      <Ionicons
        name="md-menu"
        color="#ED7F2C"
        size={32}
        style={styles.menuIcon}
        onPress={() => navigation.toggleDrawer()}
      />
      <Image
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          zIndex: 8,
          top: 8
        }}
        source={require('./CO.png')}
      />
      <TouchableOpacity
        onPress={() => toggleUserDrawer()}
        style={{ position: 'absolute', zIndex: 99999, top: 13, right: 8 }}
      >
        <Feather color="#ED7F2C" size={32} name="user" />
      </TouchableOpacity>
    </View>
  );
}

function UserDrawer({ userDrawerOpen, toggleUserDrawer }) {
  const [xPosition] = useState(new Animated.Value(-300));
  const [drawerOut, setDrawerOut] = useState(false);

  const statusBarHeight = Constants.statusBarHeight;
  const height = Dimensions.get('window').height + statusBarHeight;
  const width = Dimensions.get('window').width;

  useEffect(() => {
    toggleDrawer();
  }, [userDrawerOpen]);

  const toggleDrawer = () => {
    if (userDrawerOpen) {
      Animated.timing(xPosition, {
        toValue: 0,
        duration: 200
      }).start();
    } else {
      Animated.timing(xPosition, {
        toValue: -300,
        duration: 200
      }).start();
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        zIndex: 99999,
        height: height,
        width: 300,
        backgroundColor: '#282c34',
        position: 'absolute',
        right: xPosition
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          height: '100%',
          zIndex: 9999,
          height: '100%',
          marginTop: statusBarHeight
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={toggleUserDrawer}>
            <Ionicons
              style={{ marginRight: 15, marginTop: 11, marginBottom: 5 }}
              size={32}
              name="md-close"
              color="#ED7F2C"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
            width: '100%',
            marginTop: 10
          }}
        ></View>
        <View
          style={{
            flex: 1,
            backgroundColor: '',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              marginTop: 19,
              borderWidth: 1,
              borderColor: '#ED7F2C',
              borderStyle: 'dashed',
              borderRadius: 8
            }}
          >
            <Entypo name="user" size={220} />
          </View>
          <Text style={{ color: '#ED7F2C', fontSize: 20, margin: 15 }}>
            Maximilian Schwarzmüller
          </Text>
          <View
            style={{ height: 1, backgroundColor: 'black', width: '100%' }}
          ></View>
          <View style={{ marginTop: 12 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
            >
              <MaterialCommunityIcons
                name="bitcoin"
                size={18}
                color="#ED7F2C"
              />
              <Text
                style={{ textAlign: 'left', fontSize: 16, color: '#ED7F2C' }}
              >
                {' '}
                BTC: 3.55643467
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
            >
              <MaterialCommunityIcons
                name="ethereum"
                size={18}
                color="#ED7F2C"
              />
              <Text
                style={{ textAlign: 'left', fontSize: 16, color: '#ED7F2C' }}
              >
                {' '}
                ETH: 14.89481646
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
            >
              <MaterialCommunityIcons
                name="litecoin"
                size={18}
                color="#ED7F2C"
              />
              <Text
                style={{ textAlign: 'left', fontSize: 16, color: '#ED7F2C' }}
              >
                {' '}
                LTC: 29.01663115
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen({ navigation }) {
  const [selectedChart, setChart] = useState('candle');
  const [currencyPair, setPair] = useState('BTC-USD');
  const [socketOpened, setSocketOpened] = useState(false);
  const [currPrice, setPrice] = useState(0);
  const [priceDrop, setDrop] = useState(null);
  const [timeScale, setTimeScale] = useState('1h');
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  let currentPrice = 0;

  const toggleUserDrawer = () => {
    if (userDrawerOpen) {
      setUserDrawerOpen(false);
    } else {
      setUserDrawerOpen(true);
    }
  };

  useEffect(() => {
    if (!socketOpened) {
      opensocket(coinbaseWS);
    }
  }, [socketOpened, currPrice]);

  const opensocket = coinbaseWS => {
    const ws = new WebSocket(coinbaseWS);
    ws.onopen = () => {
      setSocketOpened(true);
      ws.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: [currencyPair],
          channels: ['ticker']
        })
      );
    };
    ws.onmessage = message => {
      if (JSON.parse(message.data).type === 'ticker') {
        const newPrice = parseFloat(JSON.parse(message.data).price);
        if (currentPrice > newPrice) {
          setDrop(true);
        } else if (currentPrice < newPrice) {
          setDrop(false);
        } else {
          setDrop(null);
        }
        currentPrice = newPrice.toFixed(2);
        setPrice(newPrice.toFixed(2));
      }
    };
  };

  const changeChart = () => {
    if (selectedChart === 'candle') {
      setChart('area');
    } else {
      setChart('candle');
    }
  };

  const changeTimeScale = timeScale => {
    setTimeScale(timeScale);
  };

  return (
    <>
      <ScrollView
        pointerEvents={'box-none'}
        scrollEnabled={!userDrawerOpen}
        style={styles.container}
        stickyHeaderIndices={[0]}
      >
        {userDrawerOpen ? (
          <TouchableOpacity
            onPress={toggleUserDrawer}
            activeOpacity={1}
            style={{
              backgroundColor: 'rgba(0,0,0, 0.5)',
              height: '100%',
              width: '100%',
              position: 'absolute'
            }}
          ></TouchableOpacity>
        ) : null}
        <Header
          userDrawerOpen={userDrawerOpen}
          toggleUserDrawer={toggleUserDrawer}
          navigation={navigation}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            margin: 10,
            marginTop: 3,
            marginLeft: 15,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Zocial
            style={{ flex: 1 }}
            name="bitcoin"
            size={48}
            color="#ED7F2C"
          />
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                marginRight: 5,
                marginBottom: -10
              }}
            >
              BTC-USD
            </Text>
            <Text
              style={{
                color: priceDrop === true ? 'red' : 'green',
                fontSize: 32
              }}
            >
              {currPrice}
            </Text>
            <Entypo
              name={priceDrop === true ? 'triangle-down' : 'triangle-up'}
              size={24}
              color={priceDrop === true ? 'red' : 'green'}
            />
          </View>
        </TouchableOpacity>
        {selectedChart === 'area' ? (
          <AreaChart timeScale={timeScale} />
        ) : (
          <CandleChart timeScale={timeScale} />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            marginBottom: 5
          }}
        >
          {selectedChart === 'candle' ? (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity
                style={
                  timeScale === '1m'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('1m')}
              >
                <Text style={styles.timeScaleText}>1m</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  timeScale === '5m'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('5m')}
              >
                <Text style={styles.timeScaleText}>5m</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  timeScale === '15m'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('15m')}
              >
                <Text style={styles.timeScaleText}>15m</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  timeScale === '1h'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('1h')}
              >
                <Text style={styles.timeScaleText}>1h</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  timeScale === '3h'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('3h')}
              >
                <Text style={styles.timeScaleText}>3h</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  timeScale === '1D'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('1D')}
              >
                <Text style={styles.timeScaleText}>1D</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  timeScale === '1W'
                    ? styles.selectedTimeScaleButton
                    : styles.timeScaleButton
                }
                onPress={() => changeTimeScale('1W')}
              >
                <Text style={styles.timeScaleText}>1W</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            onPress={changeChart}
            style={{
              width: 'auto',
              borderColor: '#ED7F2C',
              borderWidth: 1,
              borderRadius: 2,
              marginLeft: 5,
              marginRight: 2
            }}
          >
            <AntDesign
              name={selectedChart === 'area' ? 'barschart' : 'linechart'}
              size={32}
              color="#ED7F2C"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            margin: 0,
            height: 1,
            width: '100%',
            backgroundColor: 'rgb(45, 45, 45)'
          }}
        ></View>
        <View style={styles.contentBox}>
          <Text>test1</Text>
          <Text>test1</Text>
          <Text>test1</Text>
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
          <Text>test1</Text>
          <Text>test1</Text>
          <Text>test1</Text>
        </View>
        <View style={styles.contentBox}>
          <Text>test1</Text>
          <Text>test1</Text>
          <Text>test1</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <Text style={styles.textStyle}>DEMO</Text>
      </View>
      <UserDrawer
        toggleUserDrawer={toggleUserDrawer}
        userDrawerOpen={userDrawerOpen}
      />
    </>
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
    backgroundColor: '#30343D',
    height: 300
  },
  container: {
    flex: 1,
    backgroundColor: '#30343D',
    marginTop: statusBarHeight,
    zIndex: -1
  },
  contentBox: {
    backgroundColor: '#282C34',
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#21252B',
    borderBottomColor: '#21252B',
    marginBottom: 3,
    height: 70
  },
  timeScaleButton: {
    width: 'auto',
    flex: 1,
    justifyContent: 'center'
  },
  timeScaleText: {
    textAlign: 'center',
    color: 'white'
  },
  selectedTimeScaleButton: {
    width: 'auto',
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: '#ED7F2C'
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 13,
    left: 16
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  textStyle: {
    color: '#fff',
    fontSize: 18
  }
});

// <WebView
//   source={{html: html}}
//   domStorageEnabled={true}
//   javaScriptEnabled={true}
//   style={styles.WebViewStyle}
//   injectedJavaScript={injectJS}
// />
