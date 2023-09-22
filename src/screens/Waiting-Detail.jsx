import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, Image, Alert } from 'react-native'
import { connect } from 'react-redux';
import { getTaskWaiting, postTaskActive, setWaitingTask } from '../stores/action'
import rupiah from '../helpers/rupiah'

const dimHeight = Dimensions.get("window").height
const dimWidth = Dimensions.get("window").width

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  getTaskWaiting,
  postTaskActive,
  setWaitingTask
}

const WaitingInfo = (props) => {
  // console.log(props.selectedTask.id_task, 'ini id taskny')
  // console.log('masuk disini dulu dan datanya adalah ini', props.selectedTask)
  const [modalVisible, setModalVisibe] = useState(false)
  const [loadData, setLoadData] = useState(true)

  function removeWaiting() {
    let data = props.taskWaiting.task
    let newdata = data.filter((el) => {
      return el.id_task !== props.selectedTask.id_task
    })
    let reWrite = { ...props.taskWaiting, task: newdata }
    props.setWaitingTask(reWrite)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topList}>
        <Text
          style={{ color: 'white', fontSize: 16, fontWeight: '500' }}
        >Detail</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.contentDetail}>
            <Text style={textStyles.subtitle}>Purpose</Text>
            <Text style={{ ...textStyles.title, textTransform: 'none' }}>{props.selectedTask.purpose != null ? props.selectedTask.purpose : '---'}</Text>
          </View>
          <View style={styles.contentDetail}>
            <Text style={textStyles.subtitle}>Departure</Text>
            <Text style={textStyles.title}>{props.selectedTask.locations.departure != null ? props.selectedTask.locations.departure : '---'}</Text>
          </View>
          <View style={styles.contentDetail}>
            <Text style={textStyles.subtitle}>Return</Text>
            <Text style={textStyles.title}>{props.selectedTask.locations.destination !== null ? props.selectedTask.locations.destination : '---'}</Text>
          </View>
          <View style={{ ...styles.contentDetail, padding: 0, backgroundColor: '#fff', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <View style={{ backgroundColor: "#EBECF1", borderRadius: 5, padding: 10, width: '45%' }}>
              <Text style={textStyles.subtitle}>Date of Departure</Text>
              <Text style={textStyles.title}>{props.selectedTask.start_date}</Text>
            </View>
            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
            </View>
            <View style={{ backgroundColor: "#EBECF1", borderRadius: 5, padding: 10, width: '45%' }}>
              <Text style={textStyles.subtitle}>Date of Return</Text>
              <Text style={textStyles.title}>{props.selectedTask.finish_date}</Text>
            </View>
          </View>
          <View style={styles.contentDetail}>
            <Text style={textStyles.subtitle}>Down Payment</Text>
            <Text style={textStyles.title}>{props.selectedTask.down_payment != null ? rupiah(props.selectedTask.down_payment, 'Rp') : '---'}</Text>
          </View>
          <View style={styles.contentDetail}>
            <Text style={textStyles.subtitle}>Information</Text>
            <Text style={textStyles.title}>{props.selectedTask.information != null ? props.selectedTask.information : '---'}</Text>
          </View>
        </View>
        <View style={{ paddingLeft: "3%", paddingTop: "2%" }}>
          <Text style={{ color: "#3E50B4", fontSize: 16, fontWeight: '500' }}>Followers</Text>
          <View style={{ marginVertical: "1%" }}></View>
          {
            props.selectedTask.followers != 0 && props.selectedTask.detail_followers.map((el, i) => {
              return (
                <View style={styles.follower} key={i}>
                  <Text style={textStyles.name}>{el.name}</Text>
                </View>
              )
            })
          }
          {
            props.selectedTask.followers == 0 && <View style={styles.follower}>
              <Text style={textStyles.title}>No Follower</Text>
            </View>
          }
        </View>
        {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
      </ScrollView>
      <View style={styles.downList}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Part')}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 16 }}>PREVIOUS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // console.log('masuk sini')
            setModalVisibe(!modalVisible)
            props.postTaskActive(props.selectedTask.id_task)
              .then(() => {
                // console.log('masuk sini ini didot thennya~~')
                setLoadData(false)
              })
              .catch(err => {
                setLoadData(false)

                Alert.alert(JSON.stringify(err.message))
                setModalVisibe(!modalVisible)
                
                // console.log(JSON.stringify(err))
              })
          }}
          style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 16 }}>DONE</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisibe(!modalVisible)
          // console.log('tutup');
        }}>
        <View style={{ justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'center', width: "80%" }}>
          <View style={{ backgroundColor: '#fff', width: "90%", height: "70%", alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            {
              loadData && <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                <Image
                  style={{ width: 200, height: 200, alignSelf: 'center', resizeMode: 'contain' }}
                  source={require('../assets/DownloadingTask_Img.png')}
                />
                <Text style={{ color: 'green', fontWeight: '600', fontSize: 16 }}>DOWNLOADING...</Text>
                <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Mendownload dan menyimpan data anda</Text>
              </View>
            }
            {
              !loadData && <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
                <Image
                  style={{ width: 200, height: 200, alignSelf: 'center', resizeMode: 'contain' }}
                  source={require('../assets/success_img.png')}
                />
                <Text style={{ color: 'black', fontWeight: '600', fontSize: 16 }}>SUKSES</Text>
                <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Data anda berhasil disimpan</Text>
                <TouchableOpacity style={{ backgroundColor: '#51DB91', borderRadius: 50, width: dimWidth * 0.5, height: "10%", marginVertical: 30, justifyContent: 'center', alignContent: 'center' }}
                  onPress={() => {
                    setModalVisibe(!modalVisible)
                    removeWaiting()
                    props.navigation.navigate('Home')
                  }}
                >
                  <View style={{ alignSelf: 'center' }}>
                    <Text>DONE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  topList: {
    width: dimWidth,
    height: dimHeight * 0.07,
    backgroundColor: "#707070",
    padding: 10,
    justifyContent: 'center',
  },
  container: {
    width: dimWidth,
    marginTop: dimHeight * 0.1,
    flex: 1
  },
  scrollContainer: {
    height: dimHeight * 0.75
  },
  downList: {
    backgroundColor: "#E6E6E6",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dimHeight * 0.08,
    padding: 10,
    marginTop: "1%"
  },
  longbox: {
    width: "93%",
    minHeight: dimHeight * 0.08,
    backgroundColor: "#EBECF1",
    alignSelf: 'center',
    marginVertical: "2%",
    padding: 10
  },
  smallbox: {
    width: "45%",
    minHeight: dimHeight * 0.08,
    backgroundColor: "#EBECF1",
    alignSelf: 'center',
    marginVertical: "2%",
    padding: 10
  },
  detailContainer: {
    flex: 1,
    paddingTop: "3%",
    marginHorizontal: "2%"
  },
  contentDetail: {
    width: "100%",
    backgroundColor: "#EBECF1",
    flex: 1,
    marginVertical: "2%",
    borderRadius: 5,
    padding: 10
  },
  follower: {
    marginLeft: "3%",
    borderStyle: 'solid',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingVertical: 20
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
  }, name: {
    fontSize: 18,
    fontWeight: "300",
    textTransform: 'capitalize'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingInfo)
