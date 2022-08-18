import React from "react"

export const StateContext = React.createContext({} as any)

type StateProp = {
    reducer: any,
    initialState: any,
    children: any,
}

export const StateProvider : React.FC<StateProp> = ({reducer, initialState, children}) => {
    return (
        <StateContext.Provider value={React.useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => React.useContext(StateContext)