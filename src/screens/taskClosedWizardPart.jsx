import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { sendReport } from '../stores/action'
const RNFS = require('react-native-fs');

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    sendReport
}

const taskClosedWizard = (props) => {
    const [detail, setDetail] = useState(true)
    const part = props.selectedTask.part.detail
    const report = props.navigation.getParam('data').report
    const idTask = props.navigation.getParam('data').idTask
    const idService = props.navigation.getParam('data').idService
    const [used, setUsed] = useState(null)
    const [notUsed, setNotUsed] = useState(null)
    const [total, setTotal] = useState(0)
    const [partOnHand, setPartOnHand] = useState(0)
    const [partUsed, setPartUsed] = useState(0)
    const [modalDone, setModalDone] = useState(false)
    const [load, setLoad] = useState(false)
    const [partChecked, setPartChecked] = useState(false)

    useEffect(() => {
        _getPart()
    }, [])

    function _getPart() {
        let partUsed = {}
        let total = 0
        let partuse = 0

        report.forEach((element, i) => {
            if (element.part.length) {
                partuse += element.part[0].qty
                if (!partUsed[element.part[0].name]) {
                    partUsed[element.part[0].name] = 0
                }
                partUsed[element.part[0].name] += element.part[0].qty
            }
        })

        let x = { ...partUsed }
        setUsed(partUsed)

        part.forEach(el => {
            total += el.qty
            if (!x[el.part]) {
                x[el.part] = el.qty
            } else {
                x[el.part] = Math.abs(x[el.part] - el.qty)
            }
        })
        setNotUsed(x)
        setTotal(total)
        setPartUsed(partuse)
        setPartOnHand(total - partuse)
        setPartChecked(true)
    }

    async function processHead(input) {
        //disini untuk menmodifikasi head attachmentnya
        // console.log('ini input di fungsi head',input)
        try {
            let newArr = await input.map(async (el, index) => {
                // console.log('ini elnya si head',el.atttachment)
                if (el.parent.length != 0) {
                    return processParent(el.parent)
                } else {
                    if (!el.attachment) {
                        // console.log('kosong cuyyy~~')
                        // return null
                    } else {
                        // console.log('ada isinya')
                        try {
                            let baru = await el.attachment.map(async eli => {
                                try {
                                    // console.log('kepanggil')
                                    const atta = await RNFS.readFile(eli.uri, 'base64')
                                    return atta
                                } catch (error) {

                                }
                            })
                            // console.log('121212', baru)
                        } catch (error) {
                            // console.log('ini error', error)
                        }
                    }
                }
            })
            return newArr
        } catch (error) {

        }
    }
    function processParent(input) {
        //disini untuk menmodifikasi parent attachmentnya
        // console.log('ini input di fungsi parent',input)
        let newArr = input.map(async (el, index) => {
            // if (!el.attachment) {
            //     console.log('kosong boss attachmentnya')
            // } else {
            //     console.log('berisi nih')
            // }
        })
        return newArr
    }
    // async function processChecklistData(input) {
    //     // console.log('ini inputan',input)
    //     let barbar = await input.map(async (el, index) => {
    //         try {
    //             return el.head.length != 0 ? processHead(el.head) : { ...el }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })
    //     // console.log('ini hasilnya yang diubah',input)
    //     return barbar
    // }

    async function done() {
        // console.log('MASUK KE FUNGSI DONENYA');
        let master = { ...props.navigation.getParam('data') }
        // return console.log('BERHENTI ASU');
        // console.log('INI MASTER');
        // console.log(master.master.report);
        let temp = master.master.report.map(prob => {

            let newPic = typeof prob.problemattachment.pictures == 'string' ? JSON.parse(prob.problemattachment.pictures) : prob.problemattachment.pictures

            let newDoc = typeof prob.problemattachment.documents == 'string' ? JSON.parse(prob.problemattachment.documents) : prob.problemattachment.documents

            let newAttachment = typeof prob.checklist.attachment === 'string' ? JSON.parse(prob.checklist.attachment) : prob.checklist.attachment

            prob.problemattachment.pictures = newPic
            prob.problemattachment.documents = newDoc
            prob.checklist.attachment = newAttachment

            return prob

        })
        master.master.report = temp
        // return console.log('[ INI MASTER SETELAH PROSES ]', JSON.stringify(temp))
        props.sendReport(master.master, props.navigation)

        // console.log('INI MASTERNYA', master.master.report[0].problemattachment);
        // return console.log('BERHENTI');
        // console.log("=================================================");
    }
    return (
        <View style={viewStyles.container}>
            <Modal
                animationType="none"
                transparent={true}
                visible={props.isLoading}>
                <View style={viewStyles.loading}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            </Modal>
            <View style={viewStyles.headerExtend}></View>
            <View style={viewStyles.content}>
                <View onPress={() => setDetail(!detail)} style={viewStyles.taskBox}>
                    {/* return part */}
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingRight: 10, width: '100%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Return Part</Text>
                    </View>
                    {/* total part */}
                    <View style={{ height: 1, width: "100%", alignSelf: 'center', backgroundColor: 'gray', opacity: 0.5, marginVertical: 10 }} />
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={{ color: 'gray', fontSize: 17 }}>Total Part : {total} </Text>
                    </View>

                    {/* separator line */}
                    <View style={{ height: 1, width: "100%", alignSelf: 'center', backgroundColor: 'gray', opacity: 0.5, marginVertical: 10 }} />

                    {/* part used */}
                    <View style={{ flex: 1, flexDirection: 'row', width: "100%", justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text> Part Used</Text>
                        <Text> {partUsed} </Text>
                    </View>

                    {/* separator line */}
                    <View style={{ height: 1, width: "100%", alignSelf: 'center', backgroundColor: 'gray', opacity: 0.5, marginVertical: 10 }} />

                    {/* part list */}
                    {/* sudah ditambah scrollview, tapi harus ditest dulu untuk melihat hasil jadinya seperti apa */}
                    <View style={{ justifyContent: 'flex-start', width: '100%', maxHeight: 125, paddingHorizontal: 20, paddingVertical: 5 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                used !== null && Object.entries(used).map((el, i) => {
                                    return (
                                        <Text key={i}>{el[0]} ({el[1]})</Text>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{ marginVertical: 10 }} />

                    {/* part on hand */}
                    <View style={{ flex: 1, flexDirection: 'row', width: "100%", justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text> Part on Hand</Text>
                        <Text> {partOnHand} </Text>
                    </View>

                    {/* spearator line */}
                    <View style={{ height: 1, width: "100%", alignSelf: 'center', backgroundColor: 'gray', opacity: 0.5, marginVertical: 10 }} />

                    {/* list part on hand */}
                    <View style={{ justifyContent: 'flex-start', width: '100%', maxHeight: 125, paddingHorizontal: 20, paddingVertical: 5 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                notUsed !== null && Object.entries(notUsed).map((el, i) => {
                                    return (
                                        <Text key={i}>{el[0]} ({el[1]})</Text>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
                {/* <ScrollView style={{height : hp('100%')}}>
                    <Text>{JSON.stringify(props.navigation.getParam('data').idTask, 'utf8',2)}</Text>
                    <Text>{JSON.stringify(props.navigation.getParam('data').idService, 'utf8',2)}</Text>
                </ScrollView> */}
            </View>
            <View style={viewStyles.bottomBar}>
                <TouchableOpacity
                    onPress={() => setModalDone(!modalDone)}>
                    <Text style={textStyles.next}>DONE</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalDone}
                onRequestClose={() => {
                    setModalDone(!modalDone)
                }}
            >
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(100,100,100, 0.5)',
                    padding: 20,
                    borderRadius: 6
                }}>
                    <View
                        style={{ width: wp("70%"), height: hp('25%'), backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center', borderRadius: 2 }} >
                        <View
                            style={{ flex: 3, justifyContent: 'center', width: "100%", paddingLeft: "5%" }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Close Task?</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1, width: "100%", flexDirection: 'row', paddingRight: 20 }}>
                            <TouchableOpacity
                                onPress={() => setModalDone(!modalDone)}
                            >
                                <Text style={{ color: "#299BE8", fontWeight: 'bold' }}>CANCEL</Text>
                            </TouchableOpacity>
                            <View style={{ margin: 20 }}></View>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalDone(!modalDone)
                                    done()
                                }}
                                disabled={!partChecked}
                            >
                                <Text style={{ color: "#299BE8", fontWeight: 'bold' }}>SAVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

const viewStyles = StyleSheet.create({
    container: {
        paddingTop: hp('10%'),
        height: hp('97%'),
        flex: 1,
        justifyContent: 'space-between'
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#606070',
        opacity: 0.5
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    next: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(taskClosedWizard)
