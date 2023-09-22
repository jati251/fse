import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { getTaskWaiting } from '../stores/action'
import CardCustomer from '../components/task/card-customer-close'

const dimHeight = Dimensions.get("window").height
const dimWidth = Dimensions.get("window").width

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    getTaskWaiting
}

const TaskCloseList = (props) => {

    const [data, setData] = useState([])
    const [allIdService, setIdService] = useState([])

    useEffect(() => {
        dataWanted()
    }, [])

    const dataWanted = () => {
        // console.log(props.selectedTask.detail.length, 'ini lengntaayauuauauaua');
        let dataz = {}
        let idServiceCollection = []
        props.selectedTask.detail.forEach(element => {

            // console.log(element.instrument.length, 'ini data instrumennya cuy 1');
            // console.log(element.reportInstrument, 'in report instrumentnya')
            //   console.log('ini elementnya', element)
            if (!dataz[element.nameCustomer]) {
                dataz[element.nameCustomer] = {
                    // idInstrument: element.idInstrument,
                    idService: [element.idService],
                    idCustomer: [element.idCustomer],
                    serviceNumber: [element.serviceNumber],
                    instrument: [...element.instrument],
                    report: [element.reportInstrument]
                }
            }
            else {
                // console.log(JSON.stringify(element.instrument).substring(0,20), 'ini data instrumennya cuy 2');
                dataz[element.nameCustomer].idService.push(element.idService)
                dataz[element.nameCustomer].idCustomer.push(element.idCustomer)
                dataz[element.nameCustomer].serviceNumber.push(element.serviceNumber)
                dataz[element.nameCustomer].instrument.push(...element.instrument)
                dataz[element.nameCustomer].report.push(element.reportInstrument)
            }
            idServiceCollection.push(element.idService)
            // console.log(dataz[element.nameCustomer].instrument, 'ini instrument dari data dataz')
            // console.log(dataz[element.nameCustomer].report, 'ini report dari data dataz')
        })
        // console.log(Object.keys(dataz) , 'ini si dataz');
        // console.log('ini id service vollection',idServiceCollection)
        setData(dataz)
        setIdService(idServiceCollection)

        // setLoad(false)
    }
    //   console.log('[close task wizard list] ====>',Object.keys(props.navigation.getParam('data')))
    //   console.log('[close task wizard list => report] ====>',props.navigation.getParam('data').report[0])
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
                {
                    data.length !== 0 && Object.entries(data).map((el, i) => {
                        let send = {
                            key: i,
                            customer: el[0],
                            idCustomer: el[1].idCustomer,
                            idService: el[1].idService,
                            serviceNumber: el[1].serviceNumber,
                            instrument: el[1].instrument,
                            // report: report,
                            requestTime: el[1].requestTime,
                            // checklist: checklist,
                        }
                        return (
                            <CardCustomer key={i} data={send}></CardCustomer>
                        )
                    })
                }
                {/* <Text>{JSON.stringify(props.selectedTask, 'utf8', 2)}</Text> */}
            </ScrollView>
            <View style={styles.downList}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('LpbdList', { data: { ...props.navigation.getParam('data') } })}
                    style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={textStyles.next}>NEXT</Text>
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
        marginTop: dimHeight * 0.1
    },
    scrollContainer: {
        height: dimHeight * 0.74,
        paddingTop: "2%"
    },
    downList: {
        backgroundColor: "#E6E6E6",
        height: dimHeight * 0.08,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
    },
    next: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskCloseList)
