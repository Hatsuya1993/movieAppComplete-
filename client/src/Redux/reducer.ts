import { available_on_type, InitialState } from "./initialState"

interface ActionType {
    type : string
    loading : boolean
    available_on : Array<available_on_type>
}

export const actionType = {
    SET_LOADING : 'SET_LOADING',
    SET_AVAILABLE_ON : 'SET_AVAILABLE_ON'
}

export const reducer = (state: InitialState, action: ActionType) => {
    switch(action.type) {
        case actionType.SET_LOADING:
            return {
                ...state,
                loading : action.loading
            }
        case actionType.SET_AVAILABLE_ON:
            return {
                ...state,
                available_on : action.available_on
            }
        default : 
            return state
    }
}