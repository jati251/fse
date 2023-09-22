import { CheckBox } from '@rneui/themed'
import React from 'react'
import { View, Text } from 'react-native'
import RadioForm from 'react-native-radio-form'

const checklistComponent = (props) => {

    //function
    const setData = (input) => {
        // console.log('ini input',input)
        let newData = props.list.map((el) => {
            return el.idCheckitem === input.data.idCheckitem ? { ...el, checkValue: !el.checkValue } : { ...el }
        })
        props.checklistValue({
            group: input.data.GroupCheck,
            data: newData
        })
    }
    const chosenAction = (input) => {
        let newData = props.list.map(el => {
            return el.HeadcheckItemName === input.head ? { ...el, actionValue: input.value } : { ...el }
        })
        props.checklistValue({
            group: input.group,
            data: newData
        })
    }

    return (
        <View>
            <Text>{
                // JSON.stringify(props.list,'utf8',2)
            }</Text>
            {
                props.list.map((ele, idx) => {
                    // console.log('ini elek',ele)
                    return <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        key={idx}>
                        <CheckBox
                            title={ele.HeadcheckItemName}
                            checked={ele.checkValue}
                            containerStyle={{ width: '95%' }}
                            onPress={() => setData({ data: ele })}
                        />
                        {
                            ele.checkAction.length !== 0 ? <RadioForm
                                style={{ width: '95%' }}
                                dataSource={ele.checkAction}
                                itemShowKey="actionItem"
                                itemRealKey="actionItem"
                                circleSize={16}
                                onPress={(item) => chosenAction({
                                    group: ele.GroupCheck,
                                    head: ele.HeadcheckItemName,
                                    value: item
                                })}
                            /> : null
                        }
                    </View>
                })
            }
        </View>
    )
}

export default checklistComponent
