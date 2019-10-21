const initialState = {
    reports: []
};

export default function(state= initialState, action) {
    switch(action.type) {
        case 'POST_REPORT':
            return {
                ...state,
                reports: action.payload
            }
        default:
            return state;
    }
}