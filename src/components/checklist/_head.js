import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
// import Popover from 'react-native-popover-view';

import Parent from './_parent'
import IconFound from 'react-native-vector-icons/Foundation'
// import CustChild from './card-customer-child'
import DocumentPicker from 'react-native-document-picker';
const RNFS = require('react-native-fs');

const _head = (props) => {
    const [head, setHead] = useState(false)
    const [isParent, setParent] = useState(false)
    const [value, setValue] = useState(props.head.value)
    const [multipleFile, setMultipleFile] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [docFile, setDoc] = useState([])
    const [suggest, setSuggest] = useState(false)

    const _setBase64 = async (param) => {
        let newPic = param.map(async pic => {
            // console.log('ini pic',pic)
            pic.base64 = await RNFS.readFile(pic.uri, 'base64')
            pic.type = pic.type.split('/')[1]
            return pic
        })
        return await Promise.all(newPic)
    }

    const selectMultipleFile = async () => {
        //Opening Document Picker for selection of multiple file
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well find above
            });
            for (const res of results) {
                //Printing the log realted to the file
                // console.log('res : ' + JSON.stringify(res));
                // console.log('URI : ' + res.uri);
                // console.log('Type : ' + res.type);
                // console.log('File Name : ' + res.name);
                // console.log('File Size : ' + res.size);
            }
            //Setting the state to show multiple file attributes
            setMultipleFile(results)
            let images = []
            let docs = []
            results.forEach(el => {
                if (el.type.match(new RegExp('image'))) {
                    images.push(el)
                } else {
                    docs.push(el)
                }
            })
            setDoc(docFile.concat(docs))
            setImageFile(imageFile.concat(images))
            attachFileLocal(results)
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from multiple doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }
    useEffect(() => {
        props.head.parent.length === 0 ? setParent(true) : setParent(false)
    }, [])
    function touchHead() {
        // console.log('pencet kepala')
        setHead(!head)
    }
    function set(input) {
        // console.log('ini input yang ada di _head',input)
        let setChange = {}
        if (typeof input === 'object') {
            setChange = {
                ...input,
                head: props.head.name
            }
        } else {
            setChange = {
                head: props.head.name,
                parent: null,
                value: input
            }
        }
        props.changeValue(setChange)
    }
    function attachFileLocal(input) {
        let attaching = {
            head: props.head.name,
            attachment: input,
            parent: null
        }
        props.attach(attaching)
    }
    function attachFileParent(input) {
        let attaching = {
            ...input,
            head: props.head.name
        }
        props.attach(attaching)
    }
    return (
        <View style={viewStyles.container}>
            <TouchableOpacity
                onPress={() => touchHead()}
                style={viewStyles.content}>
                <Text style={textStyles.headName}>{props.head.name}</Text>
            </TouchableOpacity>
            {
                isParent && <View style={{ width: '100%', alignItems: 'center' }}>
                    <TextInput
                        style={textStyles.textInput}
                        placeholder={'type here...'}
                        onEndEditing={(val => {
                            // console.log('ini val on end editing',val.nativeEvent.text)
                            setSuggest(false)
                            props.setHistory(val.nativeEvent.text)
                        })}
                        onFocus={() => {
                            setSuggest(true)
                            // console.log(props.history)
                        }}
                        // ref={ref => setTouchable(ref)}
                        onChangeText={text => set(text)}
                        value={props.head.value}
                    />
                    {/* {
                        suggest && <ScrollView style={{Height:40, width: '95%', backgroundColor: 'orange'}}>
                                        {
                                            props.history.map((el,i) => {
                                                return <TouchableOpacity 
                                                    onPress={() => {
                                                        setSuggest(false)
                                                        console.log('ini dipiliiihhh cooookkkkk')
                                                    }}
                                                    key={i}
                                                    style={{width: '100%', height: 40}}>
                                                        <Text>{el}</Text>
                                                    </TouchableOpacity>
                                            })
                                        }
                                    </ScrollView>
                    } */}
                    {/* <Popover
                    isVisible={suggest}
                    fromView={touchable}
                    onRequestClose={() => this.closePopover()}>
                        <Text>I'm the content of this popover!</Text>
                    </Popover> */}
                    {
                        imageFile.length != 0 && <Text>{imageFile.length} Images file</Text>
                    }
                    {
                        docFile.length != 0 && <Text>{docFile.length} Documents file</Text>
                    }
                    <TouchableOpacity
                        onPress={selectMultipleFile.bind(this)}
                        style={viewStyles.attachment}>
                        <IconFound
                            name={'paperclip'}
                            size={20}
                            color={'#1C87D8'} />
                        <Text style={textStyles.attachment}> Attach File </Text>
                    </TouchableOpacity>
                </View>
            }
            {
                head && props.head.parent.map((parent, index) => {
                    return <Parent
                        parent={parent}
                        index={index}
                        key={index}
                        changeValue={set}
                        setHistory={props.setHistory}
                        history={props.history}
                        attach={attachFileParent} />
                })
            }
        </View>
    )
}
const viewStyles = StyleSheet.create({
    container: {
        // padding: 10, 
        width: '100%',
        minHeight: 50,
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 3
    },
    attachment: {
        height: 30,
        width: '90%',
        padding: 5,
        borderWidth: 2,
        borderColor: '#1C87D8',
        borderRadius: 3,
        paddingVertical: 15,
        margin: 5,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

const textStyles = StyleSheet.create({
    headName: {
        margin: 5
    },
    textInput: {
        height: 40,
        width: '95%',
        backgroundColor: 'white',
        borderColor: 'white', borderRadius: 3,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    attachment: {
        color: '#1C87D8'
    }
})
export default _head
