export interface available_on_type {
    link: string,
    name: string,
    price: string,
    thumbnail: string
}

export interface InitialState {
    loading : boolean
    available_on : Array<available_on_type>
}

export const initialState : InitialState = {
    loading : false,
    available_on : []
}