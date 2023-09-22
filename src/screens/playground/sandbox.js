import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
var RNFS = require('react-native-fs');


export default function sandbox() {
    const [status, setStatus] = useState('unknown')
    const [statusdir, setStatusdir] = useState('unknown')
    const [statusdel, setStatusdel] = useState('unknown')
    const [readfilefromdevice, setreadfilefromdevice] = useState('empty')

    let path = RNFS.ExternalStorageDirectoryPath + '/Android/data/diaprofile/test.txt';
    let makefolderpath = RNFS.ExternalStorageDirectoryPath + '/Android/data/diaprofile/';

    useEffect(() => {
        askpermission()
    }, [])

    function writefile() {
        // let path = RNFS.DocumentDirectoryPath + '/test.jpg';

        RNFS.writeFile(path, 'Jika ada yang harus dibicarakan segera saja bicarakan sekarang', 'utf8')
            .then(() => {
                setStatus('FILE WRITTEN!')
            })
            .catch((err) => {
                setStatus(JSON.stringify(err.message));
            });
    }

    function makefolder() {
        RNFS.mkdir(makefolderpath)
            .then((result) => {
                // console.log('result', result)
                setStatusdir('FOLDER WRITTEN !')
            })
            .catch((err) => {
                console.warn('err', err.message)
                setStatusdir(err.message)
            })
    }

    function deletefile() {
        return RNFS.unlink(path)
            .then(() => {
                //   console.log('FILE DELETED');
                setStatusdel('FILE DELETED')
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.error(err.message);
                setStatusdel(err.message)
            });
    }

    async function readfilez() {
        try {
            let filereaded = await RNFS.readFile(path, 'utf8')
            // console.log('ini file readed ===> ',filereaded,)
            setreadfilefromdevice(filereaded)
        } catch (err) {
            console.log(err.message)
            setreadfilefromdevice(err.message)
        }
    }

    function askpermission() {
        requestMultiple([
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.CAMERA
        ])
    }

    return (
        <View>
            {/* <Text> Path : {RNFS.DocumentDirectoryPath}</Text> */}
            <Text> External Path : {RNFS.ExternalStorageDirectoryPath}</Text>
            <View style={{ marginTop: 50 }}>
                <Button title="Create File" color="skyblue" onPress={() => writefile()} />
                <Text>{status}</Text>
                <Button title="Create Folder" color="skyblue" onPress={() => makefolder()} />
                <Text>{statusdir}</Text>
                <Button title="delete file" color="skyblue" onPress={() => deletefile()} />
                <Text>{statusdel}</Text>
            </View>
            <View style={{ marginTop: 50 }}>
                <Text>permision list</Text>

            </View>
            <View style={{ marginTop: 100 }}>
                <Button title="read file" color="skyblue" onPress={() => readfilez()} />
                <Text>{readfilefromdevice}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})
