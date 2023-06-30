import { INITIAL_STATE } from "./type";

const initiate = {
    isAuthenticated: false,
    finishInitiate: false,
    user: null,
    url: "/"
}

const GlobalReducer = (state = initiate, action: any) => {
    switch (action.type) {
        case INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default GlobalReducer;