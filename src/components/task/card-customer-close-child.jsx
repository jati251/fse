import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import {
  setSelectedInstrument,
  setReportService,
  initServiceReport
} from '../../stores/action'


const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setSelectedInstrument,
  setReportService,
  initServiceReport
}

const dimHeight = Dimensions.get("window").height
const dimWidth = Dimensions.get("window").width

const cardStatus = (props) => {
  // console.log(props.selectedTask.idTask, 'ini task idnya')

  // console.log('ini report', props.idService, props.report, 'ini reportnya')
  // console.log('ini checlist', props.idService, props.checklist, 'ini checklistny')
  // console.log('ini id Service', props.idService);
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [modalParts, setModalParts] = useState(false)
  const [modalSaveParts, setModalSaveParts] = useState(false)
  const [alreadyWrite, setAlredyWrite] = useState(false)
  const [alreadyChecked, setAlreadyChecked] = useState(false)

  return (
    <View>
      <View style={{ ...styles.container, backgroundColor: "rgba(154, 158, 180, 0.22)", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: "4%" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
          <View>
            <Text style={{ ...textStyles.title, textTransform: 'capitalize', color: (alreadyChecked && alreadyWrite) ? "#31C149" : "#000000C4" }}>
              Merk :  {props.el.merk}
            </Text>
            <Text style={{ ...textStyles.title, textTransform: 'capitalize', color: (alreadyChecked && alreadyWrite) ? "#31C149" : "#000000C4" }}>
              Type :  {props.el.type}
            </Text>
            <Text style={{ ...textStyles.title, textTransform: 'capitalize', color: (alreadyChecked && alreadyWrite) ? "#31C149" : "#000000C4" }}>
              Serial Number :  {props.el.sn}
            </Text>
          </View>

          {/* <View style={{ 
            flexDirection: 'row',
            alignSelf: 'center' ,
            justifyContent : 'space-between',
            width : '30%' }}>
              <View style={{ 
                width: 30,
                height: 30,
                backgroundColor: '#6CF876',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>R</Text>
              </View>
              <View style={{ 
                width: 30,
                height: 30,
                backgroundColor: '#6CF876',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>P</Text>
              </View>
              <View style={{ 
                width: 30,
                height: 30,
                backgroundColor: '#6CF876',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50 }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>C</Text>
              </View>
          </View> */}

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: dimHeight * 0.09,
    width: "95%",
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderRadius: 1,
    shadowOpacity: 0.61,
    shadowRadius: 1,
    elevation: 1,
    alignSelf: 'center',
    marginBottom: 10,
    padding: 10
  },
  date: {
    flexDirection: 'row'
  }
})

const textStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '100',
  },
  subtitle: {
    fontSize: 12,
    color: 'gray'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(cardStatus)
