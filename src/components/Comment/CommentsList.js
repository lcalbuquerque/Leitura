import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import SortBy from '../AuxUI/SortBy'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { sortComment } from '../../store/actions/comments'
import '../../App.css'

const defaultComment = {
    id: '',
    body: '',
    author: ''
}

class CommentsList extends Component {

    state = {
        showAddComment: false
    }

    showAddCommentElem = () => {
        this.setState({ showAddComment: true })
    }

    hideAddCommentElem = () => {
        this.setState({ showAddComment: false })
    }

    render() {

        const { comments, postParentId, sortComment } = this.props
        const { showAddComment } = this.state

        return (
            <div className="comment">
                    <Toolbar className="commentsBar">
                        <Typography variant="title" color="inherit">
                            Comments
                        </Typography>
                        <SortBy onChange={sortComment} />
                        <Button color="inherit" onClick={this.showAddCommentElem}>Add comment</Button>
                    </Toolbar>
                
                {showAddComment &&
                    <Comment key='newComment' initValue={{ ...defaultComment, parentId: postParentId }}
                        afterSaveOrCancel={this.hideAddCommentElem} isAdd={true} />}
                {comments && comments.map(comment =>
                    <Comment key={comment.id} initValue={comment} isAdd={false} />)
                }
            </div>
        )
    }
}

function mapStateToProps({ comments }) {
    return { comments }
}

function mapDispatchToProps(dispatch) {
    return {
        sortComment: (option) => dispatch(sortComment(option))
    }
}

CommentsList.propTypes = {
    postParent: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)