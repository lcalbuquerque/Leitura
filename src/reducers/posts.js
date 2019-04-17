import * as actionTypes from '../actions/actionTypes'
import { sortFunc } from '../utils'

function posts(state = [], action) {
    switch (action.type) {
        case actionTypes.LOAD_POSTS:
            return action.posts
        case actionTypes.ADD_POST:
            const { post } = action
            return state.concat([post])
        case actionTypes.EDIT_POST:
            return state.map(p => p.id === action.post.id ? { ...p, ...action.post } : p)
        case actionTypes.REMOVE_POST:
            return state.filter(p => p.id !== action.post.id)
        case actionTypes.SORT_POST:
            return sortFunc(state, action.property, action.ascending)
        case actionTypes.UPDATE_COMMENT_COUNT:
            return state.map(p => {
                if (p.id === action.postId) {
                    return {
                        ...p,
                        commentCount: p['commentCount'] + action.value
                    }
                }
                return p
            })
        default:
            return state
    }
}

export default posts