import * as actionTypes from '../actions/actionTypes'
import { sortFunc } from '../../utils'

function comments(state = [], action) {
    switch (action.type) {
        case actionTypes.LOAD_POST_COMMENTS:
            return action.comments
        case actionTypes.ADD_COMMENT:
            const { comment } = action
            return state.concat([comment])
        case actionTypes.EDIT_COMMENT:
            return state.map(c => c.id === action.comment.id ? { ...c, ...action.comment } : c)
        case actionTypes.DELETE_COMMENT:
            return state.filter(c => c.id !== action.comment.id)
        case actionTypes.SORT_COMMENT:
            return sortFunc(state, action.property, action.ascending)
        default:
            return state
    }
}

export default comments