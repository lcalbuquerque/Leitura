import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CommentsList from '../Comment/CommentsList'
import { getPostComments } from '../../store/actions/posts'
import { sortComment } from '../../store/actions/comments'
import PropTypes from 'prop-types'
import { SORT_OPTIONS } from '../../utils'

class PostDetails extends Component {

    componentDidMount() {
        const { loadComments, sortComment, postId } = this.props
        loadComments(postId)
            .then(
                () => sortComment({
                    property: SORT_OPTIONS.Score_Desc.prop,
                    ascending: SORT_OPTIONS.Score_Desc.asc
                })
            )
    }

    render() {

        const { post, handleOpenPostModal } = this.props

        console.log(post)

        return (
            <div>
                {post &&
                    <div>
                        <Post post={post} handleOpenPostModal={handleOpenPostModal} />
                        <CommentsList postParentId={post.id} />
                    </div>}
                {!post &&
                    <div style={{ marginTop: '200px', marginLeft: '400px' }}>
                        Post not found or deleted !
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts.find(p => p.id === ownProps.postId) }
}

function mapDispatchToProps(dispatch) {
    return {
        loadComments: (postId) => dispatch(getPostComments(postId)),
        sortComment: (option) => dispatch(sortComment(option))
    }
}

PostDetails.propTypes = {
    handleOpenPostModal: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)