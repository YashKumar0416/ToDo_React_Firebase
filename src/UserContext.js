export const initialState = null;

export const reducer = (state, action)=> {
    if(action.type === "PRESENT") {
        return action.payload
    }
    return state
}