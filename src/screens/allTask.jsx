import React from 'react'
import {
    View,
    Button,
    ToastAndroid,

} from 'react-native'
import RNBackgroundDownloader from 'react-native-background-downloader';
import FileViewer from 'react-native-file-viewer'

const allTask = () => {

    async function download(name) {
        // let jalan = RNFS.DocumentDirectoryPath + `/${name}.txt`;
        let path = `/storage/emulated/0/diapro/${name}.jpg`
        let task = await RNBackgroundDownloader.download({
            id: 'file123',
            url: 'https://www.gamereactor.asia/media/72/monsterhuntergenerations_2457273t.jpg',
            // destination: `${RNBackgroundDownloader.directories.documents}/${name}.jpg`,
            destination: path,
        }).begin((expectedBytes) => {
            console.log(`Going to download ${expectedBytes} bytes!`);
        }).progress((percent) => {
            console.log(`Downloaded: ${percent * 100}%`);
        }).done(() => {
            console.log('Download is done!');
            // console.log('ini directorynya background download',RNBackgroundDownloader.directories.documents)
            FileViewer.open(path)
            ToastAndroid.showWithGravityAndOffset(
                "Your file has been downloaded to downloads folder!",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25, 50
            );
        }).error((error) => {
            console.log('Download canceled due to error: ', error);
        });
        console.log('ini tasknya , gatau apaan', task)
    }


    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 50
        }}>
            <Button
                title="Press me"
                color="#f194ff"
                onPress={() => download('mh' + 'empat')}
            />
        </View>
    )
}

export default allTask
