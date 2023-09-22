import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import DocumentPicker from 'react-native-document-picker';
import IconIon from 'react-native-vector-icons/Ionicons'
const RNFS = require('react-native-fs');
import AsyncStorage from "@react-native-async-storage/async-storage";

//import component
import ChecklistComp from '../components/checklist/checkboxComponent'

import { trigger } from '../stores/action'

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = {
    trigger
}
const checklistNew = (props) => {
    //Usestate
    const [checklist, setChecklist] = useState(false)
    const [attachment, setAttachment] = useState(false)
    const [multipleFile, setMultipleFile] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [docFile, setDoc] = useState([])
    const [render, setRender] = useState('checklist')
    const [checkListData, setChecklistData] = useState(props.navigation.getParam('data').checklistInstrument)

    //useEffect
    useEffect(() => {
        getChecklistData()
        // let { customerName, customerId, idService } = props.navigation.getParam('customer')
        // console.log(idService , 'ini adalah id servicenya')
    }, [])

    //Fuunction
    const _setBase64 = async (param) => {
        let newPic = param.map(async pic => {
            // console.log('ini pic',pic)
            pic.base64 = await RNFS.readFile(pic.uri, 'base64')
            let type = pic.name.split('.')
            pic.type = type[type.length - 1]
            return pic
        })
        return await Promise.all(newPic)
    }

    const deleteImage = async (param) => {
        let data = imageFile
        let wantedData = data.filter(el => el !== param)
        setImageFile(wantedData)
    }

    const deleteDoc = async (param) => {
        let data = docFile
        let wantedData = data.filter(el => el !== param)
        setDoc(wantedData)
    }

    const selectMultipleFile = async () => {
        //Opening Document Picker for selection of multiple file
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well find above
            });
            // for (const res of results) {
            //     //Printing the log realted to the file
            //     console.log('res : ' + JSON.stringify(res));
            //     console.log('URI : ' + res.uri);
            //     console.log('Type : ' + res.type);
            //     console.log('File Name : ' + res.name);
            //     console.log('File Size : ' + res.size);
            // }

            //Setting the state to show multiple file attributes
            setMultipleFile(results)
            let images = []
            let docs = []
            results.forEach(el => {
                if (el.size < 3000000) {
                    if (el.type.match(new RegExp('image'))) {
                        images.push(el)
                    } else {
                        docs.push(el)
                    }
                } else {
                    throw ('file size max 3 mb')
                }
            })
            setDoc(docFile.concat(docs))
            setImageFile(imageFile.concat(images))
            // attachFileLocal(results)
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from multiple doc picker');
            } else {
                //For Unknown Error
                alert('Error: ' + JSON.stringify(err));
                // throw err;
            }
        }
    }

    const getChecklistData = () => {
        let group = {}
        checkListData.map((el, ind) => {
            if (group[el.GroupCheck] === undefined) {
                if (el.parentCheckItem.length == 0) {
                    el.checkValue = false
                    el.checkAction.length !== 0 ? el.actionValue = el.checkAction[0] : el.actionValue = null
                    group[el.GroupCheck] = [el]
                }
            } else {
                if (el.parentCheckItem.length == 0) {
                    el.checkValue = false
                    el.checkAction.length !== 0 ? el.actionValue = el.checkAction[0] : el.actionValue = null
                    group[el.GroupCheck].push(el)
                }
            }
        })
        setChecklistData(group)
    }
    const changeValue = (input) => {
        let newChecklist = { ...checkListData }
        newChecklist[input.group] = input.data
        setChecklistData(newChecklist)
    }
    const done = async () => {
        let sendChecklist = []
        Object.keys(checkListData).forEach(data => {
            sendChecklist.push(...checkListData[data])
        })

        try {
            let { customerName, customerId, idService } = props.navigation.getParam('customer')
            let base64Doc = await _setBase64(docFile)
            let base64Image = await _setBase64(imageFile)
            let sendToAsync = {
                customerName: customerName,
                idCustomer: customerId,
                idService: idService,
                checklistData: sendChecklist,
                attachment: JSON.stringify([...base64Image, ...base64Doc])
            }
            // await AsyncStorage.removeItem(`instrumentChecklist-${props.selectedTask.idTask}-${idService}`)
            await AsyncStorage.setItem(`instrumentChecklist-${props.selectedTask.idTask}-${idService}`, JSON.stringify(sendToAsync))
            await props.trigger()
            // console.log('[SEND TO ASYNC => attachment]', sendToAsync.attachment)
            // console.log(`instrumentChecklist-${props.selectedTask.idTask}-${idService}`)
            props.navigation.navigate('Task')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <View style={viewStyles.container}>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => setChecklist(!checklist)}
                    style={viewStyles.titleBox}>
                    <Text>Checklist</Text>
                </TouchableOpacity>
                {
                    checklist && Object.keys(checkListData).map((el, indx) => {
                        return <View key={indx}>
                            <View style={viewStyles.title}>
                                <Text>{el}</Text>
                            </View>
                            <ChecklistComp
                                list={checkListData[el]}
                                checklistValue={changeValue} />
                        </View>
                    })
                }
                <TouchableOpacity
                    onPress={selectMultipleFile.bind(this)}
                    style={viewStyles.titleBox}>
                    <Text> Attach File </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 13, marginLeft: '2%', color: '#4a4a4d' }}> *Max file size : 3 mb</Text>
                {
                    imageFile.length !== 0 && <View>
                        <Text style={{ marginVertical: 10 }}> Image Attachment </Text>
                        {
                            imageFile.map((el, index) => {
                                // console.log('ini elnya cuy',el)
                                return <View style={viewStyles.attachment} key={index}>
                                    <View style={viewStyles.atta}>
                                        <Image
                                            style={{ width: 40, height: 40, marginHorizontal: 7, borderRadius: 1 }}
                                            source={{ uri: el.uri }}
                                        />
                                        <Text style={{ fontSize: 14, paddingVertical: 10 }}>{el.name.length > 50 ? `${el.name.substring(0, 45)}...` : el.name}</Text>
                                    </View>
                                    <TouchableWithoutFeedback
                                        onPress={() => deleteImage(el)}>
                                        <IconIon
                                            name={'ios-remove-circle'}
                                            size={20}
                                            color={'red'}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            })
                        }
                    </View>
                }
                {
                    docFile.length !== 0 && <View>
                        <Text style={{ marginVertical: 10 }}> Document Attachment </Text>
                        {
                            docFile.map((el, index) => {
                                return <View style={viewStyles.attachment} key={index}>
                                    <View style={viewStyles.atta}>
                                        <Image
                                            style={{ width: 40, height: 40, marginHorizontal: 7, borderRadius: 1 }}
                                            source={{ uri: el.uri }}
                                        />
                                        <Text style={{ fontSize: 14, paddingVertical: 10 }}>{el.name.length > 50 ? `${el.name.substring(0, 45)}...` : el.name}</Text>
                                    </View>
                                    <TouchableWithoutFeedback
                                        onPress={() => deleteDoc(el)}>
                                        <IconIon
                                            name={'ios-remove-circle'}
                                            size={20}
                                            color={'red'}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            })
                        }
                    </View>
                }
            </ScrollView>
            <View style={viewStyles.downList}>
                <TouchableOpacity
                    onPress={() => done()}
                    style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'gray' }}>DONE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const viewStyles = StyleSheet.create({
    container: {
        paddingTop: hp('10%'),
        alignItems: 'center',
        flex: 1
    },
    titleBox: {
        height: 55,
        width: wp('95%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        marginTop: hp('2%'),
        borderRadius: 3
    },
    attachment: {
        width: wp('95%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 5
    },
    atta: {
        flexDirection: 'row',
        marginBottom: 3
    },
    downList: {
        backgroundColor: "#E6E6E6",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: hp("10%"),
        width: wp('100%'),
        padding: 10,
        bottom: 0,
    },
    title: {
        width: wp('95%'),
        height: hp('7%'),
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginTop: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(checklistNew)
