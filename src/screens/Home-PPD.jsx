import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
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


const Home = (props) => {
  // console.log('ini lagi kepanggil juga doong, -==> PPD')
  // console.log('ini hasil kiriman dari home', Object.keys(props.selectedTask.ppd))
  // console.log('ini hasil kiriman dari home', props.selectedTask.ppd.detail)

  //useState
  const [isEmpty, setEmpty] = useState(props.selectedTask.ppd.detail.length == 0)

  // console.log('isEmpty ppd', isEmpty)
  if (isEmpty) {
    return <View>
      {/* <Text>Kosong juga bos ppdnya</Text> */}
    </View>
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.longbox}>
          <Text style={textStyles.subtitle}>Departure Place</Text>
          <Text style={textStyles.title}>{props.selectedTask.ppd.detail[0].placeOfDeparture}</Text>
        </View>
        <View style={styles.longbox}>
          <Text style={textStyles.subtitle}>Destination Place</Text>
          <Text style={textStyles.title}>{props.selectedTask.ppd.detail[0].destination}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "93%", alignSelf: 'center' }}>
          <View style={styles.smallbox}>
            <Text style={textStyles.subtitle}>Departure Date</Text>
            <Text style={textStyles.title}>{props.selectedTask.startDate}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
          </View>
          <View style={styles.smallbox}>
            <Text style={textStyles.subtitle}>Finish Date</Text>
            <Text style={textStyles.title}>{props.selectedTask.finishDate}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: "1%",
            width: "100%",
            height: "0.6%",
            backgroundColor: "#E6E6E6"
          }}
        ></View>
        <View style={{ paddingLeft: "3%", paddingTop: "2%", height: dimHeight * 0.5 }}>
          <Text style={{ color: "#3E50B4", fontSize: 14 }}>Follower</Text>
          <View style={{ marginVertical: "1%" }}></View>
          {
            props.selectedTask.ppd.detail[0].followers.length != 0 && props.selectedTask.ppd.detail[0].followers.map((el, i) => {
              return (
                <View style={styles.follower} key={i}>
                  <Text style={textStyles.name}>{el.Follower}</Text>
                </View>
              )
            })
          }
          {
            props.selectedTask.ppd.detail[0].followers.length == 0 && <View style={styles.follower}>
              <Text style={textStyles.title}>No Follower</Text>
            </View>
          }
        </View>
        {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: dimWidth,
    paddingTop: "5%"
  },
  longbox: {
    width: "93%",
    minHeight: dimHeight * 0.08,
    backgroundColor: "rgba(235, 236, 241, 1)",
    alignSelf: 'center',
    marginVertical: "2%",
    padding: 10
  },
  smallbox: {
    width: "45%",
    minHeight: dimHeight * 0.08,
    backgroundColor: "#rgba(235, 236, 241, 1)",
    alignSelf: 'center',
    marginVertical: "2%",
    padding: 10
  },
  follower: {
    width: '98%',
    alignItems: 'flex-start',
    marginLeft: "3%",
    borderStyle: 'solid',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
    paddingVertical: 10
  }
})

const textStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "400",
    textTransform: 'capitalize'
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '100'
  },
  name: {
    fontSize: 18,
    fontWeight: "300",
    textTransform: 'capitalize'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)