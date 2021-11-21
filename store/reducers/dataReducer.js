import { SET_DATA } from "../actions";

const initialState = {
    data: []
}

export const dataReducer = (state={initialState}, action) => {
    switch(action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}