import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import IconThreeBar from 'react-native-vector-icons/Octicons';
// import axios from 'axios'
// import DeviceInfo from 'react-native-device-info';

const mapStateToProps = state => {
  return state;
};

const dimHeight = Dimensions.get('screen').height;
const dimWidth = Dimensions.get('screen').width;

function Header(props) {
  // console.log(props, 'ini propsnya');
  useEffect(() => {
    // let nowVer = DeviceInfo.getVersion();
    // setVersion(nowVer);
  }, []);
  const [version, setVersion] = useState(null);
  return (
    <View style={styles.container}>
      <IconThreeBar.Button
        name="three-bars"
        color="white"
        backgroundColor="transparent"
        size={25}
        style={{ marginRight: '5%' }}
        onPress={() => props.navigation.toggleDrawer()}
      />
      <Text style={textStyles.header}>
        {props.title ? props.title : 'Task Accept Wizard'}
      </Text>
      <Text style={{ fontSize: 11, color: "white", position: 'absolute', right: 0, top: 0, margin: 3 }}>{version}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#2F3E9E',
    height: dimHeight * 0.1,
    width: dimWidth,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

const textStyles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps)(Header);
