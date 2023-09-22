import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import IconIO from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import rupiah from '../helpers/rupiah';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {};

const taskClosedWizard = props => {
  const [detail, setDetail] = useState(true);
  const loggedUser = props.loggedUser;
  // const ppdReport = props.selectedTask.ppd.report[0].detail
  const ppdDetail = props.selectedTask.ppd.detail[0];
  const report = props.navigation.getParam('data').report;
  const [formPPD, setFormPPD] = useState({
    // idBussinesTrip: ppdDetail.idBussinesTrip,
    transportationCost: '',
    transportationCostNote: '',
    ticketCost: '',
    ticketNote: '',
    accommodationCost: '',
    accommodationCostNote: '',
    mealAllowanceCost: '',
    mealAllowanceCostNote: '',
    MiscellaneousExpense: '',
    MiscellaneousExpenseNote: '',
    etc: '',
    etcNote: '',
  });
  const [isEmpty, setEmpty] = useState(
    props.selectedTask.ppd.detail.length == 0,
  );

  function itung() {
    let total = 0;
    //menghilangkan ticket cot yang mempengaruhi DownPayment
    Object.entries(formPPD).forEach(el => {
      if (
        el[0] == 'transportationCost' ||
        el[0] == 'accommodationCost' ||
        el[0] == 'mealAllowanceCost' ||
        el[0] == 'MiscellaneousExpense' ||
        el[0] == 'etc'
      )
        total += +el[1];
    });
    return total;
  }

  function merubah(field, value) {
    let temp = { ...formPPD };
    temp[field] = value;
    setFormPPD(temp);
  }

  function next() {
    let newPPD = {};
    Object.keys(formPPD).forEach(el => {
      if (el.includes('Note')) {
        // console.log('ini catatatan')
        newPPD[el] = formPPD[el];
      } else {
        newPPD[el] = formPPD[el] === '' ? 0 : Number(formPPD[el]);
      }
    });
    let data = {
      ...props.navigation.getParam('data'),
      master: { ...props.navigation.getParam('data').master, PPD: newPPD },
    };
    // console.log('data.ini', Object.keys(data.master))
    props.navigation.navigate('PartList', { data: data });
  }
  // console.log('[close task wizard LPBD] ====>',Object.keys(props.navigation.getParam('data')))
  // console.log('[close task wizard LPBD => master => report] ====>',props.navigation.getParam('data').master.report)
  // console.log('[close task wizard LPBD => report] ====>',props.navigation.getParam('data').report)
  return (
    <KeyboardAvoidingView
      style={viewStyles.container}
      enabled
      behavior="position">
      <View style={viewStyles.headerExtend}></View>
      <ScrollView style={viewStyles.content}>
        <TouchableOpacity
          onPress={() => setDetail(!detail)}
          style={viewStyles.taskBox}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingRight: 10,
              width: '100%',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>LPBD</Text>
            {detail ? (
              <IconIO
                name="ios-arrow-up"
                size={25}
                style={{ alignSelf: 'center' }}
              />
            ) : (
              <IconIO
                name="ios-arrow-down"
                size={25}
                style={{ alignSelf: 'center' }}
              />
            )}
          </View>
          {detail && (
            <View style={{ width: '100%' }}>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: 'gray',
                  opacity: 0.5,
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'flex-start',
                  paddingHorizontal: 20,
                }}>
                {/* <View style={{ marginRight: wp('10%') }}>
                        <Text style={{ color: 'gray', fontSize: 17 }}>Name</Text>
                        <Text style={{ color: 'gray', marginVertical: 10, fontSize: 17 }}>Division</Text>
                        <Text style={{ color: 'gray', marginVertical: 10, fontSize: 17 }}>Assignment Date</Text>
                        <Text style={{ color: 'gray', fontSize: 17 }}>Purpose</Text>
                    </View>
                    <View style={{ flexShrink: 1 }}>
                        <Text style={{ textTransform: 'capitalize', fontSize: 17, fontWeight: '600' }}>{loggedUser.first_name} </Text>
                        <Text style={{ fontWeight: '600', marginVertical: 10, fontSize: 17 }}>Engineer</Text>
                        <Text style={{ fontWeight: '600', marginVertical: 10, fontSize: 17 }}>{props.selectedTask.startDate}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 17 }} >{isEmpty ? '-' : props.selectedTask.ppd.detail[0].purposeOfTrip}</Text>
                    </View> */}
                <View style={viewStyles.topLPBD}>
                  <Text style={{ color: 'gray', fontSize: 17 }}> Name </Text>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontSize: 17,
                      fontWeight: '600',
                    }}>
                    {loggedUser.first_name}{' '}
                  </Text>
                </View>
                <View style={viewStyles.topLPBD}>
                  <Text style={{ color: 'gray', fontSize: 17 }}> Division </Text>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontSize: 17,
                      fontWeight: '600',
                    }}>
                    {' '}
                    Engineer{' '}
                  </Text>
                </View>
                <View style={viewStyles.topLPBD}>
                  <Text style={{ color: 'gray', fontSize: 17 }}>
                    {' '}
                    AsignmentDate{' '}
                  </Text>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontSize: 17,
                      fontWeight: '600',
                    }}>
                    {' '}
                    {props.selectedTask.startDate}{' '}
                  </Text>
                </View>
                <View style={viewStyles.topLPBD}>
                  <Text style={{ color: 'gray', fontSize: 17 }}> Purpose </Text>
                  <Text style={{ fontWeight: '600', fontSize: 17 }}>
                    {isEmpty
                      ? '-'
                      : props.selectedTask.ppd.detail[0].purposeOfTrip}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <View style={{ flex: 1, flexShrink: 1 }}>
          {/* Destination */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}>Destination</Text>
            <Text style={textStyles.content}>
              {isEmpty ? '-' : ppdDetail.destination}
            </Text>
          </View>
          {/* Ticket */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}>Ticket</Text>
            <TextInput
              placeholder={'Rp 0,00'}
              value={formPPD.ticketCost}
              onChangeText={text =>
                setFormPPD({ ...formPPD, ticketCost: text })
              }
              keyboardType={'number-pad'}
            />
            <TextInput
              multiline={true}
              style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
              placeholder={'Notes'}
              value={formPPD.ticketNote}
              onChangeText={text => setFormPPD({ ...formPPD, ticketNote: text })}
            />
          </View>
          {/* Transportation Cost */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}> Transportation Cost </Text>
            <TextInput
              placeholder={'Rp 0,00'}
              value={formPPD.transportationCost}
              onChangeText={text =>
                setFormPPD({ ...formPPD, transportationCost: text })
              }
              keyboardType={'number-pad'}
            />
            <TextInput
              multiline={true}
              style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
              placeholder={'Notes'}
              value={formPPD.transportationCostNote}
              onChangeText={text =>
                setFormPPD({ ...formPPD, transportationCostNote: text })
              }
            />
          </View>
          {/* mealCost */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}>Meal Cost</Text>
            <TextInput
              placeholder={'Rp 0,00'}
              value={formPPD.mealAllowanceCost}
              onChangeText={text =>
                setFormPPD({ ...formPPD, mealAllowanceCost: text })
              }
              keyboardType={'number-pad'}
            />
            <TextInput
              multiline={true}
              style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
              placeholder={'Notes'}
              value={formPPD.mealAllowanceCostNote}
              onChangeText={text =>
                setFormPPD({ ...formPPD, mealAllowanceCostNote: text })
              }
            />
          </View>
          {/* Accomodation Cost */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}>Accommodation Cost</Text>
            <TextInput
              placeholder={'Rp 0,00'}
              value={formPPD.accommodationCost}
              onChangeText={text =>
                setFormPPD({ ...formPPD, accommodationCost: text })
              }
              keyboardType={'number-pad'}
            />
            <TextInput
              multiline={true}
              style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
              placeholder={'Notes'}
              value={formPPD.accommodationCostNote}
              onChangeText={text =>
                setFormPPD({ ...formPPD, accommodationCostNote: text })
              }
            />
          </View>
          {/* Miscellaneous Cost */}
          <View
            style={{
              flex: 0.5,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}>Miscellaneous Cost</Text>
            <TextInput
              placeholder={'Rp 0,00'}
              value={formPPD.MiscellaneousExpense}
              onChangeText={text =>
                setFormPPD({ ...formPPD, MiscellaneousExpense: text })
              }
              keyboardType={'number-pad'}
            />
            <TextInput
              multiline={true}
              style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
              placeholder={'Notes'}
              value={formPPD.MiscellaneousExpenseNote}
              onChangeText={text =>
                setFormPPD({ ...formPPD, MiscellaneousExpenseNote: text })
              }
            />
          </View>
          {/* OtherCost */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#EBECF1',
              borderRadius: 3,
              padding: 10,
              marginVertical: 5,
            }}>
            <Text style={textStyles.title}>Others Cost</Text>
            <TextInput
              placeholder={'Rp 0,00'}
              value={formPPD.etc}
              onChangeText={text => setFormPPD({ ...formPPD, etc: text })}
              keyboardType={'number-pad'}
            />
            <TextInput
              multiline={true}
              style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
              placeholder={'Notes'}
              value={formPPD.etcNote}
              onChangeText={text => setFormPPD({ ...formPPD, etcNote: text })}
            />
          </View>
        </View>

        <View
          View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            borderTopColor: 'black',
            borderTopWidth: 1,
            marginTop: 10,
            paddingTop: 10,
            marginBottom: 25,
          }}>
          <View style={{ marginRight: wp('10%') }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>TOTAL</Text>
            <Text style={{ fontSize: 14, color: 'gray', marginVertical: 10 }}>
              Down Payment
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Refund</Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              {rupiah(itung(), 'Rp ')}
            </Text>
            <Text style={{ fontSize: 14, color: 'gray', marginVertical: 10 }}>
              {rupiah(isEmpty ? 0 : ppdDetail.dp_approval, 'Rp ')}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              {isEmpty ? 0 : rupiah(ppdDetail.dp_approval - itung(), 'Rp')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={viewStyles.bottomBar}>
        {/* <TouchableOpacity
                    onPress={() => props.navigation.goBack()}>
                    <Text style={textStyles.next}>PREVIOUS</Text>
                </TouchableOpacity> */}
        <TouchableOpacity onPress={() => next()}>
          <Text style={textStyles.next}>NEXT</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={viewStyles.headerExtend}/> */}
    </KeyboardAvoidingView>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    height: hp('100%'),
    flex: 1,
    justifyContent: 'space-between',
  },
  headerExtend: {
    backgroundColor: '#2F3E9E',
    height: hp('10%'),
    zIndex: 0,
    width: wp('100%'),
  },
  content: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    // borderWidth: 1,
    position: 'absolute',
    zIndex: 2,
    marginTop: hp('10%'),
    width: wp('90%'),
    alignSelf: 'center',
    height: hp('80%'),
  },
  taskBox: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 3,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 10,
  },
  detailBox: {
    minHeight: hp('10%'),
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 12.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  bottomBar: {
    backgroundColor: '#e6e6e6',
    marginTop: hp('80%'),
    height: hp('12%'),
    paddingTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
  },
  listCustomer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    paddingRight: 10,
  },
  topLPBD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    flexShrink: 1,
  },
});

const textStyles = StyleSheet.create({
  customer: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 13,
    color: 'gray',
  },
  content: {
    fontSize: 17,
    color: 'black',
  },
  next: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(taskClosedWizard);
