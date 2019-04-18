import * as actionTypes from '../actions/actionTypes'

function categories (state = [], action){
    switch(action.type){
        case actionTypes.LOAD_CATEGORIES:
        return action.categories
      default:
        return state
    }
}

export default categories