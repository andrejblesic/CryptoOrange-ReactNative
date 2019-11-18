import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// export default function MenuButton({navigation}) {
//   console.log('propici', this.props);
//   return (
//     <Ionicons
//       name="md-menu"
//       color="#ED7F2C"
//       size={32}
//       style={styles.menuIcon}
//       onPress={() => navigation.toggleDrawer()}
//     />
//   );
// }

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20
  }
});
