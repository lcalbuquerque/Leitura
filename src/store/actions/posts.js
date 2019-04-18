import * as actionTypes from './actionTypes'
import * as ServerAPI from '../../utils/ServerAPI'
import uuidv4 from 'uuid/v4'

export const addPost = (post) => ({
    type: actionTypes.ADD_POST,
    post
})

export const savePost = (post) => dispatch => {
    const newPost = {
        ...post,
        id: uuidv4(),
        timestamp: Date.now()
    }
    return ServerAPI
        .createPost(newPost)
        .then(data => {
            dispatch(addPost(data))
        })
}

export const removePost = (post) => ({
    type: actionTypes.REMOVE_POST,
    post
})

export const deletePost = (post) => dispatch => {
    return ServerAPI
        .deletePost(post)
        .then(() => {
            dispatch(removePost(post))
        })
}

export const editPost = (post) => ({
    type: actionTypes.EDIT_POST,
    post
})

export const sortPost = ({ property, ascending }) => ({
    type: actionTypes.SORT_POST,
    property,
    ascending
})

export const updatePost = (post) => dispatch => {
    return ServerAPI
        .updatePost(post)
        .then(data => {
            dispatch(editPost(data))
        })
}

export const updatePostVoteScore = (post, option) => dispatch => {
    return ServerAPI
        .VotePost(post, option)
        .then(data => {
            dispatch(editPost(data))
        })
}

export const loadPostComments = (comments) => ({
    type: actionTypes.LOAD_POST_COMMENTS,
    comments
})

export const getPostComments = (postId) => dispatch => {
    return ServerAPI
        .getPostComments(postId)
        .then((comments) => {
            dispatch(loadPostComments(comments))
        })
}

export const loadPosts = (posts) => ({
    type: actionTypes.LOAD_POSTS,
    posts
})

export const fetchPosts = () => dispatch => (
    ServerAPI
        .getAllPosts()
        .then(posts => {
            dispatch(loadPosts(posts))
        })
)