import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Detail from '../../screens/Home-Detail'
import Part from '../../screens/Home-Part'
import PPD from '../../screens/Home-PPD'


export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'Detail', title: 'Detail', navigation: this.props.navigation },
      { key: 'Part', title: 'Part', navigation: this.props.navigation },
      { key: 'PPD', title: 'PPD', navigation: this.props.navigation }
    ],
  };

  renderTabBar(props) {
    return (<TabBar
      style={{ backgroundColor: '#4052ae', elevation: 0, borderColor: '#000000', borderBottomWidth: 1, height: 50 }}
      labelStyle={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}
      {...props}
      indicatorStyle={{ backgroundColor: '#fff', height: 2.5 }}
    />
    );
  }

  render() {
    return (
      <TabView
        style={{ marginTop: Dimensions.get('screen').height * 0.1 }}
        navigationState={this.state}
        renderScene={SceneMap({
          Detail: Detail,
          Part: Part,
          PPD: PPD
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});