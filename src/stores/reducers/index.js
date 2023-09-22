const initState = {
    isLogin: false,
    isLoading: false,
    access_token: null,
    refresh_token: null,
    taskWaiting: null,
    taskComplete: [],
    selectedTask: null,
    selectedInstrument: null,
    taskActive: [],
    nav: null,
    instrumentPending: [],
    loggedUser: null,
    serviceReport: {
        idService: null,
        serviceReportNumber: null,
        sumTotalReal: null,
        persenDiscount: null,
        sumDiscount: null,
        laborTime: null,
        travelTime: null,
        subTotal: null,
        persenTax: null,
        sumTax: null,
        sumTotalFinish: null,
        selectedInstrument: null,
    },
    trigger: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return ({
                ...state,
                isLoading: action.payload
            })
        case 'SET_PENDING':
            return ({
                ...state,
                instrumentPending: state.instrumentPending.concat([action.payload])
            })
        case 'SET_TRIGGER':
            return ({
                ...state,
                trigger: action.payload
            })
        case "SET_PENDING_FIRST":
            return ({
                ...state,
                instrumentPending: action.payload
            })
        case "SET_COMPLETE_FIRST":
            return ({
                ...state,
                taskComplete: action.payload
            })
        case 'CHANGE_LOGIN':
            return ({
                ...state,
                isLogin: !state.isLogin,
                access_token: action.access_token,
                refresh_token: action.refresh_token
            })
        case 'TASK_WAITING':
            return ({
                ...state,
                taskWaiting: action.payload
            })
        case 'TASK_COMPLETE':
            return ({
                ...state,
                taskComplete: action.payload
            })
        case 'SET_SELECTED_TASK':
            return ({
                ...state,
                selectedTask: action.payload
            })
        case 'SET_SELECTED_INSTRUMENT':
            return ({
                ...state,
                selectedInstrument: action.payload
            })
        case 'TASK_ACTIVE':
            return ({
                ...state,
                taskActive: action.payload
            })
        case 'SET_NAVIGATION':
            return ({
                ...state,
                nav: action.payload
            })
        case 'SET_USER':
            // console.log('action.payloadnya ya : ', action.payload)
            return ({
                ...state,
                loggedUser: action.payload
            })
        case 'SET_REPORT_SERVICE':
            return ({
                ...state,
                serviceReport: {
                    ...state.serviceReport,
                    ...action.payload
                }
            })
        case 'SET_SERVICE_REPORT':
            return ({
                ...state,
                serviceReport: {
                    ...action.payload
                }
            })
        default:
            return state
    }
}