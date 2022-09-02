import { available_on_type, get_movies_images, InitialState, results, short_videos } from "./initialState"

interface ActionType {
    type : string
    loading : boolean
    available_on : Array<available_on_type>
    get_movies_info : Array<results>
    get_movies_images : get_movies_images
    get_short_videos : Array<short_videos>
    user : String
}

export const actionType = {
    SET_LOADING : 'SET_LOADING',
    SET_AVAILABLE_ON : 'SET_AVAILABLE_ON',
    SET_MOVIES_INFO : 'SET_MOVIES_INFO',
    SET_MOVIES_IMAGES : 'SET_MOVIES_IMAGES',
    SET_SHORT_MOVIES : 'SET_SHORT_VIDEOS',
    SET_USER : 'SET_USER'
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
        case actionType.SET_MOVIES_INFO:
            return {
                ...state,
                get_movies_info : action.get_movies_info
            }
        case actionType.SET_MOVIES_IMAGES:
            return {
                ...state,
                get_movies_images : action.get_movies_images
            }
        case actionType.SET_SHORT_MOVIES:
            return {
                ...state,
                get_short_videos : action.get_short_videos
            }
        case actionType.SET_USER:
            return {
                ...state,
                user : action.user
            }
        default : 
            return state
    }
}