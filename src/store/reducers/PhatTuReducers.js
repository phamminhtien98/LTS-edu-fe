const initialState = {
    value: null,
    activeId: null
}

const PhatTuReducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                value: action.payload,
            };
        case "SET":
            return {
                ...state,
                value: action.payload,
            };
        default:
            return state;
    }
}
export default PhatTuReducers;