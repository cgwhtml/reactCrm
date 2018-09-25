const filters = (state = '', action) =>{
    switch (action.type) {
        case 'SET_COMFIRM':
            return action.filter
        default:
            return state
    }
}
export default filters;