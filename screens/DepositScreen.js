import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { UserDrawer } from './HomeScreen';
// import { Header } from './HomeScreen';

const statusBarHeight = Constants.statusBarHeight;

function Header({ navigation }) {
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
          zIndex: 99999,
          top: 8
        }}
        source={require('./CO.png')}
      />
      <Feather
        color="#ED7F2C"
        style={{ position: 'absolute', zIndex: 99999, top: 13, right: 8 }}
        size={32}
        name="user"
      />
    </View>
  );
}

export default function DepositScreen({ navigation }) {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        stickyHeaderIndices={[0]}
      >
        <Header style={styles.header} navigation={navigation} />
      </ScrollView>
      <View style={styles.bottomView}>
        <Text style={styles.textStyle}>DEMO</Text>
      </View>
    </>
  );
}

DepositScreen.navigationOptions = {
  title: 'DEPOSIT',
  drawerIcon: (
    <MaterialCommunityIcons
      style={{ color: '#ED7F2C', marginRight: -8 }}
      name="arrow-up-bold-box-outline"
      color="#ED7F2C"
      size={32}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343942',
    marginTop: statusBarHeight
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
