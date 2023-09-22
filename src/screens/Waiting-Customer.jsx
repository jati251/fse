import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { getTaskWaiting } from '../stores/action'
import CardCustomer from '../components/task/card-customer-waiting'

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
  const [data, setData] = useState('')

  useEffect(() => {
    // console.log( `[selected Task]`,props.selectedTask);
    dataWanted()
  }, [props.selectedTask])

  const dataWanted = () => {
    let data = {}
    props.selectedTask.customers.forEach(element => {
      if (!data[element.customer]) {
        // console.log(element, 'ini mereknya');
        data[element.customer] = {
          instrument: [{
            merk: element.instrument_merk,
            type: element.instrument_type,
            sn: element.serial_number
          }],
        }
      }
      else {
        data[element.customer].instrument.push({
          merk: element.instrument_merk,
          type: element.instrument_type,
          sn: element.serial_number
        })
      }
    })
    // console.log('[data]', data);
    setData(data)
  }
  return (
    <View style={styles.container}>
      <View style={styles.topList}>
        <Text
          style={{ color: 'white', fontSize: 16, fontWeight: '500' }}
        >Customer & Instrument</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {
          Object.entries(data).map((el, i) => {
            return (
              <CardCustomer key={i} data={{ customer: el[0], instrument: el[1].instrument }} />
            )
          })
        }
        {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
      </ScrollView>
      <View style={styles.downList}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Info', { data: new Date() })}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 16 }}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Part')}
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
    height: dimHeight * 0.67,
    paddingTop: "2%"
  },
  downList: {
    backgroundColor: "#E6E6E6",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimHeight * 0.08,
    padding: 10
  },
})

const textStyles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: "bold"
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
