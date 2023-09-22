import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

//import component
import Head from './_head'

const _group = (props) => {

    const [group, setGroup] = useState(false)
    // console.log('ini props.groupnya', props.group)
    function touchGroup() {
        // console.log('terpencet')
        setGroup(!group)
    }

    function set(input) {
        // console.log('ini input di _group',input)
        let setChange = {
            ...input,
            group: props.group.group
        }
        props.changeValue(setChange)
    }
    function attachFileHead(input) {
        let attaching = {
            ...input,
            group: props.group.group
        }
        props.attach(attaching)
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => touchGroup()}
                style={viewStyles.content}>
                <Text> {props.group.group} </Text>
            </TouchableOpacity>
            {
                group && props.group.head.map((head, i) => {
                    return <Head
                        head={head}
                        index={i}
                        key={i}
                        changeValue={set}
                        setHistory={props.setHistory}
                        history={props.history}
                        attach={attachFileHead} />
                    // return <Text> terbuka </Text>
                })
            }
            {/* {
            head && <View>
            <TouchableOpacity 
            onPress={() => setParent(!parent)}
            style={{padding: 15, width: '100%', minHeight: 50, backgroundColor: 'orange'}} key={props.idx}>
                <Text> {props.elhead.name} </Text>
            </TouchableOpacity>
        {
            props.elhead.parent.length === 0 ? (
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        placeholder={'type here...'}
                        // onChangeText={text => onChangeText(text)}
                        value={props.elhead.value}
                        />
                        <TouchableOpacity style={{height: 30, width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: 'purple'}}>
                            <Text> Attach File </Text>
                        </TouchableOpacity>
                </View>
            ) : (
                <View>
                    {
                        props.elhead.parent.map((parent, ide) => {
                            return (
                                <Parent parent={parent} key={ide}/>
                            )
                        })
                    }
                </View>
            )
        }
        </View>
           } */}
        </View>
    )
}

const viewStyles = StyleSheet.create({
    content: {
        minHeight: 60,
        width: '100%',
        backgroundColor: 'white',
        padding: 5,
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})

export default _group
