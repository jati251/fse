import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux';
import IconFound from 'react-native-vector-icons/Foundation'
// import CustChild from './card-customer-child'
import DocumentPicker from 'react-native-document-picker';
const RNFS = require('react-native-fs');

const mapStateToProps = state => {
    return state
}

const _parent = (props) => {
    const [parent, setParent] = useState(false)
    const [multipleFile, setMultipleFile] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [docFile, setDoc] = useState([])

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
    function set(input) {
        // console.log('ini input yang ada di _parent', input)
        let setChange = {
            parent: props.parent.nameParent,
            value: input
        }
        props.changeValue(setChange)
    }
    function attachFileLocal(input) {
        // console.log('ini input yang ada di _parent', input)
        let attachFile = {
            parent: props.parent.nameParent,
            attachment: input
        }
        props.attach(attachFile)
    }

    return (
        <View style={viewStyles.container}>
            <View
            // style={}
            >
                <Text styles={textStyles.parentName}> {props.parent.nameParent} </Text>
            </View>
            <TextInput
                style={textStyles.textInput}
                placeholder={'type here...'}
                onChangeText={text => set(text)}
                onEndEditing={val => {
                    props.setHistory(val.nativeEvent.text)
                }}
                value={props.parent.value}
            />
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
    )
}

const viewStyles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        minHeight: 50,
        backgroundColor: '#CBCBCB',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center'
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
    parentName: {
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
export default connect(mapStateToProps, null)(_parent)
