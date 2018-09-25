import { combineReducers } from 'redux'
import todos from './todo'
import filters from './filter'


const todoApp = combineReducers({
    todos,
    filters
})

export default todoApp