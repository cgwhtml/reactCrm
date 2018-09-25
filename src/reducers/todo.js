const todos = (state = [], action) => {
    switch (action.type) {
        case 'SET_BREADCRUMB_ITEM':
            return [
                ...state,
                {
                    item:action.item
                }
            ];
        default:
            return state
    }
}

export default todos