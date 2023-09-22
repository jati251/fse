import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { getTaskWaiting } from '../stores/action'
import IconOct from 'react-native-vector-icons/Octicons'

const dimHeight = Dimensions.get("window").height
const dimWidth = Dimensions.get("window").width

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  getTaskWaiting
}

const WaitingInfo = (props) => {
  // console.log(props.selectedTask)

  return (
    <View style={styles.container}>
      <View style={styles.topList}>
        <Text
          style={{ color: 'white', fontSize: 16, fontWeight: '500' }}
        >Info</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.taskOwner}>
          <Text style={textStyles.titleTask}>Task Owner</Text>
          <Text style={textStyles.taskOwner}>{props.selectedTask.task_owner}</Text>
        </View>
        <View style={styles.date}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <IconOct
                name="primitive-dot"
                color="green"
                backgroundColor="transparent"
                size={22}
                style={{ marginRight: "5%" }}
              />
              <View style={{ alignSelf: 'center' }}>
                <Text style={textStyles.titleTask}>Start Date</Text>
              </View>
            </View>
            <Text style={textStyles.taskOwner}>{props.selectedTask.start_date}</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <IconOct
                name="primitive-dot"
                color="red"
                backgroundColor="transparent"
                size={22}
                style={{ marginRight: "5%" }}
              />
              <View style={{ alignSelf: 'center' }}>
                <Text style={textStyles.titleTask}>End Date</Text>
              </View>
            </View>
            <Text style={textStyles.taskOwner}>{props.selectedTask.finish_date}</Text>
          </View>
        </View>
        {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
      </ScrollView>
      <View style={styles.downList}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack(null)}
          style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 16 }}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Customer')}
          style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 16 }}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topList: {
    width: dimWidth,
    height: dimHeight * 0.07,
    backgroundColor: "#707070",
    padding: 10,
    justifyContent: 'center'
  },
  container: {
    width: dimWidth,
    marginTop: dimHeight * 0.1,
    flex: 1
  },
  scrollContainer: {
    height: dimHeight * 0.67
  },
  downList: {
    backgroundColor: "#E6E6E6",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimHeight * 0.08,
    padding: 10
  },
  taskOwner: {
    padding: 20,
    borderBottomColor: 'gray',
    borderStyle: 'solid',
    borderBottomWidth: 0.6,
    width: dimWidth
  },
  date: {
    paddingVertical: 20,
    borderBottomColor: 'gray',
    borderStyle: 'solid',
    borderBottomWidth: 0.6,
    width: dimWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: "20%"
  }
})

const textStyles = StyleSheet.create({
  titleTask: {
    fontSize: 14,
    color: 'gray'
  },
  taskOwner: {
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingInfo)
