import * as actionTypes from './actionTypes'
import * as ServerAPI from '../../utils/ServerAPI'
import uuidv4 from 'uuid/v4'

export const addComment = (comment) => ({
    type: actionTypes.ADD_COMMENT,
    comment
})

export const saveComment = (comment) => dispatch => {
    const newComment = {
        ...comment,
        id: uuidv4(),
        timestamp: Date.now()
    }
    return ServerAPI
        .createComment(newComment)
        .then(data => {
            dispatch(addComment(data))
        })
}

export const removeComment = (comment) => ({
    type: actionTypes.DELETE_COMMENT,
    comment
})

export const sortComment = ({ property, ascending }) => ({
    type: actionTypes.SORT_COMMENT,
    property,
    ascending
})

export const updateCommentCount = ({ postId, value }) => ({
    type: actionTypes.UPDATE_COMMENT_COUNT,
    postId,
    value
})

export const deleteComment = (comment) => dispatch => {
    return ServerAPI
        .deleteComment(comment)
        .then(() => {
            dispatch(removeComment(comment))
        })
}

export const editComment = (comment) => ({
    type: actionTypes.EDIT_COMMENT,
    comment
})

export const updateCommentVoteScore = (comment, option) => dispatch => {
    return ServerAPI
        .VoteComment(comment, option)
        .then(data => {
            dispatch(editComment(data))
        })
}

export const updateComment = (comment) => dispatch => {
    return ServerAPI
        .updateComment(comment)
        .then(data => {
            dispatch(editComment(data))
        })
}