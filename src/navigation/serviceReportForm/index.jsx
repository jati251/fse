import { createStackNavigator } from "react-navigation-stack"

import ServiceReportFormScreen from '../../screens/service_report_form/serviceReportForm'
import ProblemScreen from '../../screens/service_report_form/problem'
import AddProblemScreen from '../../screens/service_report_form/addProblem'
import PartScreen from '../../screens/service_report_form/part'
import CostScreen from '../../screens/service_report_form/cost'
import ServiceEngineerScreen from '../../screens/service_report_form/serviceEngineer'

export default StackServiceReport = createStackNavigator({
  ServiceReportFormScreen: {
    screen: ServiceReportFormScreen,
    navigationOptions: {
        header: null
        }
    },
  ProblemScreen: {
      screen: ProblemScreen,
      navigationOptions: {
        header: null
        }
    },
  AddProblemScreen: {
      screen: AddProblemScreen,
      navigationOptions: {
        header: null
        }
    },
  PartScreen: {
      screen: PartScreen,
      navigationOptions: {
        header: null
        }
    },
  CostScreen: {
      screen: CostScreen,
      navigationOptions: {
        header: null
        }
    },
  ServiceEngineerScreen: {
      screen: ServiceEngineerScreen,
      navigationOptions: {
        header: null
        }
    }
}, {
  initialRouteName: 'ServiceReportFormScreen'
})
