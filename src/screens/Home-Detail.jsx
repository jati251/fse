import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getTaskWaiting } from '../stores/action';
import CardCustomer from '../components/task/card-customer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Alert } from 'react-native';

const dimHeight = Dimensions.get('window').height;
const dimWidth = Dimensions.get('window').width;

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  getTaskWaiting,
};

const Home = props => {
  // console.log('ini adlah console.log porps.selectedtask ==> detail',Object.keys(props.selectedTask))
  // console.log('ini adlah console.log buat ngecek isPhonenya ==> detail',props.selectedTask)
  props.selectedTask.isPhone = true;

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [report, setReport] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [allIdService, setIdService] = useState([]);
  const [closeTask, setCloseTask] = useState(true);
  const [isNonCustomer, setIsNonCustomers] = useState(false);

  useEffect(() => {
    dataWanted();
  }, [props.selectedTask, props.trigger]);

  useEffect(() => {
    async function check() {
      // console.log('INI KEPANGGIL PAS MAU CHECK CHECKLIST AMA REPORT');
      _getReportDone();
      await _getChecklistDone();
    }

    check();
    // AsyncStorage.removeItem(`instrumentReport-${props.selectedTask.idTask}-${258}`)
    // AsyncStorage.removeItem(`instrumentChecklist-${props.selectedTask.idTask}-${103}`)
  }, [allIdService, props.serviceReport, props.trigger]);

  useEffect(() => {
    _checkCloseTask();
  }, [report, checklist]);

  const dataWanted = () => {
    let dataz = {};
    let idServiceCollection = [];
    let checklistIfNonCustomers = [];
    props.selectedTask.detail.forEach(element => {
      // console.log(element.instrument.length, 'ini data instrumennya cuy 1');
      // console.log(element.reportInstrument, 'in report instrumentnya')
      // console.log('ini elementnya',element)
      if (!dataz[element.nameCustomer]) {
        dataz[element.nameCustomer] = {
          addres: element.addressCustomer,
          phone: element.phoneCustomer,
          idService: [element.idService],
          idCustomer: [element.idCustomer],
          serviceNumber: [element.serviceNumber],
          instrument: [...element.instrument],
          report: [element.reportInstrument],
          requestTime: [element.requestTime],
        };
      } else {
        dataz[element.nameCustomer].idService.push(element.idService);
        dataz[element.nameCustomer].idCustomer.push(element.idCustomer);
        dataz[element.nameCustomer].serviceNumber.push(element.serviceNumber);
        dataz[element.nameCustomer].instrument.push(...element.instrument);
        dataz[element.nameCustomer].report.push(element.reportInstrument);
      }
      idServiceCollection.push(element.idService);
      // console.log(dataz[element.nameCustomer].instrument, 'ini instrument dari data dataz')
      // console.log(dataz[element.nameCustomer].report, 'ini report dari data dataz')
    });
    // console.log(Object.keys(dataz) , 'ini si dataz');
    // console.log('ini id service vollection',idServiceCollection)
    // console.log('ini id service collection',idServiceCollection)
    setData(dataz);
    setIdService(idServiceCollection);
    // setLoad(false)
  };

  async function _getReportDone() {
    try {
      let temp = [];
      for (let i = 0; i < allIdService.length; i++) {
        const element = allIdService[i];
        let report = await AsyncStorage.getItem(
          `instrumentReport-${props.selectedTask.idTask}-${element}`,
        );
        if (report) temp.push(JSON.parse(report));
      }
      // console.log('ini report Donennya', temp2)
      setReport(temp);
      setLoad(false);
    } catch (error) {
      console.error(error);
      Alert.alert(error);
      setLoad(false);
    }
  }

  async function _getChecklistDone() {
    try {
      let temp = [];
      for (let i = 0; i < allIdService.length; i++) {
        let data = await AsyncStorage.getItem(
          `instrumentChecklist-${props.selectedTask.idTask}-${allIdService[i]}`,
        );
        if (data) {
          temp.push(JSON.parse(data));
        }
      }

      return setChecklist(temp);
    } catch (error) {
      console.error(error);
      Alert.alert(error);
      setLoad(false);
    }

    // Promise.all(temp)
    //   .then(data => {
    //     data.forEach(el => {
    //       console.log('ini id servicenya', JSON.parse(el).idService)
    //       if (el !== null) {
    //         // console.log(el)
    //         temp2.push(JSON.parse(el))
    //       }
    //     })
    //     console.log(temp2 , "INI TEMP 2 NYA")
    //     setChecklist(temp2)
    //   })
    //   .catch(err => console.log(err))
  }

  // ==> jika nggak ada part ata checklist otomatis dibikin done semua checklistnya
  function _checkCloseTask() {
    // if (report.length === allIdService.length && checklist.length === allIdService.length) {
    if (report.length === allIdService.length) {
      setCloseTask(false);
      // } else if (props.selectedTask.isPhone) {
      //   report.length == allIdService.length ? setCloseTask(false) : setCloseTask(true)
    } else {
      setCloseTask(true); // ini harusnya true kalo checklistnya ketemu
    }
  }

  function toClosetask() {
    // console.log('ini reportnya',report)
    // console.log('kalo ini checklistnya',checklist)

    let final = report.map((el, idx) => {
      if (checklist.length !== 0) {
        return el.idService === checklist[idx].idService
          ? // console.log('ini adlah elnya',el),
          { ...el, checklist: checklist[idx] }
          : null;
      } else {
        return { ...el, checklist: [] };
      }
    });
    let masterTask = {
      idTask: props.selectedTask.idTask,
      taskOwner: props.selectedTask.taskOwner,
      taskAssign: props.selectedTask.taskAssign,
      startDate: props.selectedTask.startDate,
      finishDate: props.selectedTask.finishDate,
      Status: props.selectedTask.Status,
      report: final,
    };

    props.nav.navigate('TaskCloseWizard', {
      data: {
        master: masterTask,
        checklist: checklist,
        report: report,
        idTask: props.selectedTask.idTask,
        idService: allIdService,
      },
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {!load &&
          Object.entries(data).map((el, i) => {
            let send = {
              key: i,
              customer: el[0],
              idCustomer: el[1].idCustomer,
              idService: el[1].idService,
              serviceNumber: el[1].serviceNumber,
              instrument: el[1].instrument,
              report: report,
              requestTime: el[1].requestTime[0],
              checklist: checklist,
              addres: el[1].addres,
              phone: el[1].phone,
            };
            // console.log('ii checklist dari sendnya',send)
            return (
              <CardCustomer
                navigation={props.navigation}
                key={i}
                index={i}
                setIsNonCustomers={setIsNonCustomers}
                data={send}
              />
            );
          })}
        {/* <Text>{report.length}</Text>
        <Text>{checklist.length}</Text> */}
        {/* <Text>{JSON.stringify(closeTask)}</Text> */}
        {/* <Text>{JSON.stringify(props.selectedTask , 'utf8', 2)}</Text> */}
        {/* <Text>{JSON.stringify(report , 'utf8', 2)}</Text> */}
        {/* <Text>{JSON.stringify(checklist, 'utf8', 2)}</Text> */}
        {/* <Text>
          {JSON.stringify(props.selectedTask.idTask,'utf8', 2)}
          {JSON.stringify(allIdService,'utf8', 2)}
        </Text> */}
      </ScrollView>
      <TouchableOpacity
        style={!closeTask ? styles.close : styles.closeDisable}
        disabled={closeTask}
        onPress={() => toClosetask()}>
        <Text style={{ color: !closeTask ? 'white' : 'black', fontSize: 16 }}>
          {' '}
          Close Task{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimWidth,
    marginTop: dimHeight * 0.03,
    height: hp('90%'),
    flex: 1,
  },
  close: {
    backgroundColor: '#2F3E9E',
    height: 48,
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 3,
    alignSelf: 'center',
    bottom: 0,
  },
  closeDisable: {
    backgroundColor: '#B9BAC3',
    height: 48,
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 3,
    alignSelf: 'center',
    bottom: 0,
  },
  name: {
    marginHorizontal: dimWidth * 0.045,
    marginTop: dimHeight * 0.025,
    marginBottom: dimHeight * 0.02,
  },
  tabcontainer: {
    height: '65%',
    paddingBottom: dimHeight * 0.01,
    paddingTop: dimHeight * 0.02,
    width: dimWidth,
  },
  selectTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: dimWidth * 0.05,
    marginTop: dimHeight * 0.05,
    width: '90%',
  },
});

const textStyles = StyleSheet.create({
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textTabUnactive: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '100',
  },
  textTabActive: {
    fontSize: 16,
    color: '#6cbbe8',
    textDecorationLine: 'underline',
    fontWeight: '100',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
