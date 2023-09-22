import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
// import moment from 'moment'

//import icon
import IconCustomer from '../assets/svg/customer'
import IconParts from '../assets/svg/parts'
import IconFollow from '../assets/svg/follower'
import IconMat from 'react-native-vector-icons/MaterialIcons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconFA from 'react-native-vector-icons/FontAwesome'

//import component

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {

}

const taskClosedWizard = (props) => {
    // console.log('sempat masuk sini brohh',props.selectedTask.ppd.detail.length == 0)
    //useState
    const [data, setData] = useState([])
    const [isEmpty, setEmpty] = useState(props.selectedTask.ppd.detail.length == 0)
    const [isPartEmpty, setPartEmpty] = useState(props.selectedTask.part.detail.length == 0)
    const [bypass, setbypass] = useState(true)
    //useEffect
    useEffect(() => {
        dataWanted()
    }, [props.selectedTask])

    useEffect(() => {
        _setbypass()
    }, [props.navigation.getParam('data')])

    //function
    const dataWanted = () => {
        let data = {}
        props.selectedTask.detail.forEach(element => {
            if (!data[element.nameCustomer]) {
                // console.log(element.instrument_merk, 'ini mereknya');
                data[element.nameCustomer] = {
                    instrument: [{
                        merk: element.instrument[0].merk,
                        type: element.instrument[0].type,
                        sn: element.instrument[0].sn
                    }]
                }
            }
            else {
                data[element.nameCustomer].instrument.push({
                    merk: element.instrument[0].merk,
                    type: element.instrument[0].type,
                    sn: element.instrument[0].sn
                })
            }
        })
        setData(data)
    }

    const _setbypass = () => {
        let noReportSent = true
        let noChecklistSent = true
        props.navigation.getParam('data').report.length == 0 ? noReportSent = true : noReportSent = false
        props.navigation.getParam('data').checklist.length == 0 ? noChecklistSent = true : noChecklistSent = false
        noReportSent && noChecklistSent ? setbypass(true) : setbypass(false)
    }

    // console.log('ini adlah is empty',isEmpty)
    // console.log('ini adlah is part empty',isPartEmpty)
    // console.log('[ini datanya close task wizard awal][master] ====>',Object.keys(props.navigation.getParam('data').master.report))
    // console.log('[ini datanya close task wizard awal][report] ====>',Object.keys(props.navigation.getParam('data').report[0]))
    // console.log('[ini datanya close task wizard awal] ====>',Object.keys(props.navigation.getParam('data')))
    return (
        <View style={viewStyles.container}>
            <View style={viewStyles.headerExtend}></View>
            <ScrollView style={viewStyles.content}>
                <View style={viewStyles.taskBox}>
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingRight: 10,
                        width: '100%'
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>TASK {props.selectedTask.idTask}</Text>
                        <IconAnt
                            name="checkcircle"
                            color="#31C149"
                            backgroundColor="transparent"
                            size={17}
                            style={{ marginRight: "5%", alignSelf: 'center' }}
                        />
                    </View>
                    <View style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'gray'
                    }} />
                    <View style={viewStyles.listCustomer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ alignSelf: 'center', marginRight: 5 }}>
                                <IconCustomer />
                            </View>
                            <Text style={textStyles.customer}>{Object.keys(data).length} Customers</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ alignSelf: 'center', marginRight: 5 }}>
                                <IconParts />
                            </View>
                            <Text style={textStyles.customer}>{isPartEmpty ? 0 : props.selectedTask.part.detail.length} Parts</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ alignSelf: 'center', marginRight: 5 }}>
                                <IconFollow />
                            </View>
                            <Text style={textStyles.customer}>{isEmpty ? 0 : props.selectedTask.ppd.detail[0].followers.length} Followers</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{ ...viewStyles.detailBox, height: hp('15%') }}>
                    <View
                        style={{ justifyContent: 'space-between', marginRight: '20%', height: '100%' }}>
                        <Text>Status</Text>
                        <Text>Starting Time</Text>
                        <Text>End Time</Text>
                    </View>
                    <View
                        style={{ justifyContent: 'space-between', height: '100%' }}>
                        <Text>Complete</Text>
                        <Text>{bypass ? '-' : props.navigation.getParam('data').report[0].startTimeInstrument}</Text>
                        <Text>{bypass ? '-' : props.navigation.getParam('data').report[props.navigation.getParam('data').report.length - 1].finishTimeInstrument}</Text>
                    </View>
                </View>

                <View style={viewStyles.detailBox}>
                    <View>
                        <Text style={textStyles.location}>Location</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 1 && <IconFA
                                    name="car"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 2 && <IconFA5
                                    name="car-side"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 3 && <IconFA5
                                    name="bus-alt"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 4 && <IconFA5
                                    name="train"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 5 && <IconMat
                                    name="flight-land"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 6 && <IconFA5
                                    name="motorcycle"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == null && <IconFA5
                                    name="walking"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty && <IconFA5
                                    name="phone"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            <Text style={{ ...textStyles.date, textTransform: 'capitalize' }}>{isEmpty ? '' : props.selectedTask.ppd.detail[0].placeOfDeparture}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 1 && <IconFA
                                    name="car"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 2 && <IconFA5
                                    name="car-side"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 3 && <IconFA5
                                    name="bus-alt"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 4 && <IconFA5
                                    name="train"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 5 && <IconMat
                                    name="flight-takeoff"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 6 && <IconFA5
                                    name="motorcycle"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == null && <IconFA5
                                    name="walking"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty && <IconFA5
                                    name="phone"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            <Text style={{ ...textStyles.date, textTransform: 'capitalize' }}>{isEmpty ? '' : props.selectedTask.ppd.detail[0].destination}</Text>
                        </View>
                    </View>
                    <View
                        style={viewStyles.box}></View>
                    <View>
                        <Text style={textStyles.location}>Schedule</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 1 && <IconFA
                                    name="car"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 2 && <IconFA5
                                    name="car-side"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 3 && <IconFA5
                                    name="bus-alt"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 4 && <IconFA5
                                    name="train"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 5 && <IconMat
                                    name="flight-land"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 6 && <IconFA5
                                    name="motorcycle"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == null && <IconFA5
                                    name="walking"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty && <IconFA5
                                    name="phone"
                                    color="green"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            <Text style={textStyles.date}> {moment(new Date(props.selectedTask.startDate)).format('dddd').substring(0, 3)}, {props.selectedTask.startDate}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 1 && <IconFA
                                    name="car"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 2 && <IconFA5
                                    name="car-side"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 3 && <IconFA5
                                    name="bus-alt"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 4 && <IconFA5
                                    name="train"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 5 && <IconMat
                                    name="flight-takeoff"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == 6 && <IconFA5
                                    name="motorcycle"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty == false && props.selectedTask.ppd.detail[0].id_transportation_approve == null && <IconFA5
                                    name="walking"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            {
                                isEmpty && <IconFA5
                                    name="phone"
                                    color="blue"
                                    backgroundColor="transparent"
                                    size={23}
                                    style={textStyles.iconTransport}
                                />
                            }
                            <Text style={textStyles.date}>{moment(new Date(props.selectedTask.finishDate)).format('dddd').substring(0, 3)}, {props.selectedTask.finishDate}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={viewStyles.bottomBar}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('CloseList', { data: { ...props.navigation.getParam('data') } })}>
                    <Text style={textStyles.next}>NEXT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}>
                    <Text style={textStyles.next}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const viewStyles = StyleSheet.create(
    {
        container: {
            paddingTop: hp('10%'),
            height: hp('97%'),
            flex: 1,
            justifyContent: 'space-between'
        },
        headerExtend: {
            backgroundColor: '#2F3E9E',
            height: hp('10%'),
            zIndex: 0,
            width: wp('100%')
        },
        content: {
            backgroundColor: 'transparent',
            borderColor: 'black',
            // borderWidth: 1,
            position: 'absolute',
            zIndex: 2,
            marginTop: hp('13%'),
            width: wp('90%'),
            alignSelf: 'center',
            minHeight: hp('75%')
        },
        taskBox: {
            height: hp('15%'),
            width: "100%",
            alignItems: 'center',
            paddingVertical: 10,
            paddingLeft: 10,
            borderRadius: 3,
            justifyContent: 'space-between',
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignSelf: 'center',
            backgroundColor: 'white',
            margin: 10
        },
        detailBox: {
            minHeight: hp('10%'),
            flexShrink: 1,
            width: "100%",
            alignItems: 'flex-start',
            paddingVertical: 10,
            paddingLeft: 10,
            borderRadius: 3,
            shadowColor: "#000",
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
            alignSelf: 'center',
            backgroundColor: 'white',
            margin: 12.5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: "#fff"
        },
        bottomBar: {
            backgroundColor: '#e6e6e6',
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            paddingHorizontal: 20,
            bottom: 0
        },
        listCustomer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: "white",
            width: '100%',
            paddingRight: 10
        },
        box: {
            backgroundColor: '#A2A2A2',
            height: '75%',
            width: 1,
            alignSelf: 'flex-end',
            marginHorizontal: 20,
            opacity: 0.7
        }
    }
)

const textStyles = StyleSheet.create({
    customer: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    location: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    next: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray'
    },
    iconTransport: {
        marginRight: "5%",
        opacity: 0.7
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(taskClosedWizard)
