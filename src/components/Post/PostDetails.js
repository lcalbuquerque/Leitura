import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import CommentsList from '../Comment/CommentsList'
import { getPostComments } from '../../store/actions/posts'
import { sortComment } from '../../store/actions/comments'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
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

        return (
            <div>
                {post &&
                    <div>
                        <Post post={post} handleOpenPostModal={handleOpenPostModal} />
                        <CommentsList postParentId={post.id} />
                    </div>}
                {!post &&
                    <Typography variant="headline" component="h2" align="center" >
                        Either this post does not exist or it was deleted!
            </Typography>}
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