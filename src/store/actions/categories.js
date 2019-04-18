import * as actionTypes from './actionTypes'
import * as ServerAPI from '../../utils/ServerAPI'

export const loadCategories = (categories) => ({
    type: actionTypes.LOAD_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    ServerAPI
        .getAllCategories()
        .then(categories => {
            dispatch(loadCategories(categories))
        })
);