import React from 'react'
import { createStackNavigator } from "react-navigation-stack"
import Home from '../../screens/Home'
import TaskTab from './taskTab'
import Header from '../../components/home/header'
import TaskWaiting from './taskWaiting'
import ServiceReportFormStack from '../serviceReportForm'
// import ChecklistFormScreen from '../../screens/checkListForm'
import ChecklistFormScreen from '../../screens/checklistNew'
import AcceptedFormScreen from '../../screens/AcceptedForm'
import TaskCloseWizardScreen from '../../screens/taskClosedWizard'
import TaskCloseWizardScreenList from '../../screens/taskClosedWizardList'
import TaskCloseWizardScreenLPBD from '../../screens/taskClosedWizardLPBD'
import TaskCloseWizardScreenPart from '../../screens/taskClosedWizardPart'


export default StackHome = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Task Wizard'} />
    })
  },
  Task: {
    screen: TaskTab,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  },
  TaskWaiting: {
    screen: TaskWaiting,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  },
  TaskReport: {
    screen: ServiceReportFormStack,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Service Report'} />
    })
  },
  ChecklistFormScreen: {
    screen: ChecklistFormScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Checklist'} />
      // header: null
    })
  },
  Camera: {
    screen: AcceptedFormScreen,
    navigationOptions: {
      header: null
    }
  },
  TaskCloseWizard: {
    screen: TaskCloseWizardScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Task Close Wizard'} />
    })
  },
  CloseList: {
    screen: TaskCloseWizardScreenList,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Task Close Wizard'} />
    })
  },
  LpbdList: {
    screen: TaskCloseWizardScreenLPBD,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Task Close Wizard'} />
    })
  },
  PartList: {
    screen: TaskCloseWizardScreenPart,
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} title={'Task Close Wizard'} />
    })
  }
}, {
  initialRouteName: 'Home'
})