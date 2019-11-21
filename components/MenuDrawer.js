import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import { NavigationActions } from 'react-navigation';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class MenuDrawer extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../assets/images/robot-dev.png')}
            style={{
              flex: 1,
              width: 280,
              justifyContent: 'center'
            }}
          >
            <Text style={styles.headerText}>Header Portion</Text>
            <Text style={styles.headerText}>logo or profile image</Text>
          </ImageBackground>
        </View>
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'ScreenA'
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == 'ScreenA'
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen('Home')}
            >
              Screen A
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'ScreenB'
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == 'ScreenB'
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen('ScreenB')}
            >
              Screen B
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'ScreenC'
                ? styles.activeBackgroundColor
                : null
            ]}
          >
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == 'ScreenC'
                  ? styles.selectedTextStyle
                  : null
              ]}
              onPress={this.navigateToScreen('ScreenC')}
            >
              Screen C
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'red'
  },
  headerContainer: {
    height: 150
  },
  headerText: {
    color: 'red'
  },
  screenContainer: {
    paddingTop: 20,
    width: '100%'
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: '#00adff'
  },
  activeBackgroundColor: {
    backgroundColor: 'grey'
  }
});
