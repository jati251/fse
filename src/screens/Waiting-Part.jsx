import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { getTaskWaiting } from '../stores/action'

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
  const [part, setPart] = useState([])
  const [consumable, setConsumable] = useState([])

  useEffect(() => {
    dataWanted()
  }, [props.selectedTask])

  // console.log(props.selectedTask, 'ini dia si jali2');
  const dataWanted = () => {
    let part = []
    let consumable = []

    props.selectedTask.tools.forEach(element => {
      if (element.type.toLowerCase() == "part") {
        // console.log(element, 'ini typenya');
        part.push(element)
      }
      else {
        // console.log(element, 'ini sisanya');
        consumable.push(element)
      }
    })
    setPart(part)
    setConsumable(consumable)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topList}>
        <Text
          style={{ color: 'white', fontSize: 16, fontWeight: '500' }}
        >Part & Consumable part</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ paddingLeft: "3%", paddingTop: "2%" }}>
          <Text style={{ color: "#3E50B4", fontSize: 16 }}>Part</Text>
          <View style={{ marginVertical: "1%" }}></View>
          {
            part.length != 0 && part.map((el, i) => {
              return (
                <View key={i} style={styles.listPart}>
                  <Text style={textStyles.name}>{el.material_name}</Text>
                </View>
              )
            })
          }
          {
            part.length == 0 && <View style={styles.listPart}>
              <Text style={{ ...textStyles.title, textTransform: 'uppercase' }}>No Part</Text>
            </View>
          }
        </View>
        <View style={{ paddingLeft: "3%", paddingTop: "2%" }}>
          <Text style={{ color: "#3E50B4", fontSize: 16 }}>Consumable Part</Text>
          <View style={{ marginVertical: "1%" }}></View>
          {
            consumable.length != 0 && consumable.map((el, i) => {
              return (
                <View key={i} style={styles.listPart}>
                  <Text style={textStyles.name}>{el.material_name}</Text>
                </View>
              )
            })
          }
          {
            consumable.length == 0 && <View style={styles.listPart}>
              <Text style={{ ...textStyles.title, textTransform: 'uppercase' }}>No Part</Text>
            </View>
          }
        </View>
        {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
      </ScrollView>
      <View style={styles.downList}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Customer')}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 16 }}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Detail')}
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
  listPart: {
    marginLeft: "3%",
    borderStyle: 'solid',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
  }
})

const textStyles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: "300"
  },
  textTabUnactive: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '100'
  },
  textTabActive: {
    fontSize: 16,
    color: '#6cbbe8',
    textDecorationLine: 'underline',
    fontWeight: '100',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingInfo)
